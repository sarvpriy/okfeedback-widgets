/**
 *
 * here is the list of questions details for survey form,
 * you have to create a form in typescript with object oriented architecture
 *
 * @todos
 * - get questions details from server
 * - set max height and max width
 * - add visual feedbacks
 * - make it visually good
 * - fix ranking feature
 *
 * - write down multiple version of forms
 * - make form step by step
 * - make greetings attractive
 *
 * - can render survey from a floating button
 * - can render survey in a modal
 * - can render survey in a customized position
 *
 */

let formData = new FormData();

let surveyFormFeedback: any = {
  widgetId: window.okfeedbackid,
  widgetType: "survey",
  response: {
    answers: {},
  },
  source: {
    url: window.location.href,
    browser: browserDetect(),
    userAgent: window.navigator.userAgent,
  },
};

let answers: any = {};

// Function to create a form field based on the question type
function createFormField(question: any) {
  const { field, fieldDetails, questionText, questionId } = question;
  const fieldset = document.createElement("fieldset");
  fieldset.id = questionId;
  fieldset.style.width = "100%";
  const label = document.createElement("label");
  label.textContent = questionText;
  label.style.display = "block";
  label.style.fontWeight = "bold";
  label.style.fontSize = "1.25rem";
  label.style.marginBottom = "0.5rem";
  fieldset.appendChild(label);

  switch (field) {
    case "Short Text":
      createShortTextQuestion(fieldDetails, fieldset);
      break;
    case "Long Text":
      createLongTextQuestion(fieldDetails, fieldset);
      break;
    case "Multiple Choice":
      createMultipleChoiceQuestion(fieldDetails, fieldset);
      break;
    case "Ranking":
      createRankingQuestion(fieldDetails, fieldset);
      break;
    case "Rating":
      createRatingQuestion(fieldDetails, fieldset);
      break;
    case "Dropdown":
      createDropdownQuestion(fieldDetails, fieldset);
      break;
    default:
      break;
  }

  return fieldset;
}

// Function to create a Short Text question
function createShortTextQuestion(shortTextQuestion: any, parent: any) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = shortTextQuestion.placeholder || "answer...";
  input.style.width = "100%";
  input.style.padding = "8px";
  input.style.border = "1px solid #d1d5db";
  input.style.borderRadius = "4px";
  input.style.resize = "none";
  input.style.outline = "none";
  input.style.borderColor = "#3b82f6";
  input.style.transition = "border-color 0.3s";
  input.addEventListener("change", (e: any) => {
    if (window.location.host === "localhost:3000") console.log(e.target.value);
    surveyFormFeedback.response.answers[parent.id] = e.target.value;
  });
  parent.appendChild(input);
}

// Function to create a Long Text question
function createLongTextQuestion(longTextQuestion: any, parent: any) {
  const textarea = document.createElement("textarea");
  textarea.placeholder = longTextQuestion.placeholder || "answer...";
  textarea.rows = longTextQuestion.rows;
  textarea.style.width = "100%";
  textarea.style.border = "1px solid #d1d5db";
  textarea.style.padding = "8px";
  textarea.style.borderRadius = "4px";
  textarea.style.resize = "none";
  textarea.addEventListener("change", (e: any) => {
    if (window.location.host === "localhost:3000") console.log(e.target.value);
    surveyFormFeedback.response.answers[parent.id] = e.target.value;
  });
  parent.appendChild(textarea);
}

// Function to create a Multiple Choice question
function createMultipleChoiceQuestion(
  multipleChoiceQuestion: any,
  parent: any
) {
  const choiceContainer = document.createElement("div");
  choiceContainer.style.display = "flex";
  choiceContainer.style.flexDirection = "column";
  choiceContainer.style.alignItems = "flex-start";
  choiceContainer.style.width = "100%";
  choiceContainer.style.flexWrap = "wrap";

  multipleChoiceQuestion.options.forEach((option: any) => {
    const button = document.createElement("button");
    button.style.padding = "8px";
    button.style.border = "1px solid #d1d5db";
    button.style.textAlign = "start";
    button.style.borderRadius = "0.375rem";
    button.style.marginRight = "0.5rem";
    button.style.marginBottom = "0.5rem";
    button.style.width = "100%";
    button.textContent = option;
    button.style.transform = "scale(1)";
    button.style.transition = "transform 0.2s";
    button.addEventListener("mouseenter", (e: any) => {
      e.currentTarget.style.transform = "scale(1.05)";
    });

    button.addEventListener("mouseleave", (e: any) => {
      e.currentTarget.style.transform = "scale(1)";
    });
    button.addEventListener("click", (e: any) => {
      e.preventDefault();
      if (window.location.host === "localhost:3000") console.log(option);
      surveyFormFeedback.response.answers[parent.id] = option;
    });
    choiceContainer.appendChild(button);
  });

  parent.appendChild(choiceContainer);
}

// Function to create a Ranking question
function createRankingQuestion(rankingQuestion: any, parent: any) {
  const rankingItemsContainer = document.createElement("div");
  rankingItemsContainer.style.display = "flex";
  rankingItemsContainer.style.flexDirection = "column";
  rankingItemsContainer.style.alignItems = "flex-start";
  rankingItemsContainer.style.width = "100%";
  rankingItemsContainer.style.flexWrap = "wrap";

  rankingQuestion.items.forEach((item: any) => {
    const button = createButtonElement(item);
    rankingItemsContainer.appendChild(button);
  });

  parent.appendChild(rankingItemsContainer);
}

// Function to create a Rating question
function createRatingQuestion(fieldDetails: any, parent: any) {
  const ratingContainer = document.createElement("div");
  ratingContainer.style.display = "flex";
  ratingContainer.style.gap = "8px";

  for (let rating = 1; rating <= 5; rating++) {
    const span = document.createElement("span");
    span.setAttribute("key", String(rating));
    span.style.fontSize = "1.5rem";
    span.style.marginRight = "0.5rem";
    span.style.cursor = "pointer";
    span.style.transform = "scale(1)";
    span.style.transition = "transform 0.2s";

    if (fieldDetails.useEmoji) {
      span.textContent = getEmoji(rating);
    } else {
      const svg = createRatingSvg();
      span.appendChild(svg);
    }

    span.addEventListener("mouseenter", (e: any) => {
      e.currentTarget.style.transform = "scale(1.2)";
    });

    span.addEventListener("mouseleave", (e: any) => {
      e.currentTarget.style.transform = "scale(1)";
    });

    span.addEventListener("click", (e: any) => {
      if (window.location.host === "localhost:3000")
        console.log(`Selected rating: ${rating}`);
      surveyFormFeedback.response.answers[parent.id] = rating;
    });

    ratingContainer.appendChild(span);
  }

  parent.appendChild(ratingContainer);
}

// Function to create a Dropdown question
function createDropdownQuestion(dropdownQuestion: any, parent: any) {
  const select = document.createElement("select");
  select.style.width = "100%";
  select.style.padding = "8px";
  select.style.borderRadius = "4px";
  select.style.background = "none";
  select.style.border = "1px solid #ddd";
  dropdownQuestion.options.forEach((option: any) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
  select.addEventListener("change", (e: any) => {
    if (window.location.host === "localhost:3000") console.log(e.target.value);
    surveyFormFeedback.response.answers[parent.id] = e.target.value;
  });

  parent.appendChild(select);
}

// Function to create a button element
function createButtonElement(text: any) {
  const button = document.createElement("button");
  button.style.padding = "8px";
  button.style.border = "1px solid #d1d5db";
  button.style.textAlign = "start";
  button.style.borderRadius = "0.375rem";
  button.style.marginRight = "0.5rem";
  button.style.marginBottom = "0.5rem";
  button.style.width = "100%";
  button.textContent = text;
  // button.style.transform = "scale(1)";
  // button.style.transition = "transform 0.2s";
  // button.addEventListener("mouseenter", (e: any) => {
  //   e.currentTarget.style.transform = "scale(1.1)";
  // });

  // button.addEventListener("mouseleave", (e: any) => {
  //   e.currentTarget.style.transform = "scale(1)";
  // });

  // button.addEventListener("click", (e) => {
  //   // if(window.location.host === "localhost:3000") console.log(`Selected rating: ${rating}`);
  // });
  return button;
}

// Function to create an SVG element for rating
function createRatingSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("class", "w-8 h-8");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute(
    "d",
    "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.040.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.610l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.610l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
  );

  svg.appendChild(path);
  return svg;
}

// Function to generate the survey form
function generateSurveyForm() {
  const dataFeedbackOpts = JSON.parse(
    document
      .getElementById("okfeedback-developer-feedback-survey")!
      .getAttribute("data-feedback-opts")!
  );
  const customerId = document
    .getElementById("okfeedback-developer-feedback-survey")!
    .getAttribute("data-customer-id");
  if (!customerId || customerId === "null" || customerId === "undefined") {
    return;
  }
  if (window.location.host === "localhost:3000") console.log(dataFeedbackOpts);
  const { title, greetingMessage, questions } = dataFeedbackOpts;

  const surveyContainer = document.getElementById("okfeedback-survey");

  if (!surveyContainer) {
    console.error("Survey container not found.");
    return;
  }
  surveyContainer.style.background = "#fff";

  const surveyForm = document.createElement("form");
  surveyForm.id = "okfeedback-survey-form";
  surveyForm.style.display = "flex";
  surveyForm.style.flexDirection = "column";
  surveyForm.style.alignItems = "center";
  surveyForm.style.gap = "12px";
  surveyForm.style.border = "1px solid #222";
  surveyForm.style.borderRadius = "8px";
  surveyForm.style.padding = "16px";
  surveyForm.style.alignItems = "start";
  surveyForm.style.background = "#fff";

  const heading = document.createElement("h2");
  heading.textContent = title;
  heading.style.marginBottom = "20px";
  heading.style.fontSize = "18px";
  heading.style.fontWeight = "bold";

  surveyForm.appendChild(heading);

  questions.forEach((question: any) => {
    const fieldset = createFormField(question);
    surveyFormFeedback.response.answers[question.questionId] = "";
    surveyForm.appendChild(fieldset);
  });

  const submitButton = createSubmitButton();
  surveyForm.appendChild(submitButton);
  surveyForm.appendChild(createPoweredByElement());

  surveyContainer.appendChild(surveyForm);

  const greeting = document.createElement("p");
  greeting.textContent = greetingMessage;
  greeting.id = "okfeedback-survey-form-greeting";
  greeting.style.display = "none";
  surveyContainer.appendChild(greeting);
}

// Function to create the submit button
function createSubmitButton() {
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.style.padding = "10px 20px";
  submitButton.style.border = "none";
  submitButton.style.backgroundColor = "#4caf50";
  submitButton.style.color = "white";
  submitButton.style.cursor = "pointer";
  submitButton.style.borderRadius = "4px";
  submitButton.style.width = "100%";
  submitButton.style.marginTop = "32px";
  submitButton.style.fontWeight = "600";

  submitButton.addEventListener("mouseover", function () {
    submitButton.style.backgroundColor = "#45a049";
  });

  submitButton.addEventListener("mouseout", function () {
    submitButton.style.backgroundColor = "#4caf50";
  });

  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (window.location.host === "localhost:3000")
      console.log("Button clicked!", surveyFormFeedback);
    // sumbit answer
    submitForm();
  });

  return submitButton;
}

function submitForm() {
  const url = "/api/feedbacks";

  fetch(url, {
    method: "POST",
    body: JSON.stringify(surveyFormFeedback),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      if (window.location.host === "localhost:3000") console.log(data);
    })
    .catch((error) => {
      // Handle any error that occurred during the request
      console.error(error);
    });
}

function showGreeting() {
  const greeting = document.getElementById("okfeedback-survey-form-greeting");
  greeting!.style.display = "block";
  const surveyForm = document.getElementById("okfeedback-survey-form");
  surveyForm!.style.display = "none";
}

function updateAnswers({ field, answer }: any) {}

function createPoweredByElement() {
  const poweredByElement = document.createElement("div");
  poweredByElement.id = "okfeedback-powered-by";
  poweredByElement.innerHTML = `powered by <a href="https://www.okfeedback.io" style="color: blue;font-weight: 600;" target="_blank" >Okfeedback.io</a>`;
  poweredByElement.style.fontSize = "10px";
  return poweredByElement;
}

const getEmoji = (rating: number) => {
  // Add your custom logic to map rating to emoji
  switch (rating) {
    case 1:
      return "😞";
    case 2:
      return "😐";
    case 3:
      return "😊";
    case 4:
      return "😄";
    case 5:
      return "😍";
    default:
      return "";
  }
};

function browserDetect() {
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

// Call the function to generate and append the survey form
generateSurveyForm();
