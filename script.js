// Select all waste items and waste bins
const wasteItems = document.querySelectorAll('.waste-item');
const wasteBins = document.querySelectorAll('.waste-bin');
const scoreDisplay = document.getElementById('score');
const resultDisplay = document.getElementById('result');
let score = 0;

// Add drag event listeners to waste items
wasteItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

// Add drag event listeners to waste bins
wasteBins.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', drop);
});

// Drag start event
function dragStart() {
    this.classList.add('dragging');
}

// Drag end event
function dragEnd() {
    this.classList.remove('dragging');
}

// Allow the bin to be a drop target
function dragOver(e) {
    e.preventDefault(); // Prevent default to allow drop
}

// Drop event
function drop(e) {
    const draggedItem = document.querySelector('.dragging');
    const itemCategory = draggedItem.dataset.category;
    const binCategory = this.dataset.category;

    // Check if the item is dropped in the correct bin
    if (itemCategory === binCategory) {
        // Increment the score
        score++;
        scoreDisplay.textContent = `Score: ${score}`;

        // Display success message
        resultDisplay.textContent = 'Yes! You are correct!';
        resultDisplay.style.color = 'green';

        // Remove the item from the DOM
        draggedItem.remove();
    } else {
        // Display error message
        resultDisplay.textContent = 'Oops! Try again.';
        resultDisplay.style.color = 'red';
    }
    function drop(e) {
        const draggedItem = document.querySelector('.dragging');
        const itemCategory = draggedItem.dataset.category;
        const binCategory = this.dataset.category;
    
        const resultMessage = document.getElementById('result');
    
        // Clear previous message and remove classes
        resultMessage.classList.remove('correct', 'incorrect', 'show');
        resultMessage.textContent = '';
    
        // Check if the drop is correct
        if (itemCategory === binCategory) {
            score += 1; // Increment score for correct drop
            document.getElementById('score').textContent = `Score: ${score}`;
            resultMessage.textContent = 'Yes! You are correct!';
            resultMessage.classList.add('correct', 'show'); // Add correct class
        } else {
            resultMessage.textContent = 'Oops! Try again.';
            resultMessage.classList.add('incorrect', 'show'); // Add incorrect class
        }
    
        // Remove the classes after some time
        setTimeout(() => {
            resultMessage.classList.remove('correct', 'incorrect', 'show');
            resultMessage.textContent = ''; // Clear the message after 2 seconds
        }, 2000); // Message visible for 2 seconds
    }
    
    
}
