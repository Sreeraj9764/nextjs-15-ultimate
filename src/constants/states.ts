import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
  title: "No Data Available",
  message:
    "Looks like the database is taking a break. Please check back later.",
  button: {
    text: "Go to Home",
    href: ROUTES.HOME,
  },
};

export const DEFAULT_ERROR = {
  title: "Opps! Something Went Wrong",
  message: "Our servers are having a little trouble. Please try again later.",
  button: {
    text: "Try Again",
    href: ROUTES.HOME,
  },
};

export const EMPTY_QUESTIONS = {
  title: "No Questions Found",
  message:
    "It seems there are no questions here yet. Be the first to ask a question!",
  button: {
    text: "Ask a Question",
    href: ROUTES.ASK_QUESTION,
  },
};

export const EMPTY_TAGS = {
  title: "No Tags Found",
  message:
    "It seems there are no tags here yet. Explore other sections or create new tags!",
  button: {
    text: "Explore Community",
    href: ROUTES.TAGS,
  },
};

export const EMPTY_COMMUNITY = {
  title: "No Community Posts Found",
  message:
    "It seems there are no community posts here yet. Explore other sections or start a new discussion!",
  button: {
    text: "Explore Community",
    href: ROUTES.COMMUNITY,
  },
};

export const EMPTY_COLLECTIONS = {
  title: "No Collections Found",
  message:
    "It seems there are no collections here yet. Explore other sections or create a new collection!",
  button: {
    text: "Explore Collections",
    href: ROUTES.COLLECTION,
  },
};

export const EMPTY_JOBS = {
  title: "No Job Listings Found",
  message:
    "It seems there are no job listings here yet. Explore other sections or check back later!",
  button: {
    text: "Explore Jobs",
    href: ROUTES.JOBS,
  },
};
