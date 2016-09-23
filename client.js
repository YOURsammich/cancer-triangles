var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var allTriangles = {};

//http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

//http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function moreRed(hex) {//Math.floor(Math.random() * 6) + 1  
    var rgb = hexToRgb(hex),
        randomRed = Math.floor(Math.random() * 50) - 25,
        randomBlue = Math.floor(Math.random() * 50) - 25,
        randomGreen = Math.floor(Math.random() * 50) - 25;
        
    
    if (rgb) {
        if (rgb.r + randomRed < 254 && rgb.r + randomRed > 0) {
            rgb.r += randomRed;
        }
        if (rgb.b + randomBlue < 254 && rgb.b + randomBlue > 0) {
            rgb.b += randomBlue;
        }
        if (rgb.g + randomGreen < 254 && rgb.g + randomGreen > 0) {
            rgb.g += randomGreen;
        }
        return rgbToHex(rgb.r, rgb.g, rgb.b);
    } else {
        return hex;
    }
}


function getColor(y, x) {
    return #000000;
}

function init() {
    var x,
        y;
    
    for (x = 0; x < window.innerWidth / 5; x++) {
        for (y = 0; y < window.innerHeight / 10; y++) {
            if (allTriangles[y] === undefined) {
                allTriangles[y] = {};
            }
            
            allTriangles[y][x] = getColor(y, x);
        }
    }
}

function drawTriangle(Y, X) {
    X *= 5;
    Y *= 10;
    
    ctx.beginPath();
    if (X % 10 === 0) {
        ctx.moveTo(X - 5, Y + 10);
        ctx.lineTo(X, Y);
        ctx.lineTo(X + 5, Y + 10);
    } else {
        ctx.moveTo(X, Y + 10);
        ctx.lineTo(X - 5, Y);
        ctx.lineTo(X + 5, Y);
    }
    
    ctx.closePath();
    ctx.fillStyle = allTriangles[Y / 10][X / 5];
    ctx.fill();
}

function drawRadius(Y, X, R, func) {
    var XX,
        YY;
    
    for (YY = Y - R; YY < Y + Math.round(R / 2); YY++) {
        for (XX = X - R; XX < X + R; XX++) {
            if (allTriangles[YY] && allTriangles[YY][XX]) {
                allTriangles[YY][XX] = func(allTriangles[YY][XX]);
                drawTriangle(YY, XX);
            }
        }
    }
}

function drawAllTriangles() {
    var yKeys = Object.keys(allTriangles),
        xKeys,
        X,
        Y;
    
    for (Y = 0; Y < yKeys.length; Y++) {
        xKeys = Object.keys(allTriangles[yKeys[Y]]);
        for (X = 0; X < xKeys.length; X++) {
            drawTriangle(Y, X);
        }
    }
    
}

document.body.addEventListener('mousemove', function(e){
    var X = Math.round(e.clientX / 5),
        Y = Math.round(e.clientY / 10);
    
    drawRadius(Y, X, 10, moreRed)
});

init();
drawAllTriangles();
