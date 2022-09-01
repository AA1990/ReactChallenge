import {
  APIConfig,
} from 'Config'

const BASE_URL = APIConfig.baseUrl

const login = async (user, password) => {
  const url = `${BASE_URL}/users/?username=${user}&password=${password}`
  const method = "GET"
  const result = await fetch(url, {
    method,
  })
  const parsedResult = await result.json() || []
  return {statusCode: parsedResult[0] ? result.status : 400, data: parsedResult[0]}
}

const signup = async (user, password) => {
  const url = `${BASE_URL}/users/`
  const method = "POST"
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    email: user,
    username: user,
    grops: [],
    password: password,
  })
  const response = await fetch(url, {
    method,
    headers,
    body,
  })
  if (response.status === 201) {
    const parsedResult = await response.json()
    return {statusCode: 201, message: "Created", data: parsedResult}
  }
  return {statusCode: 400, message: "Bad Request"}
}

export {
  login,
  signup,
}