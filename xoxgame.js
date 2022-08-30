
const X_CLASS ='cross'
const O_CLASS='circle'
const COMBINATIONS = [

]

const board = document.getElementById('board')
const cells = document.querySelectorAll('.cell')
const result = document.getElementById('result')
const resultText= document.querySelector('.result-text')
const restartButton = document.getElementById(restartButton)

let turn

const swapTurn = () => { turn = !turn}

const placeMark = (cell,currentClass) =>{ 
    cell.classList.add(currentClass)
}
//işaretlemeyi kontrol ediyoruz
const placeHover=()=>{
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)

    if(turn) board.classList.add(O_CLASS)
    else board.classList.add(X_CLASS)
}

//beraberlik için
const endGame = (draw) => {
    if(draw) resultText.innerText = 'Game ended in a draw :) '
    else resultText.innerText= `${turn ? 'O' : 'X'} won the game !! `

    result.classList.add('show')
}
// x ya da y, hücrelerde var mı diye bakıyoruz, bunu kontrol ediyoruz
const isDraw = () => {
    return[...cells].every(cell=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

//kazanan durumlarla eşleşiyor mu diye kontrol ediyorum
const checkWin = (currentClass) => {
    return COMBINATIONS.some(combination => {
        return combination.every(index =>{
            return cells[index].classList.contains(currentClass)
        })
    })
}

//tıklanma olaylarının kontrolü 

const handleClick = (e) => {
    const cell = e.target
    const currentClass = turn ? O_CLASS : X_CLASS
    placeMark(cell,currentClass)
    if (checkWin(currentClass)){
        endGame(false)

    }
    else if (isDraw()) {
        endGame(true)
    }
    else{
        swapTurn()
        placeHover()
    }
}
const resetGame =() =>{
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click',handleClick, {once : true})
    })
}
const startGame = () =>{
    turn =false
    placeHover()
    result.classList.remove('show')
}
startGame()
restartButton.addEventListener('click',startGame)


