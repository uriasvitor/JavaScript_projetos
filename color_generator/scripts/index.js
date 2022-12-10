var btn_generate = document.getElementById("btn")
var color_name = document.querySelectorAll(".hexa-color")
var card_count = document.querySelector(".cards")
var result = 0;
    
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

