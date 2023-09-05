import { requestAdditionalOptions } from "../../shared/utils/variables";
import { SERVER_URL } from "../environment";
import { authState } from "../state/auth-state";

const serverURL = SERVER_URL ? SERVER_URL : "";

export async function profile() {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/user/profile";
  const requestOptions: any = {
    ...requestAdditionalOptions,

    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let result = null;
  try {
    result = await fetch(serverURL + endPoint, requestOptions);
    result = await result.json();
  } catch (e) {
    console.error(e);
    return null;
  }
  return result;
}

export async function update(values: any) {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/user/update";
  const requestOptions: any = {
    ...requestAdditionalOptions,

    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };
  let result = null;
  try {
    result = await fetch(serverURL + endPoint, requestOptions);
    result = await result.json();
  } catch (e) {
    console.error(e);
    return null;
  }
  return result;
}

export async function uploadProfile(values: any) {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/user/upload-profile";
  const requestOptions: any = {
    ...requestAdditionalOptions,

    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: values,
  };
  let result = null;
  try {
    result = await fetch(serverURL + endPoint, requestOptions);
    result = await result.json();
  } catch (e) {
    console.error(e);
    return null;
  }
  return result;
}
