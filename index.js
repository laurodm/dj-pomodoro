const currentPomodoro = { m: 0, s: 5 }
let pointer = null
const pomodoro = [
    { m: 0, s: 5 },
    { m: 0, s: 3 }
]

let timeLoop = null

function setClockValue () {
    const { m, s } = currentPomodoro
    const clock = document.querySelector('.clock')
    clock.innerHTML = formatTimeString(m, s)
}

function startClock () {
    timeLoop = setInterval(function () {
        timeCount()
        setClockValue()
    }, 1000)
}

function stopClock () {
    clearInterval(timeLoop)
    currentPomodoro.m = 0
    currentPomodoro.s = 5
    setClockValue()
}

function pauseClock () {
    clearInterval(timeLoop)
}

function timeCount () {
    let { m, s } = currentPomodoro

    if (m == 0 && s == 0) {
        clearInterval(timeLoop)
    } else if (m > 0 && s === 0) {
        m -= 1
    } else if (m !== 0 && s === 0) {
        s = 59
    } else if (s > 0) {
        s -= 1
    }

    currentPomodoro.m = m
    currentPomodoro.s = s
}

function formatTimeString (minutes, secounds) {
    return `${formatTimeNumber(minutes)}:${formatTimeNumber(secounds)}`
}

function formatTimeNumber (number) {
    return number < 10 ? '0' + number : number
}

function setControllsEvents () {
    const startBtn = document.querySelector('#startBtn')
    const pauseBtn = document.querySelector('#pauseBtn')

    startBtn.addEventListener('click', () => {
        startClock()
    })

    pauseBtn.addEventListener('click', () => {
        pauseClock()
    })

    stopBtn.addEventListener('click', () => {
        stopClock()
    })
}


window.onload = function () {
    setClockValue()
    setControllsEvents()
}