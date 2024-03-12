(function(){
    const getAddParent = document.querySelectorAll(".add-main-parent");
    const getTree = document.querySelector(".tree");
    let randomId = 0;
    let parentName = '';
    let counter = 0;

    getAddParent.forEach(function(parentButton){
        parentButton.addEventListener("click",()=>{
            randomId = generateRandomId();
            createParent()
        })
    })

    getTree.addEventListener("click", function(event) {
        const target = event.target;

        if (target.classList.contains("add-children")) {
            const parentId = parseInt(target.closest(".parent-section").id);
            const closestChildrenSection = target.closest(".children-section");

            const childrenId = closestChildrenSection ? parseInt(closestChildrenSection.id) : parentId;

            createChildren(childrenId)
        }
        
        if (target.classList.contains("hide-childrenButton")) {
            const currentChildren = target.parentElement.parentNode.parentNode

            for(let i = 1; i < currentChildren.children.length; i++){
                currentChildren.children[i];
                console.log(currentChildren.children[i].classList.toggle('hide'))
            }   
            
        }
    });

    function createParent(){

        parentName = prompt("Write a Parent Name");

        if(!parentName){
            return
        }

        var parentCode = `
        <div id="${randomId}" class="parent-section" >
        <div class="node-content">
            <div class="inner-content">
                <button class="hide-childrenButton"> - </button>
                <input type="checkbox">
                <div class="title-parent">${parentName}</div>
            </div>
                <button class="add-children"> + </button>
        </div>  
        </div>`;

        getTree.insertAdjacentHTML('beforeend', parentCode);
    }

    
    
    function createChildren(currentId){
        
        const parent = document.getElementById(currentId)
        childrenName = prompt("Write a Child Name");

        if(childrenName == undefined || childrenName == '' || childrenName == null){
            return
        }
        
        counterChildren()
            
        var childrenCode = `
            <div id="${randomId}${counter}" 
            class="children-section">
            <div class="node-content">
                <div class="inner-content">
                    <button class="hide-childrenButton"> - </button>
                    <span class="treeline"></span>
                    <span class="intersectionline"></span>
                    <input type="checkbox">
                    <div class="title-parent">${childrenName}</div>
                </div>
                    <button class="add-children"> + </button>
                </div>
            </div>`;

            parent.insertAdjacentHTML('beforeend', childrenCode);
    }

   
    function counterChildren(){
        counter++
    }

    function generateRandomId(){  
       return Math.floor(Math.random() * 100)
    }


})()