export const Viergewinnt = function(parent){
    var body = parent;
    var canvas = document.createElement("canvas");
    body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    
    var columns = 7, rows = 6;
    
    var cBounds = {x: 0, y: 0, w: 1000, h: 1000};
    var gBounds = {x: 0, y: 0, w: 800, h: 737};
    var bounds;
    
    var game_over = false;
    var border;
    var playerTurn = 1;
    var cornerSizeX, cornerSizeY;
    var posX, posY;
    var xi, yi;
    
    var isArrived = true;
    var speed;
    
    var isFilled = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    
    var cornerMouse, cornerMouseX = 0, cornerMouseY = 0;
    var focusX, focusY, focus;
    
    var img = new Image();
    img.src = "Viergewinnt\\viergewinnt.png";
    img.onload = function(){
        ctx.drawImage(img, 0, 0, gBounds.w, gBounds.h);
    }
    
    function resopnsive(){
        var sWidth = body.clientWidth;
        var sHeight = innerHeight;
        if(sWidth > 1000){
            cBounds.w = 1000;
            cBounds.h = 83.7 * cBounds.w /100;
        }else{
            cBounds.w = sWidth - (sWidth * 0.05);
            cBounds.h = 83.7 * cBounds.w /100;
        }
        cBounds.x = (sWidth - cBounds.w)/2;
        cBounds.y = (sWidth - cBounds.w)/2;
    
        if(cBounds.h > sHeight){
            cBounds.w = sHeight;
            cBounds.h = 83.7 * cBounds.w /100;
        }
    
        gBounds.w = cBounds.w;
        gBounds.h = getHeight();
    
        posX = [getX(8.2), getX(22.4), getX(36.2), getX(50.2), getX(64.0), getX(78.0), getX(92.0)];
        posY = [getY(11.35), getY(26.88), getY(42.41), getY(57.94), getY(73.47), getY(89.00)];
        
        speed = getY(1.17);
    
        cornerSizeX = getX(6.2);
        cornerSizeY = getY(7.4);
    }
    
    function getHeight(){
        return 83.7 * gBounds.w /100;
    }    
    
    function getX(percent){
        return percent * gBounds.w / 100;
    }
    function getY(percent){
        return percent * gBounds.h / 100;
    }
    
    
    function init(){
        ctx.clearRect(0, 0, cBounds.w, cBounds.h);
        resopnsive();
        canvas.width = cBounds.w;
        canvas.height = cBounds.h;
        canvas.style.marginLeft = cBounds.x + "px";
        canvas.style.marginTop = cBounds.y + "px";
        ctx.fillStyle = "red";
        bounds = canvas.getBoundingClientRect()
        border = [];
        for (let x = 0; x < columns; x++) {
            border.push([]);
            for (let y = 0; y < rows; y++) {
                var path = new Path2D();
                path.ellipse(posX[x], posY[y], cornerSizeX, cornerSizeY, 0, 0, 2*Math.PI);
                border[x].push(path);
            }
        }
    
        canvas.addEventListener("mousedown", (e)=>{
            for (let x = 0; x < columns; x++) {
                for (let y = 0; y < rows; y++) {
                    if(ctx.isPointInPath(border[x][y], e.clientX - bounds.x, e.clientY - bounds.y)){
                        if(!game_over){
                            if(detectBorder() == 0){
                                if(isArrived){
                                    isArrived = false;
                                    xi = x;
                                    yi = getIndex(x);
                                    if(yi != -1){
                                        cornerMouseX = posX[x];
                                        cornerMouseY = gBounds.y;
                                    }
                                }
                            }
                        }else{
                            resetBorder();
                        }
                    }
                }
            }
        });
    
        canvas.addEventListener("mouseup", (e)=>{
            focus = false;
        });
    
        canvas.addEventListener("mousemove", (e)=>{
            if(detectBorder() == 0){
                for (let x = 0; x < columns; x++) {
                    for (let y = 0; y < rows; y++) {
                        if(ctx.isPointInPath(border[x][y], e.clientX - bounds.x, e.clientY - bounds.y)){
                            focus = true;
                            focusX = x;
                            focusY = getIndex(x);
                        }
                    }
                }
            }
        });
    
        function resetBorder(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game_over = false;
            for (let x = 0; x < columns; x++) {
                for (let y = 0; y < rows; y++) {
                    isFilled[x][y] = 0;
                }
            }
        }
    
        function getIndex(x){
            for (let i = 6; i >= 0; i--) {
                if(isFilled[x][i] == 0) return i;
            }
            return -1;
        }
    }
    
    function gameOver(){
        var winner;
        if(detectBorder() == 1) winner = "Yellow WINNS!";
        else if(detectBorder() == -1) winner = "Red WINNS!";
        else winner = "None WINNS!";
        var bgColor = "rgb(0, 0, 0, 0.6)";
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, gBounds.w, gBounds.h);
        ctx.fillStyle = "blue";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        var tx = gBounds.w /2;
        var ty = gBounds.h /2;
        ctx.fillText(winner, tx, ty);
    }
    
    function detectBorder(){
        var f = isFilled;
        for (let s = -1; s <= 1; s+=2) {
            for (let x = 0; x < columns; x++) {
                if(f[x][0] == s && f[x][1] == s && f[x][2] == s && f[x][3] == s) return s;
                if(f[x][1] == s && f[x][2] == s && f[x][3] == s && f[x][4] == s) return s;
                if(f[x][2] == s && f[x][3] == s && f[x][4] == s && f[x][5] == s) return s;
            }
            for (let y = 0; y < rows; y++) {
                if(f[0][y] == s && f[1][y] == s && f[2][y] == s && f[3][y] == s) return s;
                if(f[1][y] == s && f[2][y] == s && f[3][y] == s && f[4][y] == s) return s;
                if(f[2][y] == s && f[3][y] == s && f[4][y] == s && f[5][y] == s) return s;
                if(f[3][y] == s && f[4][y] == s && f[5][y] == s && f[6][y] == s) return s;
            }
    
            for (let y = 0; y < 3; y++) {
                var y0 = 0+y, y1 = 1+y, y2 = 2+y, y3 = 3+y;
                for (let x = 0; x < 4; x++) {
                    var x0 = 0+x, x1 = 1+x, x2 = 2+x, x3 = 3+x;
                    if(f[x0][y3] == s && f[x1][y2] == s && f[x2][y1] == s && f[x3][y0] == s) return s;
                    var x6 = 6-x, x5 = 5-x, x4 = 4-x, x3 = 3-x;
                    if(f[x6][y3] == s && f[x5][y2] == s && f[x4][y1] == s && f[x3][y0] == s) return s;
                }
            }
        }
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                if(isFilled[x][y] == 0) return 0;
            }
        }
        return 2;
    }
    
    function runGame(){
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                filled(x, y);
            }
        }
    
        if(!game_over){
            if(!isArrived){
                focus = false;
                if(cornerMouseY < posY[yi]){
                    cornerMouse = new Path2D();
                    cornerMouse.ellipse(cornerMouseX, cornerMouseY, cornerSizeX, cornerSizeY, 0, 0, 2*Math.PI);
                    ctx.fillStyle = getColor();
                    ctx.fill(cornerMouse);
                    cornerMouseY += speed;
                }else{
                    isArrived = true;
                    isFilled[xi][yi] = playerTurn;
                    ctx.fillStyle = getColor();
                    ctx.fill(border[xi][yi]);
                    playerTurn = -playerTurn;
                    if(detectBorder() != 0) game_over = true;
                }
            }
            
            if(focus){
                ctx.fillStyle = getColor();
                ctx.fill(border[focusX][focusY]);
            }
            ctx.drawImage(img, 0, 0, gBounds.w, gBounds.h);
        }else{
            ctx.drawImage(img, 0, 0, gBounds.w, gBounds.h);
            gameOver();
        }
        function filled(x, y){
            var color = "white";
            if(isFilled[x][y] == 1){
                color = "yellow";
            }else if(isFilled[x][y] == -1){
                color = "red";
            }
            ctx.fillStyle = color;
            ctx.fill(border[x][y]);
        }
    
        function getColor(){
            if(playerTurn == 1) return "yellow";
            if(playerTurn == -1) return "red";
            return "white";
        }
    }
    
    function animate(){
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, cBounds.w, cBounds.h);
        runGame();
    }
    
    init();
    animate();
    
    window.addEventListener("resize", init);    
}
