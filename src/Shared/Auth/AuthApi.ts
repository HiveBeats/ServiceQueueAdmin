import { AxiosResponse } from 'axios';
import apiBase from '../../apiBase';
import TokenService from './TokenService';

export interface RegisterRequest {
    userName: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    userName?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface LoginRequest {
    userName?: string;
    email?: string;
    password: string;
}

export interface LoginResponse {
    userName?: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
    userName?: string;
}

export class AuthApi {
    
    register(credentials: RegisterRequest): Promise<RegisterResponse> {
        return apiBase.post<RegisterResponse>('Users/Auth/Register', credentials).then(d => {
            return d.data
        });
    }

    login(credentials: LoginRequest): Promise<LoginResponse> {
        return apiBase.post<LoginResponse>('Users/Auth/Login', credentials).then(d => {
            return d.data
        });
    }

    logout() {
        return apiBase.post('Users/Auth/logout');
    }

    getUserData(): Promise<LoginResponse> {
        return apiBase.get<LoginResponse>('Users/Auth/user').then(d => d.data);
    }
}

