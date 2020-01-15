const localhost = 'http://127.0.0.1:8080'

const api = '/api'

export const endpoint = `${localhost}${api}`
export const getDiariesURL = `${endpoint}/diaries`
export const getDiaryURL = id => `${endpoint}/diaries/${id}/view`
export const deleteDiariesURL = id => `${endpoint}/diaries/${id}/delete`
export const signupURL = `${endpoint}/users`
export const loginURL = `${endpoint}/auth`
export const authenticationURL = `${endpoint}/auth/user`
