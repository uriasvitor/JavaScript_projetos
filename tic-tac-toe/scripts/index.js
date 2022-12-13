(function(){
    const handleSquare = document.querySelectorAll("td")
    const square = 9;


    for(let i = 0; i < handleSquare.length; i++){
        handleSquare[i].addEventListener("click",()=>{
            handleSquare[i].innerHTML = "X"
        })
    }
    
    function startGame(){}

    function createGame(){
        const square = 9;

    }

})()