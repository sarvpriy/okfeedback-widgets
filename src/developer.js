"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var html2canvas_1 = require("html2canvas");
var recordingBlob = null;
var recordingType = "video/webm";
var TOP = "50%";
var DeveloperFeedbackWidget = /** @class */ (function () {
    function DeveloperFeedbackWidget(_a) {
        var widgetPosition = _a.widgetPosition, widgetButtonStyle = _a.widgetButtonStyle, headingText = _a.headingText, greetingMessage = _a.greetingMessage, takeEmail = _a.takeEmail, 
        // customerId,
        takeScreenshot = _a.takeScreenshot, recordScreen = _a.recordScreen;
        console.log("constructor", {
            widgetPosition: widgetPosition,
            headingText: headingText,
            greetingMessage: greetingMessage,
            takeEmail: takeEmail,
            // customerId,
            takeScreenshot: takeScreenshot,
            recordScreen: recordScreen,
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
    DeveloperFeedbackWidget.prototype.initializeFormData = function () {
        console.log("initializeFormData");
        this.formData = new FormData();
        // Populate the FormData object with values
        var formDataValues = {
            // customerId,
            browser: this.fnBrowserDetect(),
            userAgent: window.navigator.userAgent,
        };
        // Append the values to the FormData object
        for (var key in formDataValues) {
            if (formDataValues.hasOwnProperty(key)) {
                this.formData.append(key, formDataValues[key]);
            }
        }
    };
    DeveloperFeedbackWidget.prototype.init = function () {
        console.log("init");
        this.createFeedbackContainer();
        this.createFeedbackForm();
        this.feedbackContainer.appendChild(this.createPoweredByElement());
    };
    DeveloperFeedbackWidget.prototype.createFeedbackContainer = function () {
        var _this = this;
        console.log("createFeedbackContainer");
        this.feedbackContainer = document.createElement("div");
        this.feedbackContainer.id = "feedbackWidget";
        var closeButton = this.createCloseWidgetButton();
        closeButton.addEventListener("click", function () {
            _this.toggleFeedbackContainer();
        });
        this.feedbackContainer.appendChild(closeButton);
        this.setFeedbackContainerStyles();
        document.body.appendChild(this.feedbackContainer);
    };
    DeveloperFeedbackWidget.prototype.setFeedbackContainerStyles = function () {
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
            this.feedbackContainer.style.top = "45%";
        }
        if (this.widgetPosition === "bottom") {
            this.feedbackContainer.style.left = "50%";
            this.feedbackContainer.style.bottom = "0px";
        }
    };
    DeveloperFeedbackWidget.prototype.createCloseWidgetButton = function () {
        var icon = document.createElement("span");
        icon.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\"  viewBox=\"0 0 16 16\"><path d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z\"/></svg>";
        icon.setAttribute("id", "closeWidgetButton");
        // icon.setAttribute('class', "material-icons")
        // icon.innerText = "cancel"
        icon.style.position = "absolute";
        icon.style.top = "-8px";
        icon.style.right = "8px";
        icon.style.cursor = "pointer";
        return icon;
    };
    DeveloperFeedbackWidget.prototype.createFeedbackForm = function () {
        var feedbackForm = this.createFeedbackFormElement(); // form container
        var feedbackTextarea = this.createFeedbackTextarea(); // form textarea
        var buttonContainer = this.createButtonContainer(); // buttons container
        console.log(this.takeScreenshot);
        if (this.takeScreenshot) {
            var captureContainer = this.createCaptureBox();
            buttonContainer.appendChild(captureContainer);
        }
        if (this.recordScreen) {
            var screenRecordContainer = this.createRecordScreenBox();
            buttonContainer.appendChild(screenRecordContainer);
        }
        var submitBtn = this.createSubmitButton(); // submit button
        buttonContainer.appendChild(submitBtn);
        feedbackForm.appendChild(feedbackTextarea);
        feedbackForm.appendChild(buttonContainer);
        this.feedbackContainer.appendChild(feedbackForm);
    };
    DeveloperFeedbackWidget.prototype.createFeedbackFormElement = function () {
        var feedbackForm = document.createElement("form");
        feedbackForm.id = "feedbackForm";
        feedbackForm.style.display = "flex";
        feedbackForm.style.flexDirection = "column";
        feedbackForm.style.gap = "12px";
        feedbackForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission
        });
        return feedbackForm;
    };
    DeveloperFeedbackWidget.prototype.createFeedbackTextarea = function () {
        var feedbackTextarea = document.createElement("textarea");
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
    };
    DeveloperFeedbackWidget.prototype.createSubmitButton = function () {
        var _this = this;
        var submitBtn = document.createElement("button");
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
        submitBtn.addEventListener("click", function () {
            return _this.handleSubmitButtonClick(submitBtn);
        });
        return submitBtn;
    };
    DeveloperFeedbackWidget.prototype.createButtonContainer = function () {
        var buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.justifyContent = "space-between";
        return buttonContainer;
    };
    DeveloperFeedbackWidget.prototype.createCaptureBox = function () {
        var _this = this;
        var captureContainer = document.createElement("div");
        captureContainer.id = "captureContainer";
        this.captureButton = document.createElement("button");
        var icon = document.createElement("span");
        icon.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\n        <path d=\"M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z\"/>\n        <path d=\"M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z\"/>\n      </svg>";
        // icon.innerText = "add_a_photo"
        this.captureButton.appendChild(icon);
        this.captureButton.id = "captureButton";
        this.captureButton.style.cursor = "pointer";
        this.captureButton.style.padding = "8px 16px";
        this.captureButton.style.border = "1px dashed #e3e3e3";
        this.captureButton.style.display = "block";
        this.captureButton.addEventListener("click", function () {
            return _this.handleCaptureButtonClick();
        });
        this.createThumbnailBox();
        captureContainer.appendChild(this.captureButton);
        captureContainer.appendChild(this.thumbnailContainer);
        return captureContainer;
    };
    DeveloperFeedbackWidget.prototype.createThumbnailBox = function () {
        var _this = this;
        this.thumbnailContainer = document.createElement("div");
        this.thumbnailContainer.id = "thumbnailContainer";
        this.thumbnailContainer.style.position = "relative";
        this.thumbnailContainer.style.display = "none";
        this.thumbnailContainer.style.border = "1px solid #ddd";
        this.thumbnail = document.createElement("img");
        this.thumbnail.id = "thumbnail";
        this.thumbnail.style.width = "100px";
        this.thumbnail.style.borderRadius = "4px";
        this.thumbnail.style.padding = "5px";
        this.thumbnail.addEventListener("click", function (e) {
            return _this.showCapturedImage(_this.thumbnail.src);
        });
        this.thumbnailContainer.appendChild(this.thumbnail);
        var thumbnailCancelIcon = document.createElement("span");
        thumbnailCancelIcon.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\"  viewBox=\"0 0 16 16\"><path d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z\"/></svg>";
        // <i class="material-icons">add_circle</i>
        // icon.setAttribute('class', "material-icons")
        // icon.innerText = "cancel"
        thumbnailCancelIcon.style.position = "absolute";
        thumbnailCancelIcon.style.top = "0";
        thumbnailCancelIcon.style.right = "0";
        thumbnailCancelIcon.style.cursor = "pointer";
        thumbnailCancelIcon.addEventListener("click", function (e) {
            // remove captured image
            if (_this.thumbnailContainer) {
                // code that uses this.thumbnailContainer
                _this.thumbnailContainer.style.display = "none";
            }
            if (_this.thumbnail) {
                _this.thumbnail.removeAttribute("src");
            }
            _this.formData.delete("screenshot");
            // console.log(document.getElementById("thumbnail"))
            // feedbackContainer.style["visibility"] = "unset"
            _this.captureButton.style["display"] = "block";
            _this.recordButton.style["display"] = "block";
        });
    };
    DeveloperFeedbackWidget.prototype.showCapturedImage = function (src) {
        var modal = document.createElement("div");
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
        var fullImg = document.createElement("img");
        fullImg.src = src;
        fullImg.style.maxWidth = "75%";
        var icon = document.createElement("span");
        // icon.setAttribute('class', "material-icons")
        icon.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z\"/></svg>";
        // icon.innerText = "close"
        icon.style.position = "absolute";
        icon.style.top = "50px";
        icon.style.right = "50px";
        icon.style.cursor = "pointer";
        icon.style.color = "#fff";
        icon.addEventListener("click", function (e) {
            modal.remove();
        });
        modal.appendChild(fullImg);
        modal.appendChild(icon);
        document.body.appendChild(modal);
    };
    DeveloperFeedbackWidget.prototype.handleCaptureButtonClick = function () {
        var _this = this;
        this.feedbackContainer.style.visibility = "hidden";
        var _a = document.body.getBoundingClientRect(), left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        this.drawingCanvas = document.createElement("canvas");
        this.drawingCanvas.id = "drawingCanvas";
        this.drawingCanvas.style.position = "fixed";
        this.drawingCanvas.style.top = "0px";
        this.drawingCanvas.style.left = "0px";
        this.drawingCanvas.style.background = "rgba(0, 0, 0, 0.1)";
        this.drawingCanvas.style.zIndex = "100000";
        // Context for the canvas for 2 dimensional operations
        var ctx = this.drawingCanvas.getContext("2d");
        // Resizes the canvas to the available size of the window.
        function resize() {
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
        }
        // This is the flag that we are going to use to
        // trigger drawing
        var coord = { x: 0, y: 0 };
        var paint = false;
        // Stores the initial position of the cursor
        // Updates the coordianates of the cursor when
        // an event e is triggered to the coordinates where
        // the said event is triggered.
        var getPosition = function (event) {
            coord.x = event.clientX - _this.drawingCanvas.offsetLeft;
            coord.y = event.clientY - _this.drawingCanvas.offsetTop;
        };
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
            if (!paint)
                return;
            ctx.beginPath();
            ctx.lineWidth = 5;
            // Sets the end of the lines drawn
            // to a round shape.
            ctx.lineCap = "round";
            ctx.strokeStyle = "red";
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
    };
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
    DeveloperFeedbackWidget.prototype.createOkButton = function () {
        var _this = this;
        var okbutton = document.createElement("button");
        var icon = document.createElement("span");
        icon.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-check-lg\" viewBox=\"0 0 16 16\">\n            <path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/>\n        </svg>";
        okbutton.appendChild(icon);
        okbutton.id = "okbutton";
        okbutton.style.boxShadow = "0px 4px 24px rgba(0, 0, 0, 0.1)";
        okbutton.style.padding = "6px 12px";
        okbutton.style.background = "#fff";
        okbutton.addEventListener("click", function (e) {
            console.log("---------ok--------------");
            _this.okCancelContainer.remove();
            var _a = document.body.getBoundingClientRect(), left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
            (0, html2canvas_1.default)(document.body, {
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
                console.log("---------html2canvas--------------");
                // let thumbnail = document.getElementById("thumbnail")
                _this.thumbnail.src = canvas.toDataURL("image/png");
                _this.thumbnailContainer.style.display = "block";
                _this.feedbackContainer.style.visibility = "unset";
                // this.captureButton!.style.display = "none";
                // this.recordButton!.style.display = "none";
            });
            _this.drawingCanvas.remove();
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
    };
    DeveloperFeedbackWidget.prototype.createCancelButton = function () {
        var _this = this;
        var cancelButton = document.createElement("button");
        var cancelicon = document.createElement("span");
        cancelicon.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-x-lg\" viewBox=\"0 0 16 16\">\n            <path d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z\"/>\n        </svg>";
        cancelButton.appendChild(cancelicon);
        cancelButton.id = "cancelButton";
        cancelButton.style.boxShadow = "0px 4px 24px rgba(0, 0, 0, 0.1)";
        cancelButton.style.padding = "6px 12px";
        cancelButton.style.background = "#fff";
        cancelButton.addEventListener("click", function (e) {
            _this.drawingCanvas.remove();
            _this.okCancelContainer.remove();
            _this.feedbackContainer.style.visibility = "unset";
        });
        return cancelButton;
        // this.cancelButton.addEventListener("click", (e: any) => {
        //     this.drawingCanvas.remove();
        //     this.okCancelContainer!.remove();
        //     this.feedbackContainer.style.visibility = "unset";
        // });
        // this.okCancelContainer!.appendChild(this.cancelButton);
    };
    DeveloperFeedbackWidget.prototype.createOkCancelContainer = function () {
        var okCancelContainer = document.createElement("div");
        okCancelContainer.id = "okCancelContainer";
        okCancelContainer.style.display = "flex";
        okCancelContainer.style.flexDirection = "row";
        okCancelContainer.style.position = "fixed";
        okCancelContainer.style.zIndex = "1000000";
        okCancelContainer.style.bottom = "10px";
        okCancelContainer.style.left = "50%";
        return okCancelContainer;
    };
    DeveloperFeedbackWidget.prototype.createDrawingCanvas = function () {
        var drawingCanvas = document.createElement("canvas");
        drawingCanvas.id = "drawingCanvas";
        drawingCanvas.style.position = "fixed";
        drawingCanvas.style.top = "0px";
        drawingCanvas.style.left = "0px";
        drawingCanvas.style.background = "rgba(0, 0, 0, 0.1)";
        drawingCanvas.style.zIndex = "100000";
        return drawingCanvas;
    };
    DeveloperFeedbackWidget.prototype.setupDrawingCanvas = function (drawingCanvas) {
        var ctx = drawingCanvas.getContext("2d");
        var resize = function () {
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);
    };
    DeveloperFeedbackWidget.prototype.setupDrawingEvents = function (drawingCanvas) {
        var coord = { x: 0, y: 0 };
        var paint = false;
        var getPosition = function (event) {
            coord.x = event.clientX - drawingCanvas.offsetLeft;
            coord.y = event.clientY - drawingCanvas.offsetTop;
        };
        var startPainting = function (event) {
            paint = true;
            getPosition(event);
        };
        var stopPainting = function () {
            paint = false;
        };
        var sketch = function (event) {
            if (!paint)
                return;
            var ctx = drawingCanvas.getContext("2d");
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
    };
    DeveloperFeedbackWidget.prototype.toggleFeedbackContainer = function () {
        if (this.feedbackContainer.style.display === "none") {
            this.feedbackContainer.style.display = "flex";
        }
        else {
            this.feedbackContainer.style.display = "none";
        }
    };
    DeveloperFeedbackWidget.prototype.createRecordScreenBox = function () {
        var _this = this;
        var screenRecordContainer = document.createElement("div");
        screenRecordContainer.id = "screenRecordContainer";
        this.recordButton = document.createElement("button");
        var icon = document.createElement("span");
        icon.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\n        <path fill-rule=\"evenodd\" d=\"M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z\"/>\n    </svg>";
        // icon.setAttribute('class', "material-icons")
        // icon.innerText = "videocam"
        this.recordButton.appendChild(icon);
        this.recordButton.id = "recordScreenButton";
        this.recordButton.style.cursor = "pointer";
        this.recordButton.style.padding = "8px 16px";
        this.recordButton.style.border = "1px dashed #e3e3e3";
        this.recordButton.style.display = "block";
        this.recordButton.addEventListener("click", function () {
            return _this.handleRecordButtonClick();
        });
        screenRecordContainer.appendChild(this.recordButton);
        this.videoContainer = this.createVideoContainer();
        var recordCancel = this.createRecordCancel();
        recordCancel.addEventListener("click", function (e) {
            document.getElementById("screenRecordVideo").remove();
            _this.videoContainer.style.display = "none";
            _this.formData.delete("recording");
            // feedbackContainer.style["visibility"] = "unset"
            _this.captureButton.style["display"] = "block";
            _this.recordButton.style["display"] = "block";
        });
        this.videoContainer.appendChild(recordCancel);
        screenRecordContainer.appendChild(this.videoContainer);
        return screenRecordContainer;
        // return screenRecordButton
    };
    DeveloperFeedbackWidget.prototype.handleRecordButtonClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stream, mimeType, mediaRecorder, ctlr, shift;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // hide input container
                        this.toggleFeedbackContainer();
                        return [4 /*yield*/, this.startCapture()];
                    case 1:
                        stream = _a.sent();
                        if (stream === null) {
                            this.toggleFeedbackContainer();
                            return [2 /*return*/];
                        }
                        mimeType = "video/webm";
                        mediaRecorder = this.createRecorder(stream, mimeType);
                        ctlr = false;
                        shift = false;
                        document.addEventListener("keypress", function (event) {
                            var name = event.key;
                            var code = event.code;
                            if (code === "KeyX" && ctlr && shift) {
                                mediaRecorder.stop();
                                // Alert the key name and key code on keydown
                                // console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
                            }
                        }, false);
                        document.addEventListener("keydown", function (event) {
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
                        }, false);
                        // Add event listener on keyup
                        document.addEventListener("keyup", function (event) {
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
                        }, false);
                        // After some time stop the recording by
                        setTimeout(function () {
                            mediaRecorder.stop();
                        }, 10000);
                        return [2 /*return*/];
                }
            });
        });
    };
    DeveloperFeedbackWidget.prototype.createVideoContainer = function () {
        var box = document.createElement("div");
        box.id = "videoContainer";
        box.style.position = "relative";
        box.style.display = "none";
        box.style.border = "1px solid rgb(221, 221, 221)";
        box.style.padding = "4px";
        box.style.borderRadius = "4px";
        return box;
    };
    DeveloperFeedbackWidget.prototype.createRecordCancel = function () {
        var icon = document.createElement("span");
        icon.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\"  viewBox=\"0 0 16 16\"><path d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z\"/></svg>";
        // <i class="material-icons">add_circle</i>
        // icon.setAttribute('class', "material-icons")
        // icon.innerText = "cancel"
        icon.style.position = "absolute";
        icon.style.top = "-8px";
        icon.style.right = "-8px";
        icon.style.cursor = "pointer";
        return icon;
    };
    DeveloperFeedbackWidget.prototype.startCapture = function () {
        return __awaiter(this, void 0, void 0, function () {
            var controller, stream, track, displaySurface, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        controller = new CaptureController();
                        return [4 /*yield*/, navigator.mediaDevices.getDisplayMedia({
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
                            })];
                    case 1:
                        stream = _a.sent();
                        track = stream.getVideoTracks()[0];
                        displaySurface = track.getSettings().displaySurface;
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
                        }
                        else if (displaySurface == "window") {
                            // Do not move focus to the captured window.
                            // Keep the capturing page focused.
                            controller.setFocusBehavior("no-focus-change");
                        }
                        return [2 /*return*/, stream];
                    case 2:
                        error_1 = _a.sent();
                        alert(error_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeveloperFeedbackWidget.prototype.createRecorder = function (stream, mimeType) {
        var _this = this;
        // the stream data is stored in this array
        var recordedChunks = [];
        var mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function (e) {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        };
        mediaRecorder.onstop = function () {
            var downloadLink = _this.saveFile(recordedChunks);
            recordedChunks = [];
            _this.toggleFeedbackContainer();
            _this.addVideoToContainer(downloadLink);
        };
        mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
        return mediaRecorder;
    };
    DeveloperFeedbackWidget.prototype.saveFile = function (recordedChunks) {
        var blob = new Blob(recordedChunks, {
            type: "video/webm",
        });
        // let : any: any = blob;
        var filename = this.makeid(15), downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "".concat(filename, ".webm");
        console.log(downloadLink);
        return downloadLink;
        // return downloadLink
        // document.body.appendChild(downloadLink);
        // downloadLink.click();
        // URL.revokeObjectURL(blob); // clear from memory
        // document.body.removeChild(downloadLink);
    };
    DeveloperFeedbackWidget.prototype.addVideoToContainer = function (downloadLink) {
        var video = document.createElement("video");
        video.id = "screenRecordVideo";
        video.width = 120;
        video.controls = true;
        video.innerHTML = "\n            <source src=\"".concat(downloadLink.href, "\" type=\"video/webm\" download=\"").concat(downloadLink.download, "\">\n            Your browser does not support the video tag.\n        ");
        // let videoContainer = document.getElementById('videoContainer')
        this.videoContainer.style.display = "block";
        this.captureButton.style.display = "none";
        this.recordButton.style.display = "none";
        this.feedbackContainer.style.display = "flex";
        // document.getElementById("captureButton")!.style["display"] = "none";
        // document.getElementById("recordScreenButton")!.style["display"] = "none";
        // document.getElementById("inputBox")!.style["display"] = "flex";
        // document.getElementById("feedbackButton").innerText = "Hide me"
        this.videoContainer.appendChild(video);
    };
    DeveloperFeedbackWidget.prototype.toggle = function () {
        var _this = this;
        console.log("toggle");
        var from, to;
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
            this.feedbackContainer.animate([
                { opacity: 1, transform: to },
                { opacity: 0, transform: from },
            ], { duration: 300, easing: "ease-in-out" });
            setTimeout(function () {
                _this.feedbackContainer.style.display = "none";
            }, 300);
            // feedbackButton.innerText = "Feedback"
            // feedbackButton.style.display = "block"
            // document.normalize();
        }
        else if (this.feedbackContainer.style.display === "none") {
            this.feedbackContainer.animate([
                { opacity: 0, transform: from },
                { opacity: 1, transform: to },
            ], { duration: 300, easing: "ease-in-out" });
            this.feedbackContainer.style.display = "flex";
            this.feedbackContainer.style.flexDirection = "column";
            this.feedbackContainer.style.gap = "12px";
            // feedbackButton.innerText = "Hide me"
            // feedbackButton.style.display = "none"
        }
    };
    DeveloperFeedbackWidget.prototype.toggleSubmitNormalization = function (submitButton) {
        if (!submitButton.disabled) {
            submitButton.innerHTML = "Submit";
            submitButton.removeAttribute("disabled");
            submitButton.style.opacity = "1.0";
        }
        else {
            submitButton.innerHTML += "<i class=\"fa fa-spinner fa-spin\"></i>";
            submitButton.setAttribute("disabled", "true");
            submitButton.style.opacity = "0.6";
        }
    };
    DeveloperFeedbackWidget.prototype.handleSubmitButtonClick = function (submitButton) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var screenshotSrc, screenshotType, screenRecordVideo, recordingSrc, recordingName;
            return __generator(this, function (_b) {
                console.log("handleSubmitButtonClick", this.formData);
                this.toggleSubmitNormalization(submitButton);
                if (this.feedbackContainer.querySelector("textarea").value) {
                    this.formData.set("text", this.feedbackContainer.querySelector("textarea").value);
                }
                if (this.feedbackContainer.querySelector("textarea").value === "" &&
                    this.formData.get("text")) {
                    this.formData.delete("text");
                }
                screenshotSrc = (_a = this.thumbnail) === null || _a === void 0 ? void 0 : _a.getAttribute("src");
                if (screenshotSrc) {
                    this.formData.set("screenshot", screenshotSrc);
                    screenshotType = "png";
                }
                screenRecordVideo = this.videoContainer.querySelector("#screenRecordVideo");
                if (screenRecordVideo) {
                    recordingSrc = screenRecordVideo.getAttribute("src");
                    recordingName = screenRecordVideo
                        .querySelector("source")
                        .getAttribute("download");
                    if (recordingSrc) {
                        this.formData.set("recording", recordingBlob, "recordingName.webm");
                    }
                }
                if (this.formData.has("text") ||
                    this.formData.has("screenshot") ||
                    this.formData.has("recording")) {
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
                }
                else {
                    this.toggleSubmitNormalization(submitButton);
                    this.feedbackContainer.querySelector("textarea").focus();
                }
                return [2 /*return*/];
            });
        });
    };
    DeveloperFeedbackWidget.prototype.showThanksText = function () {
        var _this = this;
        console.log("showThanksText");
        var thanksText = document.createElement("p");
        thanksText.textContent = "Thanks for your feedback!";
        thanksText.style.opacity = "0";
        thanksText.style.transform = "translateX(100%)";
        thanksText.style.transition = "opacity 0.5s, transform 0.3s";
        thanksText.style.fontSize = "24px";
        thanksText.style.textAlign = "center";
        var currentHeight = this.feedbackContainer.clientHeight;
        var currentWidth = this.feedbackContainer.clientWidth;
        while (this.feedbackContainer.firstChild) {
            this.feedbackContainer.removeChild(this.feedbackContainer.firstChild);
        }
        this.feedbackContainer.appendChild(thanksText);
        this.feedbackContainer.style.height = "".concat(currentHeight, "px");
        this.feedbackContainer.style.width = "".concat(currentWidth, "px");
        this.feedbackContainer.style.display = "flex";
        this.feedbackContainer.style.justifyContent = "center";
        this.feedbackContainer.style.alignItems = "center";
        var closeButton = this.createCloseWidgetButton();
        closeButton.addEventListener("click", function () {
            _this.toggleFeedbackContainer();
            loadDeveloperFeedbackWidget();
        });
        this.feedbackContainer.appendChild(closeButton);
        setTimeout(function () {
            thanksText.style.opacity = "1";
            thanksText.style.transform = "translateX(0)";
        }, 100);
    };
    DeveloperFeedbackWidget.prototype.createPoweredByElement = function () {
        console.log("createPoweredByElement");
        var poweredByElement = document.createElement("div");
        poweredByElement.id = "powered-by";
        poweredByElement.innerHTML = "powered by <a href=\"https://www.okfeedback.io\" style=\"color: blue;font-weight: 600;\" target=\"_blank\" >Okfeedback.io</a> </br>(Press Ctl + Shift + x to stop screen recording)";
        poweredByElement.style.fontSize = "10px";
        return poweredByElement;
    };
    DeveloperFeedbackWidget.prototype.makeid = function (length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        var counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    };
    DeveloperFeedbackWidget.prototype.fnBrowserDetect = function () {
        var userAgent = navigator.userAgent;
        var browserName;
        if (userAgent.match(/chrome|chromium|crios/i)) {
            browserName = "chrome";
        }
        else if (userAgent.match(/firefox|fxios/i)) {
            browserName = "firefox";
        }
        else if (userAgent.match(/safari/i)) {
            browserName = "safari";
        }
        else if (userAgent.match(/opr\//i)) {
            browserName = "opera";
        }
        else if (userAgent.match(/edg/i)) {
            browserName = "edge";
        }
        else {
            browserName = "No browser detection";
        }
        return browserName;
    };
    return DeveloperFeedbackWidget;
}());
/**
 *
 * take only
 *
 * @returns
 *
 */
var loadDeveloperFeedbackWidget = function () {
    var dataFeedbackOpts = JSON.parse(document
        .getElementById("okfeedback-developer-feedback-widget")
        .getAttribute("data-feedback-opts"));
    // const customerId = document
    //   .getElementById("okfeedback-developer-feedback-widget")!
    //   .getAttribute("data-customer-id");
    // if (!customerId || customerId === "null" || customerId === "undefined") {
    //   return;
    // }
    var widgetPosition = dataFeedbackOpts.widgetPosition, widgetButtonStyle = dataFeedbackOpts.widgetButtonStyle, headingText = dataFeedbackOpts.headingText, greetingMessage = dataFeedbackOpts.greetingMessage, takeEmail = dataFeedbackOpts.takeEmail, takeScreenshot = dataFeedbackOpts.takeScreenshot, recordScreen = dataFeedbackOpts.recordScreen;
    var devFeedback = new DeveloperFeedbackWidget({
        widgetPosition: widgetPosition,
        headingText: headingText,
        greetingMessage: greetingMessage,
        takeEmail: takeEmail,
        takeScreenshot: takeScreenshot,
        recordScreen: recordScreen,
        // customerId,
    });
    var feedbackButton = createFeedbackButton({
        widgetPosition: widgetPosition,
        widgetButtonStyle: widgetButtonStyle,
    });
    feedbackButton.addEventListener("click", function () {
        devFeedback.toggle();
    });
    document.body.appendChild(feedbackButton);
};
// Create feedback button
function createFeedbackButton(_a) {
    var widgetPosition = _a.widgetPosition, widgetButtonStyle = _a.widgetButtonStyle;
    var feedbackButton = document.createElement("button");
    feedbackButton.id = "feedback-widget-toggle-button";
    feedbackButton.textContent = "Feedback";
    feedbackButton.style.position = "fixed";
    Object.assign(feedbackButton.style, __assign({}, widgetButtonStyle));
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
