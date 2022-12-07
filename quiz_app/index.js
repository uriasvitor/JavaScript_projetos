var question_number = document.getElementById("question_number")
var question_title  = document.getElementById("title-question")
var btn_confirm = document.getElementById("btn_confirm")
var btn_restart = document.getElementById("btn_restart")
var controls    = document.querySelector(".controls")
    
var current_question = 0

    let url = "./questions.xml"

    fetch(url).then((response)=>{
        return response.text()

    }).then(data =>{
        let parser = new DOMParser()
        xmlDoc = parser.parseFromString(data, 'text/html')
        questions = xmlDoc.getElementsByTagName("asks");

        createQuestion()

    }).catch((err)=>{
        console.log("Arquivo XML não foi encontrado!")
    })
    
    function createQuestion(){
        
        xml_number = xmlDoc.getElementsByTagName("number")[current_question].innerHTML
        xml_title = xmlDoc.getElementsByTagName("title")[current_question].innerHTML
        xml_alternatives = xmlDoc.getElementsByTagName("answers")[current_question].children
        console.log(xml_alternatives)
        question_number.innerHTML = xml_number    
        question_title.innerHTML = xml_title
        
        for(var i = 0; i < xml_alternatives.length; i++){
            document.getElementById("answers")
                .appendChild(document.createElement("div")).innerHTML = 
                `<input type='radio' name='alternative' id='${i}' onchange="checkIsValid()" ><label for='${i}'>
                ${xml_alternatives[i].innerHTML}</label>`
        }

        return;
    }

    function removeChilds(){
        let elements = document.getElementById("answers")
        
        question_number.innerHTML = ''
        question_title.innerHTML = ''

        while(elements.firstChild){
            elements.removeChild(elements.firstChild)
        }

        return;
    }

    function checkIsValid(){
        btn_confirm.disabled = false;
    }


    function nextQuestion(){
        
        current_question++
        
        if(current_question > xml_number.length + 1){
            quizResult()
            console.log(current_question)
            return;
        }

        removeChilds();
        createQuestion();

        btn_confirm.disabled = true;

        return; 
    }

    function createRestartBtn(){

        controls.appendChild(document.createElement("button")).setAttribute("id", "btn_restart")
        
        btn_restart = document.getElementById("btn_restart")
        btn_restart.innerHTML = "Reiniciar"

        document.getElementById("btn_restart").addEventListener("click", ()=>{
            restartQuiz()
        })   
    }

    function createConfirmBtn(){
        controls.appendChild(document.createElement("button")).setAttribute("id", "btn_confirm")
        btn_confirm = document.getElementById("btn_confirm")
        btn_confirm.setAttribute('disabled','');
        btn_confirm.innerHTML = "Confirmar"

        document.getElementById("btn_confirm").addEventListener("click", ()=>{
            nextQuestion()
        })   
    }
    function restartQuiz(){
        current_question = 0

        question_number.style = "display:block"
        btn_restart.remove()
        createConfirmBtn()  
        createQuestion()
    }

    function quizResult(){
        removeChilds();
        btn_confirm.remove()
        createRestartBtn()
        

        question_number.style = "display:none"
        question_title.innerHTML = 'Sua pontuação foi de: '


    }
