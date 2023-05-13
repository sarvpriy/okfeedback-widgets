import html2canvas from 'html2canvas';

// const box = `
// <div id='box'>
//   <button id='button-1'>Button</button>
// </div>`;
// document.document.body.innerHtml = box;

// show feedback button
// on click, open widget
// on click capture, show fixed canvas with buttons
// on click ok, show image that can be cancelled
// on click subit, send image+text to backend

window.addEventListener('load', () => {
    console.log("---------window loaded--------------")
    const options = JSON.parse(document.getElementById("feddback-script").getAttribute("data-feedback-opts"))


    // window.addEventListener("scroll", () => {
    //     // console.log(screen.height, screen.width, screen.pixelDepth, screen.availHeight, screen.availWidth, screen.colorDepth);
    //     // console.log(document.scripts.length)
    //     // console.log(document.body.offsetHeight, document.body.clientHeight, document.body.scrollTop)
    //     // console.log(document.body.offsetWidth, document.body.clientWidth, document.body.scrollTop)
    //     // const root = document.getElementById("root")
    //     console.log(document.body.getBoundingClientRect())
    // })


    const feedbackContainer = createFeedbackContainer()
    const inputContainer = createFeedbackInputContainer()
    const feedbackInput = createFeedbackInput();

    const submitButton = createSubmitButton();
    submitButton.addEventListener('click', (e) => {
        console.log(feedbackInput.value)
        const feedbackText = feedbackInput.value

        // const tempCanvas = document.createElement("canvas")
        // tempCanvas.width = "1248px";
        // tempCanvas.height = "1200px";
        // const tmpctx = tempCanvas.getContext("2d")
        // const { left, top, right, bottom, x: newX, y: newY, width: bodyWidth, height: bodyHeight } = document.body.getBoundingClientRect()
        // console.log(document.body.getBoundingClientRect())
        // tmpctx.drawImage(image, newX, newY, drawingCanvas.width, drawingCanvas.height, 0, 0, drawingCanvas.width, drawingCanvas.height);

        // tmpctx.drawImage(document.getElementById("canvas-img"), 0, 0, 1248, 1200, 0, 0, 1248, 1200);
        // let img = new Image();
        // img.src = tempCanvas.toDataURL("image/png")
        // img.id = "canvas-new-img"

        // document.getElementById("canvas-img").src = tempCanvas.toDataURL("image/png")

        // fetch("https://dummy.restapiexample.com/api/v1/create", {
        //     method: "POST",
        //     mode: "cors",
        //     cache: "no-cache",
        //     credentials: "same-origin",
        //     headers: {
        //         "Content-Type": "application/json",
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     redirect: "follow",
        //     referrerPolicy: "no-referrer",
        //     body: JSON.stringify({ feedbackText })
        // }).then((res) => console.log(res))
        //     .catch((e) => alert(e))
    })


    const captureButton = createCaptureButton()
    captureButton.addEventListener("click", (e) => {

        document.body.style["min-width"] = "fit-content"
        document.body.style["min-height"] = "fit-content"

        const { left, top, right, bottom, x, y, width, height } = document.body.getBoundingClientRect()
        console.log("---------capture--------------")
        // console.log("clientWidth", document.documentElement.clientWidth, window.innerWidth, Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))
        // console.log("innerWidth", innerWidth, Math.abs(innerWidth), Math.floor(Math.abs(innerWidth)), Math.ceil(Math.abs(innerWidth)))
        // console.log("clientHeight", document.documentElement.clientHeight, window.innerHeight, Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0))
        // console.log("innerHeight", innerHeight, Math.abs(innerHeight), Math.floor(Math.abs(innerHeight)), Math.ceil(Math.abs(innerHeight)))

        // console.log("left", left, Math.abs(left), Math.floor(Math.abs(left)), Math.ceil(Math.abs(left)))
        // console.log("top", top, Math.abs(top), Math.floor(Math.abs(top)), Math.ceil(Math.abs(top)))
        // console.log("right", right, Math.abs(right), Math.floor(Math.abs(right)), Math.ceil(Math.abs(right)))
        // console.log("bottom", bottom, Math.abs(bottom), Math.floor(Math.abs(bottom)), Math.ceil(Math.abs(bottom)))
        // console.log("x", x, Math.abs(x), Math.floor(Math.abs(x)), Math.ceil(Math.abs(x)))
        // console.log("y", y, Math.abs(y), Math.floor(Math.abs(y)), Math.ceil(Math.abs(y)))
        // console.log("width", width, Math.abs(width), Math.floor(Math.abs(width)), Math.ceil(Math.abs(width)))
        // console.log("height", height, Math.abs(height), Math.floor(Math.abs(height)), Math.ceil(Math.abs(height)))

        // document.body.appendChild(backdrop)

        const drawingCanvas = document.createElement("canvas")
        drawingCanvas.id = "drawingCanvas"
        // drawingCanvas.setAttribute('height', window.innerHeight);
        // drawingCanvas.setAttribute('width', window.innerWidth);
        drawingCanvas.style["position"] = "fixed";
        drawingCanvas.style["top"] = "0px";
        drawingCanvas.style["left"] = "0px";
        // drawingCanvas.style["height"] = "1200";
        // drawingCanvas.style["width"] = "700";
        drawingCanvas.style["background"] = "rgba(0, 0, 0, 0.1)";
        drawingCanvas.style["z-index"] = "100000000";
        // console.log("drawingCanvas", drawingCanvas.clientWidth, drawingCanvas.clientHeight)
        // document.body.style["height"] = "100%";
        // document.body.style["overflow"] = "hidden";

        // https://www.geeksforgeeks.org/how-to-draw-with-mouse-in-html-5-canvas/
        // const canvas = document.querySelector('#canvas');

        // Context for the canvas for 2 dimensional operations
        const ctx = drawingCanvas.getContext('2d');

        // Resizes the canvas to the available size of the window.
        function resize() {
            // console.log("resize")
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
        }

        // Stores the initial position of the cursor
        let coord = { x: 0, y: 0 };

        // This is the flag that we are going to use to 
        // trigger drawing
        let paint = false;

        // Updates the coordianates of the cursor when 
        // an event e is triggered to the coordinates where 
        // the said event is triggered.
        function getPosition(event) {
            // console.log("getPosition", event)

            coord.x = event.clientX - drawingCanvas.offsetLeft;
            coord.y = event.clientY - drawingCanvas.offsetTop;
        }

        // The following functions toggle the flag to start
        // and stop drawing
        function startPainting(event) {
            // console.log("startPainting", event)
            paint = true;
            getPosition(event);
        }

        function stopPainting() {
            // console.log("stopPainting")
            paint = false;
        }

        function sketch(event) {
            // console.log("sketch", event)
            if (!paint) return;
            ctx.beginPath();

            ctx.lineWidth = 5;

            // Sets the end of the lines drawn
            // to a round shape.
            ctx.lineCap = 'round';

            ctx.strokeStyle = 'green';

            // The cursor to start drawing
            // moves to this coordinate
            ctx.moveTo(coord.x, coord.y);

            // The position of the cursor
            // gets updated as we move the
            // mouse around.
            getPosition(event);

            // A line is traced from start
            // coordinate to this coordinate
            ctx.lineTo(coord.x, coord.y);

            // Draws the line.
            ctx.stroke();
        }

        // wait for the content of the window element
        // to load, then performs the operations.
        // This is considered best practice.
        // window.addEventListener('load', () => {
        resize(); // Resizes the canvas once the window loads
        document.addEventListener('mousedown', startPainting);
        document.addEventListener('mouseup', stopPainting);
        document.addEventListener('mousemove', sketch);
        window.addEventListener('resize', resize);
        // });

        const okbutton = document.createElement('button');
        okbutton.innerText = 'OK';
        okbutton.id = 'okbutton';
        okbutton.style = `position: fixed;z-index:10000000000; bottom: 10px;left: 40%;box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);padding: 12px;background: #fff;border-radius: 32px;`
        okbutton.addEventListener("click", (e) => {
            console.log("---------ok button--------------")
            console.log("drawingCanvas width", document.getElementById("drawingCanvas").width)
            console.log("drawingCanvas height", document.getElementById("drawingCanvas").height)

            console.log("clientWidth", document.documentElement.clientWidth) // 1258
            console.log("innerWidth", window.innerWidth) // 1275
            // console.log("innerWidth", innerWidth, Math.abs(innerWidth), Math.floor(Math.abs(innerWidth)), Math.ceil(Math.abs(innerWidth)))
            console.log("clientHeight", document.documentElement.clientHeight) // 970
            console.log("innerHeight", window.innerHeight) // 986
            // console.log("innerHeight", innerHeight, Math.abs(innerHeight), Math.floor(Math.abs(innerHeight)), Math.ceil(Math.abs(innerHeight)))

            const { left, top, right, bottom, x, y, width, height } = document.body.getBoundingClientRect()
            console.log("left", left, Math.abs(left), Math.floor(Math.abs(left)), Math.ceil(Math.abs(left)))
            console.log("top", top, Math.abs(top), Math.floor(Math.abs(top)), Math.ceil(Math.abs(top)))
            console.log("right", right, Math.abs(right), Math.floor(Math.abs(right)), Math.ceil(Math.abs(right)))
            console.log("bottom", bottom, Math.abs(bottom), Math.floor(Math.abs(bottom)), Math.ceil(Math.abs(bottom)))
            console.log("x", x, Math.abs(x), Math.floor(Math.abs(x)), Math.ceil(Math.abs(x)))
            console.log("y", y, Math.abs(y), Math.floor(Math.abs(y)), Math.ceil(Math.abs(y)))
            console.log("width", width, Math.abs(width), Math.floor(Math.abs(width)), Math.ceil(Math.abs(width)))
            console.log("height", height, Math.abs(height), Math.floor(Math.abs(height)), Math.ceil(Math.abs(height)))

            console.log("devicePixelRatio", window.devicePixelRatio)
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
            }).then(function (canvas) {
                console.log("---------html2canvas--------------")
                console.log("canvas", canvas.width, canvas.height) // 1709 1349

                // var ctx = canvas.getContext("2d");
                // var imgData = ctx.getImageData((Math.abs(x)), (Math.abs(y)), (Math.abs(document.documentElement.clientWidth)), (Math.abs(document.documentElement.clientHeight)));
                // console.log(imgData)

                // const newCan = document.createElement("canvas")
                // // console.log("init", newCan.width, newCan.height)

                // newCan.width = Math.abs(document.documentElement.clientWidth)
                // newCan.height = Math.abs(document.documentElement.clientHeight)
                // const newCtx = newCan.getContext("2d");
                // newCtx.putImageData(imgData, 0, 0);


                // var context = canvas.getContext("2d");
                // // // get the current ImageData for the canvas
                // var data = context.getImageData(0, 0, canvas.width, canvas.height);
                // // // store the current globalCompositeOperation
                // var compositeOperation = context.globalCompositeOperation;
                // // // set to draw behind current content
                // context.globalCompositeOperation = "destination-over";
                // // //set background color
                // context.fillStyle = "#FFFFFF";
                // // // draw background/rectangle on entire canvas
                // context.fillRect(0, 0, canvas.width, canvas.height);

                // console.log(canvas.attributes)
                // document.document.body.appendChild(canvas);
                function convertCanvasToImage() {
                    let image = new Image();

                    const tempCanvas = document.createElement("canvas")
                    const tmpctx = tempCanvas.getContext("2d")
                    const { left, top, right, bottom, x: newX, y: newY, width: bodyWidth, height: bodyHeight } = document.body.getBoundingClientRect()
                    // console.log(document.body.getBoundingClientRect())
                    // tmpctx.drawImage(image, newX, newY, drawingCanvas.width, drawingCanvas.height, 0, 0, drawingCanvas.width, drawingCanvas.height);
                    tmpctx.drawImage(data, newX, newY,);
                    let img = new Image();
                    img.src = tempCanvas.toDataURL("image/png")

                    // image.setAttribute("height", "300")
                    // image.setAttribute("width", "300")
                    return img;
                }

                // let pngImage = convertCanvasToImage();
                // console.log(pngImage)
                // cropImage({
                //     canvas, 
                //     imagePath: pnGImage.src, 
                //     newX, 
                //     newY, 
                //     newWidth, 
                //     newHeight
                // })
                // const newcanvas = document.getElementById("canvas")
                // console.log(newcanvas.offsetHeight, newcanvas.clientHeight, newcanvas.scrollTop)

                let image = new Image();
                image.id = "canvas-img"
                image.style = "margin-left: 0px;border: 1px solid blue;"
                // image.width = Math.abs(window.innerWidth)
                // image.height = Math.abs(window.innerHeight)
                image.src = canvas.toDataURL("image/png");
                document.body.appendChild(image);
                // document.normalize()

                // document.body.style["min-width"] = "unset"
                // document.body.style["min-height"] = "unset"

                // const img = document.getElementById("canvas-img")

                // const tempCanvas = document.createElement("canvas")
                // tempCanvas.width = width
                // tempCanvas.height = height
                // const tmpctx = tempCanvas.getContext("2d")
                // tmpctx.drawImage(img, left, top, right, bottom, 0, 0, width, height)

                // document.body.appendChild(tempCanvas)

                // // var tmpctx = canvas.getContext("2d");
                // var imgData = tmpctx.getImageData(left, top, width, height);
                // tmpctx.putImageData(imgData, 0, 0);
                // image.src = tempCanvas.toDataURL("image/png");

                // ctx.drawImage(img, 10, 10);

            });

            drawingCanvas.remove()
            okbutton.remove()
            cancelButton.remove()
            // document.body.removeAttribute("style")
            // document.body.style["overflow"] = "hidden";
        })

        const cancelButton = document.createElement('button');
        cancelButton.innerText = 'Cancel';
        cancelButton.id = 'cancelButton';
        cancelButton.style = `position: fixed;z-index:10000000000; bottom: 10px;left: 50%;box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);padding: 12px;background: #fff;border-radius: 32px;`
        cancelButton.addEventListener("click", (e) => {
            // const element = document.getElementById("div-02");
            canvas.remove()
            okbutton.remove()
            cancelButton.remove()
            // document.body.removeAttribute("style")
        })
        document.body.appendChild(okbutton)
        document.body.appendChild(cancelButton)
        document.body.appendChild(drawingCanvas)

    })

    const feedbackButton = createFeedbackButton()
    feedbackButton.addEventListener('click', (e) => {
        if (inputContainer.style.display === "block") {
            inputContainer.style.display = "none";
            document.normalize();
        }
        else if (inputContainer.style.display === "none")
            inputContainer.style.display = "block";

        // startCapture()

        // const backdrop = document.createElement("div")
        // backdrop.style.height = "100vh"
        // backdrop.style.width = "100vw"
        // backdrop.style.position = "fixed"
        // backdrop.style.top = "0px"
        // backdrop.style.left = "0px"
        // backdrop.style.backgroundColor = "#222"
        // backdrop.style.opacity = "0.2"
    })

    inputContainer.appendChild(feedbackInput)
    inputContainer.appendChild(submitButton)
    inputContainer.appendChild(captureButton)

    feedbackContainer.appendChild(inputContainer);
    feedbackContainer.appendChild(feedbackButton);

    const dFrag = document.createDocumentFragment();
    dFrag.appendChild(feedbackContainer);
    document.body.appendChild(dFrag);

    // document.document.body.appendChild(
    //     Object.assign(
    //         document.createElement('div'),
    //         {
    //             id: 'box',
    //             style: "background-color: #333"
    //         }
    //     )
    // ).appendChild(
    //     Object.assign(
    //         document.createElement('button'),
    //         {
    //             innerHTML: 'button',
    //             id: 'button-1'
    //         }
    //     )
    // )

    // getBoundingClientRect()
    // .scrollIntoView();
    // let x = element.scrollLeft;
    // let y = element.scrollTop;

})

function createFeedbackContainer() {
    const box = document.createElement("div");
    box.id = "feedbackWidget";
    box.style["position"] = "fixed";
    box.style["bottom"] = "10px";
    box.style["left"] = "50%";
    box.style["box-shadow"] = "0px 4px 24px rgba(0, 0, 0, 0.1)";
    box.style["padding"] = "12px";
    box.style["background"] = "#fff";
    box.style["border-radius"] = "32px";
    return box
}

function loadFeedbackWidget() {
}

function createFeedbackInputContainer() {
    const inputBox = document.createElement("div");
    inputBox.id = "inputBox"
    inputBox.style.display = "none";
    return inputBox
}


function createFeedbackInput() {
    const input = document.createElement("input");
    input.id = "input"
    input.type = "text"
    input.style = "border: 1px solid;"

    return input;
}

function createSubmitButton() {
    const submitButton = document.createElement("button");
    submitButton.id = "submitButton"
    submitButton.innerText = 'Submit';
    return submitButton
}
function createFeedbackButton() {
    const button = document.createElement('button');
    button.innerText = 'Feedback';
    button.id = 'feedbackButton';
    return button
}
function createCaptureButton() {
    const captureButton = document.createElement("button");
    captureButton.id = "captureButton"
    captureButton.innerText = 'capture';
    return captureButton
}


// ----- screen sharing -------
function startCapture() {

    // Create a new CaptureController instance
    const controller = new CaptureController();
    // Prompt the user to share a tab, window, or screen.
    navigator.mediaDevices
        .getDisplayMedia({ controller, preferCurrentTab: true, video: true, selfBrowserSurface: "include" })
        .catch((err) => {
            console.error(err);
            return null;
        }).then((stream) => {
            // Query the displaySurface value of the captured video track
            const [track] = stream.getVideoTracks();
            const displaySurface = track.getSettings().displaySurface;

            if (displaySurface == "browser") {
                // Focus the captured tab.
                controller.setFocusBehavior("focus-captured-surface");
            } else if (displaySurface == "window") {
                // Do not move focus to the captured window.
                // Keep the capturing page focused.
                controller.setFocusBehavior("no-focus-change");
            }

        });
}

function cropImage({
    canvas,
    imagePath,
    newX,
    newY,
    newWidth,
    newHeight
}) {
    const originalImage = new Image();
    originalImage.src = imagePath;
    // const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    originalImage.addEventListener('load', function () {

        const originalWidth = originalImage.naturalWidth;
        const originalHeight = originalImage.naturalHeight;
        const aspectRatio = originalWidth / originalHeight;
        if (newHeight === undefined) {
            newHeight = newWidth / aspectRatio;
        }
        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(originalImage, newX, newY, newWidth, newHeight, 0, 0, newWidth, newHeight);
        // downloadImage(downloadName);
    });
}