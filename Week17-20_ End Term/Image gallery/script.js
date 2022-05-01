var counter = 1;
document.getElementById('radio' + counter).checked = true;

// setInterval(function(){
//   counter++;
//   if(counter > pictures.length){
//     counter = 1;
//   }
//   document.getElementById('radio' + counter).checked = true;
// }, 10000);


var pictures = document.querySelectorAll('.slide');
console.log(pictures[0])

function next(){
    counter++;
    if(counter > pictures.length){
      counter = 1;
    }
    document.getElementById('radio' + counter).checked = true;
}


function prev(){
    counter--;
    if(counter < 1){
      counter = pictures.length;
    }
    document.getElementById('radio' + counter).checked = true;
}


const defaultButton = document.getElementById('default-btn')
defaultButton.addEventListener('click',addImage);

function defaultBtnActive(){
  defaultButton.click();
}

function addImage(){
  var image = document.createElement("img");
  var reader = new FileReader();
  reader.onload = function(){
    image.src = reader.result;
  }
  if(event.target.files[0]){
    reader.readAsDataURL(event.target.files[0]);
  }
  pictures[0].appendChild(image);
}