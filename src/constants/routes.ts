const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  ASK_QUESTION: `/ask-question`,
  COMMUNITY: `/community`,
  COLLECTION: `/collection`,
  JOBS: `/jobs`,
  TAGS: `/tags`,
  TAG: (id: string) => `/tags/${id}`,
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/question/${id}`,
  EDIT_QUESTION: (id: string) => `/question/${id}/edit`,
};

export default ROUTES;
