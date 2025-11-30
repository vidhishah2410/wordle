const correctWord = "FARTS";   // change answer here
const maxRows = 6;
let currentRow = 0;

// Build empty grid
const grid = document.getElementById("grid");
for (let i = 0; i < maxRows * 5; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    grid.appendChild(div);
}

function submitGuess() {
    const input = document.getElementById("guessInput");
    const guess = input.value.toUpperCase();

    if (guess.length !== 5) {
        alert("Enter a 5 letter word!");
        return;
    }

    const start = currentRow * 5;

    for (let i = 0; i < 5; i++) {
        const cell = grid.children[start + i];
        cell.textContent = guess[i];

        if (guess[i] === correctWord[i]) {
            cell.style.background = "#6aaa64"; // green
            cell.style.color = "white";
        } else if (correctWord.includes(guess[i])) {
            cell.style.background = "#c9b458"; // yellow
            cell.style.color = "white";
        } else {
            cell.style.background = "#787c7e"; // grey
            cell.style.color = "white";
        }
    }

    // 🎉 Confetti on win
    if (guess === correctWord) {
        confetti({
            particleCount: 200,
            spread: 80,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            alert("You guessed it! 🎉");
        }, 300);

        return;
    }

    currentRow++;
    input.value = "";

    if (currentRow === maxRows) {
        alert("Out of tries! The word was " + correctWord);
    }
}
