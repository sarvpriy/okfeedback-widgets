// this script is going to be fetched from server

// Get the widget ID from window.okfeedbackid
// const widgetId = window.okfeedbackid;
// const apiUrl = `http://localhost:3000/api/widgets/${widgetId}`;

class FeedbackWidget {
  static DEV_WIDGET_ID: string = "okfeedback-developer-feedback-widget";
  static EMOJI_WIDGET_ID: string = "okfeedback-emoji-feedback-script";
  static SURVEY_FORM_ID: string = "okfeedback-developer-feedback-survey";
  apiUrl: string;

  constructor() {
    const widgetId = window.okfeedbackid;
    // const {widgetId, customerId} = this.getWidgetDetails()
    console.log(window.location.href);
    if (window.location.href === "http://localhost:3000/") {
      this.apiUrl = `http://localhost:3000/api/widgets/${widgetId}`;
    } else {
      this.apiUrl = `https://www.okfeedback.io/api/widgets/${widgetId}`;
    }
  }

  async initialize() {
    if (!this.apiUrl) {
      console.error("Widget ID not provided in window.okfeedbackid");
    } else {
      // Define the URL for fetching widget details
      await this.fetchAndEmbedWidget();
    }
  }

  getWidgetDetails() {
    const widgetId = document
      .getElementById("okfeedback-emoji-widget")!
      .getAttribute("data-okfeedbackid");
    if (!widgetId) {
      console.error("Widget ID not found");
    }
    const customerId = document
      .getElementById("okfeedback-emoji-widget")!
      .getAttribute("data-customerid");
    if (!customerId || customerId === "null" || customerId === "undefined") {
      console.error("Customer ID not found");
    }
    return { widgetId, customerId };
  }

  /**
   * @todos
   *  - check customer id in backend
   *
   */
  async fetchAndEmbedWidget() {
    try {
      const widgetDetails = await this.fetchData(this.apiUrl);
      this.embedWidget(widgetDetails);
    } catch (error) {
      console.error("Error fetching or embedding widget:", error);
    }
  }

  async fetchData(apiUrl: string) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch widget details");
      }
      return response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  private embedWidget = (widget: Widget) => {
    switch (widget.type) {
      case "bug":
        this.embedDeveloperWidget((widget as BugWidgetDetails).details);
        break;

      case "rating":
        this.embedEmojiWidget((widget as RatingWidgetDetails).details);
        break;

      case "survey":
        this.embedSurveyWidget((widget as SurveyWidgetDetails).details);
        break;

      default:
        console.error("Unknown widget type:", widget.type);
    }
  };

  //   {
  //     "title": "Feedback form",
  //     "greetingMessage": "Thanks for the feedback",
  //     "takeEmail": true,
  //     "takeScreenshot": true,
  //     "recordScreen": false
  // }
  private embedDeveloperWidget(details: BugWidgetDetails["details"]) {
    console.log(details);
    const dataFeedbackOpts = {
      headingText: details.title,
      greetingMessage: details.greetingMessage,
      takeScreenshot: details.takeScreenshot,
      recordScreen: details.recordScreen,
      takeEmail: details.takeEmail,
      widgetPosition: "right", // "right" | "bottom"
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
    const script = document.createElement("script");
    script.src = "/dist/v1/feedback/feedback.bundle.js";
    script.async = true;
    script.dataset.customerId = "8573243847092";
    script.id = FeedbackWidget.DEV_WIDGET_ID;
    script.dataset.feedbackOpts = JSON.stringify(dataFeedbackOpts);
    document.body.appendChild(script);
  }

  private embedEmojiWidget = (details: RatingWidgetDetails["details"]) => {
    console.log(details);
    const dataEmojiFeedbackOpts = {
      headingText: details.title,
      greetingMessage: details.greetingMessage,
      takeEmail: details.takeEmail,
      widgetPosition: "right", // "right" | "bottom"
    };
    const script = document.createElement("script");
    script.src = "/dist/v1/emoji/emoji.bundle.js";
    script.async = true;
    script.dataset.customerId = "8573243847092";
    script.id = FeedbackWidget.EMOJI_WIDGET_ID;
    script.dataset.feedbackOpts = JSON.stringify(dataEmojiFeedbackOpts);
    document.body.appendChild(script);
  };

  private embedSurveyWidget = (details: SurveyWidgetDetails["details"]) => {
    const dataFeedbackOpts = {
      title: details.title,
      greetingMessage: details.greetingMessage,
      questions: details.questions,
    };
    const script = document.createElement("script");
    script.src = "/dist/v1/survey/survey.bundle.js";
    script.async = true;
    script.dataset.customerId = "8573243847092";
    script.id = FeedbackWidget.SURVEY_FORM_ID;
    script.dataset.feedbackOpts = JSON.stringify(dataFeedbackOpts);
    document.head.appendChild(script);
  };
}

const widget = new FeedbackWidget();
widget.initialize().catch((error) => {
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
