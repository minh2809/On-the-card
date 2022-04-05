var percent = document.querySelector('.percentage');
const progressBar = document.querySelector('.container-wipe-main');
const button = document.querySelector('.download-button');
var width = document.querySelector('.container-wipe');
var text = document.querySelector('.text');
var text1 = document.querySelector('.text1');
console.log(text)
console.log(percent);


 
var result = Math.floor(Math.random() * 6);


function toggleDownload(){
    setInterval(increasePercent,100);
    function increasePercent(){
        if(result < 100 ){
        result = result + Math.floor(Math.random() * 6);
        percent.innerHTML = result +'%';
        }
     }
     setInterval(increaseWidth,100);
     function increaseWidth(){
        width.style.width = `${result}%`;
     }
     setInterval(changeText,100);
     function changeText(){
        if(result < 100){
           text.innerHTML = 'Downloading';
           text1.innerHTML = 'Downloading';
        }else{
           text.innerHTML = 'Done';
           text1.innerHTML = 'Done';
        }
     }
     
}

button.addEventListener('click',toggleDownload);