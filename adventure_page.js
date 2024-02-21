const homeHeading = document.getElementById('home');
const glassland=document.getElementById('glassland');
const ocean=document.getElementById('ocean');
const desert=document.getElementById('desert');
const outerspace=document.getElementById('outer_space');


// Define a function to handle mouseover event
function handleMouseOver(event) {
    event.target.style.fontSize = "40px";
    event.target.style.color = 'yellow';
}

// Define a function to handle mouseout event
function handleMouseOut(event) {
    event.target.style.fontSize = "30px";
    event.target.style.color = 'white';
}
// Add event listeners to 'home' element
home.addEventListener("mouseover", handleMouseOver);
home.addEventListener("mouseout", handleMouseOut);

// Add event listeners to 'home' element
glassland.addEventListener("mouseover", handleMouseOver);
glassland.addEventListener("mouseout", handleMouseOut);

// Add event listeners to 'home' element
ocean.addEventListener("mouseover", handleMouseOver);
ocean.addEventListener("mouseout", handleMouseOut);

// Add event listeners to 'home' element
desert.addEventListener("mouseover", handleMouseOver);
desert.addEventListener("mouseout", handleMouseOut);

// Add event listeners to 'home' element
outerspace.addEventListener("mouseover", handleMouseOver);
outerspace.addEventListener("mouseout", handleMouseOut);
