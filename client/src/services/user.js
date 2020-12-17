import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const addUser = async (roomID) => {
    console.log("rid", roomID)
    return axios.post(baseUrl+"/room/addUser", {roomID: roomID})
}

export default addUser
