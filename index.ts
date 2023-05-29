import html2canvas from 'html2canvas';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}


// const box = `
// <div id='box'>
//   <button id='button-1'>Button</button>
// </div>`);
// document.document.body.innerHtml = box;

// show feedback button
// on click, open widget
// on click capture, show fixed canvas with buttons
// on click ok, show image that can be cancelled
// on click subit, send image+text to backend

let POSITION = "right";

const ICON_URL = "https://fonts.googleapis.com/icon?family=Material+Icons";

// window.addEventListener("scroll", () => {
//     // console.log(screen.height, screen.width, screen.pixelDepth, screen.availHeight, screen.availWidth, screen.colorDepth);
//     // console.log(document.scripts.length)
//     // console.log(document.body.offsetHeight, document.body.clientHeight, document.body.scrollTop)
//     // console.log(document.body.offsetWidth, document.body.clientWidth, document.body.scrollTop)
//     // const root = document.getElementById("root")
//     console.log(document.body.getBoundingClientRect())
// })

window.addEventListener('load', () => {

    document.head.innerHTML += `<link rel="stylesheet" href=${ICON_URL} />`;
    // console.log("---------window loaded--------------")
    const feedbackScript: HTMLScriptElement = document.getElementById("feddback-script") as HTMLScriptElement;
    if (!feedbackScript) {
        return;
    }

    const { customerId, position } = JSON.parse(feedbackScript.getAttribute("data-feedback-opts")!)
    if (!customerId) return;
    if (position) POSITION = position;


    const feedbackContainer = createFeedbackContainer(position)
    const inputContainer = createFeedbackInputContainer()
    const feedbackInput = createFeedbackInputBox();

    const submitButton = createSubmitButton();
    submitButton.addEventListener('click', (e) => {
        const feedbackText = feedbackInput.value
        const blobSrc = (document.getElementById("thumbnail") as HTMLImageElement).getAttribute("src");
        const blobType = "png"
        const blob = blobSrc;
        const clientEmail = "";

        console.log(feedbackText)
        console.log(blob)

        if (feedbackText || blob) {
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

            // fetch("https://s1koft5j5f.execute-api.ap-south-1.amazonaws.com/dev/feedback", {
            //     method: "POST",
            //     mode: "cors",
            //     // cache: "no-cache",
            //     // credentials: "same-origin",
            //     headers: {
            //         "Content-Type": "application/json",
            //         // 'Content-Type': 'application/x-www-form-urlencoded',
            //     },
            //     // redirect: "follow",
            //     // referrerPolicy: "no-referrer",
            //     body: JSON.stringify({
            //         "browser": fnBrowserDetect(),
            //         "userAgent": window.navigator.userAgent,
            //         "url": window.location.href,
            //         "clientEmail": "client@lpv.io",
            //         "text": feedbackText,
            //         "blobType": blobType,
            //         "blob": blob
            //     })
            // }).then((res) => console.log(res))
            //     .catch((e) => alert(e))

        }

    })


    const captureButton = createCaptureButton()
    captureButton.addEventListener("click", (e) => {

        // document.body.style["min-width"] = "fit-content"
        // document.body.style["min-height"] = "fit-content"

        feedbackContainer.style["visibility"] = "hidden"

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

        const drawingCanvas = document.createElement("canvas") as HTMLCanvasElement;
        drawingCanvas.setAttribute("id", "drawingCanvas");
        drawingCanvas.setAttribute("style", `
            position: fixed;
            top: 0px;
            left: 0px;
            background: rgba(0, 0, 0, 0.1);
            z-index: 100000000;
        `);
        // console.log("drawingCanvas", drawingCanvas.clientWidth, drawingCanvas.clientHeight)
        // drawingCanvas.style["position"] = "fixed";
        // drawingCanvas.style["top"] = "0px";
        // drawingCanvas.style["left"] = "0px";
        // drawingCanvas.style["background"] = "rgba(0, 0, 0, 0.1)";
        // drawingCanvas.style["z-index"] = Number(100000000);
        // drawingCanvas.setAttribute('height', window.innerHeight);
        // drawingCanvas.setAttribute('width', window.innerWidth);
        // drawingCanvas.style["height"] = "1200";
        // drawingCanvas.style["width"] = "700";
        // document.body.style["height"] = "100%";
        // document.body.style["overflow"] = "hidden";

        // https://www.geeksforgeeks.org/how-to-draw-with-mouse-in-html-5-canvas/
        // const canvas = document.querySelector('#canvas');

        // Context for the canvas for 2 dimensional operations
        const ctx = drawingCanvas.getContext('2d')!;

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
        function getPosition(event: any) {
            // console.log("getPosition", event)

            coord.x = event.clientX - drawingCanvas.offsetLeft;
            coord.y = event.clientY - drawingCanvas.offsetTop;
        }

        // The following functions toggle the flag to start
        // and stop drawing
        function startPainting(event: any) {
            // console.log("startPainting", event)
            paint = true;
            getPosition(event);
        }

        function stopPainting() {
            // console.log("stopPainting")
            paint = false;
        }

        function sketch(event: any) {
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

        const okbutton = createCaptureOkButton();
        okbutton.addEventListener("click", (e) => {
            okbutton.remove()
            cancelButton.remove()

            console.log("---------ok button--------------")
            // console.log("drawingCanvas width", document.getElementById("drawingCanvas").width)
            // console.log("drawingCanvas height", document.getElementById("drawingCanvas").height)

            // console.log("clientWidth", document.documentElement.clientWidth) // 1258
            // console.log("innerWidth", window.innerWidth) // 1275
            // // console.log("innerWidth", innerWidth, Math.abs(innerWidth), Math.floor(Math.abs(innerWidth)), Math.ceil(Math.abs(innerWidth)))
            // console.log("clientHeight", document.documentElement.clientHeight) // 970
            // console.log("innerHeight", window.innerHeight) // 986
            // // console.log("innerHeight", innerHeight, Math.abs(innerHeight), Math.floor(Math.abs(innerHeight)), Math.ceil(Math.abs(innerHeight)))

            // const { left, top, right, bottom, x, y, width, height } = document.body.getBoundingClientRect()
            // console.log("left", left, Math.abs(left), Math.floor(Math.abs(left)), Math.ceil(Math.abs(left)))
            // console.log("top", top, Math.abs(top), Math.floor(Math.abs(top)), Math.ceil(Math.abs(top)))
            // console.log("right", right, Math.abs(right), Math.floor(Math.abs(right)), Math.ceil(Math.abs(right)))
            // console.log("bottom", bottom, Math.abs(bottom), Math.floor(Math.abs(bottom)), Math.ceil(Math.abs(bottom)))
            // console.log("x", x, Math.abs(x), Math.floor(Math.abs(x)), Math.ceil(Math.abs(x)))
            // console.log("y", y, Math.abs(y), Math.floor(Math.abs(y)), Math.ceil(Math.abs(y)))
            // console.log("width", width, Math.abs(width), Math.floor(Math.abs(width)), Math.ceil(Math.abs(width)))
            // console.log("height", height, Math.abs(height), Math.floor(Math.abs(height)), Math.ceil(Math.abs(height)))

            // console.log("devicePixelRatio", window.devicePixelRatio)

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
            }).then(function (canvas: any) {
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
                // function convertCanvasToImage() {
                //     let image = new Image();

                //     const tempCanvas = document.createElement("canvas") as HTMLCanvasElement
                //     const tmpctx = tempCanvas.getContext("2d")!
                //     const { left, top, right, bottom, x: newX, y: newY, width: bodyWidth, height: bodyHeight } = document.body.getBoundingClientRect()
                //     // console.log(document.body.getBoundingClientRect())
                //     // tmpctx.drawImage(image, newX, newY, drawingCanvas.width, drawingCanvas.height, 0, 0, drawingCanvas.width, drawingCanvas.height);
                //     tmpctx.drawImage(data, newX, newY,);
                //     let img = new Image();
                //     img.src = tempCanvas.toDataURL("image/png")

                //     // image.setAttribute("height", "300")
                //     // image.setAttribute("width", "300")
                //     return img;
                // }

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

                // let image = new Image();
                // image.id = "canvas-img"
                // image.style = "margin-left: 0px;border: 1px solid blue;"
                let thumbnail = document.getElementById("thumbnail") as HTMLImageElement
                thumbnail.src = canvas.toDataURL("image/png");
                thumbnailContainer.style["display"] = "block"
                feedbackContainer.style["visibility"] = "unset"
                captureButton.style["display"] = "none";
                recordButton.style["display"] = "none";

                // image.width = Math.abs(window.innerWidth)
                // image.height = Math.abs(window.innerHeight)
                // image.src = canvas.toDataURL("image/png");
                // document.body.appendChild(image);
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
            // document.body.removeAttribute("style")
            // document.body.style["overflow"] = "hidden";
        })

        const cancelButton = createCaptureCancelButton()
        cancelButton.addEventListener("click", (e) => {
            // const element = document.getElementById("div-02");
            drawingCanvas.remove()
            okCancelContainer.remove()
            feedbackContainer.style["visibility"] = "unset"
            // okbutton.remove()
            // cancelButton.remove()
            // document.body.removeAttribute("style")
        })
        const okCancelContainer = createOkCancelContainer()
        okCancelContainer.appendChild(okbutton)
        okCancelContainer.appendChild(cancelButton)

        document.body.appendChild(okCancelContainer)
        document.body.appendChild(drawingCanvas)

    })

    const recordButton = createRecordScreenButton()
    recordButton.addEventListener("click", async () => {
        // hide input container
        inputContainer.style.display = "none";
        feedbackButton.innerText = "Feedback"

        let stream = await startCapture();
        let mimeType = 'video/webm';
        let mediaRecorder = createRecorder(stream, mimeType);

        // console.log("started")
        // const icon = document.createElement("span")
        // icon.setAttribute('class', "material-icons")
        // icon.innerText = "close"
        // icon.setAttribute("style", `
        //         position:fixed;
        //         top:50px;
        //         right:50px;
        //         cursor:pointer;
        //         color: #222;
        //     `);
        // icon.addEventListener("click", (e) => {
        //     mediaRecorder.stop();
        //     icon.remove()
        // })
        // document.body.appendChild(icon)


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

    const feedbackButton = createFeedbackButton(position)
    feedbackButton.addEventListener('click', (e) => {
        if (inputContainer.style.display === "flex") {
            inputContainer.style.display = "none";
            feedbackButton.innerText = "Feedback"
            // document.normalize();
        }
        else if (inputContainer.style.display === "none") {
            inputContainer.style.display = "flex";
            feedbackButton.innerText = "Hide me"
        }

        // const backdrop = document.createElement("div")
        // backdrop.style.height = "100vh"
        // backdrop.style.width = "100vw"
        // backdrop.style.position = "fixed"
        // backdrop.style.top = "0px"
        // backdrop.style.left = "0px"
        // backdrop.style.backgroundColor = "#222"
        // backdrop.style.opacity = "0.2"
    })


    const buttonContainer = createButtonContainer()
    const thumbnailContainer = createThumbnailContainer()
    const thumbnail = createThumbnail()
    thumbnailContainer.appendChild(thumbnail)

    const thumbnailCancel = createThumbnailCancel()
    thumbnailCancel.addEventListener("click", (e) => {
        // remove captured image
        thumbnailContainer.style["display"] = "none"
        // feedbackContainer.style["visibility"] = "unset"
        captureButton.style["display"] = "block"
        recordButton.style["display"] = "block"
    });
    thumbnail.addEventListener("click", (e) => {
        const modal = document.createElement("div")
        modal.setAttribute("style", `
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
        `);
        const fullImg = document.createElement("img")
        fullImg.src = thumbnail.src
        fullImg.setAttribute("style", `
            max-width: 75%;
        `);

        const icon = document.createElement("span")
        icon.setAttribute('class', "material-icons")
        icon.innerText = "close"
        icon.setAttribute("style", `
            position:absolute;
            top:50px;
            right:50px;
            cursor:pointer;
            color: #fff;
        `);
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
        // remove captured video
        const video = document.getElementById("screenRecordVideo") as HTMLVideoElement;
        if (video) {
            video.remove();
        }
        // feedbackContainer.style["visibility"] = "unset"
        videoContainer.style["display"] = "none"
        captureButton.style["display"] = "block"
        recordButton.style["display"] = "block"
    });
    videoContainer.appendChild(recordCancel);

    buttonContainer.appendChild(thumbnailContainer)
    buttonContainer.appendChild(videoContainer)
    buttonContainer.appendChild(captureButton)
    buttonContainer.appendChild(recordButton)
    buttonContainer.appendChild(submitButton)

    inputContainer.appendChild(feedbackInput)
    inputContainer.appendChild(buttonContainer)
    inputContainer.appendChild(Object.assign(
        document.createElement('div'),
        {
            id: 'powered-by',
            innerHTML: `powered by <a href="#" >feedback</a> </br>(Press Ctl + Shift + x to stop screen recording)`,
            style: `font-size: 10px;`
        }
    ))

    feedbackContainer.appendChild(inputContainer);
    feedbackContainer.appendChild(feedbackButton);

    const dFrag = document.createDocumentFragment();
    dFrag.appendChild(feedbackContainer);

    document.body.appendChild(dFrag);

    // document.addEventListener('click', function (event) {
    //     var elem = document.getElementById('feedbackWidget');
    //     const outsideClick = !elem.contains(event.target);
    //     if (outsideClick) {
    //         inputContainer.style.display = "none";
    //     }
    // });

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


function createFeedbackContainer(position: "right" | "left" | "bottom") {
    const box = document.createElement("div");
    box.id = "feedbackWidget";
    // get option here
    const bottomStyles = `
        position: fixed;
        bottom: 50px;
        left: 50%;
        box-shadow: rgba(0,0,0,0.35) 0 6px 100px 0;
        padding: 12px;
        background: #fff;
        border-radius: 16px;
    `;
    const rightStyles = `
        position: fixed;
        right: 46px;
        top: 42%;
        box-shadow: rgba(0,0,0,0.35) 0 6px 100px 0;
        padding: 12px;
        background: rgb(255, 255, 255);
        border-radius: 16px;
    `;
    const leftStyles = `
        position: fixed;
        left: 50px;
        top: 42%;
        box-shadow: rgba(0,0,0,0.35) 0 6px 100px 0;
        padding: 12px;
        background: rgb(255, 255, 255);
        border-radius: 16px;
    `;
    if (position === "left") {
        box.setAttribute("style", leftStyles)
    }
    if (position === "bottom") {
        box.setAttribute("style", bottomStyles)
    }
    if (position === "right") {
        box.setAttribute("style", rightStyles)
    }

    return box
}


function createButtonContainer() {
    const box = document.createElement("div");
    box.id = "buttonContainer";
    // const setAttribute("style", `
    // display:flex;
    // flex-direction:row;
    // gap:12px;
    // `);
    box.setAttribute("style", `
        display:flex;
        flex-direction:row;
        gap:12px;
    `);
    return box
}

function createFeedbackInputContainer() {
    const inputBox = document.createElement("div");
    inputBox.id = "inputBox"
    // const setAttribute("style", `
    //     display:none;
    //     flex-direction: column;
    //     gap:16px;
    // `);
    inputBox.setAttribute("style", `
        display:none;
        flex-direction: column;
        gap:16px;
    `);
    return inputBox
}

function createFeedbackInputBox() {
    const input = document.createElement("textarea");
    input.id = "input"
    // input.type = "text"
    input.setAttribute("style", `
        width: 100%;
        height: 100px;
        padding: 8px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;
        resize: none;
    `);
    return input;
}

function createSubmitButton() {
    const submitButton = document.createElement("button");
    submitButton.id = "submitButton"
    submitButton.innerText = 'Submit';
    submitButton.setAttribute("style", `
        border: none;
        color: white;
        padding: 8px 12px;
        font-size: 16px;
        cursor: pointer;
        height: 50px;
        background-color: #04AA6D;
    `);
    return submitButton
}
function createCaptureButton() {
    const captureButton = document.createElement("button");
    // <span class="material-icons">
    //     add_a_photo
    // </span>
    const icon = document.createElement("span")
    icon.setAttribute('class', "material-icons")
    icon.innerText = "add_a_photo"
    captureButton.appendChild(icon);
    captureButton.id = "captureButton"
    captureButton.setAttribute("style", `
        cursor: pointer;
        padding: 8px 16px;
        border: 1px dashed #e3e3e3;
    `);
    return captureButton
}
function createRecordScreenButton() {

    const screenRecordButton = document.createElement("button");
    // <span class="material-icons">
    //     add_a_photo
    // </span>
    const icon = document.createElement("span")
    icon.setAttribute('class', "material-icons")
    icon.innerText = "videocam"
    screenRecordButton.appendChild(icon);
    screenRecordButton.id = "recordScreenButton"
    screenRecordButton.setAttribute("style", `
        cursor: pointer;
        padding: 8px 16px;
        border: 1px dashed #e3e3e3;
    `);
    return screenRecordButton
}
function createFeedbackButton(position: "right" | "left" | "bottom") {
    const button = document.createElement('button');
    button.innerText = 'Feedback';
    button.id = 'feedbackButton';
    const rightStyles = `
        height: 45px;
        border: 1px solid rgb(221, 221, 221);
        background: rgb(51, 51, 51);
        width: 120px;
        font-weight: 600;
        color: white;
        transform: rotate(-90deg);
        text-align: center;
        position: fixed;
        right: -45px;
        top: 50%;
    `;
    const bottomStyles = `
        height: 45px;
        border: 1px solid rgb(221, 221, 221);
        background: rgb(51, 51, 51);
        width: 120px;
        font-weight: 600;
        color: white;
        text-align: center;
        position: fixed;
        right: unset;
        top: unset;
        left: 50%;
        bottom: 0px;
    `;
    const leftStyles = `
        height: 45px;
        border: 1px solid rgb(221, 221, 221);
        background: rgb(51, 51, 51);
        width: 120px;
        font-weight: 600;
        color: white;
        transform: rotate(90deg);
        text-align: center;
        position: fixed;
        left: -45px;
        top: 50%;
    `;
    if (position === "left") button.setAttribute("style", leftStyles);
    if (position === "bottom") button.setAttribute("style", bottomStyles);
    if (position === "right") button.setAttribute("style", rightStyles);
    return button
}
function createOkCancelContainer() {
    const box = document.createElement('div');
    box.id = "okCancelContainer";
    box.setAttribute("style", `
        display:flex;
        flex-direction:row;
        position: fixed;
        z-index:10000000000;
        bottom: 10px;
        left: 50%;
    `);
    return box
}
function createCaptureOkButton() {
    const okbutton = document.createElement('button');

    const icon = document.createElement("span")
    icon.setAttribute('class', "material-icons")
    icon.innerText = "check"
    okbutton.appendChild(icon);

    // okbutton.innerText = 'OK';
    okbutton.id = 'okbutton';
    okbutton.setAttribute("style", `
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
        padding: 6px 12px;
        background: #fff;
    `);
    return okbutton
}
function createCaptureCancelButton() {
    const cancelButton = document.createElement('button');

    const icon = document.createElement("span")
    icon.setAttribute('class', "material-icons")
    icon.innerText = "close"
    cancelButton.appendChild(icon);

    // cancelButton.innerHTML = 'Cancel';
    cancelButton.id = 'cancelButton';
    cancelButton.setAttribute("style", `
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
        padding: 6px 12px;
        background: #fff;
    `);
    return cancelButton
}
function createThumbnailContainer() {
    const box = document.createElement('div');
    box.id = "thumbnailContainer";
    box.setAttribute("style", `
        position:relative;
        display: none;
        border: 1px solid #ddd;
    `);
    return box
}
function createThumbnail() {
    const thumbnail = document.createElement("img");
    thumbnail.id = "thumbnail";
    thumbnail.width = 100
    // thumbnail.height = "50"
    thumbnail.setAttribute("style", `
        border-radius: 4px;
        padding: 5px;
    `);
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
    // <i class="material-icons">add_circle</i>
    icon.setAttribute('class', "material-icons")
    icon.innerText = "cancel"
    icon.setAttribute("style", `
        position:absolute;
        top:0;
        right:0;
        cursor:pointer;
    `);
    return icon
}
function createVideoContainer() {
    const box = document.createElement('div');
    box.id = "videoContainer";
    box.setAttribute("style", `
        position: relative;
        display: none;
        border: 1px solid rgb(221, 221, 221);
        padding: 4px;
        border-radius: 4px;
    `);
    return box
}
function createRecordCancel() {
    const icon = document.createElement("span")
    // <i class="material-icons">add_circle</i>
    icon.setAttribute('class', "material-icons")
    icon.innerText = "cancel"
    icon.setAttribute("style", `
        position:absolute;
        top:-8px;
        right:-8px;
        cursor:pointer;
    `);
    return icon
}

// ----- screen sharing -------
async function startCapture() {

    // Create a new CaptureController instance
    const controller = new CaptureController();

    // Prompt the user to share a tab, window, or screen.
    const stream = await navigator.mediaDevices
        .getDisplayMedia({
            controller,
            preferCurrentTab: true,
            audio: false,
            // audio: {
            //     echoCancellation: true,
            //     noiseSuppression: true,
            //     sampleRate: 44100,
            //     suppressLocalAudioPlayback: true,
            // },
            video: true,
            // video: {
            //     mediaSource: "screen",
            //     // displaySurface: "window"
            // },
            selfBrowserSurface: "include"
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

}

function createRecorder(stream: any, mimeType: string) {
    // the stream data is stored in this array
    let recordedChunks: any[] = [];

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


function saveFile(recordedChunks: string[]) {

    const blob = new Blob(recordedChunks, {
        type: 'video/webm'
    });
    let filename = makeid(15),
        downloadLink = document.createElement('a');

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.webm`;
    console.log(downloadLink)

    const video = document.createElement("video")
    video.id = "screenRecordVideo"
    video.width = 120
    video.controls = true
    video.innerHTML = `
        <source src="${downloadLink}" type="video/webm">
        Your browser does not support the video tag.
    `;
    const videoContainer = document.getElementById('videoContainer') as HTMLDivElement
    videoContainer.style["display"] = "block"

    document.getElementById("captureButton")!.style["display"] = "none";
    document.getElementById("recordScreenButton")!.style["display"] = "none";
    document.getElementById("inputBox")!.style["display"] = "flex";
    document.getElementById("feedbackButton")!.innerText = "Hide me"
    videoContainer.appendChild(video)

    // return downloadLink

    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // URL.revokeObjectURL(blob); // clear from memory
    // document.body.removeChild(downloadLink);
}
function makeid(length: any) {
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

// function cropImage({
//     canvas,
//     imagePath,
//     newX,
//     newY,
//     newWidth,
//     newHeight
// }) {
//     const originalImage = new Image();
//     originalImage.src = imagePath;
//     // const canvas = document.getElementById('canvas');
//     const ctx = canvas.getContext('2d');
//     originalImage.addEventListener('load', function () {

//         const originalWidth = originalImage.naturalWidth;
//         const originalHeight = originalImage.naturalHeight;
//         const aspectRatio = originalWidth / originalHeight;
//         if (newHeight === undefined) {
//             newHeight = newWidth / aspectRatio;
//         }
//         canvas.width = newWidth;
//         canvas.height = newHeight;

//         ctx.drawImage(originalImage, newX, newY, newWidth, newHeight, 0, 0, newWidth, newHeight);
//         // downloadImage(downloadName);
//     });
// }

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
