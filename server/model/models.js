class Vote {
    constructor(score, user) {
        this.user = user
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
        this.admin = admin.name
        this.votes = []

        this.upsertUser = this.upsertUser.bind(this)
        this.voteFromUser = this.voteFromUser.bind(this)
        this.flushVotes = this.flushVotes.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
    }

    upsertUser(userID, username) {
        const index = this.users.findIndex( user => {
            return user.id === userID
        })
        if (index === -1) {
            this.users.push(new User(userID,username))
            return
        }

        const updatedUser = new User(userID, username)
        this.users[index] = updatedUser
        this.votes.find( vote => {
            if (vote.user.id === userID) {
                vote.user = updatedUser
            }
        })
    }

    removeUser(userID) {
        this.users = this.users.map(user => {
            if(user.userID !== userID) {
                return user
            }
        })
    }

    voteFromUser(user, score) {
        this.votes.push(new Vote(score,user))
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