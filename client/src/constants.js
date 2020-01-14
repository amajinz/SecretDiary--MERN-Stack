const localhost = 'http://127.0.0.1:8080'

const api = '/api'

export const endpoint = `${localhost}${api}`
export const getDiariesURL = `${endpoint}/diaries`
export const deleteDiariesURL = id => `${endpoint}/diaries/${id}/delete`