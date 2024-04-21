(function(){
    const apiCharacter = "https://rickandmortyapi.com/api/character";
    const select = document.getElementById("character");
    let character = {};
    let maxCharacters;

    getAllCharacters();
    collapse();
    
    async function getAllCharacters(){
        try {
            const response = await fetch(apiCharacter);
            const data = await response.json();
            
            if(data.results){
                maxCharacters = data.info.count
                createOptions(data.results);
                choseCharacter();
                generateRandomCard();
                
            } else {
                console.error('Data não existe ou está vazio!');
            }
        } catch(error) {
            console.error('Erro ao recuperar personagens:', error);
        }
    }

    async function getCharById(id){

        if(!id || id == 0){
            id = generateRandomId()
            console.log(id)
        }

        try {
            const response = await fetch(`${apiCharacter}/${id}`);

            return await response.json();
        } catch(error) {
            console.error('Erro ao recuperar personagem pelo ID:', error);
        }
    }

    function createOptions(characters){
        characters.forEach(character => {
            const option = document.createElement('option');
            option.text = character.name;
            option.value = character.id;
            select.appendChild(option);
        });
    }

    function choseCharacter(){
        let timer;
        select.addEventListener('change', (e) => {
            clearTimeout(timer);
            timer = setTimeout(async () => {
                character = await getCharById(select.value);
                createCard(character)
            }, 500); 
        });

    }

    function createCard(character){
        const charNameElement = document.querySelector('[data-charname]');
        const statusElement = document.querySelector('[data-status]')
        const lastLocationElement = document.querySelector('[data-location]')
        const firstSeenElement = document.querySelector('[data-firstseen]')
        const imageElement = document.getElementById('char-image')
        const statusClasses = ["Alive", "Dead", "Unknown"];

        charNameElement.textContent = character.name;
        statusElement.textContent = `${character.status} - ${character.species}`;

        statusClasses.forEach(className => {
            statusElement.parentElement.classList.remove(className);
        });

        statusElement.parentElement.classList.add(character.status);

        lastLocationElement.textContent = character.location.name;
        firstSeenElement.textContent = character.origin.name;
        imageElement.src = character.image

        console.log()
        collapseInfos(character);
    }

    function collapseInfos(character){
        const episodesElement = document.querySelector('[data-episodes]')
        const episodes = character.episode;

        while (episodesElement.firstChild) {
            episodesElement.removeChild(episodesElement.firstChild);
        }

        episodes.forEach(element =>{
            const li = document.createElement("li")
            li.textContent = element
            episodesElement.appendChild(li)
        })
    }

    function collapse(){
        const collapse = document.querySelector('[data-epCollapse]');
        const innerContentEpisode = document.querySelector('[data-episodes]');

        collapse.addEventListener('click', ()=>{
            innerContentEpisode.parentElement.toggleAttribute("hidden")
        })
    
    }

    function generateRandomId(){
        return Math.floor(Math.random() * maxCharacters);
    }

    async function generateRandomCard(){
        const randomId = generateRandomId();
        const character = await getCharById(randomId);
        createCard(character);
    }

})();
