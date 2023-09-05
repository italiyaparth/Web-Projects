let gameSeq = [];
let userSeq = [];

let btns = ["orange", "skyblue", "greenyellow", "pink"];

let isStarted = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    
    if (isStarted == false) {

        isStarted = true;
    }

    setTimeout(levelUp, 500);
});

function levelUp() {

    userSeq = [];

    level++;
    if (highScore < level) {
        highScore++;
    }
    h2.innerHTML = `Level ${level} <br> High Score: ${highScore - 1}`;

    let randIndex = Math.floor(Math.random() * 4);
    let randColor = btns[randIndex];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    gameFlash(randbtn);
}

function gameFlash(btn) {

    btn.classList.add("gameFlash");

    setTimeout(() => {

        btn.classList.remove("gameFlash");

    }, 100);
}

let allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
    btn.addEventListener("click", userBtnPress);
}

function userBtnPress() {

    let clickedBtn = this;
    userFlash(clickedBtn);

    let userColor = clickedBtn.id;
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

function userFlash(btn) {

    btn.classList.add("userFlash");

    setTimeout(() => {

        btn.classList.remove("userFlash");

    }, 100);
}

function checkAns(idx) {
    
    if (gameSeq[idx] == userSeq[idx]) {

        if (gameSeq.length == userSeq.length) {

            setTimeout(levelUp, 1000);
        }
        
    } else {


        h2.innerHTML = `Game Over! Your Score was <u>${level - 1}</u> <br> High Score: ${highScore - 1}
                         <br> Press any Key to Start...`;
        
        reset();
    }
}

function reset() {

    isStarted = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}