// interface Session {
//   user: {
//     name: string;
//     email: string;
//     image: string;
//     id: string;
//   };
// }

interface Session {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
    customerId: string;
  };
}
// session = {
//   "user": {
//       "name": "sarvpriy arya",
//       "email": "sarvpriy.arya@gmail.com",
//       "image": "https://lh3.googleusercontent.com/a/AAcHTteTmuOFRuWtbtb-YSUvlVR6AVcYWESXW6kQzgFd=s96-c",
//       "id": "646f4527148739d6b478016b"
//   }
// }

// type Feedback = {
//   customerId: string;
//   text?: string;
//   mediaUrl?: string;
//   url: string;
//   browser: string;
//   userAgent: string;
//   clientEmail?: string;
//   timestamp: number;
// };

interface FieldDetails {
  options?: string[];
}

type WidgetType = "bug" | "rating" | "survey";

type FormFieldProps = {
  index: number;
  questionText: string;
  fieldDetails:
    | {
        options: string[];
      }
    | {
        items: string[];
      }
    | {
        maxRating: number;
        useEmoji: boolean;
      }
    | {
        options: string[];
      }
    | any;
};

type SurveyFormFields =
  | {
      field: "Short Text";
      questionText: string;
      fieldDetails: {
        placeholder: string;
        inputType: "text" | "email" | "number";
      };
    }
  | {
      field: "Long Text";
      questionText: string;
      fieldDetails: {
        placeholder: string;
        rows: number;
      };
    }
  | {
      field: "Multiple Choice";
      questionText: string;
      fieldDetails: {
        choiceDirection: "row" | "col";
        options: string[];
      };
    }
  | {
      field: "Ranking";
      questionText: string;
      fieldDetails: {
        items: string[];
      };
    }
  | {
      field: "Rating";
      questionText: string;
      fieldDetails: {
        useEmoji: boolean;
      };
    }
  | {
      field: "Dropdown";
      questionText: string;
      fieldDetails: {
        options: string[];
      };
    };

interface Window {
  okfeedbackid: string;
}

// interface Widget<T> {
//   type: WidgetType;
//   details: T;
//   createdAt: {
//     $date: string;
//   };
//   updatedAt: {
//     $date: string;
//   }
// }

// widget database entry
type Widget = BugWidgetDetails | RatingWidgetDetails | SurveyWidgetDetails;

interface BugWidgetDetails {
  _id: string;
  userId: string;
  type: WidgetType;
  widgetName: string;
  details: {
    title: string;
    greetingMessage: string;
    takeScreenshot: boolean;
    recordScreen: boolean;
    takeEmail: boolean;
  };
  createdAt: string;
  updatedAt: string;
}
interface RatingWidgetDetails {
  _id: string;
  userId: string;
  type: WidgetType;
  widgetName: string;
  details: {
    title: string;
    greetingMessage: string;
    takeEmail: boolean;
    takeTextFeedback: boolean;
    useEmoji: boolean;
  };
  createdAt: string;
  updatedAt: string;
}
interface SurveyWidgetDetails {
  _id: string;
  userId: string;
  type: WidgetType;
  widgetName: string;
  details: {
    title: string;
    greetingMessage: string;
    questions: {
      field: string;
      questionId: string;
      questionText: string;
      fieldDetails?: FieldDetails;
    }[];
  };
  createdAt: string;
  updatedAt: string;
}

//--------- feedbacks------------//
type Feedback = BugWidgetFeedback | SurveyFormFeedback | RatingWidgetFeedback;
interface BugWidgetFeedback {
  _id: string;
  widgetId: string;
  widgetType: WidgetType;
  response: {
    mediaUrl?: string;
    mediaType?: string;
    feedbackText?: string;
  };
  source: {
    url: string;
    browser: string;
    userAgent: string;
    clientEmail: string;
  };
  createdAt: string;
}

interface SurveyFormFeedback {
  _id: string;
  widgetId: string;
  widgetType: WidgetType;
  response: {
    answers: {
      [key: string]: string | number | string[]; // Assuming the values can be string, number, or string array
    };
  };
  source: {
    url: string;
    browser: string;
    userAgent: string;
    clientEmail: string;
  };
  createdAt: string;
}

interface RatingWidgetFeedback {
  _id: string;
  widgetId: string;
  widgetType: WidgetType;
  response: {
    rating: number;
    feedbackText?: string;
  };
  source: {
    url: string;
    browser: string;
    userAgent: string;
    clientEmail: string;
  };
  createdAt: string;
}

// frontend specific types
interface SurveyFormInput {
  field: string;
  questionText: string;
  questionId: string;
  fieldDetails: object;
}

type HandleUpdates = ({
  updates,
  index,
}: {
  updates: any;
  index: number;
}) => void;

interface SubscriptionData {
  type: string;
  id: string;
  attributes: {
    store_id: number;
    customer_id: number;
    order_id: number;
    order_item_id: number;
    product_id: number;
    variant_id: number;
    product_name: string;
    variant_name: string;
    user_name: string;
    user_email: string;
    status: string;
    status_formatted: string;
    card_brand: string;
    card_last_four: string;
    pause: null | any; // Update with the correct type if needed
    cancelled: boolean;
    trial_ends_at: null | any; // Update with the correct type if needed
    billing_anchor: number;
    first_subscription_item: null | any; // Update with the correct type if needed
    urls: {
      update_payment_method: string;
      customer_portal: string;
    };
    renews_at: string;
    ends_at: null | any; // Update with the correct type if needed
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
  relationships: {
    store: {
      links: {
        related: string;
        self: string;
      };
    };
    customer: {
      links: {
        related: string;
        self: string;
      };
    };
    order: {
      links: {
        related: string;
        self: string;
      };
    };
    "order-item": {
      links: {
        related: string;
        self: string;
      };
    };
    product: {
      links: {
        related: string;
        self: string;
      };
    };
    variant: {
      links: {
        related: string;
        self: string;
      };
    };
    "subscription-items": {
      links: {
        related: string;
        self: string;
      };
    };
    "subscription-invoices": {
      links: {
        related: string;
        self: string;
      };
    };
  };
  links: {
    self: string;
  };
}

interface CustomData {
  _id: string;
  name: string;
  email: string;
  customerId: string;
}

interface MetaData {
  test_mode: boolean;
  event_name: string;
  custom_data: CustomData;
  webhook_id: string;
}

interface WebhookPayload {
  meta: MetaData;
  data: SubscriptionData;
}
