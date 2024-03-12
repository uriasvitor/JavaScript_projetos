
(function(){
    const today = document.querySelector('.container').classList[1]
    const yesterday = document.querySelector('.container').classList[2]
    const getCardsSection = document.querySelector(`.cards-section-${today}`)
    const getOpenFormButton =  document.querySelector(`.open-form-${today}`)
    const getAddNewCardButton = document.querySelector(`.add-new-card-${today}`)
    const getAddCardButton = document.querySelector(`.add-card-${today}`)
    const getBackButton = document.querySelector(`.back-${today}`)
    const getRemoveAllButton = document.querySelector(`.remove-all-${today}`)
    const getCardsFinished = document.querySelector(`.card-finish-${today}`)

    let cardId = 1;
    let cardCompleted = 0;

    createCard = ()=>{
        const titleValue = document.querySelector(`#title-${today}`).value
        const descriptionValue = document.querySelector(`#description-${today}`).value
        const cardBox = document.createElement("div")
        const titleCard = document.createElement("div")
        const descriptionCard = document.createElement("div")
        const timeCard = document.createElement("div")
        let currentHourNow = dateHour();
        
        cardId++
        
        cardBox.classList.add("card-task-" + cardId + '-' + today)
        
        titleCard.classList.add("title-task-" + today)
        titleCard.innerHTML = ` <p>${titleValue}</p>`

        descriptionCard.classList.add("description-" + today)
        descriptionCard.innerHTML = `${descriptionValue}`
        
        timeCard.classList.add("timeNow-" + today)
        timeCard.innerHTML = `${currentHourNow}`
        getCardsSection.appendChild(cardBox, cardId).appendChild(titleCard)
        cardBox.appendChild(descriptionCard)
        cardBox.appendChild(timeCard)
        
        cardControl(cardId)
        toggleCardForm()
        
        saveCards(cardId,titleValue,descriptionValue,currentHourNow,0)
        
    }
    
    
    function createControlDiv() {
        const controlDiv = document.createElement("div")
        controlDiv.classList.add("card-control-" + today)
        return controlDiv;
    }
    
    function createRemoveControlDiv(index) {
        const removeControlDiv = document.createElement("div")
        removeControlDiv.classList.add(`remove-${index}-${today}`)
        removeControlDiv.innerHTML = "-"
        return removeControlDiv
    }
    
    function createDoneControlDiv(index) {
        const doneControlDiv = document.createElement("div")
        doneControlDiv.classList.add(`done-${index}`)
        doneControlDiv.innerHTML = "Feito"
        return doneControlDiv
    }
    
    function cardControl(index) {
        cardNumber = `.card-task-${index}-${today}`
        const allCards = document.querySelector(cardNumber)
        
        const controlDiv = createControlDiv();
        const removeControlDiv = createRemoveControlDiv(index);
        const doneControlDiv = createDoneControlDiv(index);
        
        allCards.appendChild(controlDiv).appendChild(removeControlDiv)
        controlDiv.append(doneControlDiv)
        
        doneControlDiv.addEventListener("click", () => {
            doneCard(index)
        })
        removeControlDiv.addEventListener("click", () => {
            removeCardById(index)
        })
    }
    
    toggleCardForm = ()=>{
        getAddNewCardButton.classList.toggle("active")
        getOpenFormButton.classList.toggle("disabled")
        getBackButton.classList.toggle("disabled")
    }
    
    function doneCard(id){
        const cardNumber = `.card-task-${id}-${today}`
        
        const card = document.querySelector(cardNumber)
        
        card.classList.toggle("closed")

        if(card.classList.contains("closed")){
            cardCompleted++;
            cardStoraged(id,'closed')
        }else{
            cardCompleted-- ;
            cardStoraged(id)
        }

        cardsFinished(cardCompleted)

    }

    function cardsFinished(number){

        getCardsFinished.innerHTML = number
        
        if(number == null || undefined){
            return
        }

        localStorage.setItem("cardsFinished",number)
        saveCardOfDay()
    }

    function removeCardById(id){
        const cardNumber = `.card-task-${id}-${today}`
        const card = document.querySelector(cardNumber)

        card.remove()

        if(card.classList.contains('closed')){
            cardCompleted -= 1
            cardsFinished(cardCompleted)
        }

        const cards = JSON.parse(localStorage.getItem("cards-" + today))
        const updatedCards = cards.filter((obj) => {
            return obj.id != id
        })
        
        localStorage.setItem("cards-" + today, JSON.stringify(updatedCards))
        saveCardOfDay()

    }

    const removeAllCards = ()=>{
        const allCards = document.querySelector(".cards-section-" + today)

        while(allCards.firstChild){
            allCards.removeChild(allCards.firstChild)
        }
        
        cardId = 1;
        cardCompleted = 0;
        
        localStorage.clear();
        cardsFinished(cardCompleted)

        saveCardOfDay()
    }
    
    function dateHour(currentHourNow){
        let currentTime = new Date().toLocaleString();
        return currentTime
    }
    
    function saveCards(cardId, titleValue,descriptionValue,currentHourNow,status){

        const card = {
            id:cardId,
            title:titleValue,
            description: descriptionValue,
            time: currentHourNow,
            status:status,
        }

        let cards = JSON.parse(localStorage.getItem('cards-'+ today)) || []
        cards.push(card)

        localStorage.setItem('cards-'+ today, JSON.stringify(cards))

        saveCardOfDay()
    }

    function displayTodayCards() {
        
        cardsFinished(localStorage.getItem('cardsFinished'))

        numeration = localStorage.getItem("cardsFinished")
        cardCompleted = numeration;
        
        let cards = JSON.parse(localStorage.getItem('cards-' + today)) || []

        for (let card of cards) {
            const cardBox = document.createElement("div")
            const titleCard = document.createElement("div")
            const descriptionCard = document.createElement("div")
            const timeCard = document.createElement("div")
            
            cardId++
            
            cardBox.classList.add("card-task-" + card.id + '-' + today, card.status)
            
            titleCard.classList.add("title-task-" + today)
            titleCard.innerHTML = ` <p>${card.title}</p>`
    
            descriptionCard.classList.add("description-" + today)
            descriptionCard.innerHTML = `${card.description}`
    
            timeCard.classList.add("timeNow-" + today)
            timeCard.innerHTML = `${card.time}`
    
            cardBox.appendChild(titleCard)
            cardBox.appendChild(descriptionCard)
            cardBox.appendChild(timeCard)
    
            getCardsSection.appendChild(cardBox)

            cardControl(card.id)
        }
    }

    function saveCardOfDay(){
        const getCardDay = document.querySelector(`.card-day-${today}`)
        localStorage.setItem("cardsDay-" + today, getCardDay.outerHTML)
    }

    function cardStoraged(id,state){
        const cards =  JSON.parse(localStorage.getItem("cards-" + today))
        const getId = cards.find((obj)=>{
            return obj.id == id
        })

        getId.status = state

        localStorage.setItem("cards-" + today, JSON.stringify(cards))
        saveCardOfDay()
    }

    function displayOldCards(){
        const getOldCardsDiv = document.querySelector(".oldCards")
        const getOldCardsLocal = localStorage.getItem("cardsDay-" + yesterday)
        
        if(!getOldCardsLocal)return

        getOldCardsDiv.innerHTML = getOldCardsLocal
        getOldCardsDiv.classList.add("readOnly")

        console.log(getOldCardsLocal)
        
    }


    displayTodayCards()
    displayOldCards()

    getRemoveAllButton.addEventListener("click", removeAllCards)
    getOpenFormButton.addEventListener("click", toggleCardForm)
    getAddCardButton.addEventListener("click", createCard)
    getBackButton.addEventListener("click", toggleCardForm)
})()