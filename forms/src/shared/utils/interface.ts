 
export interface LoginForm {
    username: string;
    password: string;
}
  
interface AuthState {
    access: string | null,
    refresh: string | null,
}

export interface Options {
    bold: boolean;
    italic: boolean;
    underline: boolean;
}