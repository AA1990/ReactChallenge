import {
  APIConfig,
} from 'Config'

const BASE_URL = APIConfig.baseUrl

const createReservation = async (user, bike, from, to) => {
  const url = `${BASE_URL}/reservations/`
  const method = "POST"
  const headers = {
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    bici: `${BASE_URL}/bikes/${bike}/`,
    user: `${BASE_URL}/users/${user}/`,
    from_date: new Date(from).toISOString(),
    to_date: new Date(to).toISOString(),
    ranking: null
  })
  const result = await fetch(url, {
    method,
    headers,
    body,
  })
  if (result.status === 201) {
    const parsedResult = await result.json()
    return {statusCode: 201, message: "Created"}
  }
  return {statusCode: 400, message: "Bad request"}
}

const getReservationsByUser = async (user) => {
  const url = `${BASE_URL}/reservations/?user=${user}`
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

const cancelReservation = async (reservation) => {
  const url = `${BASE_URL}/reservations/${reservation}`
  const method = "DELETE"
  const headers = {
    'Content-Type': 'application/json'
  }
  const result = await fetch(url, {
    method,
  })
  if (result.status === 204) {
    return {statusCode: 204, message: "Deleted"}  
  }
  return {statusCode: 400, message: "Bad request"}
}

const listReservations = async () => {
  const url = `${BASE_URL}/reservations/`
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

export {
  cancelReservation,
  createReservation,
  getReservationsByUser,
  listReservations,
}