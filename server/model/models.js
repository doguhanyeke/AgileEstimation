class Vote {
    constructor(score, userID) {
        this.userID = userID;
        this.score = score;
    }
}

class User {
    constructor(userID, userName){
        this.id = userID;
        this.name = userName;
    }
}

class Room {
    constructor(roomID, admin) {
      this.roomID = roomID;
      this.users = [admin];
      this.status = "start"
      this.admin = admin;
      this.addUser = this.addUser.bind(this);
      this.voteFromUser = this.voteFromUser.bind(this);
      this.flushVotes = this.flushVotes.bind(this);
      this.changeStatus = this.changeStatus.bind(this);
      this.votes = [];
    }

    addUser(userID, userName) {
      this.users.push(new User(userID,userName));
    }

    voteFromUser(userID, score) {
        this.votes.push(new Vote(score,userID));
    }

    flushVotes() {
        this.votes = [];
    }

    changeStatus(status) {
        this.status = status;
    }
}

module.exports = {
    User,
    Vote,
    Room
}