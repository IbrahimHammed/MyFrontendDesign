const prizeNames = ["Coca Cola", "Crush", "Fanta", "Sprite", "Pepsi"];


document.getElementById("playBtn").addEventListener("click", function () {
    const userNum = parseInt(document.getElementById("userNumber").value);
    const message = document.getElementById("message");

    if (!userNum || userNum < 1 || userNum > 5) {
        message.textContent = "Please enter a valid number between 1 and 5.";
        return;
    }

    message.textContent = "";

    const numCells = [
        document.getElementById("num1"),
        document.getElementById("num2"),
        document.getElementById("num3"),
        document.getElementById("num4"),
        document.getElementById("num5")
    ];

    const finalNumbers = new Array(5);   // index 0–4 = columns 1–5
    let settledCount = 0;

    numCells.forEach((cell, index) => {
        let spins = 20 + Math.floor(Math.random() * 20);

        let interval = setInterval(() => {
            cell.textContent = Math.floor(Math.random() * 10) + 1;
        }, 80);

        setTimeout(() => {
            clearInterval(interval);
            let finalNum = Math.floor(Math.random() * 10) + 1;
            cell.textContent = finalNum;

            // store by column position
            finalNumbers[index] = finalNum;
            settledCount++;

            if (settledCount === 5) {
                checkWin(userNum, finalNumbers);
            }
        }, spins * 80);
    });
});

// function checkWin(userNum, finalNumbers) {
//     const message = document.getElementById("message");
//     let hitPositions = [];

//     // find all positions (1–5) where the number matches
//     finalNumbers.forEach((num, idx) => {
//         if (num === userNum) {
//             hitPositions.push(idx + 1); // convert 0-based to 1-based
//         }
//     });

//     if (hitPositions.length > 0) {
//         message.textContent = "🎉 Congratulations! You won! 🎉";

//         // blink every matching image in row 1
//         hitPositions.forEach(pos => {
//             const img = document.getElementById("img" + pos);
//             img.classList.add("blink");
//             setTimeout(() => img.classList.remove("blink"), 3000);
//         });
//     } else {
//         message.textContent = "Sorry, try again!";
//     }
// }

function checkWin(userNum, finalNumbers) {
    const message = document.getElementById("message");
    let hitPositions = [];

    // Find all positions where the number matches
    finalNumbers.forEach((num, idx) => {
        if (num === userNum) {
            hitPositions.push(idx + 1); // convert 0-based to 1-based
        }
    });

    if (hitPositions.length > 0) {
        // If multiple matches, show all prizes
        const wonPrizes = hitPositions.map(pos => prizeNames[pos - 1]).join(", ");

        message.textContent = `🎉 Congratulations! You won: ${wonPrizes}! 🎉`;

        // Blink each matching image
        hitPositions.forEach(pos => {
            const img = document.getElementById("img" + pos);
            img.classList.add("blink");
            setTimeout(() => img.classList.remove("blink"), 3000);
        });

    } else {
        message.textContent = "Sorry, try again!";
    }
}

