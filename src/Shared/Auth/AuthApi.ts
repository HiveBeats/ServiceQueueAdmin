import { AxiosResponse } from 'axios';
import apiBase from '../../apiBase';
import TokenService from './TokenService';

export interface RegisterRequest {
    userName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    userName?: string;
    email?: string;
    password: string;
}

export interface LoginResponse {
    userName?: string;
    role?: string;
}

export class AuthApi {
    
    register(credentials: RegisterRequest): Promise<any> {
        return apiBase.post('Users/Auth/Register', credentials);
    }

    login(credentials: LoginRequest): Promise<LoginResponse> {
        return apiBase.post<LoginResponse>('Users/Auth/Login', credentials).then(d => {
            return this.getUserData();
        });
    }

    logout(): Promise<any> {
        return apiBase.post('Users/Auth/logout').then(d => {
            TokenService.removeUser();
        });
    }

    getUserData(): Promise<LoginResponse> {
        return apiBase.get<LoginResponse>('Users/Auth/user').then(d => d.data).then(d => {
            TokenService.setUser(d);
            return d;
        });
    }
}

