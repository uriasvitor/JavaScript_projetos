var question_number = document.getElementById("question_number")
var question_title  = document.getElementById("title-question")
var btn_confirm     = document.getElementById("btn_confirm")
var controls        = document.querySelector(".controls")
var answers         = document.getElementById("answers")
var result          = document.getElementById("result")
var answer_val      = ''
var score           = []

var current_question = 0

    let url = "./questions.xml"

    fetch(url).then((response)=>{
        return response.text()

    }).then(data =>{
        let parser = new DOMParser()
        xmlDoc = parser.parseFromString(data, 'text/html')
        createQuestion()

    }).catch((err)=>{
        console.log("Arquivo XML não foi encontrado!" + err)
    })
    
    function createQuestion(){
        
        xml_questions       = xmlDoc.getElementsByTagName("asks");
        xml_number          = xmlDoc.getElementsByTagName("number")[current_question].innerHTML
        xml_title           = xmlDoc.getElementsByTagName("title")[current_question].innerHTML
        xml_alternatives    = xmlDoc.getElementsByTagName("answers")[current_question].children

        question_title.innerHTML    = xml_title
        question_number.innerHTML   = xml_number    

        for(var i = 0; i < xml_alternatives.length; i++){
            answers.appendChild(document.createElement("div")).innerHTML = 
                `<input type='radio' name='alternative' id='${i}' value='${i}' onchange="checkIsValid(${i})">
                <label for='${i}'>${xml_alternatives[i].innerHTML}</label>`
        }

        return;
    }

    function removeChilds(){        
        question_number.innerHTML = ''
        question_title.innerHTML = ''
        result.innerHTML = ''

        while(answers.firstChild){
            answers.removeChild(answers.firstChild)
        }

        return;
    }

    function checkIsValid(response){
        btn_confirm.disabled = false;

        answerCalculate(response)
    }


    function nextQuestion(){
        
        current_question++
        
        score.push(answer_val)

        if(current_question >= xml_questions.length){
            quizResult()

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


        btn_restart.addEventListener("click", ()=>{
            score = []
            removeChilds()
            restartQuiz()
        })

    }

    function createConfirmBtn(){
        controls.appendChild(document.createElement("button")).setAttribute("id", "btn_confirm")
        btn_confirm = document.getElementById("btn_confirm")
        btn_confirm.setAttribute('disabled','');
        btn_confirm.innerHTML = "Confirmar"

        btn_confirm.addEventListener("click", ()=>{
            nextQuestion()
        })   
    }

    function restartQuiz(){
        question_number.style   = "display:block";


        current_question        = 0;

        btn_restart.remove()
        createConfirmBtn()
        createQuestion()
    }

    
    
    function answerCalculate(current_response){
        const value = xml_alternatives[current_response].attributes[0].nodeValue
        answer_val = value


        console.log(answer_val)
    }

    function quizResult(){
        removeChilds();
        btn_confirm.remove()
        createRestartBtn()
        
        score_value = score.filter(Boolean).length

        console.log(score_value)
        question_number.style = "display:none"
        question_title.innerHTML = 'Sua pontuação foi de: '
        result.innerHTML = `${score_value} + pontos`

        if(score_value > 8){
            result.innerHTML = 'Muito bom!'
        }


    }