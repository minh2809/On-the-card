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

button.addEventListener('click', addImage);

input.addEventListener('change', handleFileSelect)

function addImage(){
  input.click();
}

function handleFileSelect(event){
  if (window.File && window.FileList && window.FileReader) {
    var files = event.target.files;
    var output = document.getElementsByClassName('slides');
    var arrFilesCount = [];
    var nonImgCount = 0;
    for (var i = 0; i <= files.length; i++) {
      arrFilesCount.push(i);
    }

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var picReader = new FileReader();
      if (!file.type.match('image')) {nonImgCount++; continue;}
      picReader.addEventListener("load", function (event) {
        var picFile = event.target;
        current_i = arrFilesCount.shift();
        output.innerHTML = output.innerHTML + '<div class="slide">' +'<img src="'+ picFile.result + '"></div>';
      });
      picReader.readAsDataURL(file);
    }
}
  else{
    console.log("Your browser does not support File API");
  }
}


 // output.innerHTML = output.innerHTML + '<li id="slide-' + current_i + '" class="slide">' + "<img src='" + picFile.result + "'" + "title=''/>" + '<nav>' + '<a class="prev" href="#slide-' + prev_i + '">&larr;</a>' + '<a class="next" href="#slide-' + next_i + '">&rarr;</a>' + '</nav>' + '</li>';