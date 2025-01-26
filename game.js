// Sound effects
let rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
let winSound = new Audio('winharpsichord-39642.mp3');

// Global variables
let tog = 1;
let p1sum = 0;
let p2sum = 0;
let p3sum = 0;
let p4sum = 0;

const positions = {
    1: 38, 4: 14, 8: 30, 21: 42, 28: 76, 32: 10,
    36: 6, 48: 26, 50: 67, 62: 18, 71: 92, 80: 99,
    88: 24, 95: 56, 97: 78
};

let redPlayerName = prompt("Enter the name of the Red coin player:") || "Red Player";
let yellowPlayerName = prompt("Enter the name of the Yellow coin player:") || "Yellow Player";
let greenPlayerName = prompt("Enter the name of the Green coin player:") || "Green Player"; // Third player
let bluePlayerName = prompt("Enter the name of the Blue coin player:") || "Blue Player"; // Fourth player

// Update the play function to handle the fourth player
function play(player, psum, correction, num) {
    let sum;
    if (psum === 'p1sum') {
        p1sum += num;
        if (p1sum > 100) p1sum -= num;

        const previousPosition = p1sum;

        if (positions[p1sum] && positions[p1sum] < p1sum) {
            alert("Oh no! You landed on a snake. Get ready for a question to save yourself.");
            const correct = handleSaviorQuestion(redPlayerName);
            if (!correct) p1sum = positions[p1sum];
        } else {
            p1sum = positions[p1sum] || p1sum;
        }

        if (positions[previousPosition] && positions[previousPosition] > previousPosition) {
            alert("Great! You found a ladder. Answer a bonus question to climb it!");
            const correct = handleBonusQuestion(redPlayerName);
            if (!correct) p1sum = previousPosition;
        }

        sum = p1sum;
    } else if (psum === 'p2sum') {
        p2sum += num;
        if (p2sum > 100) p2sum -= num;

        const previousPosition = p2sum;

        if (positions[p2sum] && positions[p2sum] < p2sum) {
            alert("Oh no! You landed on a snake. Get ready for a question to save yourself.");
            const correct = handleSaviorQuestion(yellowPlayerName);
            if (!correct) p2sum = positions[p2sum];
        } else {
            p2sum = positions[p2sum] || p2sum;
        }

        if (positions[previousPosition] && positions[previousPosition] > previousPosition) {
            alert("Great! You found a ladder. Answer a bonus question to climb it!");
            const correct = handleBonusQuestion(yellowPlayerName);
            if (!correct) p2sum = previousPosition;
        }

        sum = p2sum;
    } else if (psum === 'p3sum') {
        p3sum += num;
        if (p3sum > 100) p3sum -= num;

        const previousPosition = p3sum;

        if (positions[p3sum] && positions[p3sum] < p3sum) {
            alert("Oh no! You landed on a snake. Get ready for a question to save yourself.");
            const correct = handleSaviorQuestion(greenPlayerName);
            if (!correct) p3sum = positions[p3sum];
        } else {
            p3sum = positions[p3sum] || p3sum;
        }

        if (positions[previousPosition] && positions[previousPosition] > previousPosition) {
            alert("Great! You found a ladder. Answer a bonus question to climb it!");
            const correct = handleBonusQuestion(greenPlayerName);
            if (!correct) p3sum = previousPosition;
        }

        sum = p3sum;
    } else if (psum === 'p4sum') {
        p4sum += num;
        if (p4sum > 100) p4sum -= num;

        const previousPosition = p4sum;

        if (positions[p4sum] && positions[p4sum] < p4sum) {
            alert("Oh no! You landed on a snake. Get ready for a question to save yourself.");
            const correct = handleSaviorQuestion(bluePlayerName);
            if (!correct) p4sum = positions[p4sum];
        } else {
            p4sum = positions[p4sum] || p4sum;
        }

        if (positions[previousPosition] && positions[previousPosition] > previousPosition) {
            alert("Great! You found a ladder. Answer a bonus question to climb it!");
            const correct = handleBonusQuestion(bluePlayerName);
            if (!correct) p4sum = previousPosition;
        }

        sum = p4sum;
    }

    document.getElementById(player).style.transition = 'linear all .5s';
    updatePlayerPosition(player, sum, correction);

    if (sum === 100) {
        winSound.play();
        alert(`${player === 'p1' ? redPlayerName : player === 'p2' ? yellowPlayerName : player === 'p3' ? greenPlayerName : bluePlayerName} Won!!`);
        location.reload();
    }
}

// Handle savior and bonus questions (same as before)
function handleSaviorQuestion(playerName) {
    const saviorAnswer = prompt(`${playerName}, Did you get it correct? (yes/no)`);
    return saviorAnswer && saviorAnswer.toLowerCase() === 'yes';
}

function handleBonusQuestion(playerName) {
    const bonusAnswer = prompt(`${playerName}, Did you get it correct? (yes/no)`);
    return bonusAnswer && bonusAnswer.toLowerCase() === 'yes';
}

// Update the player position (same as before)
function updatePlayerPosition(player, sum, correction) {
    if (sum < 10) {
        document.getElementById(player).style.left = `${(sum - 1) * 62}px`;
        document.getElementById(player).style.top = `${-0 * 62 - correction}px`;
    } else {
        const numarr = Array.from(String(sum));
        const n1 = parseInt(numarr.shift());
        const n2 = parseInt(numarr.pop() || 0);

        if (n1 % 2 !== 0) {
            if (n2 === 0) {
                document.getElementById(player).style.left = `${9 * 62}px`;
                document.getElementById(player).style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                document.getElementById(player).style.left = `${(9 - (n2 - 1)) * 62}px`;
                document.getElementById(player).style.top = `${-n1 * 62 - correction}px`;
            }
        } else {
            if (n2 === 0) {
                document.getElementById(player).style.left = '0px';
                document.getElementById(player).style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                document.getElementById(player).style.left = `${(n2 - 1) * 62}px`;
                document.getElementById(player).style.top = `${-n1 * 62 - correction}px`;
            }
        }
    }
}

// Update the dice roll logic to handle four players
document.getElementById('diceBtn').addEventListener('click', function () {
    const difficulty = prompt("Select difficulty: easy, medium, or hard").toLowerCase();
    let diceRoll;

    if (difficulty === 'easy') {
        diceRoll = 1;
    } else if (difficulty === 'medium') {
        diceRoll = 4;
    } else if (difficulty === 'hard') {
        diceRoll = 6;
    } else {
        alert("Invalid input! Please select 'easy', 'medium', or 'hard'.");
        return;
    }

    const userAnswer = prompt(`Did ${tog % 4 === 1 ? redPlayerName : tog % 4 === 2 ? yellowPlayerName : tog % 4 === 3 ? greenPlayerName : bluePlayerName} get it correct? (yes/no)`);

    if (userAnswer && userAnswer.toLowerCase() === 'yes') {
        rollingSound.play();
        document.getElementById('dice').innerText = `${tog % 4 === 1 ? redPlayerName : tog % 4 === 2 ? yellowPlayerName : tog % 4 === 3 ? greenPlayerName : bluePlayerName}'s Dice: ${diceRoll}`;

        if (tog % 4 === 1) {
            document.getElementById('tog').innerText = `${yellowPlayerName}'s Turn:`;
            play('p1', 'p1sum', 0, diceRoll);
        } else if (tog % 4 === 2) {
            document.getElementById('tog').innerText = `${greenPlayerName}'s Turn:`;
            play('p2', 'p2sum', 55, diceRoll);
        } else if (tog % 4 === 3) {
            document.getElementById('tog').innerText = `${bluePlayerName}'s Turn:`;
            play('p3', 'p3sum', 110, diceRoll);
        } else {
            document.getElementById('tog').innerText = `${redPlayerName}'s Turn:`;
            play('p4', 'p4sum', 165, diceRoll);
        }

        tog++;  // Switch turn
    } else {
        alert("Wrong answer! Turn skipped.");
        document.getElementById('tog').innerText = tog % 4 === 1 ? `${yellowPlayerName}'s Turn:` : tog % 4 === 2 ? `${greenPlayerName}'s Turn:` : tog % 4 === 3 ? `${bluePlayerName}'s Turn:` : `${redPlayerName}'s Turn:`;
        tog++;
    }
});
