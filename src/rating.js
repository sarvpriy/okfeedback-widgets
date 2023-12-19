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
/**
 *
 * @todos
 *  - load widget at custom position
 *  - can load multiple widgets but not at the  same time
 *  - by default make it modal or bottom right
 *  - submit the form
 *  - disable clicks to stop rendering multiple widgets
 */
var emojiFeedback = {
    widgetId: window.okfeedbackid,
    widgetType: "emoji",
    response: {},
    source: {
        url: window.location.href,
        browser: fnBrowserDetect(),
        userAgent: window.navigator.userAgent,
    },
};
var EmojiFeedbackWidget = /** @class */ (function () {
    // private thanksContainer!: HTMLDivElement
    function EmojiFeedbackWidget(_a) {
        var widgetPosition = _a.widgetPosition, 
        // widgetButtonStyle,
        headingText = _a.headingText, greetingMessage = _a.greetingMessage, takeEmail = _a.takeEmail;
        console.log("EmojiFeedbackWidget initiated");
        this.widgetPosition = widgetPosition;
        this.headingText = headingText;
        this.greetingMessage = greetingMessage;
        this.takeEmail = takeEmail;
        this.createFeedbackModal();
        this.createEmojiContainer();
        // this.createThanksText()
        this.feedbackModal.appendChild(Object.assign(document.createElement("div"), {
            id: "powered-by",
            innerHTML: "\u26A1 by <a href=\"https://www.okfeedback.io\" style=\"color: blue;font-weight: 600;\" target=\"_blank\" >Okfeedback.io</a>",
            style: "font-size: 12px;margin-top:12px",
        }));
    }
    EmojiFeedbackWidget.prototype.createFeedbackModal = function () {
        this.feedbackModal = document.createElement("div");
        this.feedbackModal.classList.add("modal");
        // Apply CSS styles
        this.feedbackModal.style.display = "none";
        this.feedbackModal.style.position = "fixed";
        this.feedbackModal.style.bottom = "80px";
        this.feedbackModal.style.right = "10%";
        this.feedbackModal.style.zIndex = "9999";
        this.feedbackModal.style.backgroundColor = "#fefefe";
        this.feedbackModal.style.padding = "20px";
        this.feedbackModal.style.borderRadius = "4px";
        this.feedbackModal.style.width = "300px";
        this.feedbackModal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        // this.feedbackModal.style.border = "1px solid #888";
        // this.feedbackModal.style.opacity = '0';
        // this.feedbackModal.style.transform = 'translateY(50px)';
        // this.feedbackModal.style.transition = 'opacity 0.5s, transform 3s';
        // this.feedbackModal.style.animation = "fade-in 1s ease-in-out forwards"; // Add fade-in animation
        document.body.appendChild(this.feedbackModal);
        this.createCloseButton();
    };
    EmojiFeedbackWidget.prototype.createCloseButton = function () {
        var _this = this;
        var closeBtn = document.createElement("span");
        closeBtn.classList.add("close");
        closeBtn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-x-lg\" viewBox=\"0 0 16 16\">\n    <path d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z\"/>\n  </svg>";
        closeBtn.style.float = "right";
        closeBtn.style.fontSize = "20px";
        closeBtn.style.fontWeight = "bold";
        closeBtn.style.cursor = "pointer";
        // Close the review modal
        closeBtn.addEventListener("click", function () {
            // slideOutToBottom(feedbackModal)
            _this.feedbackModal.animate([
                { opacity: 1, transform: "translateY(0)" },
                { opacity: 0, transform: "translateY(10%)" },
            ], { duration: 300, easing: "ease-in-out" });
            setTimeout(function () {
                _this.feedbackModal.style.display = "none";
            }, 300);
        });
        this.feedbackModal.appendChild(closeBtn);
    };
    EmojiFeedbackWidget.prototype.createEmojiContainer = function () {
        var _this = this;
        var emojiContainer = document.createElement("div");
        emojiContainer.classList.add("emoji-container");
        emojiContainer.style.display = "flex";
        emojiContainer.style.justifyContent = "space-around";
        var emojis = [
            { emoji: "😞", label: "1" },
            { emoji: "😕", label: "2" },
            { emoji: "😐", label: "3" },
            { emoji: "😊", label: "4" },
            { emoji: "😃", label: "5" },
        ];
        emojis.forEach(function (emoji) {
            var emojiBtn = document.createElement("button");
            emojiBtn.classList.add("emoji");
            emojiBtn.textContent = emoji.emoji;
            emojiBtn.setAttribute("aria-label", emoji.label);
            emojiBtn.setAttribute("size", "38");
            emojiBtn.style.fontSize = "32px";
            emojiBtn.style.transition = "transform 0.3s ease";
            emojiBtn.addEventListener("mouseenter", function () {
                emojiBtn.style.transform = "scale(1.2)";
            });
            emojiBtn.addEventListener("mouseleave", function () {
                emojiBtn.style.transform = "scale(1)";
            });
            emojiContainer.appendChild(emojiBtn);
        });
        // Handle emoji selection
        emojiContainer.addEventListener("click", function (e) {
            return _this.handleEmojiSelection(e);
        });
        this.emojiFormContainer = document.createElement("div");
        this.emojiFormContainer.classList.add("emoji-form-container");
        this.createHeading();
        this.emojiFormContainer.appendChild(emojiContainer);
        this.feedbackModal.appendChild(this.emojiFormContainer);
    };
    EmojiFeedbackWidget.prototype.createHeading = function () {
        var heading = document.createElement("h2");
        heading.textContent = this.headingText || "Give Review";
        heading.style.marginBottom = "20px";
        heading.style.fontSize = "18px";
        heading.style.fontWeight = "bold";
        this.emojiFormContainer.appendChild(heading);
    };
    EmojiFeedbackWidget.prototype.handleEmojiSelection = function (event) {
        var selectedEmoji = event.target.textContent;
        var selectedLabel = event.target.getAttribute("aria-label");
        console.log(selectedEmoji, selectedLabel);
        emojiFeedback.response["rating"] = Number(selectedLabel);
        // const feedbackLabel = document.createElement("label");
        // feedbackLabel.textContent = "Feedback:";
        if (document.getElementById("feedbackForm") === null) {
            this.createForm();
        }
        else {
            // change the emoji
        }
    };
    EmojiFeedbackWidget.prototype.createForm = function () {
        var _this = this;
        var form = document.createElement("form");
        form.id = "feedbackForm";
        form.style.marginTop = "20px";
        form.style.display = "flex";
        form.style.flexDirection = "column";
        var feedbackTextarea = document.createElement("textarea");
        feedbackTextarea.id = "feedbackText";
        feedbackTextarea.required = true;
        Object.assign(feedbackTextarea.style, {
            width: "100%",
            height: "100px",
            padding: "8px",
            boxSizing: "border-box",
            border: "2px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f8f8f8",
            fontSize: "16px",
            resize: "none",
        });
        var submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.textContent = "Submit";
        Object.assign(submitBtn.style, {
            marginTop: "16px",
            backgroundColor: "#4CAF50",
            border: "none",
            color: "white",
            padding: "6px 16px",
            textAlign: "center",
            fontWeight: "600",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            borderRadius: "6px",
            maxHeight: "48px",
        });
        // form.appendChild(feedbackLabel);
        form.appendChild(feedbackTextarea);
        form.appendChild(submitBtn);
        // modalContent.appendChild(form)
        // Submit the feedback form
        form.addEventListener("submit", function (e) {
            var _a;
            e.preventDefault(); // Prevent the default form submission behavior
            emojiFeedback.response["feedbackText"] =
                (_a = document.querySelector("#feedbackText")) === null || _a === void 0 ? void 0 : _a.value;
            _this.handleFeedbackFormSubmit();
        });
        // form.animate([
        //     {height: "0px"},
        //     {height: "100%"},
        // ], {duration:300,easing:'ease-in-out' })
        this.emojiFormContainer.appendChild(form);
    };
    EmojiFeedbackWidget.prototype.handleFeedbackFormSubmit = function () {
        // Perform any necessary processing with the selected emoji and label
        // console.log("Selected Emoji:", selectedEmoji);
        // console.log("Selected Label:", selectedLabel);
        // slideOutToLeft(heading)
        // slideOutToLeft(emojiContainer)
        // slideOutToLeft(form)
        // this.feedbackModal.removeChild(this.emojiFormContainer)
        // modalContent.removeChild(heading)
        // modalContent.removeChild(emojiContainer)
        // modalContent.removeChild(form)
        // // Display a success message or perform any other actions
        // // Make the API call to "/api/feedback"
        this.postResponse();
        // // Close the review modal
        // feedbackModal.style.display = "none";
    };
    EmojiFeedbackWidget.prototype.postResponse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch("/api/feedbacks", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(emojiFeedback),
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.ok) {
                            console.log("Feedback submitted successfully");
                            this.createThanksText();
                        }
                        else {
                            throw new Error("Error submitting feedback");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error submitting feedback:", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EmojiFeedbackWidget.prototype.createThanksText = function () {
        var _a;
        var thanksContainer = document.createElement("div");
        thanksContainer.style.width = "100%";
        thanksContainer.style.height = "90%";
        thanksContainer.style.display = "flex";
        thanksContainer.style.justifyContent = "center";
        thanksContainer.style.alignItems = "center";
        var thanksText = document.createElement("p");
        thanksText.textContent = this.greetingMessage;
        thanksText.style.fontSize = "20px";
        thanksContainer.appendChild(thanksText);
        this.emojiFormContainer.animate([
            { opacity: 1, transform: "translateX(0)" },
            { opacity: 0, transform: "translateX(-10%)" },
        ], { duration: 300, easing: "ease-in-out" });
        thanksContainer.animate([
            { opacity: 0, transform: "translateX(5%)" },
            { opacity: 1, transform: "translateX(0)" },
        ], { duration: 300, easing: "ease-in-out" });
        (_a = this.emojiFormContainer.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(thanksContainer, this.emojiFormContainer);
        // this.feedbackModal.appendChild(this.thanksContainer);
        // slideInFromRight(thanksContainer)
    };
    EmojiFeedbackWidget.prototype.toggle = function () {
        var _this = this;
        if (this.feedbackModal.style.display === "none") {
            // slideInFromBottom(this.feedbackModal)
            this.feedbackModal.animate([
            // { opacity: 0, transform: 'translateY(10%)' },
            // { opacity: 1, transform: 'translateY(0)' }
            // { transform: "scale(0)" },
            // { transform: "scale(1)" },
            // { transform: "scale(1.2)" },
            // { transform: "scale(1)" },
            // { transform: "scale(0.8)" },
            // { transform: "scale(0.6)" },
            // { transform: "scale(0.8)" },
            // { transform: "scale(1)" },
            // { transform: "scale(1.1)" },
            // { transform: "scale(0.9)" },
            // { transform: "scale(1)" },
            ], { duration: 600, easing: "ease-in-out" });
            this.feedbackModal.style.display = "block";
        }
        else {
            // slideOutToBottom(this.feedbackModal)
            this.feedbackModal.animate([
                { opacity: 1, transform: "translateY(0)" },
                { opacity: 0, transform: "translateY(10%)" },
            ], { duration: 300, easing: "ease-in-out" });
            setTimeout(function () {
                _this.feedbackModal.style.display = "none";
            }, 300);
        }
        // fadeInFromBottom(feedbackModal);
    };
    return EmojiFeedbackWidget;
}());
function fnBrowserDetect() {
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
}
window.EmojiFeedbackWidget = EmojiFeedbackWidget;
// export default EmojiFeedbackWidget;
// const loadEmojiFeedback = () => {
//   const dataFeedbackOpts = JSON.parse(
//     document
//       .getElementById("emoji-feedback-script")!
//       .getAttribute("data-feedback-opts")!
//   );
//   const customerId = document
//     .getElementById("emoji-feedback-script")!
//     .getAttribute("data-customer-id");
//   if (!customerId || customerId === "null" || customerId === "undefined") {
//     return;
//   }
//   const {
//     feedbackButtonText,
//     widgetPosition,
//     widgetButtonStyle,
//     headingText,
//     greetingMessage,
//     takeEmail,
//   } = dataFeedbackOpts;
//   const emojiFeedback = new EmojiFeedbackWidget({
//     widgetPosition,
//     widgetButtonStyle,
//     headingText,
//     greetingMessage,
//     takeEmail,
//   });
//   // Create toggle button
//   const toggleButton = document.createElement("button");
//   toggleButton.textContent = feedbackButtonText || "Quick survey";
//   toggleButton.style.position = "fixed";
//   // Object.assign(toggleButton.style, widgetPosition)
//   Object.assign(toggleButton.style, {
//     position: "fixed",
//     ...widgetPosition,
//     ...widgetButtonStyle,
//   });
//   // toggleButton.style.bottom = position.bottom;
//   // toggleButton.style.left = position.left;
//   // toggleButton.style.zIndex = "9999"
//   // toggleButton.style.padding = "10px 20px"
//   // toggleButton.style.fontSize = "16px"
//   // toggleButton.style.backgroundColor = "#4f46e5"
//   // toggleButton.style.background = "rgb(51, 51, 51)"
//   // toggleButton.style.color = "#fff"
//   // toggleButton.style.fontWeight = "600"
//   // toggleButton.style.textAlign = "center"
//   // toggleButton.style.border = "1px solid rgb(221, 221, 221)"
//   // toggleButton.style.borderRadius = "0px 0px 0px 0px"
//   // toggleButton.style.cursor = "pointer"
//   // toggleButton.style.boxShadow = "rgba(0,0,0,0.35) 0 6px 100px 0"
//   // toggleButton.style.transform = `translateX(-50%)`;
//   toggleButton.addEventListener("click", () => {
//     emojiFeedback.toggle();
//   });
//   document.body.appendChild(toggleButton);
// };
// loadEmojiFeedback();
