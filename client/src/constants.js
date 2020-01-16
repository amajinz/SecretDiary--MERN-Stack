const localhost = "http://127.0.0.1:8080";

const api = "/api";

export const endpoint = `${localhost}${api}`;
export const getDiariesURL = `${endpoint}/diaries`;
export const addDiaryURL = `${endpoint}/diaries/new`;
export const getDiaryURL = id => `${endpoint}/diaries/${id}/view`;
export const deleteDiaryURL = id => `${endpoint}/diaries/${id}/delete`;
export const updateDiaryURL = id => `${endpoint}/diaries/${id}/update`;
export const signupURL = `${endpoint}/users`;
export const loginURL = `${endpoint}/auth`;
export const authenticationURL = `${endpoint}/auth/user`;
