var percent = document.querySelector('.percentage');
const progressBar = document.querySelector('.container-wipe-main');
const button = document.querySelector('.download-button');
var width = document.querySelector('.container-wipe');
var text = document.querySelector('.text');
var text1 = document.querySelector('.text1');
var knob = document.querySelector('.spinner'); 
var gradient = document.querySelector('.spinner-gradient');


var result = Math.floor(Math.random() * 6);

function toggleDownload(){

   //tăng số phần trăm
    setInterval(increasePercent,100); 
    function increasePercent(){
        if(result < 100 && 100 - result > 5){
        result = result + Math.floor(Math.random() * 6);
        console.log(result)
        percent.innerHTML = result +'%';
        }else if(result = 95){
           result = result + 5;
           percent.innerHTML = result +'%';
        }else if (result = 96){
         result = result + 4;
         percent.innerHTML = result +'%';
        }else if(result = 97){
         result = result + 3;
         percent.innerHTML = result +'%';
        }else if (result = 98){
         result = result + 2;
         percent.innerHTML = result +'%';
        }else if (result = 99){
         result = result + 1;
         percent.innerHTML = result +'%';
        }
     }

     //tăng progressBar
     setInterval(increaseWidth,100);
     function increaseWidth(){
        width.style.width = `${result}%`;
     }

     //thay đổi chữ khi chạy và khi hoàn thành
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
     
     //xoay
     setInterval(spinKnob,100);
     function spinKnob(){
        var degree = -90 + ((result/100)*360);
        knob.style.transform = `rotate(${degree}deg)`;
     }
   
     setInterval(removeGradient,34*100);
     function removeGradient(){
      if(result = 100){
         gradient.style.opacity = 0;
      }
   }
}







button.addEventListener('click',toggleDownload);