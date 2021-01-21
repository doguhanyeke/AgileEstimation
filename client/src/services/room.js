import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const returnAuthConfig = (token) => {
  return { 
    headers: {
      'Authorization': 'Bearer ' + token,
      'Cache-Control': "no-cache"
    }
  }
}

export const createRoom = async () => {
    const result = await axios.get(baseUrl+"/room/create")
    // console.log(result.data)
    return result.data
}

export const getStatus = async (token) => {
    const result = await axios.get(baseUrl+"/room/status", 
      returnAuthConfig(token)
    )
    // console.log(result.data)
    return result
}

export const changeRoomState = async (state, roomID, token) => {
  const result = await axios.post(baseUrl+"/room/changeRoomState", 
    {roomState: state, roomID}, 
    returnAuthConfig(token)
  )
  console.log(result.data)
  return result
}

export const vote = async (userID, score, roomID, token) => {
  const result = await axios.post(baseUrl+"/room/vote", 
    {userID, score, roomID}, 
    returnAuthConfig(token)
  )
  console.log("/vote", result.data)
  return result
}

export const getResults = async (roomID, token) => {
  console.log("token in /result", token)
  const result = await axios.post(baseUrl+"/room/result/",
    {roomID},
    returnAuthConfig(token)
  )
  console.log("/result", result.data)
  return result
}

export const flushVotes = async (roomID, token) => {
  console.log("token in /flushvotes", token)
  const result = await axios.post(baseUrl+'/room/flushVotes', 
    {roomID},
    returnAuthConfig(token)
  )
  return result
}

export const clearVote = async (userID, roomID, token) => {
  console.log("token in /clearVote", token)
  const result = await axios.post(baseUrl+'/room/clearVote',
  {roomID, userID},
  returnAuthConfig(token))
  return result
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createRoom,
    getStatus,
    changeRoomState,
    vote,
    getResults,
    flushVotes,
    clearVote
}