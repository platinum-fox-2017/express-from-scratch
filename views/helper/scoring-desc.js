function scoringHelper(num) {
    if (num >= 85) {
        return 'A'
    }else if (num >=75 && num < 85) {
        return 'B'
    }else if (num <75 && num >= 65) {
        return 'C'
    }else if (num < 65 && num >= 55) {
        return 'D'
    }else{
        return 'E'
    }
}

module.exports = scoringHelper