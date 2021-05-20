var navbar_btn = document.getElementById("btn-svg");
var nav = document.getElementsByClassName("nav").item(0);

navbar_btn.addEventListener("mousedown", (e)=>{
    if(nav.style.marginLeft == "100%"){
        nav.style.width = "100%";
        nav.style.height = "100%";
        nav.style.marginLeft = "0%";
    }else {
        nav.style.width = "0%";
        nav.style.height = "0%";
        nav.style.marginLeft = "100%";
    }
});
