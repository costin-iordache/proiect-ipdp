export interface LoginResponseSuccess {
    message: 'Login successful';
    user: {
      id: number; 
      username: string;
      email: string;
    };
  }
  
  export interface LoginResponseError {
    error: string;
  }
  
  export type LoginResponse = LoginResponseSuccess | LoginResponseError;