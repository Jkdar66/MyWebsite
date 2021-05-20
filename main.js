var navbar_btn = document.getElementById("btn-svg");
var nav = document.getElementsByClassName("nav").item(0);

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
// https://stackoverflow.com/questions/49655095/how-to-update-my-cloned-repository-according-to-the-official-repository