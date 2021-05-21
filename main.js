import { Viergewinnt } from "./Viergewinnt.js";

var game;
var navbar_btn = document.getElementById("btn-svg");
var nav = document.getElementsByClassName("nav").item(0);
var gameContainer = document.getElementById("game-container");

navbar_btn.addEventListener("mousedown", (e)=>{
    if(!(nav.classList.contains("nav-animi"))){
        nav.classList.add("nav-animi");
    }else{
        nav.classList.remove("nav-animi");
    }
});

window.onresize = (e)=>{
    if(innerWidth > 1000){
        if(nav.classList.contains("nav-animi")){
            nav.classList.remove("nav-animi");
        }
    }
}

var btns = document.getElementsByClassName("nav-btn");
for (let i = 0; i < btns.length; i++) {
    const elem = btns[i];
    elem.onclick = (e)=>{
        var href = elem.href;
        var str = href.substring(href.indexOf("#") + 1);
        console.log(str);
        switch(str){
            case "Game":
                if(gameContainer.children.length == 0){
                    game = new Viergewinnt(gameContainer);
                }
                break;
            case "Game/Viergewinnt":
                if(gameContainer.children.length == 0){
                    game = new Viergewinnt(gameContainer);
                }
                break;
        }
    }
}

