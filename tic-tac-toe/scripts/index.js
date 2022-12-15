(()=>{
    const handleSquare = document.querySelectorAll("td")
    var btn = document.getElementById("btn")
    var Player      = []
    var playerOne   = []
    var playerTwo   = []
    
    btn.addEventListener('click', ()=>{
        startGame()
    })


    function startGame(){
        createGame()
    }

    function createGame(){
        randomSimbol()

        for(let i = 0; i < handleSquare.length; i++){
            handleSquare[i].addEventListener("click",()=>{
                handleSquare[i].innerHTML = player
            })
        }
    }

    function randomSimbol(){
        var simbols     = ['X', '0']
        const random = Math.floor(Math.random()* simbols.length)
        playerOne = random
        
        if(playerOne == 0){
            playerTwo = 1
        }else{
            playerOne = 1
            playerTwo = 0
        }

        roundMatch(playerOne, playerTwo)

    }

    function roundMatch(playerOne,playerTwo){
        players = [playerOne,playerTwo]
        player = players.length -1

        console.log(players)
    }




})();