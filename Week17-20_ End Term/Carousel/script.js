var counter = 1;

setInterval(function(){
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if(counter > pictures.length){
    counter = 1;
  }
}, 10000);


var pictures = document.querySelectorAll('.slide');

function next(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > pictures.length){
      counter = 1;
    }
}


function prev(){
    document.getElementById('radio' + counter).checked = true;
    counter--;
    if(counter < 1){
      counter = pictures.length;
    }
}


