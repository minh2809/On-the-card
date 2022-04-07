var percent = document.querySelector('.percentage');
const progressBar = document.querySelector('.container-wipe-main');
const button = document.querySelector('.download-button');
var width = document.querySelector('.container-wipe');
var text = document.querySelector('.text');
var text1 = document.querySelector('.text1');
var knob = document.querySelector('.knob'); 
var gradient = document.querySelector('.spinner-gradient');
var white1Arrow = document.querySelector('.white1-arrow');
var whiteLine = document.querySelector('.white-line');
var whiteArrow = document.querySelector('.white-arrow');
var leftLine = document.querySelector('.line-left');
var midLine = document.querySelector('.line-mid');
var rightLine = document.querySelector('.line1-right');
var left1Line = document.querySelector('.line1-left');
var mid1Line = document.querySelector('.line1-mid');
var right1Line = document.querySelector('.line1-right');
var cursor = document.querySelector('.download-button')
var spinner = document.querySelector('.spinner');

console.log(cursor)

var result = 0;

//Trong lúc Download
   function increasePercent(){
         if(result<100){
            result = result + 4;
            percent.innerHTML = result + "%";
         }
   }

   function increaseWidth(){
      width.style.width = `${result}%`;
   }

   function changeText(){
      if(result < 100){
         text.innerHTML = "Downloading";
         text1.innerHTML = "Downloading";
      }else{
         text.innerHTML = "Done";
         text1.innerHTML = "Done";
      }
   }

   function spinKnob(){
      var degree = -90 + (result / 100 ) * 360;
      spinner.style.transform = `rotate(${degree}deg)`;
   }

   function onDownload(){
      increasePercent();
      increaseWidth();
      changeText();
      spinKnob();
   }

   function toggleDownload(){
      setInterval(onDownload,700);
      setInterval(afterDownload,25*705);
   }

   function toggleIcon(){
      white1Arrow.style.top = '50px'
      whiteLine.style.right = '-30px'
      whiteArrow.style.top = '19px'
   }


//Sau khi Download
   function deleteKnob(){
      knob.style.opacity = 0;
   }

   function deleteGradient(){
      gradient.style.opacity = 0;
   }

   function changeIcon(){
      mid1Line.style.top = '40px';
      right1Line.style.width = '22px';
   }

   function afterDownload(){
      deleteKnob();
      deleteGradient();
      changeIcon();
   }

button.addEventListener('click',toggleDownload);
button.addEventListener('click',toggleIcon);
