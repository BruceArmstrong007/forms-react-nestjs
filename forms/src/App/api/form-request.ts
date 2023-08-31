import { UploadOptions } from "../../shared/utils/enums";
import { SERVER_URL } from "../environment";
import { authState } from "../state/auth-state";

const serverURL = SERVER_URL ? SERVER_URL : "";

export async function uploadFile(values: any, type: UploadOptions) {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/forms/" + type;
  const requestOptions = {
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

export async function deleteFile(fileName: string) {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/forms/delete-file/" + fileName;
  const requestOptions = {
    method: "DELETE",
    headers: {
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
