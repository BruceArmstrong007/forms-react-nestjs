import { SERVER_URL } from "../environment";
import { authState } from "../state/auth-state";

const serverURL = SERVER_URL? SERVER_URL : '';

export async function profile() {
    const auth: any = authState.getState();
    const token = auth.token.accessToken;
    const endPoint = '/user/profile'
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer '+ token },
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