function generateRandomSudoku() {
    var grid = [];
    for (var i = 0; i < 9; i++) {
        grid[i] = [];
        for (var j = 0; j < 9; j++) {
            grid[i][j] = 0;
        }
    }
    solveSudoku(grid);
    return grid;
}


function isValid(grid, row, col, num) {

    for (var i = 0; i < 9; i++) {
        if (grid[row][i] === num) {
            return false;
        }
    }

    for (var j = 0; j < 9; j++) {
        if (grid[j][col] === num) {
            return false;
        }
    }

    var startRow = Math.floor(row / 3) * 3;
    var startCol = Math.floor(col / 3) * 3;
    for (var i = startRow; i < startRow + 3; i++) {
        for (var j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}


function solveSudoku(grid) {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (var num = 1; num <= 9; num++) {
                    var randomNumber = Math.floor(Math.random() * 9) + 1;
                    if (isValid(grid, row, col, randomNumber)) {
                        grid[row][col] = randomNumber;
                        if (solveSudoku(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}


function displaySudoku(grid) {
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            let p = document.getElementById("" + i + j + "t")
            if (grid[i - 1][j - 1] == 0) {
                p.textContent = "X";
                let button = document.getElementById("" + i + j)
                button.classList.add("missing")
            } else {
                p.textContent = grid[i - 1][j - 1];
            }
        }
    }
}

function addEffect(buttonId, effect) {
    document.getElementById(buttonId).classList.add(effect);
}

function deleteEffect(buttonId, effect) {
    document.getElementById(buttonId).classList.remove(effect);
}

function handleAddEffect(buttonId, effect) {

    var row = parseInt(buttonId[0]);
    var col = parseInt(buttonId[1]);


    addEffect(buttonId, effect);


    for (var i = 1; i <= 9; i++) {
        addEffect(row + '' + i, effect);
    }


    for (var j = 1; j <= 9; j++) {
        addEffect(j + '' + col, effect);
    }


    var startRow = Math.floor((row - 1) / 3) * 3 + 1;
    var startCol = Math.floor((col - 1) / 3) * 3 + 1;
    for (var i = startRow; i < startRow + 3; i++) {
        for (var j = startCol; j < startCol + 3; j++) {
            addEffect(i + '' + j, effect);
        }
    }
}


function removeEffect(effect) {
    var cells = document.querySelectorAll('.' + effect);
    cells.forEach(function (cell) {
        cell.classList.remove(effect);
    });
}

function removeSome(randomSudoku, remove) {
    for (let i = 1; i <= remove; i++) {
        let row = Math.floor(Math.random() * 9);
        let column = Math.floor(Math.random() * 9);
        randomSudoku[row][column] = 0;
    }
    return randomSudoku;
}


function boardButtonClick(buttonId) {
    let b = document.getElementById(buttonId);
    if (!b.classList.contains("missing")) {
        return;
    }
    if (buttonId == activeButton) {
        removeEffect("selected");
        activeButton = "";
        document.getElementById("choices").style.display = "none"
        return;
    }
    if (buttonId != activeButton && activeButton != "") {
        removeEffect("selected");
    }
    activeButton = buttonId;
    handleAddEffect(buttonId, "selected");
    document.getElementById("choices").style.display = "flex"
}
function checkBoard() {
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            let num = randomSudoku[i - 1][j - 1];
            randomSudoku[i - 1][j - 1] = 0;
            if (num != 0) {
                if (!isValid(randomSudoku, i - 1, j - 1, num)) {
                    addEffect(i + "" + j, "error");
                } else {
                    deleteEffect(i + "" + j, "error");
                }
            }
            randomSudoku[i - 1][j - 1] = num;
        }
    }
}
function choiceButtonClicked(choiceButtonId) {
    let column = activeButton[1] - 1;
    let row = activeButton[0] - 1;
    if (document.getElementById(activeButton + "t").textContent == choiceButtonId[0]) {
        return;
    }
    if (!isValid(randomSudoku, row, column, parseInt(choiceButtonId[0]))) {
        addEffect(activeButton, "error")
        deleteEffect(activeButton, "good")
    } else {
        addEffect(activeButton, "good")
        deleteEffect(activeButton, "error")
    }
    document.getElementById(activeButton + "t").textContent = parseInt(choiceButtonId[0]);
    randomSudoku[row][column] = parseInt(choiceButtonId[0]);
    checkBoard();
}

var randomSudoku = generateRandomSudoku();
var originalSudoku = randomSudoku;
var activeButton = "";
document.getElementById("board").style.display = "none"
document.getElementById("choices").style.display = "none"


function displayGame(remove) {
    randomSudoku = generateRandomSudoku();
    originalSudoku = randomSudoku;
    randomSudoku = removeSome(randomSudoku, remove);
    displaySudoku(randomSudoku);
    document.getElementById("choices").style.display = "none"
    document.getElementById("board").style.display = "block"
    activeButton = "";
    document.getElementById("difficulty-selector").style.display = "none"

}

document.getElementById("easy").addEventListener('click', function () {
    displayGame(20);
});

document.getElementById("medium").addEventListener('click', function () {
    displayGame(35);
});


document.getElementById("hard").addEventListener('click', function () {
    displayGame(55);
});


for (let i = 1; i <= 9; i++) {
    let choiceButtonId = i + "c";
    document.getElementById(choiceButtonId).addEventListener('click', function () {
        choiceButtonClicked(choiceButtonId);
    });
    for (let j = 1; j <= 9; j++) {
        let buttonId = '' + i + j;
        document.getElementById(buttonId).addEventListener('click', function () {
            boardButtonClick(buttonId);
        });
        document.getElementById(buttonId).addEventListener('mouseenter', function () {
            handleAddEffect(buttonId, "hover-effect");
        });
        document.getElementById(buttonId).addEventListener('mouseleave',
            function () {
                removeEffect("hover-effect");
            });
    }
}

