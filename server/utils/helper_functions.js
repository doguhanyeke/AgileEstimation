const getAverage = (arr) => {
    const arrSize = arr.length
    if(arrSize === 0) return 0

    const sumArr = arr.reduce((sum, ele) => {
        return sum + ele
    }, 0)

    return sumArr / arrSize
}

const mostVoted = (arr) => {
    const arrSize = arr.length
    if(arrSize === 0) return 0

    const tmp = {}
    arr.map( element => {
        if (element in tmp) {
            tmp[element] += 1
        } else {
            tmp[element] = 1
        }
    })

   const votes = Object.keys(tmp)
   let mostVoted, soFar
   mostVoted = votes[0]
   soFar = 0

   votes.map(el => {
       if(tmp.el > soFar) {
           soFar = tmp.el
           mostVoted = el
       }
   })
   return mostVoted
}

exports.getAverage = getAverage
exports.mostVoted = mostVoted