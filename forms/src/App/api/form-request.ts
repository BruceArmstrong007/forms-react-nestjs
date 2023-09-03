import { UploadOptions } from "../../shared/utils/enums";
import { requestAdditionalOptions } from "../../shared/utils/variables";
import { SERVER_URL } from "../environment";
import { authState } from "../state/auth-state";

const serverURL = SERVER_URL ? SERVER_URL : "";

export async function uploadFile(values: any, type: UploadOptions) {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/forms/" + type;
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

export async function deleteFile(fileName: string) {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/forms/delete-file/" + fileName;
  const requestOptions: any = {
    ...requestAdditionalOptions,

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

export async function getForms() {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/forms/list";
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

export async function saveForm(values: any) {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/forms/save";
  const requestOptions: any = {
    ...requestAdditionalOptions,

    method: "POST",
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

export async function deleteForm(formID: string) {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/forms/delete/" + formID;
  const requestOptions: any = {
    ...requestAdditionalOptions,

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

export async function getResponses() {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/submits/responses";
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

export async function deleteResponse(responseID: string) {
  const auth: any = authState.getState();
  const token = auth.token.accessToken;
  const endPoint = "/submits/delete-response/" + responseID;
  const requestOptions: any = {
    ...requestAdditionalOptions,

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
