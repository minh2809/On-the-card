const defaultButton = document.getElementById('default-btn')
console.log(defaultButton)
var addImg = document.querySelector('img');
var addFile = document.querySelector('.file-name')
var regular_expression = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
var hideBorder = document.querySelector('.wrapper')
console.log(hideBorder)
const cancelButton = document.getElementById('cancel-btn')


function defaultBtnActive(){
    defaultButton.click();
}

function previewImage(event){
    var reader = new FileReader();
    reader.onload = function(){
        addImg.src = reader.result;
    }
    hideBorder.classList.add('active'); 
    reader.readAsDataURL(event.target.files[0]);
    if(this.value){
        let storeValue = this.value.match(regular_expression);
        addFile.textContent = storeValue;
    }
}

function deleteImage(){
    addImg.src = ' ';
    hideBorder.classList.remove('active');
}



cancelButton.addEventListener('click',deleteImage);
defaultButton.addEventListener('change',previewImage);
