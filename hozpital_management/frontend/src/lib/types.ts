
export interface TokenPayload {
    userId: string;
    email: string;
    role: string;
    exp: number;  
  }
  
  export interface AuthToken {
    token: string;  
    expiresIn: number; 
  }
export interface SignupResponse {
  username: string;
  email: string;
  password: string;
  error: string;
}
