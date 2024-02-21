// select the element from html
const ball = document.querySelector('.ball');
const glassland_container2=document.querySelector('.glassland_container2');
const stop=document.getElementById('stop');
const music_on=document.getElementById('music_on');
const music_off=document.getElementById('music_off');
const canvas = document.getElementById('gridCanvas');
const arrow_vertical=document.getElementById("vertical_arrow");
const hearts = document.querySelectorAll('.heart-container .fa-heart');
const glassland_home=document.getElementById('glassland_home');
const brick=document.getElementById('brick');
const adventure=document.getElementById('Adventure');
// when the mousemove, the arrow will also move 
function arrow_follow(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (arrow_vertical.classList.contains("fa-arrows-alt-v")){
// Adjust for any offsets caused by padding, margins, or borders
 const arrowOffsetX = 15; // x offset
 const arrowOffsetY = 60; // y offset
    // Set the position of the arrow_vertical element
    arrow_vertical.style.left = (mouseX-arrowOffsetX) + 'px';
    arrow_vertical.style.top = (mouseY-arrowOffsetY)  + 'px';
}
else if (arrow_vertical.classList.contains("fa-arrows-alt-h")){
  // Adjust for any offsets caused by padding, margins, or borders
   const arrowOffsetX = 25; // x offset
   const arrowOffsetY = 60; // y offset
    // Set the position of the arrow_vertical element
    arrow_vertical.style.left = (mouseX-arrowOffsetX) + 'px';
    arrow_vertical.style.top = (mouseY-arrowOffsetY)  + 'px';
}  
};

glassland_container2.addEventListener('mousemove', arrow_follow);

// Calculate the number of rows and columns of bricks

const ctx = canvas.getContext('2d');
const size_blocks = 20;
const rows = 1000 / size_blocks;
const columns = 600 / size_blocks;

canvas.width = 1000;
canvas.height = 600;

function drawGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let x = i * size_blocks;
            let y = j * size_blocks;
            ctx.strokeStyle = 'white';
            ctx.strokeRect(x, y, size_blocks, size_blocks);
            ctx.fillStyle = 'gray';
            ctx.fillRect(x, y, size_blocks, size_blocks);
        }
    }
}
drawGrid();


let lastRemovedIndex = 0; // Initialize the index of the last removed heart

function removeHeart() {
    if (lastRemovedIndex < hearts.length) {
        hearts[lastRemovedIndex].style.color = 'black'; // Change the color of the heart at the last removed index
        lastRemovedIndex++; // Increment the index for the next call
    } else if (lastRemovedIndex === 3) { // Check if three hearts have been turned black
        const playAgain = confirm('You lose. Play again?');
        if (playAgain) {
            resetGame(); // Reset the game state only if the user chooses to play again
        }
    }
}



function resetGame() {
      // Reload the page
      window.location.reload();
}


// Check if a single pixel at coordinates (x, y) is white
function isPixelWhite(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    return imageData[0] === 255 && imageData[1] === 255 && imageData[2] === 255;
}




/*
ball bounces off the wall. 
 */
// css style 
const b={x:0,y:0,w:40,h:40,dx:1,dy:1,speed:15,ani:{},move:true};
ball.style.backgroundColor = 'blue'; // Example color
ball.style.width=`${b.w}px`;
ball.style.height=`${b.h}px`;
ball.style.borderRadius = '50%';
ball.style.position='relative';
ball.style.left=`${b.x}px`;
ball.style.top=`${b.y}px`;
glassland_container2.style.width='1000px';
glassland_container2.style.height='600px';
glassland_container2.style.border='1px solid white';


// add eventlistener to make the ball stop moving.
stop.addEventListener('click', () => {
    if (b.move) {
        cancelAnimationFrame(b.ani); // Stop the animation loop if it's running
        b.move = false; // Set b.move to false to indicate that the animation is stopped
    } else {
        b.move = true; // Set b.move to true to resume the animation loop
        moveball(); // Resume the animation loop by calling moveball function
    }
});


// Check if a single pixel at coordinates (x, y) is white
function isPixelWhite(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    return imageData[0] === 255 && imageData[1] === 255 && imageData[2] === 255;
}

// Check if the area surrounding the ball is predominantly white
function isAreaWhite(x, y, w, h) {
    const ballArea = Math.PI * Math.pow(w / 2, 2);
    let whitePixelCount = 0;

    for (let px = Math.round(x); px < Math.round(x + w); px++) {
        for (let py = Math.round(y); py < Math.round(y + h); py++) {
            if (isPixelWhite(px, py)) {
                whitePixelCount++;
            }
        }
    }

    return whitePixelCount > ballArea;
}




function displayLevelCompletedMessage() {
  
       
       // Create a new div element
        const newDiv = document.createElement('div');
        newDiv.textContent = 'Level Completed!';
        newDiv.style.color = 'black';
        newDiv.style.fontSize = '40px';
        brick.appendChild(newDiv);
       newDiv.classList.add('level-completed-message');    
    
       
   
}


// Move the ball and check for white areas
function moveBall() {
  
    // Handle boundary conditions for y-axis
    if (b.y > 600 - b.h || b.y < 0 ) {
        b.dy *= -1; 
    } 

    // Handle boundary conditions for x-axis
    if (b.x > 1000 - b.w || b.x < 0 ) {
        b.dx *= -1; 
    }

    if ( isPixelWhite(b.x, b.y) || isPixelWhite(b.x + b.w, b.y) || isPixelWhite(b.x, b.y + b.h) || isPixelWhite(b.x + b.w, b.y + b.h)){
        b.dx *= -1; 
        b.dy *= -1; 
        removeHeart();
    }


   
    let levelCompletedDisplayed = false; // Flag variable to track if the message has been displayed

    if (isAreaWhite(b.x, b.y, b.w, b.h)) {
        // Perform the desired action when the ball is surrounded by white pixels
        ball.remove();
        if (!levelCompletedDisplayed){
            displayLevelCompletedMessage();
            return;
        }      
    }
 

    // Update the position of the ball by adding its horizontal and vertical velocities to its current position
    b.x += b.dx * b.speed;
    b.y += b.dy * b.speed;

    // Update the CSS properties of the ball element to reflect its new position
    ball.style.left = `${b.x}px`;
    ball.style.top = `${b.y}px`;

    // Continue the animation loop if b.move is true
    if (b.move) {
        b.ani = requestAnimationFrame(moveBall);
    } 
   
}

moveBall();

    function ver_arrow_click(event) {
       

        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
        let currentX = mouseX;
        let currentY = mouseY;
    
        currentX = Math.round(currentX / size_blocks) * size_blocks;
        currentY = Math.round(currentY / size_blocks) * size_blocks;
    
        function startInterval(currentX, currentY) {

            return setInterval(function() {
                ctx.fillStyle = 'white';
                ctx.fillRect(currentX, currentY, size_blocks, size_blocks);
                currentY += size_blocks;
                console.log(currentY);
                if (currentY >= canvas.height) { // Stop when reaching the bottom of the canvas
                    clearInterval(interval_fill_blocks);
                    fill_area(); // Call fill_area() after interval has completed
                    
                } 
            }, 100); // Interval in milliseconds
    
        }
        
        const interval_fill_blocks = startInterval(currentX, currentY);
        
        
        function fill_area() {

            if (currentX > canvas.width * 0.6) {
                const spaces_width_rightmost = canvas.width - currentX;
                const spaces_height_rightmost = canvas.height;
                ctx.fillStyle = 'white';
                ctx.fillRect(currentX + size_blocks, currentY, spaces_width_rightmost, spaces_height_rightmost);
            } else if(currentX<canvas.width*0.4){
                const spaces_width_leftmost= currentX;
                const spaces_height_leftmost= canvas.height;
                ctx.fillStyle='white';
                ctx.fillRect(0, currentY, spaces_width_leftmost, spaces_height_leftmost);
            }
        }

       
    }
    

    function hor_arrow_click(event) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
        let currentX = mouseX;
        let currentY = mouseY;
        // Snap mouseX to the nearest multiple of size_blocks
        currentX = Math.round(currentX / size_blocks) * size_blocks;
        currentY=Math.round(currentY/size_blocks)*size_blocks;
    
        function startInterval(currentX, currentY) {
    
            return setInterval(function() {
                ctx.fillStyle = 'white';
                ctx.fillRect(currentX, currentY, size_blocks, size_blocks);
                currentX += size_blocks;
        console.log(currentX);
                if (currentX >= canvas.width) { // Stop when reaching the bottom of the canvas
                    clearInterval(interval_fill_blocks);
                    fill_area(); // Call fill_whole() after interval has completed
                } 
                
    
            }, 100); // Interval in milliseconds
        }
        const interval_fill_blocks = startInterval(currentX, currentY);
        function fill_area(){
            if (currentY > canvas.height * 0.6) {
                const spaces_width_bot_most = canvas.width;
                const spaces_height_bot_most = canvas.height;
                ctx.fillStyle = 'white';
                ctx.fillRect(currentX, currentY+size_blocks, spaces_width_bot_most, spaces_height_bot_most);
            } else if(currentY<canvas.height*0.4){
                const spaces_width_top_most= canvas.width;
                const spaces_height_top_most= currentY;
                ctx.fillStyle='white';
                ctx.fillRect(currentX, 0, spaces_width_top_most, spaces_height_top_most);
            }
        }
    
    }
    




// Change the icon and add/remove event listener when the Enter key is pressed
function change_icon(event) {
    if (event.key === 'Enter') {
        if (arrow_vertical.classList.contains("fa-arrows-alt-v")) {
            arrow_vertical.classList.remove('fa-arrows-alt-v');
            arrow_vertical.classList.add('fa-arrows-alt-h');
            canvas.removeEventListener('click', ver_arrow_click);
            canvas.addEventListener('click', hor_arrow_click);
        } else if (arrow_vertical.classList.contains("fa-arrows-alt-h")) {
            arrow_vertical.classList.remove('fa-arrows-alt-h');
            arrow_vertical.classList.add('fa-arrows-alt-v');
            canvas.removeEventListener('click', hor_arrow_click);
            canvas.addEventListener('click', ver_arrow_click);
        }
    }
}

window.addEventListener('keydown', change_icon);

function addClickListener() {
    if (arrow_vertical.classList.contains('fa-arrows-alt-v')) {
        canvas.addEventListener('click', ver_arrow_click);
    } else if (arrow_vertical.classList.contains('fa-arrows-alt-h')) {
        canvas.addEventListener('click', hor_arrow_click);
    }
}

window.addEventListener('load', addClickListener);

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
glassland_home.addEventListener("mouseover", handleMouseOver);
glassland_home.addEventListener("mouseout", handleMouseOut);
// Add event listeners to 'home' element
stop.addEventListener("mouseover", handleMouseOver);
stop.addEventListener("mouseout", handleMouseOut);
adventure.addEventListener("mouseover", handleMouseOver);
adventure.addEventListener("mouseout", handleMouseOut);
