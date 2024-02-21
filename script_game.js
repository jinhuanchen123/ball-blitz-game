// Retrieve the element with id 'start'
const start = document.getElementById('start');
const about = document.getElementById('about');
const glassland = document.getElementById('glassland');
const ocean = document.getElementById('ocean');
const stop=document.getElementById('stop');
const musicIcon = document.getElementById("musicIcon");
const audioPlayer=document.getElementById('audioPlayer');


// Define a function to handle mouseover event
function handleMouseOver(event) {
    event.target.style.fontSize = "50px";
    event.target.style.color = 'yellow';
}

// Define a function to handle mouseout event
function handleMouseOut(event) {
    event.target.style.fontSize = "30px";
    event.target.style.color = 'white';
}
// Add event listeners to 'start' element
start.addEventListener("mouseover", handleMouseOver);
start.addEventListener("mouseout", handleMouseOut);

// Add event listeners to 'about' element
about.addEventListener("mouseover", handleMouseOver);
about.addEventListener("mouseout", handleMouseOut);


// Define a function to handle music event 
audioPlayer.hidden=true;
// Play the audio when the page loads
window.addEventListener('load', function() {
    audioPlayer.play();
});
// this is not working 

function toggleMusicIcon() {

    if (musicIcon.classList.contains("fa-volume-up")) {
        // Switch to volume off icon
        musicIcon.classList.remove("fa-volume-up");
        musicIcon.classList.add("fa-volume-mute");
        audioPlayer.pause();
    

    } else {
        // Switch to volume up icon
        musicIcon.classList.remove("fa-volume-mute");
        musicIcon.classList.add("fa-volume-up");
        audioPlayer.play();
    

    }
}

// Add event listener to the music icon
musicIcon.addEventListener('click', toggleMusicIcon);



