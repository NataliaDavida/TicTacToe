/* eslint-disable no-magic-numbers */
document.addEventListener('DOMContentLoaded', () => {

    const gameBoard = document.querySelector('.container')
    const resetGame = document.querySelector('#reset').addEventListener('click', restartGame)
    const step = document.querySelector('.display-player')
    const announcer = document.querySelector('.hide')
    let move='';
    let playerX = 'X'
    let playerO ='0'
    let square = [
                [0,0,0],
                [0,0,0],
                [0,0,0],
    ]

    function createSquares() {
        let out = ''
        for(let i=0; i<square.length; i++) {
            for(let k=0; k<square[i].length; k++) {
                out += `<div class="tile"></div>`
            }
            gameBoard.innerHTML = out
            gameBoard.addEventListener('click', nextStep)
        }
    }
    createSquares()

    
    function nextStep(event){
        let target = event.target;
        if (move % 2 === 0){
            target.innerHTML = playerX;
            target.classList.add('playerX');
            step.innerHTML = playerX;
            step.classList.remove('playerO');
        } else {
            target.innerHTML = playerO;
            target.classList.add('playerO');
            step.innerHTML = playerO;
            step.classList.add('playerO');
        }
        move++; 
        check();
    };
    
    gameBoard.onmouseover = function(event) {
        let target = event.target;
        target.style.background = '#a09d9d';
    };
    
    gameBoard.onmouseout = function(event) {
        let target = event.target;
        target.style.background = '#12181B';
    };
    
    let boxes = document.getElementsByClassName('tile');
    function check(){

        const winnerCombination = [
            [0,1,2],
            [3,4,5],
            [6,7,8],

            [0,3,6],
            [1,4,7],
            [2,5,8],

            [0,4,8],
            [2,4,6],
        ]
        for(let i=0; i<winnerCombination.length; i++) {
            if(boxes[winnerCombination[i][0]].innerHTML==='X' &&
                boxes[winnerCombination[i][1]].innerHTML==='X' && 
                boxes[winnerCombination[i][2]].innerHTML==='X') {
                announcer.innerHTML = `Player <span class="playerX">X</span> Won`
                return stopGame()
            } else if (boxes[winnerCombination[i][0]].innerHTML==='0' && 
                boxes[winnerCombination[i][1]].innerHTML==='0' && 
                boxes[winnerCombination[i][2]].innerHTML==='0') {
                announcer.innerHTML = `Player <span class="playerO">O</span> Won`
                return stopGame()
            }
            announcer.classList.remove('hide')
        }
    }
    function stopGame() {
        gameBoard.removeEventListener('click', nextStep)
    }
    function restartGame() {
      location.reload()
    }
    for(let i =0; i<boxes.length; i++) {
        boxes[i].addEventListener('click', cellClick, false);
    }
    function cellClick() {
        
        if(!this.innerHTML) {
            this.innerHTML = playerX || playerO;
        }else {
            alert('Комірка занята');
            return;
        }

    }
    
// ===============================================================
    const blockes = document.querySelectorAll('.avatar-icon'), 
        boxes1 = document.querySelectorAll('.avatar-container');
        let dragElem = null;
        blockes.forEach(block => { 
        block.draggable = true;
        block.addEventListener('dragstart', startDragBlock);
        block.addEventListener('dragend', endDragBlock);
    });

    function startDragBlock(){
        console.log('dragstart');
        dragElem = this;
        setTimeout(() => {
            this.classList.add('hide');
        }, 0);
    }

    function endDragBlock(){
        console.log('dragend');
        dragElem = null;
        this.classList.remove('hide');
    }

    boxes1.forEach(box => {
        box.addEventListener('dragover', dragBoxOver); 
        box.addEventListener('dragenter', dragBoxEnter); 
        box.addEventListener('dragleave', dragBoxLeave); 
        box.addEventListener('drop', dropInBox); 
    })

    function dragBoxOver(evt){
        console.log('dragover');
        evt.preventDefault();
    }

    function dragBoxEnter(evt){
        console.log('dragenter');
        evt.preventDefault();
    }

    function dragBoxLeave(){
        console.log('dragleave');
    }

    function dropInBox(){
        console.log('drop');
        this.append(dragElem);
    }

})