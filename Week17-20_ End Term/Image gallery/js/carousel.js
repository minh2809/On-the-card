const imagesSection = document.querySelector(".imagesSection");
const sliderDot = document.querySelector(".bottom-sliders");
const nextSlideArrow = document.querySelector(".nextSlide");
const prevSlideArrow = document.querySelector(".prevSlide");

let slideActive = 0;

// Next/previous controls
function plusSlidesCarousel(n) {
  showSlidesCarousel((slideActive += n));
}

// Thumbnail image controls
function currentSlideCarousel(n) {
  showSlidesCarousel((slideActive = n));
}

function showSlidesCarousel(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides2");
  let dots = document.getElementsByClassName("dot2");
  if (n > slides.length) {
    slideActive = 1;
  }
  if (n < 1) {
    slideActive = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" modalActive", "");
  }

  if (slides.length > 0) {
    slides[slideActive - 1].style.display = "block";
    dots[slideActive - 1].className += " modalActive";
  }
}




/*
<div class="mySlides2 fade">
    <div class="background-blur" style="background-image:url(...)"></div> // Dùng cho ảnh mờ viền
    <img src="./assets/image6.jpeg" class="carousel-image" /> // Dùng cho ảnh nằm chính giữa
</div>
*/
function addImageToCarousel(imgSource, appendingDiv) {
  // creating the image div, note that deleteImage is found in modal.js
  const imageContainer = document.createElement("div");
  imageContainer.classList = "mySlides2 fade";
  imageContainer.innerHTML = `
  <div class="background-blur" style="background-image:url(${imgSource})"></div>
  <img src=${imgSource} class="carousel-image" >`;

  // Appending the image div into the carousel
  appendingDiv.appendChild(imageContainer);

}


function addSliderDot(index, appendingDiv) {
  const spanSlider = document.createElement("span");
  spanSlider.classList = "dot2";
  spanSlider.setAttribute("onclick", `currentSlideCarousel(${index})`);

  appendingDiv.appendChild(spanSlider);
}

function resetCarousel() {
  imagesSection.innerHTML = ``;
 sliderDot.innerHTML = ``;
}

function renderCarousel() {
  const amountOfImages = imagesSection.children.length;
  const imageArray = data.images;

  if (imageArray.length > 0 && amountOfImages !== imageArray.length) {
    resetCarousel();
    for (let i = 0; i < imageArray.length; i++) {
      addImageToCarousel(imageArray[i], imagesSection);
      addSliderDot(i + 1, sliderDot);
    }
    slideActive = imageArray.length;
    showSlidesCarousel(slideIndex);   
  }

  if (imageArray.length > 0) {
    nextSlideArrow.classList = "nextSlide active";
    prevSlideArrow.classList = "prevSlide active";
  }

  if (imageArray.length === 0) {
    resetCarousel();
    nextSlideArrow.classList.remove("active");
    prevSlideArrow.classList.remove("active");
  }
}

setInterval(() => {
  renderCarousel();
}, 10);

setInterval(() => {
  showSlidesCarousel((slideActive += 1));
}, 7000);




