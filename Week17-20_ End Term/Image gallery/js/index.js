
const editButton = document.querySelector(".fa-edit");
const backDrop = document.querySelector(".backDrop");
const modal = document.querySelector(".modal");
const deleteAll = document.querySelector(".fa-times");
const quitEdit =  document.querySelector(".x")
const addSections = document.querySelector(".addSections")
const container = document.querySelector(".container")
const deleteSection = document.querySelector(".delSections")
const picture = document.querySelector("img");
const contentSection = document.querySelector(".noContent")
const delButton = document.querySelector(".delSections")
const addButton = document.querySelector(".addSections")



function editClicked() {
  backDrop.classList.add("active");
  modal.classList.add("active");
  delButton.style.zIndex = "-1"
  addButton.style.zIndex = "-1"
}

function editClosed() {
  backDrop.classList.remove("active");
  modal.classList.remove("active");
  updateTitle(data);
  delButton.style.zIndex = "1"
  addButton.style.zIndex = "1"
}


function deleteImages(){
  data.images = [];
}


function delSection(){
  container.style.display = "none";
  if(container.style.display == "none"){
    contentSection.classList = "noContent active"
  }
}

function addSection(){
  container.style.display = "block"
  contentSection.classList = "noContent"
}



//When the deleteAll button is clicked, delete all images
deleteAll.addEventListener("click", deleteImages);
// When the edit button is clicked, show the backdrop and modal
editButton.addEventListener("click", editClicked);
// When the model is clicked, backdrop and modal will be closed
backDrop.addEventListener("click", editClosed);
quitEdit.addEventListener("click",editClosed);
//Add section 
addSections.addEventListener("click",addSection)
deleteSection.addEventListener("click",delSection)
