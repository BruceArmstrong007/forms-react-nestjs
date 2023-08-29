import { SERVER_URL } from "../../environment";
import { authState } from "../../state/AuthState";

const serverURL = SERVER_URL? SERVER_URL : '';

export async function LoginRequest(values: any) {
    const endPoint = '/auth/login'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    let result = null;
    try{
        result = await fetch(serverURL + endPoint,requestOptions);
        result = await result.json();
    }
    catch(e){
        console.error(e);
        return null;
    }
    return result
}

export async function RegisterRequest(values: any) {
    const endPoint = '/auth/register'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    let result = null;
    try{
        result = await fetch(serverURL + endPoint,requestOptions);
        result = await result.json();
    }
    catch(e){
        console.error(e);
        return null;
    }
    return result
}

export async function RefreshTokenRequest() {
    const auth: any = authState.getState();
    const token = auth.auth.refreshToken;
    const endPoint = '/auth/refresh'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({refresh: token})
    };
    let result = null;
    try{
        result = await fetch(serverURL + endPoint,requestOptions);
        result = await result.json();
    }
    catch(e){
        console.error(e);
        return null;
    }
    return result
}


export async function LogoutRequest() {
    const auth: any = authState.getState();
    const token = auth.auth.refreshToken;
    const endPoint = '/auth/logout'
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({refresh: token})
    };
    let result = null;
    try{
        result = await fetch(serverURL + endPoint,requestOptions);
        result = await result.json();
    }
    catch(e){
        console.error(e);
        return null;
    }
    return result
}