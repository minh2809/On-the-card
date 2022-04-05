var percent = document.querySelector('.percentage');
const progressBar = document.querySelector('.container-wipe-main');
const button = document.querySelector('.download-button');
 
var result = Math.floor(Math.random() * 6);


function toggleDownload(){
    setInterval(increasePercent,100);
    function increasePercent(){
        if(result<100 ){
        result = result + Math.floor(Math.random() * 6);
        percent.innerHTML = result +'%';
        }
     }
}

button.addEventListener('click',toggleDownload);