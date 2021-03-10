let m = 25
let s = 00

setInterval(function () {

    console.log(formatTimeString(m, s))

    if (m == 0 && s == 0) {
        clearInterval(this)
    } else if (m > 0 && s == 0) {
        m -= 1
    }

    if (s == 0) {
        s = 59
    } else if (s > 0) {
        s -= 1
    }

}, 1000)

function formatTimeString (minutes, secounds) {
    return `${formatTimeNumber(minutes)}:${formatTimeNumber(secounds)}`
}

function formatTimeNumber (number) {
    return number < 10 ? '0' + number : number
}