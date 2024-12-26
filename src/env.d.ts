declare global {
  interface Window {
    env: {
      API_URL: string;
      LOGIN_URL: string;
      LOGOUT_URL: string;
      AUTH_IDENTITY_PROVIDER: string;
      COGNITO_CLIENT_ID: string;
      MESSAGE_MAX_LENGTH?: number;
    };
  }
}

export {};
