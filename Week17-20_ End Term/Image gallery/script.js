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

var button = document.querySelector('#custom-btn')
var input = document.querySelector('#default-btn')
var images = [];

function defaultBtnActive(){
  input.click();
}

function handleFileSelect(){
  var image = input.files;
  for(i=0;i<image.length;i++){
    images.push({
      "name" : image[i].name,
      "url" : URL.createObjectURL(image[i]),
      "file" : image[i],
    })
  }
  document.getElementsByClassName('form').reset();
  document.getElementsByClassName('slides').innerHTML =  image_show(); 
}

function image_show(){
  var image = "";
  images.forEach((i)=>{
    image+= `<div class="slide">
    <img src=`+i.url+ `></div>`
  })
  return image;
}

// var button = document.querySelector('#custom-btn')
// var input = document.querySelector('#default-btn')

// button.addEventListener('click', addImage);

// input.addEventListener('change', handleFileSelect)

// function addImage(){
//   input.click();
// }

// function handleFileSelect(event){
//   if (window.File && window.FileList && window.FileReader) {
//     var files = event.target.files;
//     var output = document.getElementsByClassName('slides');
//     var arrFilesCount = [];
//     var nonImgCount = 0;
//     for (var i = 0; i <= files.length; i++) {
//       arrFilesCount.push(i);
//     }

//     for (var i = 0; i < files.length; i++) {
//       var file = files[i];
//       var picReader = new FileReader();
//       if (!file.type.match('image')) {nonImgCount++; continue;}
//       picReader.addEventListener("load", function (event) {
//         var picFile = event.target;
//         current_i = arrFilesCount.shift();
//         output.innerHTML = output.innerHTML + '<div class="slide">' +'<img src="'+ picFile.result + '"></div>';
//       });
//       picReader.readAsDataURL(file);
//     }
// }
//   else{
//     console.log("Your browser does not support File API");
//   }
// }
