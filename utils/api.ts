import { fetchAPI, postEmailAPI, postSign } from "@/utils/fetchApi";

const BASE_URL = "https://bootcamp-api.codeit.kr/api";
export async function getUser() {
  return fetchAPI(`${BASE_URL}/sample/user`);
}

export async function getFolder() {
  return fetchAPI(`${BASE_URL}/sample/folder`);
}

export async function getFolderType() {
  return fetchAPI(`${BASE_URL}/users/4/folders`);
}

export async function getFolderList(id: number | null) {
  const url =
    id === null
      ? `${BASE_URL}/users/4/links`
      : `${BASE_URL}/users/4/links?folderId=${id}`;
  return fetchAPI(url);
}

export async function getEmailCheck(email: string) {
  const url = `${BASE_URL}/check-email`;
  return postEmailAPI(url, email);
}

export async function getSigninCheck(email: string, password: string) {
  const url = `${BASE_URL}/sign-in`;
  return postSign(url, email, password);
}
export async function getSignup(email: string, password: string) {
  const url = `${BASE_URL}/sign-up`;
  return postSign(url, email, password);
}
