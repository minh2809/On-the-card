
// Update titles when title value in the input changed
function updateTitle(data) {
  titleInput.value = data.title;
  titleInput.placeholder = data.title;
  galleryTitle.innerHTML = data.title;
  title.innerHTML = data.title;
}


const title = document.querySelector(".modalTitle");
const titleInput = document.querySelector("#title");
const galleryTitle = document.querySelector(".galleryTitle");
const addImageBtn = document.querySelector(".addImageBtn");
const defaultBtn = document.querySelector("#default-btn");


function titleOnChange(event) {
  data.title = event.target.value;

}

// Opening local folder to add image
function openFolders() {
  defaultBtn.click();
}

// adding image
function addImage() {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const result = reader.result;
      data.images.push(result);
    };
    reader.readAsDataURL(file);
  }
}

function deleteImage(index) {
  data.images.splice(index, 1);
}

titleInput.addEventListener("keyup", titleOnChange);
addImageBtn.addEventListener("click", openFolders);
defaultBtn.addEventListener("change", addImage);
