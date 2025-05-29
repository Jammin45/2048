Board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
function CreateCube(column, row, value) {
    let add;
    if (document.getElementsByClassName(`${row}/${column}`).length === 0) {
        add = document.createElement('div');
    } else {
        add = document.getElementsByClassName(`${row}/${column}`)[0];
    }
    add.className = '';
    add.classList.add('tile');
    add.style.gridRow = row;
    add.style.gridColumn = column;
    add.textContent = value;
    if (value < 9000 && value != 0) {
        add.classList.add(`x${value}`);
    } else if (value != 0){
        add.classList.add('x8192');
    }
    add.classList.add(`${row}/${column}`);
    document.querySelector('.Board').appendChild(add);
}
function CreateBoard() {
    for (i=1;i<5;i++) {
        for (j=1;j<5;j++) {
            if (Board[j-1][i-1] === 0) {
                CreateCube(i,j,'');
            }
            else {
                CreateCube(i,j,Board[j-1][i-1]);
            }
        }
    }
}
function Move(direction) {
    for (i=0;i<2;i++) {
        for (r=3; r>=0; r--) {
            for (c=3; c>=0; c--) {
                if (direction === "a") {
                    if (Board[r][c-1] === 0 && c != 0) {
                        Board[r][c-1] = Board[r][c]
                        Board[r][c] = 0
                    }}
                else if (direction === "d" && c != 0) {
                    if (Board[r][c] === 0) {
                        Board[r][c] = Board[r][c-1]
                        Board[r][c-1] = 0
                    }}
                else if (direction === "w" && r != 0) {
                    if (Board[r-1][c] === 0) {
                        Board[r-1][c] = Board[r][c]
                        Board[r][c] = 0
                    }
                }
                else if (direction === "s" && r != 0) {
                    if (Board[r][c] === 0) {
                        Board[r][c] = Board[r-1][c]
                        Board[r-1][c] = 0
                    }
                }
            }
        }
    }
}
function Merge(direction) {
    for (r = 0; r < 4; r++) {
        for (c = 0; c < 4; c++) {
            if (direction === 'a') {
                if (Board[r][c] === Board[r][c-1] && c != 0) {
                    Board[r][c-1] *= 2
                    Board[r][c] = 0
                }}
            else if (direction === 'd') {
                if (Board[r][c] === Board[r][c+1] && c != 3) {
                    Board[r][c+1] *= 2
                    Board[r][c] = 0
                }}
            else if (direction === 'w' && r != 0) {
                if (Board[r][c] === Board[r-1][c]) {
                    Board[r-1][c] *= 2
                    Board[r][c] = 0
                }}
            else if (direction === 's' && r != 3) {
                if (Board[r][c] === Board[r+1][c]) {
                    Board[r+1][c] *= 2
                    Board[r][c] = 0
                }}
        }
    }
}
function AddRanTile() {
    opentiles = []
    for (i=0;i<4;i++) {
        for (j=0;j<4;j++) {
            if (Board[i][j] === 0) {
                opentiles.push([i,j])
            }
        }
    }
    if (opentiles[0] != undefined) {
        adding = Math.round(Math.random()*(opentiles.length-1))
        Board[opentiles[adding][0]][opentiles[adding][1]] = 2
        if (Math.random()<0.1) {
            Board[opentiles[adding][0]][opentiles[adding][1]] = 4
        }
    }
}
function isDead() {
    for (i=0;i<4;i++) {
        for (j=0;j<4;j++) {
            if (i!=0) { if (Board[i][j]===Board[i-1][j]) {return false}}
            if (j!=0) { if (Board[i][j]===Board[i][j-1]) {return false}}
            if (i!=3) { if (Board[i][j]===Board[i+1][j]) {return false}}
            if (j!=3) { if (Board[i][j]===Board[i][j+1]) {return false}}
            if (Board[i][j] === 0) {return false}
        }
    }
    return true;
}
function Score() {
    let RunningScore = 0;
    for (i=0;i<4;i++) {
        for (j=0;j<4;j++) {
            RunningScore += Board[i][j]
        }
    }
    return(RunningScore)
}
AddRanTile()
CreateBoard()
window.alert("press w,a,s,d keys to move tiles")
document.addEventListener("keydown", event => {
    if (event === 'w','a','s','d') {
        Move(event.key)
        Merge(event.key)
        Move(event.key)
        AddRanTile()
        CreateBoard()
        document.getElementsByClassName("Score")[0].textContent = `Score: ${Score()}`
        if (isDead()) {window.alert(`You have died, final score: ${Score()}`)}
    }
})
document.getElementById('restart').onclick = function() {
    Board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    AddRanTile()
    CreateBoard()
}