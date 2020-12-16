class Vote {
    constructor(score, userID) {
        this.userID = userID
        this.score = score
    }
}

class User {
    constructor(userID, userName, userVote){
        this.id = userID
        this.name = userName
        this.userVote = userVote
    }
}

class Room {
    constructor(roomID, admin) {
        this.roomID = roomID
        this.users = [admin]
        this.status = 'start'
        this.admin = admin
        this.addUser = this.addUser.bind(this)
        this.voteFromUser = this.voteFromUser.bind(this)
        this.flushVotes = this.flushVotes.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
        this.votes = []
    }

    addUser(userID, userName) {
        this.users.push(new User(userID,userName))
    }

    removeUser(userID) {
        this.users = this.users.map(user => {
            if(user.userID !== userID) {
                return user
            }
        })
    }

    voteFromUser(userID, score) {
        this.votes.push(new Vote(score,userID))
    }

    flushVotes() {
        this.votes = []
    }

    changeStatus(status) {
        this.status = status
    }
}

module.exports = {
    User,
    Vote,
    Room
}