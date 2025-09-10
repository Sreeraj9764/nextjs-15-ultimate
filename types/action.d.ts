interface SignInWithOauthParams {
  provider: "google" | "github";
  providerAccountId: string;
  user: {
    name: string;
    email: string;
    username: string;
    image?: string;
  };
}

interface AuthCredentials {
  email: string;
  password: string;
  name: string;
  username: string;
}
