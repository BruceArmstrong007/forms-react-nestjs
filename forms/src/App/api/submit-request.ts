import { requestAdditionalOptions } from "../../shared/utils/variables";
import { SERVER_URL } from "../environment";

const serverURL = SERVER_URL ? SERVER_URL : "";

export async function getForms(formID: string) {
  const endPoint = "/submits/get-form/" + formID;
  const requestOptions: any = {
    ...requestAdditionalOptions,

    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
  const endPoint = "/submits/submit-form";
  const requestOptions: any = {
    ...requestAdditionalOptions,

    method: "POST",
    headers: {
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

export async function uploadFile(values: any) {
  const endPoint = "/submits/upload-file";
  const requestOptions: any = {
    ...requestAdditionalOptions,

    method: "PUT",
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
  const endPoint = "/submits/delete-file/" + fileName;
  const requestOptions: any = {
    ...requestAdditionalOptions,

    method: "DELETE",
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
