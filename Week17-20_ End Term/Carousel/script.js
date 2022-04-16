var counter = 1;
setInterval(function(){
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if(counter > 3){
    counter = 1;
  }
}, 100000);


var pictures = document.querySelectorAll('.slide');

function next(){
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if(counter > 3){
    counter = 1;
  }
}

function prev(){
  document.getElementById('radio' + counter).checked = true;
  counter--;
  if(counter < 1){
    counter = 3;
  }
}


