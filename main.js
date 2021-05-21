import { Viergewinnt } from "./Viergewinnt/viergewinnt.js";

var game;
var navbar_btn = document.getElementById("btn-svg");
var nav = document.getElementsByClassName("nav").item(0);
var body = document.getElementById("content");
console.log(body.clientWidth);

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
            case "Game/Viergewinnt":
                game = new Viergewinnt(body);
                break;
        }
    }
}

