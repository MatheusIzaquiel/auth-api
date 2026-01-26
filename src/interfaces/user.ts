import { Request } from "express";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string
  user:{
    id: number
    name: string
    email: string
  }
}

export interface User {
  id: number
  name: string
  email: string
  password: string
}

export interface TokenPayload {
  id: number;
  name: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}
