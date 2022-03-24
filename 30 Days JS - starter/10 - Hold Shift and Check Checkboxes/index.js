const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleCheck(e){
    //check if they had the shift key down and check if they are checking it
    let inbetween = false;
    if(e.shiftKey && this.checked){
        //go ahead and do what we please
        //loop over every checkbox
        checkboxes.forEach(checkbox =>{
            if(checkbox === this || checkbox === lastChecked){
                inbetween = !inbetween;
                console.log('Starting to check them inbetween!');
            }
            if(inbetween){
                checkbox.checked = true;
            }
        })
    }

    lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click',handleCheck));