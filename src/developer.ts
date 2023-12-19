import html2canvas from "html2canvas";

/**
 * customizable things: button design
 * - create a widget button
 * - fix that button to a position(right)
 * on clicking that button, feedbackContainer should open
 * based on widget details show email, textarea, camera, video, greeting
 * when trying to submit empty feedback it shoud restrict
 * submit text feedback in formData and show greeting animation
 * click camera icon, it should open drawing canvas
 * on clicking cancel it should remove the drawing canvas and go back normal
 * draw somthing on screen
 * on clicking ok it should take the screenshot using html2canvas, create a image
 * remove the drawing canvas, create a thumbnail with cancel icon
 * on clicking thumbnail it should display full screenshot with close button
 * on clicking close button remove full screenshot
 * on clicking submit it should submit the feedback in formdata and show greeting animation
 *
 * on clicking record button, a browser popup appers to take permission for screen recording
 * on clicking ctrl + shift + x it stops recording and display the video thumbnail with cancel icon
 * on clicking cancel it should remove the recording
 * on clicking submit it should submit the feedback in formdata and show greeting animation
 *
 *
 * @todos
 *  - screeshot not working
 *  - screen record not posting
 *
 */

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
  }
}

declare class CaptureController {
  constructor();
  setFocusBehavior(behavior: string): void;
}

let recordingBlob: any = null;
const recordingType = "video/webm";
const TOP = "50%";

interface FeedbackRequest {
  [key: string]: string;
  // customerId: string;
  browser: string;
  userAgent: string;
}

class DeveloperFeedbackWidget {
  private widgetPosition: "right" | "bottom";
  private headingText!: string;
  private greetingMessage!: string;
  private takeEmail!: boolean;
  private formData!: FormData;
  private takeScreenshot: boolean;
  private recordScreen: boolean;
  private feedbackContainer: any;
  // private feedbackTextarea: HTMLTextAreaElement | undefined;
  private captureButton: HTMLButtonElement | undefined;
  private thumbnailContainer: HTMLDivElement | undefined;
  private thumbnail: HTMLImageElement | undefined;
  private recordButton: any;
  private screenRecordVideo: HTMLVideoElement | undefined;
  private okCancelContainer!: HTMLDivElement | undefined;
  private drawingCanvas: any;
  private videoContainer: HTMLDivElement | undefined;

  constructor({
    widgetPosition,
    widgetButtonStyle,
    headingText,
    greetingMessage,
    takeEmail,
    // customerId,
    takeScreenshot,
    recordScreen,
  }: any) {
    console.log("constructor", {
      widgetPosition,
      headingText,
      greetingMessage,
      takeEmail,
      // customerId,
      takeScreenshot,
      recordScreen,
    });
    this.widgetPosition = widgetPosition;
    this.headingText = headingText;
    this.greetingMessage = greetingMessage;
    this.takeEmail = takeEmail;
    this.takeScreenshot = takeScreenshot;
    this.recordScreen = recordScreen;

    this.initializeFormData();
    this.init();
  }

  private initializeFormData() {
    console.log("initializeFormData");
    this.formData = new FormData();

    // Populate the FormData object with values
    const formDataValues: FeedbackRequest = {
      // customerId,
      browser: this.fnBrowserDetect(),
      userAgent: window.navigator.userAgent,
    };

    // Append the values to the FormData object
    for (const key in formDataValues) {
      if (formDataValues.hasOwnProperty(key)) {
        this.formData.append(key, formDataValues[key]);
      }
    }
  }

  private init() {
    console.log("init");
    this.createFeedbackContainer();
    this.createFeedbackForm();
    this.feedbackContainer.appendChild(this.createPoweredByElement());
  }

  private createFeedbackContainer() {
    console.log("createFeedbackContainer");
    this.feedbackContainer = document.createElement("div");
    this.feedbackContainer.id = "feedbackWidget";
    const closeButton = this.createCloseWidgetButton();
    closeButton.addEventListener("click", () => {
      this.toggleFeedbackContainer();
    });
    this.feedbackContainer.appendChild(closeButton);
    this.setFeedbackContainerStyles();
    document.body.appendChild(this.feedbackContainer);
  }

  private setFeedbackContainerStyles() {
    this.feedbackContainer.style.display = "none";
    this.feedbackContainer.style.boxShadow = "rgba(0,0,0,0.35) 0 6px 100px 0";
    this.feedbackContainer.style.padding = "12px";
    this.feedbackContainer.style.background = "#fff";
    this.feedbackContainer.style.zIndex = "10000";
    this.feedbackContainer.style.position = "fixed";
    this.feedbackContainer.style.right = "4px";
    this.feedbackContainer.style.top = "62%";

    if (this.widgetPosition === "right") {
      this.feedbackContainer.style.right = "0px";
      this.feedbackContainer.style.top = `45%`;
    }
    if (this.widgetPosition === "bottom") {
      this.feedbackContainer.style.left = "50%";
      this.feedbackContainer.style.bottom = "0px";
    }
  }

  createCloseWidgetButton() {
    const icon = document.createElement("span");
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"  viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`;

    icon.setAttribute("id", "closeWidgetButton");
    // icon.setAttribute('class', "material-icons")
    // icon.innerText = "cancel"
    icon.style.position = "absolute";
    icon.style.top = "-8px";
    icon.style.right = "8px";
    icon.style.cursor = "pointer";
    return icon;
  }

  createFeedbackForm() {
    let feedbackForm = this.createFeedbackFormElement(); // form container
    let feedbackTextarea = this.createFeedbackTextarea(); // form textarea
    let buttonContainer = this.createButtonContainer(); // buttons container
    console.log(this.takeScreenshot);
    if (this.takeScreenshot) {
      const captureContainer = this.createCaptureBox();
      buttonContainer.appendChild(captureContainer);
    }
    if (this.recordScreen) {
      const screenRecordContainer = this.createRecordScreenBox();
      buttonContainer.appendChild(screenRecordContainer);
    }
    let submitBtn = this.createSubmitButton(); // submit button
    buttonContainer.appendChild(submitBtn);

    feedbackForm.appendChild(feedbackTextarea);
    feedbackForm.appendChild(buttonContainer);
    this.feedbackContainer.appendChild(feedbackForm);
  }

  private createFeedbackFormElement(): HTMLFormElement {
    let feedbackForm = document.createElement("form");
    feedbackForm.id = "feedbackForm";
    feedbackForm.style.display = "flex";
    feedbackForm.style.flexDirection = "column";
    feedbackForm.style.gap = "12px";
    feedbackForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission
    });
    return feedbackForm;
  }

  private createFeedbackTextarea(): HTMLTextAreaElement {
    let feedbackTextarea = document.createElement("textarea");
    feedbackTextarea.id = "okf-dev-feedback-text";
    feedbackTextarea.required = true;
    feedbackTextarea.setAttribute("placeholder", "feedback...");
    feedbackTextarea.style.width = "100%";
    feedbackTextarea.style.height = "100px";
    feedbackTextarea.style.padding = "8px";
    feedbackTextarea.style.boxSizing = "border-box";
    feedbackTextarea.style.border = "2px solid #ccc";
    feedbackTextarea.style.borderRadius = "4px";
    feedbackTextarea.style.backgroundColor = "#f8f8f8";
    feedbackTextarea.style.fontSize = "16px";
    feedbackTextarea.style.resize = "none";
    return feedbackTextarea;
  }

  private createSubmitButton(): HTMLButtonElement {
    let submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    submitBtn.id = "submitButton";
    submitBtn.innerText = "Submit";
    submitBtn.style.backgroundColor = "#4CAF50";
    submitBtn.style.border = "none";
    submitBtn.style.color = "white";
    submitBtn.style.padding = "6px 16px";
    submitBtn.style.textAlign = "center";
    submitBtn.style.fontWeight = "600";
    submitBtn.style.textDecoration = "none";
    submitBtn.style.display = "inline-block";
    submitBtn.style.fontSize = "16px";
    submitBtn.style.borderRadius = "6px";
    submitBtn.addEventListener("click", () =>
      this.handleSubmitButtonClick(submitBtn)
    );
    return submitBtn;
  }

  private createButtonContainer(): HTMLDivElement {
    let buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between";
    return buttonContainer;
  }

  createCaptureBox() {
    const captureContainer = document.createElement("div");
    captureContainer.id = "captureContainer";
    this.captureButton = document.createElement("button");
    const icon = document.createElement("span");
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
      </svg>`;
    // icon.innerText = "add_a_photo"
    this.captureButton.appendChild(icon);
    this.captureButton.id = "captureButton";
    this.captureButton.style.cursor = "pointer";
    this.captureButton.style.padding = "8px 16px";
    this.captureButton.style.border = "1px dashed #e3e3e3";
    this.captureButton.style.display = "block";
    this.captureButton.addEventListener("click", () =>
      this.handleCaptureButtonClick()
    );

    this.createThumbnailBox();
    captureContainer.appendChild(this.captureButton);
    captureContainer.appendChild(this.thumbnailContainer!);
    return captureContainer;
  }

  createThumbnailBox() {
    this.thumbnailContainer = document.createElement("div");
    this.thumbnailContainer.id = "thumbnailContainer";
    this.thumbnailContainer.style.position = "relative";
    this.thumbnailContainer.style.display = "none";
    this.thumbnailContainer.style.border = "1px solid #ddd";

    this.thumbnail = document.createElement("img") as HTMLImageElement;
    this.thumbnail.id = "thumbnail";
    this.thumbnail.style.width = "100px";
    this.thumbnail.style.borderRadius = "4px";
    this.thumbnail.style.padding = "5px";

    this.thumbnail!.addEventListener("click", (e) =>
      this.showCapturedImage(this.thumbnail!.src)
    );
    this.thumbnailContainer!.appendChild(this.thumbnail!);

    const thumbnailCancelIcon = document.createElement("span");
    thumbnailCancelIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`;
    // <i class="material-icons">add_circle</i>
    // icon.setAttribute('class', "material-icons")
    // icon.innerText = "cancel"
    thumbnailCancelIcon.style.position = "absolute";
    thumbnailCancelIcon.style.top = "0";
    thumbnailCancelIcon.style.right = "0";
    thumbnailCancelIcon.style.cursor = "pointer";
    thumbnailCancelIcon.addEventListener("click", (e: any) => {
      // remove captured image
      if (this.thumbnailContainer) {
        // code that uses this.thumbnailContainer
        this.thumbnailContainer.style.display = "none";
      }
      if (this.thumbnail) {
        this.thumbnail.removeAttribute("src");
      }
      this.formData.delete("screenshot");
      // console.log(document.getElementById("thumbnail"))
      // feedbackContainer.style["visibility"] = "unset"
      this.captureButton!.style["display"] = "block";
      this.recordButton.style["display"] = "block";
    });
  }

  showCapturedImage(src: any) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.backgroundColor = "#222";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.backgroundColor = "rgba(0,0,0,0.8)";
    const fullImg = document.createElement("img");
    fullImg.src = src;
    fullImg.style.maxWidth = "75%";

    const icon = document.createElement("span");
    // icon.setAttribute('class', "material-icons")
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>`;
    // icon.innerText = "close"
    icon.style.position = "absolute";
    icon.style.top = "50px";
    icon.style.right = "50px";
    icon.style.cursor = "pointer";
    icon.style.color = "#fff";
    icon.addEventListener("click", (e) => {
      modal.remove();
    });
    modal.appendChild(fullImg);
    modal.appendChild(icon);
    document.body.appendChild(modal);
  }

  handleCaptureButtonClick() {
    this.feedbackContainer.style.visibility = "hidden";

    const { left, top, right, bottom, x, y, width, height } =
      document.body.getBoundingClientRect();
    this.drawingCanvas = document.createElement("canvas");
    this.drawingCanvas.id = "drawingCanvas";
    this.drawingCanvas.style.position = "fixed";
    this.drawingCanvas.style.top = "0px";
    this.drawingCanvas.style.left = "0px";
    this.drawingCanvas.style.background = "rgba(0, 0, 0, 0.1)";
    this.drawingCanvas.style.zIndex = "100000";

    // Context for the canvas for 2 dimensional operations
    const ctx = this.drawingCanvas.getContext("2d");

    // Resizes the canvas to the available size of the window.
    function resize() {
      ctx!.canvas.width = window.innerWidth;
      ctx!.canvas.height = window.innerHeight;
    }

    // This is the flag that we are going to use to
    // trigger drawing

    let coord = { x: 0, y: 0 };
    let paint = false;
    // Stores the initial position of the cursor

    // Updates the coordianates of the cursor when
    // an event e is triggered to the coordinates where
    // the said event is triggered.
    const getPosition = (event: { clientX: number; clientY: number }) => {
      coord.x = event.clientX - this.drawingCanvas.offsetLeft;
      coord.y = event.clientY - this.drawingCanvas.offsetTop;
    };

    // The following functions toggle the flag to start
    // and stop drawing
    function startPainting(event: { clientX: number; clientY: number }) {
      // console.log("startPainting", event)
      paint = true;
      getPosition(event);
    }

    function stopPainting() {
      // console.log("stopPainting")
      paint = false;
    }

    function sketch(event: { clientX: number; clientY: number }) {
      // console.log("sketch", event)
      if (!paint) return;
      ctx!.beginPath();

      ctx!.lineWidth = 5;

      // Sets the end of the lines drawn
      // to a round shape.
      ctx!.lineCap = "round";

      ctx!.strokeStyle = "red";

      // The cursor to start drawing
      // moves to this coordinate
      ctx!.moveTo(coord.x, coord.y);

      // The position of the cursor
      // gets updated as we move the
      // mouse around.
      getPosition(event);

      // A line is traced from start
      // coordinate to this coordinate
      ctx!.lineTo(coord.x, coord.y);

      // Draws the line.
      ctx!.stroke();
    }

    // wait for the content of the window element
    // to load, then performs the operations.
    // This is considered best practice.
    // window.addEventListener('load', () => {
    resize(); // Resizes the canvas once the window loads
    document.addEventListener("mousedown", startPainting);
    document.addEventListener("mouseup", stopPainting);
    document.addEventListener("mousemove", sketch);
    window.addEventListener("resize", resize);
    // });

    this.okCancelContainer = this.createOkCancelContainer();
    this.okCancelContainer.appendChild(this.createOkButton());
    this.okCancelContainer.appendChild(this.createCancelButton());

    document.body.appendChild(this.okCancelContainer);
    document.body.appendChild(this.drawingCanvas);
  }

  // handleCaptureButtonClick() {
  //     this.feedbackContainer.style.visibility = "hidden";
  //     // this.feedbackBtn.style.visibility = "hidden";

  //     const drawingCanvas = this.createDrawingCanvas();
  //     this.setupDrawingCanvas(drawingCanvas);
  //     this.setupDrawingEvents(drawingCanvas);

  //     this.okCancelContainer = this.createOkCancelContainer();
  //     this.createOkButton();
  //     this.createCancelButton();

  //     document.body.appendChild(this.okCancelContainer);
  //     document.body.appendChild(drawingCanvas);
  // }

  private createOkButton() {
    let okbutton = document.createElement("button");

    const icon = document.createElement("span");
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
        </svg>`;

    okbutton.appendChild(icon);
    okbutton.id = "okbutton";
    okbutton.style.boxShadow = "0px 4px 24px rgba(0, 0, 0, 0.1)";
    okbutton.style.padding = "6px 12px";
    okbutton.style.background = "#fff";
    okbutton.addEventListener("click", (e) => {
      console.log("---------ok--------------");

      this.okCancelContainer!.remove();

      const { left, top, right, bottom, x, y, width, height } =
        document.body.getBoundingClientRect();

      html2canvas(document.body, {
        // allowTaint: false,
        // backgroundColor: "#fff",
        // canvas: null,
        // foreignObjectRendering: false,
        // imageTimeout: 15000,
        // // ignoreElements: (element) => false
        // logging: true,
        // onclone: (e) => { console.log("----------onclone----------", e) },
        // proxy: null,
        // removeContainer: true,
        scale: 1,
        // useCORS: false,
        x: Math.abs(x),
        y: Math.abs(y),
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        // // scrollX:
        // // scrollY:
        // windowWidth: Window.innerWidth,
        // windowHeight: Window.innerHeight
      }).then((canvas) => {
        console.log("---------html2canvas--------------");

        // let thumbnail = document.getElementById("thumbnail")
        this.thumbnail!.src = canvas.toDataURL("image/png");
        this.thumbnailContainer!.style.display = "block";
        this.feedbackContainer.style.visibility = "unset";
        // this.captureButton!.style.display = "none";
        // this.recordButton!.style.display = "none";
      });

      this.drawingCanvas.remove();
    });

    return okbutton;

    // this.okbutton.addEventListener("click", (e) => {
    //     this.okbutton!.remove();
    //     this.cancelButton!.remove();

    //     // Rest of the code here...
    //     const { left, top, right, bottom, x, y, width, height } = document.body.getBoundingClientRect()

    //     // html2canvas(document.body, {
    //     //     scale: 1,
    //     //     x: Math.abs(x),
    //     //     y: Math.abs(y),
    //     //     width: document.documentElement.clientWidth,
    //     //     height: document.documentElement.clientHeight,
    //     // }).then( (canvas) => {
    //     //     console.log("---------html2canvas--------------")

    //     //     // let thumbnail = document.getElementById("thumbnail")
    //     //     this.thumbnail!.src = canvas.toDataURL("image/png");
    //     //     this.thumbnailContainer!.style.display = "block";
    //     //     this.feedbackContainer.style.visibility = "unset";
    //     //     this.captureButton!.style.display = "none";
    //     //     this.recordButton!.style.display = "none";

    //     // });

    //     this.drawingCanvas.remove();
    // });

    // this.okCancelContainer!.appendChild(this.okbutton);
  }

  private createCancelButton() {
    const cancelButton = document.createElement("button");

    const cancelicon = document.createElement("span");
    cancelicon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg>`;

    cancelButton.appendChild(cancelicon);
    cancelButton.id = "cancelButton";
    cancelButton.style.boxShadow = "0px 4px 24px rgba(0, 0, 0, 0.1)";
    cancelButton.style.padding = "6px 12px";
    cancelButton.style.background = "#fff";
    cancelButton.addEventListener("click", (e: any) => {
      this.drawingCanvas.remove();
      this.okCancelContainer!.remove();
      this.feedbackContainer.style.visibility = "unset";
    });

    return cancelButton;

    // this.cancelButton.addEventListener("click", (e: any) => {
    //     this.drawingCanvas.remove();
    //     this.okCancelContainer!.remove();
    //     this.feedbackContainer.style.visibility = "unset";
    // });

    // this.okCancelContainer!.appendChild(this.cancelButton);
  }

  private createOkCancelContainer() {
    const okCancelContainer = document.createElement("div");
    okCancelContainer.id = "okCancelContainer";
    okCancelContainer.style.display = "flex";
    okCancelContainer.style.flexDirection = "row";
    okCancelContainer.style.position = "fixed";
    okCancelContainer.style.zIndex = "1000000";
    okCancelContainer.style.bottom = "10px";
    okCancelContainer.style.left = "50%";
    return okCancelContainer;
  }

  private createDrawingCanvas() {
    const drawingCanvas = document.createElement("canvas");
    drawingCanvas.id = "drawingCanvas";
    drawingCanvas.style.position = "fixed";
    drawingCanvas.style.top = "0px";
    drawingCanvas.style.left = "0px";
    drawingCanvas.style.background = "rgba(0, 0, 0, 0.1)";
    drawingCanvas.style.zIndex = "100000";
    return drawingCanvas;
  }

  setupDrawingCanvas(drawingCanvas: any) {
    const ctx = drawingCanvas.getContext("2d");
    const resize = () => {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
  }

  setupDrawingEvents(drawingCanvas: any) {
    let coord = { x: 0, y: 0 };
    let paint = false;

    const getPosition = (event: any) => {
      coord.x = event.clientX - drawingCanvas.offsetLeft;
      coord.y = event.clientY - drawingCanvas.offsetTop;
    };

    const startPainting = (event: any) => {
      paint = true;
      getPosition(event);
    };

    const stopPainting = () => {
      paint = false;
    };

    const sketch = (event: any) => {
      if (!paint) return;
      const ctx = drawingCanvas.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "red";
      ctx.moveTo(coord.x, coord.y);
      getPosition(event);
      ctx.lineTo(coord.x, coord.y);
      ctx.stroke();
    };

    document.addEventListener("mousedown", startPainting);
    document.addEventListener("mouseup", stopPainting);
    document.addEventListener("mousemove", sketch);
  }

  private toggleFeedbackContainer() {
    if (this.feedbackContainer.style.display === "none") {
      this.feedbackContainer.style.display = "flex";
    } else {
      this.feedbackContainer.style.display = "none";
    }
  }

  private createRecordScreenBox() {
    let screenRecordContainer = document.createElement("div");
    screenRecordContainer.id = "screenRecordContainer";
    this.recordButton = document.createElement("button");
    const icon = document.createElement("span");
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
    </svg>`;
    // icon.setAttribute('class', "material-icons")
    // icon.innerText = "videocam"
    this.recordButton.appendChild(icon);
    this.recordButton.id = "recordScreenButton";
    this.recordButton.style.cursor = "pointer";
    this.recordButton.style.padding = "8px 16px";
    this.recordButton.style.border = "1px dashed #e3e3e3";
    this.recordButton.style.display = "block";
    this.recordButton.addEventListener("click", () =>
      this.handleRecordButtonClick()
    );
    screenRecordContainer.appendChild(this.recordButton);

    this.videoContainer = this.createVideoContainer();
    const recordCancel = this.createRecordCancel();
    recordCancel.addEventListener("click", (e) => {
      document.getElementById("screenRecordVideo")!.remove();
      this.videoContainer!.style.display = "none";
      this.formData.delete("recording");

      // feedbackContainer.style["visibility"] = "unset"
      this.captureButton!.style["display"] = "block";
      this.recordButton.style["display"] = "block";
    });
    this.videoContainer.appendChild(recordCancel);
    screenRecordContainer.appendChild(this.videoContainer);
    return screenRecordContainer;
    // return screenRecordButton
  }

  private async handleRecordButtonClick() {
    // hide input container
    this.toggleFeedbackContainer();

    let stream = await this.startCapture();
    if (stream === null) {
      this.toggleFeedbackContainer();
      return;
    }
    let mimeType = "video/webm";
    let mediaRecorder = this.createRecorder(stream, mimeType);

    let ctlr = false;
    let shift = false;
    document.addEventListener(
      "keypress",
      (event) => {
        var name = event.key;
        var code = event.code;
        if (code === "KeyX" && ctlr && shift) {
          mediaRecorder.stop();
          // Alert the key name and key code on keydown
          // console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
        }
      },
      false
    );

    document.addEventListener(
      "keydown",
      (event) => {
        var name = event.key;
        var code = event.code;
        if (name === "Control") {
          // Do nothing.
          ctlr = true;
        }
        if (name === "Shift") {
          // Do nothing.
          shift = true;
        }
        // if (event.ctrlKey) {
        //     console.log(`Combination of ctrlKey + ${name} \n Key code Value: ${code}`);
        // } else {
        //     console.log(`cdnl Key pressed ${name} \n Key code Value: ${code}`);
        // }
      },
      false
    );

    // Add event listener on keyup
    document.addEventListener(
      "keyup",
      (event) => {
        var name = event.key;
        if (name === "Control") {
          ctlr = false;
          // console.log('Control key released');
        }
        if (name === "Shift") {
          shift = false;
          // console.log('Shift key released');
        }
        // if (name === 'Alt') {
        //     console.log('Alt key released');
        // }
      },
      false
    );

    // After some time stop the recording by
    setTimeout(() => {
      mediaRecorder.stop();
    }, 10000);
  }

  createVideoContainer() {
    const box = document.createElement("div");
    box.id = "videoContainer";
    box.style.position = "relative";
    box.style.display = "none";
    box.style.border = "1px solid rgb(221, 221, 221)";
    box.style.padding = "4px";
    box.style.borderRadius = "4px";
    return box;
  }

  createRecordCancel() {
    const icon = document.createElement("span");
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`;
    // <i class="material-icons">add_circle</i>
    // icon.setAttribute('class', "material-icons")
    // icon.innerText = "cancel"
    icon.style.position = "absolute";
    icon.style.top = "-8px";
    icon.style.right = "-8px";
    icon.style.cursor = "pointer";
    return icon;
  }

  private async startCapture() {
    try {
      // Create a new CaptureController instance
      const controller: any = new CaptureController();

      // Prompt the user to share a tab, window, or screen.
      const stream = await navigator.mediaDevices.getDisplayMedia({
        // controller,
        preferCurrentTab: true,
        audio: true,
        video: true,
        // audio: {
        //     echoCancellation: true,
        //     noiseSuppression: true,
        //     sampleRate: 44100,
        //     suppressLocalAudioPlayback: true,
        // },
        // video: {
        //     mediaSource: "screen",
        //     // displaySurface: "window"
        // },
        // selfBrowserSurface: "include"
        // selfBrowserSurface: "exclude",
        // surfaceSwitching: "include",
        // systemAudio: "exclude",
      });
      // .catch((err) => {
      //     console.error(err);
      //     return null;
      // }).then((stream) => {
      //     console.log(stream)
      //     // Query the displaySurface value of the captured video track
      //     const [track] = stream.getVideoTracks();
      //     const displaySurface = track.getSettings().displaySurface;

      // Query the displaySurface value of the captured video track

      const [track] = stream.getVideoTracks();
      // {
      //     contentHint: "",
      //     enabled: true,
      //     id: "6d0fad02-b3a0-49e8-a9d9-cd7b0a2e1039",
      //     kind: "video",
      //     label: "current-web-contents-media-stream://518D5116A4FF4363A7D2BBDE75527713",
      //     muted: false,
      //     oncapturehandlechange: null,
      //     onended: null,
      //     onmute: null,
      //     onunmute: null,
      //     readyState: "live"
      // }
      const displaySurface = track.getSettings().displaySurface;
      // {
      //     "aspectRatio": 1.7777777777777777,
      //     "cursor": "motion",
      //     "deviceId": "web-contents-media-stream://591:4",
      //     "displaySurface": "browser",
      //     "frameRate": 30,
      //     "height": 1080,
      //     "logicalSurface": true,
      //     "resizeMode": "crop-and-scale",
      //     "width": 1920
      // }

      if (displaySurface == "browser") {
        // Focus the captured tab.
        controller.setFocusBehavior("focus-captured-surface");
      } else if (displaySurface == "window") {
        // Do not move focus to the captured window.
        // Keep the capturing page focused.
        controller.setFocusBehavior("no-focus-change");
      }

      return stream;
    } catch (error) {
      alert(error);
      return null;
    }
  }

  private createRecorder(stream: any, mimeType: any) {
    // the stream data is stored in this array
    let recordedChunks: any = [];

    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function (e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };
    mediaRecorder.onstop = () => {
      const downloadLink = this.saveFile(recordedChunks);
      recordedChunks = [];
      this.toggleFeedbackContainer();
      this.addVideoToContainer(downloadLink);
    };
    mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
    return mediaRecorder;
  }

  private saveFile(recordedChunks: any) {
    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    // let : any: any = blob;
    let filename = this.makeid(15),
      downloadLink = document.createElement("a");

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.webm`;
    console.log(downloadLink);
    return downloadLink;

    // return downloadLink

    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // URL.revokeObjectURL(blob); // clear from memory
    // document.body.removeChild(downloadLink);
  }

  private addVideoToContainer(downloadLink: any) {
    let video: HTMLVideoElement = document.createElement("video");
    video.id = "screenRecordVideo";
    video.width = 120;
    video.controls = true;
    video.innerHTML = `
            <source src="${downloadLink.href}" type="video/webm" download="${downloadLink.download}">
            Your browser does not support the video tag.
        `;
    // let videoContainer = document.getElementById('videoContainer')
    this.videoContainer!.style.display = "block";
    this.captureButton!.style.display = "none";
    this.recordButton!.style.display = "none";
    this.feedbackContainer.style.display = "flex";
    // document.getElementById("captureButton")!.style["display"] = "none";
    // document.getElementById("recordScreenButton")!.style["display"] = "none";
    // document.getElementById("inputBox")!.style["display"] = "flex";
    // document.getElementById("feedbackButton").innerText = "Hide me"
    this.videoContainer!.appendChild(video);
  }

  toggle() {
    console.log("toggle");
    let from, to;
    // if (this.widgetPosition === "left") {
    //   from = "translateX(-10%)";
    //   to = "translateX(0)";
    // }
    if (this.widgetPosition === "bottom") {
      from = "translateY(10%)";
      to = "translateY(0)";
    }
    if (this.widgetPosition === "right") {
      from = "translateX(10%)";
      to = "translateX(0)";
    }
    if (this.feedbackContainer.style.display === "flex") {
      this.feedbackContainer.animate(
        [
          { opacity: 1, transform: to },
          { opacity: 0, transform: from },
        ],
        { duration: 300, easing: "ease-in-out" }
      );
      setTimeout(() => {
        this.feedbackContainer.style.display = "none";
      }, 300);
      // feedbackButton.innerText = "Feedback"
      // feedbackButton.style.display = "block"
      // document.normalize();
    } else if (this.feedbackContainer.style.display === "none") {
      this.feedbackContainer.animate(
        [
          { opacity: 0, transform: from },
          { opacity: 1, transform: to },
        ],
        { duration: 300, easing: "ease-in-out" }
      );
      this.feedbackContainer.style.display = "flex";
      this.feedbackContainer.style.flexDirection = "column";
      this.feedbackContainer.style.gap = "12px";
      // feedbackButton.innerText = "Hide me"
      // feedbackButton.style.display = "none"
    }
  }

  toggleSubmitNormalization(submitButton: HTMLButtonElement) {
    if (!submitButton.disabled) {
      submitButton.innerHTML = `Submit`;
      submitButton.removeAttribute("disabled");
      submitButton.style.opacity = "1.0";
    } else {
      submitButton.innerHTML += `<i class="fa fa-spinner fa-spin"></i>`;
      submitButton.setAttribute("disabled", "true");
      submitButton.style.opacity = "0.6";
    }
  }

  async handleSubmitButtonClick(submitButton: HTMLButtonElement) {
    console.log("handleSubmitButtonClick", this.formData);
    this.toggleSubmitNormalization(submitButton);

    if (this.feedbackContainer.querySelector("textarea")!.value) {
      this.formData.set(
        "text",
        this.feedbackContainer.querySelector("textarea")!.value
      );
    }
    if (
      this.feedbackContainer.querySelector("textarea")!.value === "" &&
      this.formData.get("text")
    ) {
      this.formData.delete("text");
    }

    const screenshotSrc = this.thumbnail?.getAttribute("src");
    if (screenshotSrc) {
      this.formData.set("screenshot", screenshotSrc);
      const screenshotType = "png";
    }

    const screenRecordVideo: HTMLVideoElement | null =
      this.videoContainer!.querySelector("#screenRecordVideo");
    if (screenRecordVideo) {
      const recordingSrc = screenRecordVideo.getAttribute("src");
      const recordingName = screenRecordVideo
        .querySelector("source")!
        .getAttribute("download");
      if (recordingSrc) {
        this.formData.set("recording", recordingBlob, "recordingName.webm");
      }
    }

    if (
      this.formData.has("text") ||
      this.formData.has("screenshot") ||
      this.formData.has("recording")
    ) {
      console.log(this.formData);

      // try {
      //   const response = await fetch("/api/feedback", {
      //     method: "POST",
      //     mode: "cors",
      //     body: this.formData,
      //   });

      //   console.log(response);
      //   this.toggleSubmitNormalization(submitButton);
      //   this.showThanksText();
      // } catch (error) {
      //   alert(error);
      //   console.log(error);
      //   this.toggleSubmitNormalization(submitButton);
      // }
    } else {
      this.toggleSubmitNormalization(submitButton);
      this.feedbackContainer.querySelector("textarea").focus();
    }
  }

  showThanksText() {
    console.log("showThanksText");
    const thanksText = document.createElement("p");
    thanksText.textContent = "Thanks for your feedback!";
    thanksText.style.opacity = "0";
    thanksText.style.transform = "translateX(100%)";
    thanksText.style.transition = "opacity 0.5s, transform 0.3s";
    thanksText.style.fontSize = "24px";
    thanksText.style.textAlign = "center";
    const currentHeight = this.feedbackContainer.clientHeight;
    const currentWidth = this.feedbackContainer.clientWidth;
    while (this.feedbackContainer.firstChild) {
      this.feedbackContainer.removeChild(this.feedbackContainer.firstChild);
    }

    this.feedbackContainer.appendChild(thanksText);

    this.feedbackContainer.style.height = `${currentHeight}px`;
    this.feedbackContainer.style.width = `${currentWidth}px`;
    this.feedbackContainer.style.display = "flex";
    this.feedbackContainer.style.justifyContent = "center";
    this.feedbackContainer.style.alignItems = "center";
    const closeButton = this.createCloseWidgetButton();
    closeButton.addEventListener("click", () => {
      this.toggleFeedbackContainer();
      loadDeveloperFeedbackWidget();
    });
    this.feedbackContainer.appendChild(closeButton);

    setTimeout(() => {
      thanksText.style.opacity = "1";
      thanksText.style.transform = "translateX(0)";
    }, 100);
  }
  private createPoweredByElement() {
    console.log("createPoweredByElement");
    const poweredByElement = document.createElement("div");
    poweredByElement.id = "powered-by";
    poweredByElement.innerHTML = `powered by <a href="https://www.okfeedback.io" style="color: blue;font-weight: 600;" target="_blank" >Okfeedback.io</a> </br>(Press Ctl + Shift + x to stop screen recording)`;
    poweredByElement.style.fontSize = "10px";
    return poweredByElement;
  }

  makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  fnBrowserDetect() {
    let userAgent = navigator.userAgent;
    let browserName;

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
      browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "edge";
    } else {
      browserName = "No browser detection";
    }
    return browserName;
  }
}

/**
 *
 * take only
 *
 * @returns
 *
 */
const loadDeveloperFeedbackWidget = () => {
  const dataFeedbackOpts = JSON.parse(
    document
      .getElementById("okfeedback-developer-feedback-widget")!
      .getAttribute("data-feedback-opts")!
  );
  // const customerId = document
  //   .getElementById("okfeedback-developer-feedback-widget")!
  //   .getAttribute("data-customer-id");
  // if (!customerId || customerId === "null" || customerId === "undefined") {
  //   return;
  // }

  const {
    widgetPosition,
    widgetButtonStyle,
    headingText,
    greetingMessage,
    takeEmail,
    takeScreenshot,
    recordScreen,
  } = dataFeedbackOpts;

  const devFeedback = new DeveloperFeedbackWidget({
    widgetPosition,
    headingText,
    greetingMessage,
    takeEmail,
    takeScreenshot,
    recordScreen,
    // customerId,
  });
  const feedbackButton = createFeedbackButton({
    widgetPosition,
    widgetButtonStyle,
  });
  feedbackButton.addEventListener("click", () => {
    devFeedback.toggle();
  });

  document.body.appendChild(feedbackButton);
};

// Create feedback button
function createFeedbackButton({ widgetPosition, widgetButtonStyle }: any) {
  const feedbackButton = document.createElement("button");
  feedbackButton.id = "feedback-widget-toggle-button";
  feedbackButton.textContent = "Feedback";
  feedbackButton.style.position = "fixed";
  Object.assign(feedbackButton.style, {
    ...widgetButtonStyle,
  });
  if (widgetPosition === "right") {
    feedbackButton.style.transform = "rotate(-90deg)";
    feedbackButton.style.right = "-45px";
    feedbackButton.style.top = TOP;
  }
  if (widgetPosition === "bottom") {
    feedbackButton.style.right = "unset";
    feedbackButton.style.top = "unset";
    feedbackButton.style.left = "50%";
    feedbackButton.style.bottom = "0px";
  }
  // feedbackButton.style.transform = `translateX(-50%)`;
  feedbackButton.style.zIndex = "9999";
  feedbackButton.style.padding = "10px 20px";
  feedbackButton.style.fontSize = "16px";
  feedbackButton.style.backgroundColor = "#4f46e5";
  feedbackButton.style.background = "rgb(51, 51, 51)";
  feedbackButton.style.color = "#fff";
  feedbackButton.style.fontWeight = "600";
  feedbackButton.style.textAlign = "center";
  feedbackButton.style.border = "1px solid rgb(221, 221, 221)";
  feedbackButton.style.borderRadius = "0px 0px 0px 0px";
  feedbackButton.style.cursor = "pointer";
  feedbackButton.style.boxShadow = "rgba(0,0,0,0.35) 0 6px 100px 0";
  return feedbackButton;
}

// function createFeedbackButton() {

//     this.feedbackBtn = document.createElement('button');
//     this.feedbackBtn.innerText = 'Feedback';
//     this.feedbackBtn.id = 'feedbackButton';
//     const styles = `
//         height: 45px;
//         border: 1px solid rgb(221, 221, 221);
//         background: rgb(51, 51, 51);
//         width: 128px;
//         font-weight: 600;
//         color: white;
//         text-align: center;
//         position: fixed;
//         z-index: 10000;
//     `;
//     const rightStyles = styles + `
//         transform: rotate(-90deg);
//         right: -45px;
//         top: ${top};
//     `;
//     const bottomStyles = styles + `
//         right: unset;
//         top: unset;
//         left: 50%;
//         bottom: 0px;
//     `;
//     const leftStyles = styles + `
//         transform: rotate(90deg);
//         left: -45px;
//         top: 42%;
//     `;
//     // let position = "left"
//     if (this.position === "left") this.feedbackBtn.style = leftStyles
//     if (this.position === "bottom") this.feedbackBtn.style = bottomStyles
//     if (this.position === "right") this.feedbackBtn.style = rightStyles

// }

loadDeveloperFeedbackWidget();
