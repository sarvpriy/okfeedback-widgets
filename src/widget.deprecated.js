// Check if window.okfeedbackid is defined and not null
// this script is going to be fetched from server

// widgetDetails = {
//     "details": {
//         "title": "Feedback form",
//         "greetingMessage": "Thanks for the feedback",
//         "takeEmail": true,
//         "canTakeScreenshot": false,
//         "canRecordScreen": false,
//         "useEmoji": false,
//         "useIcon": false,
//         "questions": []
//     },
//     "_id": "65111d0c03c82c88a3bbf98b",
//     "userId": "646f4527148739d6b478016b",
//     "type": "emoji",
//     "createdAt": "2023-09-25T05:39:24.021Z",
//     "updatedAt": "2023-09-25T05:39:24.021Z",
//     "__v": 0
// }
if (window.okfeedbackid) {
    // Get the widget ID from window.okfeedbackid
    const widgetId = window.okfeedbackid;
  
    // Define the URL for fetching widget details
    const apiUrl = `http://localhost:3000/api/widgets/${widgetId}`;
  
    // Make a GET request to fetch widget details
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(widgetDetails => {
        // Use the fetched widget details to initialize the widget
        // according to the widget details create and append the widget in the dom
        // feedback form is positional, emoji feedback is also positional
        // developer widget is fixed
        window.okfeedback = { widgetConfig: widgetDetails };

        if(widgetDetails.type == "developer") {
            
            const dataFeedbackOpts = {
                position: "right",
                title: "Feedback",
                customPositions: {
                  top: "",
                  bottom: "",
                  left: "",
                  right: "",
                },
                widgetButtonStyle: {},
                canTakeScreenshot: true,
                canRecordScreen: true,
                takeEmail: true,
            };

            const script = document.createElement('script');
            script.src = '/developer.js';
            script.async = true;
            script["data-customer-id"] = "8573243847092"
            script["id"] = "feedback-script"
            script["data-feedback-opts"] = JSON.stringify(dataFeedbackOpts)
            script.onload = function() {
                // Code to execute after the script has loaded
                console.log('Script loaded successfully.');
                console.log(document.getElementById("feedbackWidget"))
            };
        
            // Error event listener (optional)
            script.onerror = function() {
            console.error('Error loading script.');
            };
          // Your script code here
          document.body.appendChild(script);
        }

        if(widgetDetails.type == "emoji") {
            const dataEmojiFeedbackOpts = {
                feedbackButtonText: "Rate us",
                headingText: "How would you rate your experience?",
                greetingMessage: "Thanks for your feedback!",
                takeEmail: true,
                widgetPosition: {
                  bottom: "0px",
                  right: "45%",
                },
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
              };

            const script = document.createElement('script');
            script.src = '/emoji.js';
            script.async = true;
            script["data-customer-id"] = "8573243847092"
            script["id"] = "emoji-feedback-script"
            script["data-feedback-opts"] = JSON.stringify(dataEmojiFeedbackOpts)
            document.body.appendChild(script);
        }

        if(widgetDetails.type == "survey") {
            const dataFeedbackOpts = {
                position: "right",
                title: "Feedback",
                customPositions: {
                  top: "",
                  bottom: "",
                  left: "",
                  right: "",
                },
                widgetButtonStyle: {},
                canTakeScreenshot: true,
                canRecordScreen: true,
                takeEmail: true,
            };

            const script = document.createElement('script');
            script.src = '/survey.js';
            script.async = true;
            script["data-customer-id"] = "8573243847092"
            script["data-feedback-opts"] = JSON.stringify(dataFeedbackOpts)
            document.head.appendChild(script);
        }

        // const script = document.createElement('script');
        // script.src = 'https://cdn.okfeedback.com/embed/widget.js';
        // script.async = true;
        // document.head.appendChild(script);
      })
      .catch(error => {
        console.error('Error fetching widget details:', error);
      });
  } else {
    console.error('window.okfeedbackid is not defined or null');
  }
  
