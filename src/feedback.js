// animate
// add greeting text
// can take email

import html2canvas from "html2canvas";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

// type Feedback = {
//     "customerId": string,
//     "text": string,
//     "media": string,
//     "url": string,
//     "browser": string,
//     "userAgent": string,
//     "clientEmail": string
// }

let recordingBlob = null;
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

/**
 * @todos
 *  - check the browser and if video recording is on
 *  - options - title, positions, custom positions, takeScreenshot, recordScreen, takeEmail
 *  - fast loading
 *  - add pencel in drawing canvas
 *  - add thanks animations
 *  - add header
 * 
 */

const WIDGET_TYPE = "bug"
const DEV_WIDGET_ID = "okfeedback-developer-feedback-widget";

const loadWidget = () => {
    // document.head.innerHTML += `
    // <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    // `;
    // console.log("---------window loaded--------------")

    // title, positions, custom positions, widgetStyle, takeScreenshot, recordScreen, takeEmail
    const dataFeedbackOpts = JSON.parse(document.getElementById(DEV_WIDGET_ID).getAttribute("data-feedback-opts"))
    const customerId = document.getElementById(DEV_WIDGET_ID).getAttribute("data-customer-id");
    if (!customerId || customerId === "null" || customerId === "undefined") {
        return;
    }

    const {
        position,
        recordScreen,
        takeScreenshot,
        greetingMessage,
        customPositions,
        takeEmail,
        headingText,
        widgetButtonStyle
    } = dataFeedbackOpts;

    let formData = new FormData();
    // formData.append('customerId', customerId); // imp
    formData.append('widgetId', window.okfeedbackid); 
    formData.append('widgetType', WIDGET_TYPE); 
    let source = {
        "url": window.location.href,
        "browser": fnBrowserDetect(),
        "userAgent": window.navigator.userAgent,
    }
    // formData.append('browser', fnBrowserDetect());
    // formData.append('userAgent', window.navigator.userAgent);
    // formData.append('clientEmail', "");

    const feedbackContainer = createFeedbackContainer(position) // main container #feedbackWidget
    const inputContainer = createFeedbackInputContainer(position)
    const emailInput = createEmailInput();
    const feedbackInput = createFeedbackInputBox();

    const submitButton = createSubmitButton();
    submitButton.addEventListener('click', (e) => {
        // submitButton.innerHTML += `<i class="fa fa-spinner fa-spin"></i>`
        submitButton.setAttribute("disabled", true);
        submitButton.style["opacity"] = "0.6";

        function normalizeSubmitButton() {
            submitButton.innerHTML = `Submit`
            submitButton.removeAttribute("disabled");
            submitButton.style["opacity"] = "1.0";
        }
        if(emailInput.value) {
            source['clientEmail'] = emailInput.value;
        }
        formData.append('source', JSON.stringify(source)); 
        if (feedbackInput.value) {
            formData.set('feedbackText', feedbackInput.value);
        }
        if ((feedbackInput.value === "") && formData.get("feedbackText")) {
            formData.delete("feedbackText")
        }

        if (document.getElementById("thumbnail")) {
            const screenshotSrc = document.getElementById("thumbnail").getAttribute("src");
            if (screenshotSrc) {
                formData.set('screenshot', screenshotSrc);
                const screenshotType = "png"
            }
        }
        // const screenshot = screenshotSrc;
        if (document.getElementById("screenRecordVideo")) {
            const recordingSrc = document.getElementById("screenRecordVideo").firstElementChild.getAttribute("src");
            const recordingName = document.getElementById("screenRecordVideo").firstElementChild.getAttribute("download");
            // const recordingBlob = document.getElementById("screenRecordVideo").firstElementChild.getAttribute("blob");
            if (recordingSrc) {
                formData.set('recording', recordingBlob, "recordingName.webm");
                const recordingType = "video/webm"
            }
        }

        if (formData.has("feedbackText") || formData.has("screenshot") || formData.has("recording")) {
            const payload = {};

            for (const [key, value] of formData.entries()) {
                if(key === "source") {
                    payload[key] = JSON.parse(value);
                } else {
                    payload[key] = value;
                }
                console.log(key, value)
            }
            inputContainer.style.opacity = "0.5"
            fetch("/api/feedbacks", {
                method: "POST",
                mode: "cors",
                // cache: "no-cache",
                // credentials: "same-origin",
                // headers: {
                // "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // },
                // redirect: "follow",
                // referrerPolicy: "no-referrer",
                body: JSON.stringify(payload)
            }).then((res) => {
                console.log(res)
                emailInput.value = "";
                feedbackInput.value = "";
                inputContainer.style.opacity = "1"
                // const thanksContainer = document.createElement("div");
                // thanksContainer.style.width = "100%";
                // thanksContainer.style.height = "90%";
                // thanksContainer.style.display = "flex";
                // thanksContainer.style.justifyContent = "center";
                // thanksContainer.style.alignItems = "center";

                // const thanksText = document.createElement("p");
                // thanksText.textContent = greetingMessage;
                // thanksText.style.fontSize = "20px";

                // // add illustration here
                // thanksContainer.appendChild(thanksText);

                // inputContainer.animate(
                //     [
                //         { opacity: 1, transform: "translateX(0)" },
                //         { opacity: 0, transform: "translateX(-10%)" },
                //     ],
                //     { duration: 300, easing: "ease-in-out" }
                // );
                // thanksContainer.animate(
                //     [
                //         { opacity: 0, transform: "translateX(5%)" },
                //         { opacity: 1, transform: "translateX(0)" },
                //     ],
                //     { duration: 300, easing: "ease-in-out" }
                // );
                // // inputContainer.parentNode?.replaceChild(
                // //     thanksContainer,
                // //     inputContainer
                // // );
                normalizeSubmitButton()
                
            }).catch((e) => {
                alert(e)
                normalizeSubmitButton()
            })

        } else {
            normalizeSubmitButton()
            feedbackInput.focus()
        }

    })

    const captureButton = createCaptureButton(takeScreenshot)
    captureButton.addEventListener("click", (e) => {
        console.log("---------capture--------------")

        feedbackContainer.style["visibility"] = "hidden"

        const { left, top, right, bottom, x, y, width, height } = document.body.getBoundingClientRect()
        const drawingCanvas = document.createElement("canvas")
        drawingCanvas.id = "drawingCanvas"
        drawingCanvas.style["position"] = "fixed";
        drawingCanvas.style["top"] = "0px";
        drawingCanvas.style["left"] = "0px";
        drawingCanvas.style["background"] = "rgba(0, 0, 0, 0.1)";
        drawingCanvas.style["z-index"] = "100000";

        // Context for the canvas for 2 dimensional operations
        const ctx = drawingCanvas.getContext('2d');

        // Resizes the canvas to the available size of the window.
        function resize() {
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

            ctx.strokeStyle = 'red';

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

        const okbutton = createCaptureOkButton();
        okbutton.addEventListener("click", (e) => {
            console.log("---------ok--------------")

            okbutton.remove()
            cancelButton.remove()

            const { left, top, right, bottom, x, y, width, height } = document.body.getBoundingClientRect()

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

                let thumbnail = document.getElementById("thumbnail")
                thumbnail.src = canvas.toDataURL("image/png");
                thumbnailContainer.style["display"] = "block"
                feedbackContainer.style["visibility"] = "unset"
                captureButton.style["display"] = "none";
                recordButton.style["display"] = "none";

            });

            drawingCanvas.remove();
        })

        const cancelButton = createCaptureCancelButton()
        cancelButton.addEventListener("click", (e) => {
            drawingCanvas.remove()
            okCancelContainer.remove()
            feedbackContainer.style["visibility"] = "unset"
        })
        const okCancelContainer = createOkCancelContainer()
        okCancelContainer.appendChild(okbutton)
        okCancelContainer.appendChild(cancelButton)

        document.body.appendChild(okCancelContainer)
        document.body.appendChild(drawingCanvas)

    })

    const recordButton = createRecordScreenButton(recordScreen)
    recordButton.addEventListener("click", async () => {
        // hide input container
        feedbackContainer.style.display = "none";

        let stream = await startCapture();
        if (stream === null) {
            feedbackContainer.style.display = "block";
            return;
        }
        let mimeType = 'video/webm';
        let mediaRecorder = createRecorder(stream, mimeType);

        let ctlr = false;
        let shift = false;
        document.addEventListener('keypress', (event) => {
            var name = event.key;
            var code = event.code;
            if (code === "KeyX" && ctlr && shift) {
                mediaRecorder.stop();
                // Alert the key name and key code on keydown
                // console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
            }
        }, false);

        document.addEventListener('keydown', (event) => {
            var name = event.key;
            var code = event.code;
            if (name === 'Control') {
                // Do nothing.
                ctlr = true;
            }
            if (name === 'Shift') {
                // Do nothing.
                shift = true;
            }
            // if (event.ctrlKey) {
            //     console.log(`Combination of ctrlKey + ${name} \n Key code Value: ${code}`);
            // } else {
            //     console.log(`cdnl Key pressed ${name} \n Key code Value: ${code}`);
            // }
        }, false);
        // Add event listener on keyup
        document.addEventListener('keyup', (event) => {
            var name = event.key;
            if (name === 'Control') {
                ctlr = false;
                // console.log('Control key released');
            }
            if (name === 'Shift') {
                shift = false;
                // console.log('Shift key released');
            }
            // if (name === 'Alt') {
            //     console.log('Alt key released');
            // }
        }, false);

        // After some time stop the recording by 
        setTimeout(() => {
            mediaRecorder.stop();
        }, 10000)
    })

    const feedbackButton = createFeedbackButton(position, customPositions)
    feedbackButton.addEventListener('click', (e) => {
        toggleWidget(position)
    })

    const buttonContainer = createButtonContainer()
    const thumbnailContainer = createThumbnailContainer()
    const thumbnail = createThumbnail()
    thumbnailContainer.appendChild(thumbnail)

    const thumbnailCancel = createThumbnailCancel()
    thumbnailCancel.addEventListener("click", (e) => {
        // remove captured image
        thumbnailContainer.style["display"] = "none"
        thumbnail.removeAttribute("src")
        formData.delete("screenshot")
        // console.log(document.getElementById("thumbnail"))
        // feedbackContainer.style["visibility"] = "unset"
        captureButton.style["display"] = "block"
        recordButton.style["display"] = "block"
    });
    thumbnail.addEventListener("click", (e) => {
        const modal = document.createElement("div")
        modal.style = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: #222;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0,0,0,0.8);
        `;
        const fullImg = document.createElement("img")
        fullImg.src = thumbnail.src
        fullImg.style = `
            max-width: 75%;
        `;

        const icon = document.createElement("span")
        // icon.setAttribute('class', "material-icons")
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>`;
        // icon.innerText = "close"
        icon.style = `
            position:absolute;
            top:50px;
            right:50px;
            cursor:pointer;
            color: #fff;
        `;
        icon.addEventListener("click", (e) => {
            modal.remove()
        })
        modal.appendChild(fullImg)
        modal.appendChild(icon)
        document.body.appendChild(modal)
    })
    thumbnailContainer.appendChild(thumbnailCancel);

    const videoContainer = createVideoContainer()
    const recordCancel = createRecordCancel()
    recordCancel.addEventListener("click", (e) => {
        document.getElementById("screenRecordVideo").remove()
        videoContainer.style["display"] = "none"
        formData.delete("recording")

        // feedbackContainer.style["visibility"] = "unset"
        captureButton.style["display"] = "block"
        recordButton.style["display"] = "block"
    });
    videoContainer.appendChild(recordCancel);

    buttonContainer.appendChild(thumbnailContainer)
    buttonContainer.appendChild(videoContainer)
    buttonContainer.appendChild(captureButton)
    buttonContainer.appendChild(recordButton)
    buttonContainer.appendChild(submitButton)
    
    inputContainer.appendChild(Object.assign(document.createElement('h1'), {
        innerText: headingText,
        style: `font-weight: 600;
        font-size: x-large;`
    }))
    if(takeEmail) {
        inputContainer.appendChild(emailInput)
    }
    inputContainer.appendChild(feedbackInput)
    inputContainer.appendChild(buttonContainer)
    inputContainer.appendChild(Object.assign(
        document.createElement('div'),
        {
            id: 'powered-by',
            innerHTML: `powered by <a href="https://okfeedback.io" style="color: blue;font-weight: 600;" target="_blank" >Okfeedback.io</a> </br>(Press Ctl + Shift + x to stop screen recording)`,
            style: `font-size: 10px;`
        }
    ))

    feedbackContainer.appendChild(inputContainer);
    feedbackContainer.appendChild(feedbackButton);

    const dFrag = document.createDocumentFragment();
    dFrag.appendChild(feedbackContainer);

    document.body.appendChild(dFrag);

}


function toggleWidget(position) {
    const inputContainer = document.getElementById("inputBox")
    // if (position === "left") {
    //     inputBox.animate([
    //         { opacity: 0, transform: 'translateX(-50%)' },
    //         { opacity: 1, transform: 'translateX(0)' }
    //     ], { duration: 300, easing: 'ease-in-out' })
    // }
    // if (position === "bottom") {
    //     inputBox.animate([
    //         { opacity: 0, transform: 'translateY(10%)' },
    //         { opacity: 1, transform: 'translateY(0)' }
    //     ], { duration: 300, easing: 'ease-in-out' })
    // }
    // if (position === "right") {
    //     inputBox.animate([
    //         { opacity: 0, transform: 'translateX(10%)' },
    //         { opacity: 1, transform: 'translateX(0)' }
    //     ], { duration: 300, easing: 'ease-in-out' })
    // }
    const feedbackButton = document.getElementById("feedbackButton")
    if (inputContainer.style.display === "flex") {
        inputContainer.style.display = "none";
        // feedbackButton.innerText = "Feedback"
        feedbackButton.style.display = "block"
        // document.normalize();
    }
    else if (inputContainer.style.display === "none") {
        inputContainer.style.display = "flex";
        // feedbackButton.innerText = "Hide me"
        feedbackButton.style.display = "none"
    }
}

function createCloseWidgetButton() {
    const icon = document.createElement("span")
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"  viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`;

    icon.setAttribute("id", "closeWidgetButton")
    // icon.setAttribute('class', "material-icons")
    // icon.innerText = "cancel"
    icon.style = `
        position:absolute;
        top:-8px;
        right:8px;
        cursor:pointer;
    `;
    return icon
}

function createFeedbackContainer(position) {
    const box = document.createElement("div");
    box.id = "feedbackWidget";
    // get option here    
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    let top = "42%";
    if (vw < 480) {
        top = "70%"
    } else if (vw < 1273) {
        top = "45%"
    }
    const bottomStyles = `
        position: fixed;
        bottom: 4px;
        left: 50%;
        box-shadow: rgba(0,0,0,0.35) 0 6px 100px 0;
        padding: 12px;
        background: #fff;
        z-index: 10000;
    `;
    const rightStyles = `
        position: fixed;
        right: 4px;
        top: ${top};
        box-shadow: rgba(0,0,0,0.35) 0 6px 100px 0;
        padding: 12px;
        background: rgb(255, 255, 255);
        z-index: 10000;
    `;
    const leftStyles = `
        position: fixed;
        left: 4px;
        top: 42%;
        box-shadow: rgba(0,0,0,0.35) 0 6px 100px 0;
        padding: 12px;
        background: rgb(255, 255, 255);
        z-index: 10000;
    `;
    if (position === "left") {
        box.style = leftStyles
    }
    if (position === "bottom") {
        box.style = bottomStyles
    }
    if (position === "right") {
        box.style = rightStyles
    }

    const closeButton = createCloseWidgetButton()
    closeButton.addEventListener("click", () => {
        toggleWidget(position)
    })
    box.appendChild(closeButton)
    return box
}


function createButtonContainer() {
    const box = document.createElement("div");
    box.id = "buttonContainer";
    box.style = `
        display:flex;
        flex-direction:row;
        gap:12px;
    `;
    return box
}

function createFeedbackInputContainer(position) {
    const inputBox = document.createElement("div");
    inputBox.id = "inputBox"
    inputBox.style = `
        display:none;
        flex-direction: column;
        gap:16px;
    `;
    return inputBox
}

function createFeedbackInputBox() {
    const input = document.createElement("textarea");
    input.id = "input"
    input.setAttribute("placeholder", "feedback...")
    // input.type = "text"
    input.style = `
        width: 100%;
        height: 100px;
        padding: 8px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;
        resize: none;
    `
    return input;
}

function createEmailInput() {
    const input = document.createElement("input");
    input.id = "email"
    input.type = "email"
    input.setAttribute("placeholder", "email...")
    input.style = `
        width: 100%;
        height: 48px;
        padding: 8px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;
        resize: none;
    `
    return input;
}

function createSubmitButton() {
    const submitButton = document.createElement("button");
    submitButton.id = "submitButton"
    submitButton.innerText = 'Submit';
    submitButton.style = `
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 6px 16px;
        text-align: center;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;   
        border-radius: 6px; 
        max-height: 48px;
    `;
    return submitButton
}
function createCaptureButton(takeScreenshot) {
    const captureButton = document.createElement("button");
    // <span class="material-icons">
    //     add_a_photo
    // </span>
    const icon = document.createElement("span")
    // icon.setAttribute('class', "material-icons")
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
  </svg>`
    // icon.innerText = "add_a_photo"
    captureButton.appendChild(icon);
    captureButton.id = "captureButton"
    captureButton.style = `
        cursor: pointer;
        padding: 8px 16px;
        border: 1px dashed #e3e3e3;
        display: ${(takeScreenshot) ? "block" : "none"};
    `;
    return captureButton
}
function createRecordScreenButton(recordScreen) {

    const screenRecordButton = document.createElement("button");
    // <span class="material-icons">
    //     add_a_photo
    // </span>
    const icon = document.createElement("span")
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
  </svg>`;
    // icon.setAttribute('class', "material-icons")
    // icon.innerText = "videocam"
    screenRecordButton.appendChild(icon);
    screenRecordButton.id = "recordScreenButton"
    screenRecordButton.style = `
        cursor: pointer;
        padding: 8px 16px;
        border: 1px dashed #e3e3e3;
        display: ${(recordScreen) ? "block" : "none"};
    `;
    return screenRecordButton
}
function createFeedbackButton(position, customPositions) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    let top = "42%";
    if (vw < 480) {
        top = "70%"
    } else if (vw < 1273) {
        top = "62%"
    }
    const button = document.createElement('button');
    button.innerText = 'Feedback';
    button.id = 'feedbackButton';
    const styles = `
        height: 45px;
        border: 1px solid rgb(221, 221, 221);
        background: rgb(51, 51, 51);
        width: 128px;
        font-weight: 600;
        color: white;
        text-align: center;
        position: fixed;
        z-index: 10000;
    `;
    const rightStyles = styles + `
        transform: rotate(-90deg);
        right: -45px;
        top: ${top};
    `;
    const bottomStyles = styles + `
        right: unset;
        top: unset;
        left: 50%;
        bottom: 0px;
    `;
    const leftStyles = styles + `
        transform: rotate(90deg);
        left: -45px;
        top: 42%;
    `;
    if (position === "left") button.style = leftStyles
    if (position === "bottom") button.style = bottomStyles
    if (position === "right") button.style = rightStyles
    return button
}
function createOkCancelContainer() {
    const box = document.createElement('div');
    box.id = "okCancelContainer";
    box.style = `
        display:flex;
        flex-direction:row;
        position: fixed;
        z-index:1000000;
        bottom: 10px;
        left: 50%;
    `
    return box
}
function createCaptureOkButton() {
    const okbutton = document.createElement('button');

    const icon = document.createElement("span")
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
  </svg>`
    // icon.setAttribute('class', "material-icons")
    // icon.innerText = "check"
    okbutton.appendChild(icon);

    // okbutton.innerText = 'OK';
    okbutton.id = 'okbutton';
    okbutton.style = `
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
        padding: 6px 12px;
        background: #fff;
    `
    return okbutton
}
function createCaptureCancelButton() {
    const cancelButton = document.createElement('button');

    const icon = document.createElement("span")
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
  </svg>`
    // icon.setAttribute('class', "material-icons")
    // icon.innerText = "close"
    cancelButton.appendChild(icon);

    // cancelButton.innerHTML = 'Cancel';
    cancelButton.id = 'cancelButton';
    cancelButton.style = `
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
        padding: 6px 12px;
        background: #fff;
    `
    return cancelButton
}
function createThumbnailContainer() {
    const box = document.createElement('div');
    box.id = "thumbnailContainer";
    box.style = `
        position:relative;
        display: none;
        border: 1px solid #ddd;
    `
    return box
}
function createThumbnail() {
    const thumbnail = document.createElement("img");
    thumbnail.id = "thumbnail";
    thumbnail.width = "100"
    // thumbnail.height = "50"
    thumbnail.style = `
        border-radius: 4px;
        padding: 5px;
    `;
    thumbnail.addEventListener("mouseenter", () => {
        thumbnail.style["opacity"] = "0.7"
        // thumbnail.style["transform"] = "scale(3)"
    })
    thumbnail.addEventListener("mouseleave", () => {
        thumbnail.style["opacity"] = "1"
        // thumbnail.style["transform"] = "scale(1)"
    })
    // thumbnail.style["display"] = "none"
    return thumbnail
}


function createThumbnailCancel() {
    const icon = document.createElement("span")
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`;
    // <i class="material-icons">add_circle</i>
    // icon.setAttribute('class', "material-icons")
    // icon.innerText = "cancel"
    icon.style = `
        position:absolute;
        top:0;
        right:0;
        cursor:pointer;
    `;
    return icon
}
function createVideoContainer() {
    const box = document.createElement('div');
    box.id = "videoContainer";
    box.style = `
        position: relative;
        display: none;
        border: 1px solid rgb(221, 221, 221);
        padding: 4px;
        border-radius: 4px;
    `
    return box
}
function createRecordCancel() {
    const icon = document.createElement("span")
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`;
    // <i class="material-icons">add_circle</i>
    // icon.setAttribute('class', "material-icons")
    // icon.innerText = "cancel"
    icon.style = `
        position:absolute;
        top:-8px;
        right:-8px;
        cursor:pointer;
    `;
    return icon
}

// ----- screen sharing -------
async function startCapture() {

    try {

        // Create a new CaptureController instance
        const controller = new CaptureController();

        // Prompt the user to share a tab, window, or screen.
        const stream = await navigator.mediaDevices.getDisplayMedia({
            controller,
            preferCurrentTab: true,
            audio: true,
            // video: true
            // audio: {
            //     echoCancellation: true,
            //     noiseSuppression: true,
            //     sampleRate: 44100,
            //     suppressLocalAudioPlayback: true,
            // },
            video: {
                mediaSource: "screen",
                // displaySurface: "window"
            },
            // selfBrowserSurface: "include"
            // selfBrowserSurface: "exclude",
            // surfaceSwitching: "include",
            // systemAudio: "exclude",
        })
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

        return stream

    } catch (error) {
        alert(error)
        return null
    }

}

function createRecorder(stream, mimeType) {
    // the stream data is stored in this array
    let recordedChunks = [];

    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }
    };
    mediaRecorder.onstop = function () {
        saveFile(recordedChunks);
        recordedChunks = [];
    };
    mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
    return mediaRecorder;
}


function saveFile(recordedChunks) {

    const blob = new Blob(recordedChunks, {
        type: 'video/webm'
    });
    recordingBlob = blob;
    let filename = makeid(15),
        downloadLink = document.createElement('a');

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.webm`;
    console.log(downloadLink)

    const video = document.createElement("video")
    video.id = "screenRecordVideo"
    video.width = "120"
    video.controls = "true"
    video.innerHTML = `
        <source src="${downloadLink.href}" type="video/webm" download="${downloadLink.download}" blob="${blob}">
        Your browser does not support the video tag.
    `;
    document.getElementById("feedbackWidget").style["display"] = "block"
    const videoContainer = document.getElementById('videoContainer')
    videoContainer.style["display"] = "block"
    document.getElementById("captureButton").style["display"] = "none";
    document.getElementById("recordScreenButton").style["display"] = "none";
    document.getElementById("inputBox").style["display"] = "flex";
    // document.getElementById("feedbackButton").innerText = "Hide me"
    videoContainer.appendChild(video)

    // return downloadLink

    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // URL.revokeObjectURL(blob); // clear from memory
    // document.body.removeChild(downloadLink);
}
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
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

function fnBrowserDetect() {

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
    return browserName
}


loadWidget()