var dropdownBtn = document.querySelector("#dropdown-btn");
var dropdownContent = document.querySelector("#dropdown-content");

//Add dropdown functionality:
dropdownBtn.addEventListener('click', showDropdownMenu);

function showDropdownMenu(event) {
    event.preventDefault();
    if (dropdownContent.classList.contains('hidden')) {
        dropdownContent.classList.remove('hidden');
    } else {
        dropdownContent.classList.add('hidden');
    };
};