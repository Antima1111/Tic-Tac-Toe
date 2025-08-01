console.log("Welcome to Tic Tac Toe");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

let turn = "X";
let isgameover = false;
let musicStarted = false;  // Flag to check if music has started

const changeTurn = () => (turn === "X" ? "0" : "X");

const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    for (let e of wins) {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;

            document.querySelector(".imgbox img").style.width = "200px";

            let line = document.querySelector(".line");
            line.style.width = "20vw";
            line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;

            music.pause();
            gameover.play();
            return;
        }
    }
};

let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
            if (!musicStarted) {
                music.play();
                musicStarted = true;
            }
        }
    });
});

let reset = document.getElementById("reset");

reset.addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach((element) => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".info").innerText = "Turn for " + turn;

    let line = document.querySelector(".line");
    line.style.width = "0vw";
    line.style.transform = "translate(0vw, 0vw) rotate(0deg)";

    document.querySelector(".imgbox img").style.width = "0";

    music.pause();
    music.currentTime = 0;
    gameover.pause();
    gameover.currentTime = 0;

    musicStarted = false;  // Reset so music can start again next game
});
