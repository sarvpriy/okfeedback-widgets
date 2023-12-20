// this script is going to be fetched from server
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
// Get the widget ID from window.okfeedbackid
// const widgetId = window.okfeedbackid;
// const apiUrl = `http://localhost:3000/api/widgets/${widgetId}`;
var FeedbackWidget = /** @class */ (function () {
    function FeedbackWidget() {
        var _this = this;
        this.embedWidget = function (widget) {
            switch (widget.type) {
                case "bug":
                    _this.embedDeveloperWidget(widget.details);
                    break;
                case "rating":
                    _this.embedEmojiWidget(widget.details);
                    break;
                case "survey":
                    _this.embedSurveyWidget(widget.details);
                    break;
                default:
                    console.error("Unknown widget type:", widget.type);
            }
        };
        this.embedEmojiWidget = function (details) {
            if (window.location.host === "localhost:3000")
                console.log(details);
            var dataEmojiFeedbackOpts = {
                headingText: details.title,
                greetingMessage: details.greetingMessage,
                takeEmail: details.takeEmail,
                widgetPosition: "right", // "right" | "bottom"
            };
            var script = document.createElement("script");
            script.src = "/feedback-build/emoji/emoji.bundle.js";
            script.async = true;
            script.dataset.customerId = "8573243847092";
            script.id = FeedbackWidget.EMOJI_WIDGET_ID;
            script.dataset.feedbackOpts = JSON.stringify(dataEmojiFeedbackOpts);
            document.body.appendChild(script);
        };
        this.embedSurveyWidget = function (details) {
            var dataFeedbackOpts = {
                title: details.title,
                greetingMessage: details.greetingMessage,
                questions: details.questions,
            };
            var script = document.createElement("script");
            script.src = "/feedback-build/survey/survey.bundle.js";
            script.async = true;
            script.dataset.customerId = "8573243847092";
            script.id = FeedbackWidget.SURVEY_FORM_ID;
            script.dataset.feedbackOpts = JSON.stringify(dataFeedbackOpts);
            document.head.appendChild(script);
        };
        var widgetId = window.okfeedbackid;
        // const {widgetId, customerId} = this.getWidgetDetails()
        if (window.location.host === "localhost:3000")
            console.log(window.location.href);
        if (window.location.href === "http://localhost:3000/") {
            this.apiUrl = "http://localhost:3000/api/widgets/".concat(widgetId);
        }
        else {
            this.apiUrl = "https://www.okfeedback.io/api/widgets/".concat(widgetId);
        }
    }
    FeedbackWidget.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.apiUrl) return [3 /*break*/, 1];
                        console.error("Widget ID not provided in window.okfeedbackid");
                        return [3 /*break*/, 3];
                    case 1: 
                    // Define the URL for fetching widget details
                    return [4 /*yield*/, this.fetchAndEmbedWidget()];
                    case 2:
                        // Define the URL for fetching widget details
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FeedbackWidget.prototype.getWidgetDetails = function () {
        var widgetId = document
            .getElementById("okfeedback-emoji-widget")
            .getAttribute("data-okfeedbackid");
        if (!widgetId) {
            console.error("Widget ID not found");
        }
        var customerId = document
            .getElementById("okfeedback-emoji-widget")
            .getAttribute("data-customerid");
        if (!customerId || customerId === "null" || customerId === "undefined") {
            console.error("Customer ID not found");
        }
        return { widgetId: widgetId, customerId: customerId };
    };
    /**
     * @todos
     *  - check customer id in backend
     *
     */
    FeedbackWidget.prototype.fetchAndEmbedWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            var widgetDetails, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchData(this.apiUrl)];
                    case 1:
                        widgetDetails = _a.sent();
                        this.embedWidget(widgetDetails);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error fetching or embedding widget:", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FeedbackWidget.prototype.fetchData = function (apiUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch(apiUrl)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Failed to fetch widget details");
                        }
                        return [2 /*return*/, response.json()];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error:", error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //   {
    //     "title": "Feedback form",
    //     "greetingMessage": "Thanks for the feedback",
    //     "takeEmail": true,
    //     "takeScreenshot": true,
    //     "recordScreen": false
    // }
    FeedbackWidget.prototype.embedDeveloperWidget = function (details) {
        if (window.location.host === "localhost:3000")
            console.log(details);
        var dataFeedbackOpts = {
            headingText: details.title,
            greetingMessage: details.greetingMessage,
            takeScreenshot: details.takeScreenshot,
            recordScreen: details.recordScreen,
            takeEmail: details.takeEmail,
            widgetPosition: "right",
            widgetButtonStyle: {
                zIndex: "9999",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4f46e5",
                background: "rgb(51, 51, 51)",
                color: "#fff",
                fontWeight: "600",
                textAlign: "center",
                border: "1px solid rgb(221, 221, 221)",
                borderRadius: "0px 0px 0px 0px",
                cursor: "pointer",
                boxShadow: "rgba(0,0,0,0.35) 0 6px 100px 0",
            },
            position: "right",
            title: "Feedback",
            customPositions: {
                top: "",
                bottom: "",
                left: "",
                right: "",
            },
            canTakeScreenshot: true,
            canRecordScreen: true,
        };
        var script = document.createElement("script");
        script.src = "/feedback-build/feedback/feedback.bundle.js";
        script.async = true;
        script.dataset.customerId = "8573243847092";
        script.id = FeedbackWidget.DEV_WIDGET_ID;
        script.dataset.feedbackOpts = JSON.stringify(dataFeedbackOpts);
        document.body.appendChild(script);
    };
    FeedbackWidget.DEV_WIDGET_ID = "okfeedback-developer-feedback-widget";
    FeedbackWidget.EMOJI_WIDGET_ID = "okfeedback-emoji-feedback-script";
    FeedbackWidget.SURVEY_FORM_ID = "okfeedback-developer-feedback-survey";
    return FeedbackWidget;
}());
var widget = new FeedbackWidget();
widget.initialize().catch(function (error) {
    console.error("Error fetching or embedding widget:", error);
});
// (async () => {
//   if (!widgetId) {
//     console.error('Widget ID not provided in window.okfeedbackid');
//   } else {
//     // Define the URL for fetching widget details
//     await fetchAndEmbedWidget(apiUrl);
//   }
// })().catch((error) => {
//   console.error('Error fetching or embedding widget:', error);
// });
// export {}
