const correctWord = "APPLE";  
let currentRow = 0;

// Build board
const board = document.getElementById("board");

for (let i = 0; i < 30; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    board.appendChild(tile);
}

// Build keyboard
const keyboardLayout = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "⟵ZXCVBNM⏎"
];

const keyboardContainer = document.getElementById("keyboard-container");

keyboardLayout.forEach(row => {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("keyboard-row");

    row.split("").forEach(key => {
        let btn = document.createElement("button");
        btn.textContent = key;
        btn.classList.add("key");

        if (key === "⟵" || key === "⏎") btn.classList.add("wide");

        btn.onclick = () => handleKeyPress(key);
        rowDiv.appendChild(btn);
    });

    keyboardContainer.appendChild(rowDiv);
});

// Input + button
document.getElementById("guess-button").onclick = submitGuess;

function handleKeyPress(key) {
    const input = document.getElementById("guess-input");

    if (key === "⟵") {
        input.value = input.value.slice(0, -1);
    } else if (key === "⏎") {
        submitGuess();
    } else if (input.value.length < 5) {
        input.value += key;
    }
}

function submitGuess() {
    const input = document.getElementById("guess-input");
    let guess = input.value.toUpperCase();

    if (guess.length !== 5) {
        alert("Enter a 5-letter word!");
        return;
    }

    const startIndex = currentRow * 5;

    for (let i = 0; i < 5; i++) {
        let tile = board.children[startIndex + i];
        tile.textContent = guess[i];
        tile.classList.add("flip");

        setTimeout(() => {
            if (guess[i] === correctWord[i]) {
                tile.style.background = "#6aaa64";
                tile.style.color = "white";
            } else if (correctWord.includes(guess[i])) {
                tile.style.background = "#c9b458";
                tile.style.color = "white";
            } else {
                tile.style.background = "#787c7e";
                tile.style.color = "white";
            }
        }, 250 * i);
    }

    if (guess === correctWord) {
        setTimeout(() => {
            confetti({
                particleCount: 200,
                spread: 80,
                origin: { y: 0.6 }
            });
        }, 1500);

        setTimeout(() => {
            alert("You guessed it! 🎉");
        }, 1700);

        return;
    }

    currentRow++;
    input.value = "";

    if (currentRow === 6) {
        alert("Out of tries! The word was " + correctWord);
    }
}
