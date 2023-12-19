/**
 *
 * @todos
 *  - load widget at custom position
 *  - can load multiple widgets but not at the  same time
 *  - by default make it modal or bottom right
 *  - submit the form
 *  - disable clicks to stop rendering multiple widgets
 */
let emojiFeedback: any = {
  widgetId: window.okfeedbackid,
  widgetType: "emoji",
  response: {},
  source: {
    url: window.location.href,
    browser: fnBrowserDetect(),
    userAgent: window.navigator.userAgent,
  },
};

class EmojiFeedbackWidget {
  private feedbackModal!: HTMLDivElement;
  private emojiFormContainer!: HTMLDivElement;
  private widgetPosition!: "right" | "bottom";
  private headingText!: string;
  private greetingMessage!: string;
  private takeEmail!: boolean;
  // private thanksContainer!: HTMLDivElement

  constructor({
    widgetPosition,
    // widgetButtonStyle,
    headingText,
    greetingMessage,
    takeEmail,
  }: any) {
    console.log("EmojiFeedbackWidget initiated");
    this.widgetPosition = widgetPosition;
    this.headingText = headingText;
    this.greetingMessage = greetingMessage;
    this.takeEmail = takeEmail;

    this.createFeedbackModal();
    this.createEmojiContainer();
    // this.createThanksText()
    this.feedbackModal.appendChild(
      Object.assign(document.createElement("div"), {
        id: "powered-by",
        innerHTML: `⚡ by <a href="https://www.okfeedback.io" style="color: blue;font-weight: 600;" target="_blank" >Okfeedback.io</a>`,
        style: `font-size: 12px;margin-top:12px`,
      })
    );
  }

  private createFeedbackModal() {
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
  }

  private createCloseButton() {
    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
  </svg>`;
    closeBtn.style.float = "right";
    closeBtn.style.fontSize = "20px";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.cursor = "pointer";

    // Close the review modal
    closeBtn.addEventListener("click", () => {
      // slideOutToBottom(feedbackModal)
      this.feedbackModal.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(10%)" },
        ],
        { duration: 300, easing: "ease-in-out" }
      );

      setTimeout(() => {
        this.feedbackModal.style.display = "none";
      }, 300);
    });
    this.feedbackModal.appendChild(closeBtn);
  }

  private createEmojiContainer() {
    const emojiContainer = document.createElement("div");
    emojiContainer.classList.add("emoji-container");
    emojiContainer.style.display = "flex";
    emojiContainer.style.justifyContent = "space-around";

    const emojis = [
      { emoji: "😞", label: "1" },
      { emoji: "😕", label: "2" },
      { emoji: "😐", label: "3" },
      { emoji: "😊", label: "4" },
      { emoji: "😃", label: "5" },
    ];

    emojis.forEach((emoji) => {
      const emojiBtn = document.createElement("button");
      emojiBtn.classList.add("emoji");
      emojiBtn.textContent = emoji.emoji;
      emojiBtn.setAttribute("aria-label", emoji.label);
      emojiBtn.setAttribute("size", "38");
      emojiBtn.style.fontSize = "32px";
      emojiBtn.style.transition = "transform 0.3s ease";
      emojiBtn.addEventListener("mouseenter", () => {
        emojiBtn.style.transform = "scale(1.2)";
      });
      emojiBtn.addEventListener("mouseleave", () => {
        emojiBtn.style.transform = "scale(1)";
      });
      emojiContainer.appendChild(emojiBtn);
    });
    // Handle emoji selection
    emojiContainer.addEventListener("click", (e) =>
      this.handleEmojiSelection(e)
    );
    this.emojiFormContainer = document.createElement("div");
    this.emojiFormContainer.classList.add("emoji-form-container");
    this.createHeading();
    this.emojiFormContainer.appendChild(emojiContainer);
    this.feedbackModal.appendChild(this.emojiFormContainer);
  }
  private createHeading() {
    const heading = document.createElement("h2");
    heading.textContent = this.headingText || "Give Review";
    heading.style.marginBottom = "20px";
    heading.style.fontSize = "18px";
    heading.style.fontWeight = "bold";
    this.emojiFormContainer.appendChild(heading);
  }

  private handleEmojiSelection(event: any) {
    const selectedEmoji = event.target.textContent;
    const selectedLabel = event.target.getAttribute("aria-label");
    console.log(selectedEmoji, selectedLabel);
    emojiFeedback.response["rating"] = Number(selectedLabel);
    // const feedbackLabel = document.createElement("label");
    // feedbackLabel.textContent = "Feedback:";
    if (document.getElementById("feedbackForm") === null) {
      this.createForm();
    } else {
      // change the emoji
    }
  }

  private createForm() {
    const form = document.createElement("form");
    form.id = "feedbackForm";
    form.style.marginTop = "20px";
    form.style.display = "flex";
    form.style.flexDirection = "column";
    const feedbackTextarea = document.createElement("textarea");
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

    const submitBtn = document.createElement("button");
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
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent the default form submission behavior

      emojiFeedback.response["feedbackText"] =
        document.querySelector<HTMLTextAreaElement>("#feedbackText")?.value;

      this.handleFeedbackFormSubmit();
    });
    // form.animate([
    //     {height: "0px"},
    //     {height: "100%"},
    // ], {duration:300,easing:'ease-in-out' })
    this.emojiFormContainer.appendChild(form);
  }

  private handleFeedbackFormSubmit() {
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
  }

  private async postResponse() {
    try {
      const response = await fetch("/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emojiFeedback),
      });

      if (response.ok) {
        console.log("Feedback submitted successfully");
        this.createThanksText();
      } else {
        throw new Error("Error submitting feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  }

  private createThanksText() {
    const thanksContainer = document.createElement("div");
    thanksContainer.style.width = "100%";
    thanksContainer.style.height = "90%";
    thanksContainer.style.display = "flex";
    thanksContainer.style.justifyContent = "center";
    thanksContainer.style.alignItems = "center";

    const thanksText = document.createElement("p");
    thanksText.textContent = this.greetingMessage;
    thanksText.style.fontSize = "20px";
    thanksContainer.appendChild(thanksText);

    this.emojiFormContainer.animate(
      [
        { opacity: 1, transform: "translateX(0)" },
        { opacity: 0, transform: "translateX(-10%)" },
      ],
      { duration: 300, easing: "ease-in-out" }
    );
    thanksContainer.animate(
      [
        { opacity: 0, transform: "translateX(5%)" },
        { opacity: 1, transform: "translateX(0)" },
      ],
      { duration: 300, easing: "ease-in-out" }
    );
    this.emojiFormContainer.parentNode?.replaceChild(
      thanksContainer,
      this.emojiFormContainer
    );
    // this.feedbackModal.appendChild(this.thanksContainer);

    // slideInFromRight(thanksContainer)
  }

  public toggle() {
    if (this.feedbackModal.style.display === "none") {
      // slideInFromBottom(this.feedbackModal)
      this.feedbackModal.animate(
        [
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
        ],
        { duration: 600, easing: "ease-in-out" }
      );
      this.feedbackModal.style.display = "block";
    } else {
      // slideOutToBottom(this.feedbackModal)
      this.feedbackModal.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(10%)" },
        ],
        { duration: 300, easing: "ease-in-out" }
      );
      setTimeout(() => {
        this.feedbackModal.style.display = "none";
      }, 300);
    }
    // fadeInFromBottom(feedbackModal);
  }
}

interface Window {
  EmojiFeedbackWidget: any;
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
