const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  QUESTIONS: (id: string) => `/questiones/${id}`,
  ASK_QUESTION: `/ask-question`,
  TAGS: (id: string) => `/tags/${id}`,
  PROFILE: (id: string) => `/profile/${id}`,
};

export default ROUTES;
