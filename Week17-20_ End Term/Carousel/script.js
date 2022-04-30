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
  if(document.getElementById('radio' + counter).checked = true && counter ==1){
    counter ++;
  }else if(document.getElementById('radio' + counter).checked = true && counter == 2){
    counter++;
  }else if(document.getElementById('radio' + counter).checked = true && counter == 3){
    counter = 1;
  }
}


function prev(){
  if(document.getElementById('radio' + counter).checked = true && counter == 3){
    counter--;
  }else if(document.getElementById('radio' + counter).checked = true && counter == 2){
    counter--;
  }else if(document.getElementById('radio' + counter).checked = true && counter == 1){
    counter = 3;
  }
}


