const imagesDiv = document.querySelector(".imagesDiv");
const bottomSliderDiv = document.querySelector(".btm-sliders");
const nextArrow = document.querySelector(".next");
const prevArrow = document.querySelector(".prev");
let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" modalActive", "");
  }

  if (slides.length > 0) {
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " modalActive";
  }
}

/*
<div class="mySlides fade">
    <div class="background-blur" style="background-image:url(...)"></div> // Dùng cho ảnh mờ viền
    <img src="./assets/image6.jpeg" class="carousel-image" /> // Dùng cho ảnh nằm chính giữa
</div>
*/
function addImageToCarouselModal(imgSource, appendingDiv) {
  // creating the image div, note that deleteImage is found in modal.js
  const imageContainer = document.createElement("div");
  imageContainer.classList = "mySlides fade";
  imageContainer.innerHTML = `
  <div class="background-blur2" style="background-image:url(${imgSource})"></div>
  <div class="deleteBtn" onClick="deleteImage(${appendingDiv.children.length})">x</div> 
  <img src=${imgSource} class="carousel-image2" />`;

  // Appending the image div into the carousel
  appendingDiv.appendChild(imageContainer);
  console.log(appendingDiv)
}



function addSliderDotModal(index, appendingDiv) {
  const spanSlider = document.createElement("span");
  spanSlider.classList = "dot";
  spanSlider.setAttribute("onclick", `currentSlide(${index})`);

  appendingDiv.appendChild(spanSlider);
}

function resetCarouselModal() {
  imagesDiv.innerHTML = ``;
  bottomSliderDiv.innerHTML = ``;
}

function CarouselModal() {
  const amountOfImages = imagesDiv.children.length;
  const imageArray = data.images;

  if (imageArray.length > 0 && amountOfImages !== imageArray.length) {
    resetCarouselModal();
    for (let i = 0; i < imageArray.length; i++) {
      addImageToCarouselModal(imageArray[i], imagesDiv);
      addSliderDotModal(i + 1, bottomSliderDiv);
    }
    slideIndex = imageArray.length;
    showSlides(slideIndex);
  }

  if (imageArray.length > 0) {
    nextArrow.classList = "next active";
    prevArrow.classList = "prev active";
  }

  if (imageArray.length === 0) {
    resetCarouselModal();
    nextArrow.classList.remove("active");
    prevArrow.classList.remove("active");
  }
}

setInterval(() => {
  CarouselModal();
}, 1);

