const container = document.querySelector('.container');
const items = Array.from(document.querySelectorAll('.item'));
const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal h1');
const restartGame  = document.querySelector('button');

const X = 'cross';
const circle = 'circle'
let currentPlayer = true;
let xBoard = [];
let circleBoard = [];


    items.forEach(item => {
    item.addEventListener('click',handleClick,{once:true})
})

function handleClick(e) {
    let player =   checkCurrentPlayer();
    e.target.classList.add(player);
    changeHoverClass(player);
    changePlayer();
    storeSelectedBoard(e,player);
    if(xBoard.length > 2) checkWinner(player);
}

let checkCurrentPlayer = () => {
    let player = (currentPlayer)? X : circle;
       return player;
}

let changePlayer = () => {
    currentPlayer = !currentPlayer;
}

let changeHoverClass = (player) => {
    let hoverClass = (player == X)? circle : X;
    container.classList.remove(player);;
     container.classList.add(hoverClass);
    
}

let storeSelectedBoard = (e,player) => {
    let element = Number(e.target.id);
    (player == X)? xBoard.push(element) : circleBoard.push(element);
}


let checkWinner = (player) => {
    let winningPositions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    let boardToCheck = (player == X)? xBoard : circleBoard;

    let result =  winningPositions.some(item => {
               return   item.every(element => {
                 return  boardToCheck.includes(element)
                })
            })
         updateUI(result,player)
}


let updateUI = (result,player) => {
    if(result == true) {
    modal.textContent = (player ==X)?  `X won!` :  `O won!` ;
      modalContainer.style.display = 'flex';     
    }
 
    if(items.every(item => {
        return  item.classList.contains(X) ||  item.classList.contains(circle);
       }))  {
         modal.textContent = `It's a draw!`
         modalContainer.style.display = 'flex';    
    }
   
 }
 

 restartGame.addEventListener('click',() => {
    modalContainer.style.display = 'none';
    items.forEach(item => {
        item.classList.remove('cross');
        item.classList.remove('circle');
        container.classList.remove('circle');
        container.classList.add('cross');
        item.removeEventListener('click',handleClick);
        item.addEventListener('click',handleClick,{once:true});
    })
        currentPlayer = true;
        xBoard = [];
        circleBoard = [];
 })

