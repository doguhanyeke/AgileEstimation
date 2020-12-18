const getAverage = (arr) => {
    const arrSize = arr.length
    if(arrSize === 0) return 0

    const sumArr = arr.reduce((sum, ele) => {
        return sum + ele
    }, 0)

    return sumArr / arrSize
}

exports.getAverage = getAverage