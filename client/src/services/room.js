import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export const createRoom = async () => {
    const result = await axios.get(baseUrl+"/room/create")
    // console.log(result.data)
    return result.data
}

export const getStatus = async (token) => {
    const result = await axios.get(baseUrl+"/room/status", {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Cache-Control': "no-cache"
        }
      })
    // console.log(result.data)
    return result
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createRoom,
    getStatus
}