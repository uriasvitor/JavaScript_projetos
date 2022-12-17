const btn_generate = document.getElementById("btn")
const color_name = document.querySelectorAll(".hexa-color")
const card_count = document.querySelector(".cards")
let result = 0;
    
btn_generate.addEventListener("click",() =>{
    createColor()
})

function createColor(){
    for(let i = 0; i < card_count.childElementCount; i++){
        generateRandomNumber()

        card_count.children[i].style.backgroundColor = '#' + result
        color_name[i].innerHTML = '#' + result
    }
}

function generateRandomNumber(){
    result  = Math.floor(100000 + Math.random() * 900000);
    return result 
}

