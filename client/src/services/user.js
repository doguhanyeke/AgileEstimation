import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export const addUser = async (roomID) => {
    console.log("rid", roomID)
    return axios.post(baseUrl+"/room/addUser", {roomID})
}

export const changeUserName = async(username) => {
    return axios.post(baseUrl+"/room/changeUsername", {username})
}
