import { SERVER_URL } from "../environment";
import { authState } from "../state/auth-state";

const serverURL = SERVER_URL? SERVER_URL : '';

export async function login(values: any) {
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

export async function register(values: any) {
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

export async function refresh() {
    const auth: any = authState.getState();
    const token = auth.token.refreshToken;
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


export async function logout() {
    const auth: any = authState.getState();
    const token = auth.token.accessToken;
    const endPoint = '/auth/logout'
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer '+ token},
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