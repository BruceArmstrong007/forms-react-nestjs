import { SERVER_URL } from "../../environment";
import { authState } from '../../state/AuthState';

const serverURL = SERVER_URL? SERVER_URL : '';

export const profile = async () => {
    const endPoint = '/user/profile';
    const auth: any = authState.getState();
    console.log(auth);
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ auth.auth.accessToken},
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