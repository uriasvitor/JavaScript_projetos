//old clock 
setInterval(setClock, 1000);
const hourHand      = document.querySelector('[data-hour-hand]')
const minuteHand    = document.querySelector('[data-minute-hand]')
const secondHand    = document.querySelector('[data-second-hand]')
const oldClock      = document.querySelector('.container-clock')
const clockBtn      = document.getElementById('clock-btn')

//Digital clock
const digitalBtn        = document.getElementById('digital-btn')
const digitalClock      = document.querySelector('.container-digital')
const hourDigital       = document.querySelector('.digital-hour')
const minutesDigital    = document.querySelector('.digital-minutes')
const secondsDigital    = document.querySelector(".digital-seconds")


digitalBtn.addEventListener("click",()=>{
    digitalClock.setAttribute("data-active","true")
    oldClock.setAttribute("data-active","false")
})

clockBtn.addEventListener("click",()=>{
    digitalClock.setAttribute("data-active","false")
    oldClock.setAttribute("data-active","true")
})


function setClock(){
    const currentDate   = new Date()
    const secondsRate   = currentDate.getSeconds() / 60
    const minutesRate   = ( secondsRate + currentDate.getMinutes()) / 60;
    const hourRate      = ( minutesRate + currentDate.getHours()) / 12
    
    setDigitalTime(currentDate)

    setRotation(hourHand, hourRate)
    setRotation(minuteHand, minutesRate)
    setRotation(secondHand, secondsRate)
}


function setRotation(element, rotationRatio){
    element.style.setProperty('--rotation', rotationRatio * 360)
}

function setDigitalTime(currentTime){
    hourDigital.innerHTML       = currentTime.getHours()
    secondsDigital.innerHTML    = currentTime.getSeconds()
    minutesDigital.innerHTML    = currentTime.getMinutes()
}

setClock()