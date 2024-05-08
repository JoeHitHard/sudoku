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

function handleAddEffect(buttonId, effect) {

    var row = parseInt(buttonId[0]);
    var col = parseInt(buttonId[1]);


    document.getElementById(buttonId).classList.add(effect);


    for (var i = 1; i <= 9; i++) {
        document.getElementById(row + '' + i).classList.add(effect);
    }


    for (var j = 1; j <= 9; j++) {
        document.getElementById(j + '' + col).classList.add(effect);
    }


    var startRow = Math.floor((row - 1) / 3) * 3 + 1;
    var startCol = Math.floor((col - 1) / 3) * 3 + 1;
    for (var i = startRow; i < startRow + 3; i++) {
        for (var j = startCol; j < startCol + 3; j++) {
            document.getElementById(i + '' + j).classList.add(effect);
        }
    }
}


function removeEffect(effect) {
    var cells = document.querySelectorAll('.' + effect);
    cells.forEach(function (cell) {
        cell.classList.remove(effect);
    });
}

function removeSome(randomSudoku) {
    let remove = Math.floor(Math.random() * 11) + 10;
    for (let i = 1; i <= remove; i++) {
        let row = Math.floor(Math.random() * 9);
        let column = Math.floor(Math.random() * 9);
        randomSudoku[row][column] = 0;
    }
    return randomSudoku;
}

var randomSudoku = generateRandomSudoku();
var originalSudoku = randomSudoku;
randomSudoku = removeSome(randomSudoku);
displaySudoku(randomSudoku);

var activeButton = "";

function boardButtonClick (buttonId) {
    let p = document.getElementById(buttonId + "t");
    if (p.textContent != "X") {
        return;
    }
    if (buttonId == activeButton) {
        document.getElementById(activeButton).classList.remove('selected');
        activeButton = "";
        return;
    }
    if (buttonId != activeButton && activeButton != "") {
        document.getElementById(activeButton).classList.remove('selected');
    }
    activeButton = buttonId;
    document.getElementById(buttonId).classList.add('selected');
}

for (let i = 1; i <= 9; i++) {
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

