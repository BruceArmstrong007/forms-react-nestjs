 
export interface LoginForm {
    username: string;
    password: string;
}
  
interface AuthState {
    access: string | null,
    refresh: string | null,
}

export interface AppState {
    auth: AuthState,
    admin: {
        profile: object
    }
}