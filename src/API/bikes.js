import {
  APIConfig,
} from 'Config'

const BASE_URL = APIConfig.baseUrl

const getAvailableBikes = async (from, to) => {
  const url = `${BASE_URL}/bikes/?from=${from.toISOString()}&to=${to.toISOString()}`
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

const rateBike = async (reservation, rating) => {
  const url = `${BASE_URL}/reservations/${reservation}/`
  const method = "PATCH"
  const headers = {
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    ranking: parseInt(rating),
  })
  const result = await fetch(url, {
    body,
    headers,
    method,
  })
  if (result.status === 200) {
    const parsedResult = await result.json()
    return {statusCode: 200, message: "Success"}
  }
  return {statusCode: 400, message: "Bad request"}
}

const deleteBike = async (bike) => {
  const url = `${BASE_URL}/bikes/${bike}/`
  const method = "DELETE"
  const headers = {
    'Content-Type': 'application/json'
  }
  const result = await fetch(url, {
    method,
    headers,
  })
  if (result.status === 204) {
    return {statusCode: 204, message: "Deleted"}  
  }
  return {statusCode: 400, message: "Bad request"}
}

const getBikes = async () => {
  const url = `${BASE_URL}/bikes/`
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

const createBike = async (model, color, location, enabled) => {
  const url = `${BASE_URL}/bikes/`
  const method = "POST"
  const headers = {
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    model: model,
    color: color,
    location: location,
    enable: enabled,
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

const editBike = async (id, model, color, location, enabled) => {
  const url = `${BASE_URL}/bikes/${id}/`
  const method = "PATCH"
  const headers = {
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    model: model,
    color: color,
    location: location,
    enable: enabled,
  })
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

export {
  createBike,
  deleteBike,
  editBike,
  getAvailableBikes,
  getBikes,
  rateBike,
}