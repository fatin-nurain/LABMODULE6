function validateForm() {
    let fname = document.forms["myForm"]["fname"].value;

    if (fname == "") {
        alert("First Name must be filled out.");
        return false;
    } else {
        alert("Form submitted successfully!");
        return true; 
    }
}