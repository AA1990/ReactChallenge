import {
  APIConfig,
} from 'Config'

const BASE_URL = APIConfig.baseUrl

const getUsers = async () => {
  const url = `${BASE_URL}/users/`
  const method = "GET"
  const result = await fetch(url, {
    method,
  })
  if (result.status === 200) {
    const parsedResult = await result.json()
    return {statusCode: 200, message: "Success", data: parsedResult}
  }
  return {statusCode: 400, message: "Bad request"}
}

const deleteUser = async (user) => {
  const url = `${BASE_URL}/users/${user}`
  const method = "DELETE"
  const result = await fetch(url, {
    method,
  })
  if (result.status === 204) {
    return {statusCode: 204, message: "Deleted"}
  }
  return {statusCode: 400, message: "Bad request"}
}

const editUser = async (user, email, password, isManager) => {
  const url = `${BASE_URL}/users/${user}/`
  const method = "PATCH"
  const headers = {
    'Content-Type': 'application/json'
  }
  const bodyJSON = {
    email: email,
    password: password,
    groups: isManager ? ["http://localhost:8000/groups/1/"] : []
  }
  if (!password) {
    delete bodyJSON.password
  }
  const body = JSON.stringify(bodyJSON)
  const result = await fetch(url, {
    method,
    headers,
    body,
  })
  if (result.status === 200) {
    return {statusCode: 200, message: "Success"}  
  }
  return {statusCode: 400, message: "Bad request"}
}

const createUser = async (email, password, isManager) => {
  const url = `${BASE_URL}/users/`
  const method = "POST"
  const headers = {
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    email: email,
    username: email,
    password: password,
    groups: isManager ? ["http://localhost:8000/groups/1/"] : []
  })
  const result = await fetch(url, {
    method,
    headers,
    body,
  })
  if (result.status === 201) {
    return {statusCode: 201, message: "Created"}
  }
  return {statusCode: 400, message: "Bad request"}
}

export {
  createUser,
  deleteUser,
  editUser,
  getUsers,
}