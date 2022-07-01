const container  = document.querySelector('.game-box')

let gamePhase = 1
let moves     = 0 
let disc
let level

const createStack = () => {
    
    let stack = document.createElement('div')
    stack.classList.add('stack')
    container.appendChild(stack)
}

for (let i = 0; i < 3; i++) {
    createStack()
}

const stackOne   = document.querySelector('.stack:nth-child(1)')
const stackTwo   = document.querySelector('.stack:nth-child(2)')
const stackThree = document.querySelector('.stack:nth-child(3)')
const startBtn   = document.getElementById('startBtn')
const levelList = document.getElementById('difficulty')
const totalMoves = document.querySelector('span')

const createDisc = (n) => {

    for (let i = 1; i <= n; i++) {
        let newDisc = document.createElement('div')
        newDisc.classList.add('disc')
        newDisc.classList.add(`disc-${i}`)
        stackOne.appendChild(newDisc)
    }
}

const difficulty = (levelSelected) => {

    switch(levelSelected) {

        case 'Easy':
            level = 3
            createDisc(level)
            break

        case 'Medium':
            level = 4
            createDisc(level)
            break

        case 'Hell':
            level = 5
            createDisc(level)
    }
}

const startGame = () => {
    level = levelList.value
    difficulty(level)

    startBtn.classList.add('hidden')
    resetBtn.classList.remove('hidden')
}

startBtn.addEventListener('click', startGame)

const winMessage = document.querySelector('.winner')
winMessage.classList.add('hidden')

const winnerCheck = () => {
    
    if (stackThree.childElementCount === level) {
        winMessage.classList.remove('hidden')
    }
}

const isItOver = () => {
    setTimeout(winnerCheck, 300);
}

const moveDisc = (e) => {

    if (gamePhase === 1) {

        disc = e.currentTarget.lastElementChild
        disc.classList.add('selected')
        
        gamePhase = 2

    } else {  

        stack = e.currentTarget
        
        if (stack.childElementCount === 0) {

            stack.appendChild(disc)
            moves++

        } else {

            let discWidth        = disc.clientWidth
            let discOnStackWidth = stack.lastElementChild.clientWidth
            
            if (discWidth < discOnStackWidth) {

                stack.appendChild(disc)
                moves++

            } else {

                alert('The target disc is bigger!')
            }
        }

        totalMoves.innerText = moves
        disc.classList.remove('selected')
        gamePhase = 1
    }
}

const reset = () => {

    const cleanStack = (stackToClean) => {
        while(stackToClean.lastElementChild) {
            stackToClean.removeChild(stackToClean.lastElementChild)
        }
    }

    for(let i = 0; i < 3; i++) {
        let arrayOfStacks = document.querySelectorAll('.stack')
        cleanStack(arrayOfStacks[i])
    }

    startBtn.classList.remove('hidden')
    levelList.classList.remove('hidden')
    winMessage.classList.add('hidden')
    resetBtn.classList.add('hidden')

    gamePhase = 1
    level     = ""
    moves     = 0

    totalMoves.innerText = '0'

    startGame()
}

const resetBtn = document.getElementById('reset')
resetBtn.classList.add('hidden')

resetBtn.addEventListener('click', reset)

stackOne.addEventListener('click', moveDisc)
stackTwo.addEventListener('click', moveDisc)
stackThree.addEventListener('click', moveDisc)

stackThree.addEventListener('click', isItOver)