const addItems = document.querySelector('.inputField input')
console.log(addItems)
const button = document.querySelector('.inputField button')
const todoList = document.querySelector('.todoList')
const deleteButton = document.querySelector('.footer button')

function addItem(){
    var inputItem = addItems.value;

    if(inputItem.trim() != 0){
        button.classList.add('active');
    }else{
        button.classList.remove('active');
    }
}

showTasks();

function saveItem(){
    var inputItem = addItems.value;
    var getLocalStorageData = localStorage.getItem('New item');

    if(getLocalStorageData == null){
        ListItem = [];
    }else{
        ListItem = JSON.parse(getLocalStorageData);
    }

    ListItem.push(inputItem);
    localStorage.setItem('New item',JSON.stringify(ListItem));
    showTasks(); 
    button.classList.remove('active');
}

function showTasks(){
    var getLocalStorageData = localStorage.getItem('New item');

    if(getLocalStorageData == null){
        ListItem = [];
    }else{
        ListItem = JSON.parse(getLocalStorageData);
    }

    const pendingNumb = document.querySelector('.pendingTasks');

    pendingNumb.textContent = ListItem.length;

    if(ListItem.length > 0){
        deleteButton.classList.add('active');
    }else{
        deleteButton.classList.remove('active');
    }

    var newLiTag = '';
    ListItem.forEach((element,index) => {
        newLiTag  += `<li>${element} <span class='icon' onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    addItems.value = '';
}

function deleteTask(index){
    var getLocalStorageData = localStorage.getItem('New item');
    ListItem = JSON.parse(getLocalStorageData);
    ListItem.splice(index,1);
    localStorage.setItem('New item',JSON.stringify(ListItem));
    showTasks();
}

function deleteAll(){
    ListItem = [];
    localStorage.setItem('New item',JSON.stringify(ListItem));
    showTasks();
}

addItems.addEventListener('keyup',addItem);
button.addEventListener('click',saveItem);
deleteButton.addEventListener('click',deleteAll);