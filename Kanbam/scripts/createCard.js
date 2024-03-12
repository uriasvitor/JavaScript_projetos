let abbreviationDay = '';
let yesterday = '';

(function(){
    const getContainer = document.querySelector('.container')

    function createCardOfDay(){
        getContainer.classList.add(abbreviationDay, yesterday)

        createCard = document.createElement("div")
        createCard.classList.add("card-day-" + abbreviationDay)

        createCardTitle = document.createElement("div")
        createCardTitle.classList.add("title-" + abbreviationDay)
        createCardTitle.innerHTML = day

        createCardInfo = document.createElement("div")
        createCardInfo.classList.add("card-info-" + abbreviationDay)
        createCardInfo.innerHTML = `Cards feitos: <p class="card-finish-${abbreviationDay}"></p>`
        
        createCardContent = document.createElement("div")
        createCardContent.classList.add("content-" + abbreviationDay)
        createCardContent.innerHTML = `
            <div class="cards-section-${abbreviationDay}"></div>`

        createCardControls = document.createElement("div")
        createCardControls.classList.add("controls-"+ abbreviationDay)
        createCardControls.innerHTML = `
            <div class="remove-all-${abbreviationDay}">Remove All</div>
            <div class="open-form-${abbreviationDay}"> + </div>
            <div class="back-${abbreviationDay} disabled "> X </div>
        `

        createCardNewCard = document.createElement("div")
        createCardNewCard.classList.add("add-new-card-" + abbreviationDay)
        createCardNewCard.innerHTML = `
            <label for="title-${abbreviationDay}">Titulo</label>
            <input id="title-${abbreviationDay}" type="text">

            <label for="description-${abbreviationDay}">Discrição</label>
            <input id="description-${abbreviationDay}" type="text">

            <div class="add-card-${abbreviationDay}"> + </div>
        `

        getContainer.appendChild(createCard).appendChild(createCardTitle)

        createCard.append(createCardInfo)
        createCard.append(createCardContent)
        createCard.append(createCardControls)
        createCard.append(createCardNewCard)
        
    }

    function getDayOfWeek(day){
       day = new Date().getDay();

            switch (day) {
                case 0:
                    day = "Domingo";
                    abbreviationDay = "do"
                    yesterday = "se"
                    break;

                case 1:
                    day = "Segunda-feira";
                    abbreviationDay = "se"
                    yesterday = "do"
                    break;

                case 2:
                    day = "Terça-feira";
                    abbreviationDay = "te"
                    yesterday = "se"
                    break;

                case 3:
                    day = "Quarta-feira";
                    abbreviationDay = "qa"
                    yesterday = "te"
                    break;
                case 4:
                    day = "Quinta-feira";
                    abbreviationDay = "qu"
                    yesterday = "qa"
                    break;

                case 5:
                    day = "Sexta-feira";
                    abbreviationDay = "sx"
                    yesterday = "qu"
                    break;
                case 6:
                    day = "Sábado";
                    abbreviationDay = "sa"
                    yesterday = "sx"
                    break;
                    
                default:
                    day = "Dia inválido";
            }
        
        return day
    }

    const day = getDayOfWeek();

    createCardOfDay()

})()
