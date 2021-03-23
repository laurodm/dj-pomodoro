let timeLoop = null
let pointer = 0
let status = 'stop'
let audio = new Audio('bell.mp3');
const times = [
    { m: 0, s: 5, name: 'Work' },
    { m: 0, s: 3, name: 'Interval' }
]
let currentPomodoro = { ...times[pointer] }


function setClockValue () {
    const { m, s } = currentPomodoro
    const clock = document.querySelector('.clock')
    clock.innerHTML = formatTimeString(m, s)
}

function startClock () {
    if (['stop', 'paused'].includes(status)) {
        setTimeName()
        status = 'plaing'
        timeLoop = setInterval(function () {
            timeCount()
            setClockValue()
        }, 1000)
    }
}

function stopClock () {
    status = 'stop'
    clearInterval(timeLoop)
    pointer = 0
    currentPomodoro = { ...times[pointer] }
    setTimeName()
    setClockValue()
}

function pauseClock () {
    status = 'paused'
    clearInterval(timeLoop)
}

function nextTime () {
    status = 'stop'
    clearInterval(timeLoop)
    if (pointer + 1 < times.length) {
        pointer++
    } else {
        stopClock()
        return
    }
    currentPomodoro = { ...times[pointer] }
    setClockValue()
    startClock()
}

function setTimeName () {
    const timeName = document.querySelector('.timeName')
    timeName.textContent = currentPomodoro.name
}

function timeCount () {
    let { m, s } = currentPomodoro

    if (m == 0 && s == 0) {
        clearInterval(timeLoop)
        audio.play();
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

    nextBtn.addEventListener('click', () => {
        nextTime()
    })
}


window.onload = function () {
    setTimeName()
    setClockValue()
    setControllsEvents()
}