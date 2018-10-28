const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 1350;
canvas.height = 580;

const rand = function (num) {
    return Math.floor(Math.random() * num) + 1;
};

const background = new Image();
background.src = 'https://i.pinimg.com/originals/bd/a7/39/bda739eb7928d7dd696b8ab3bf9d982e.jpg';

const tom = new Image();
tom.src = 'https://vignette.wikia.nocookie.net/dbxfanon/images/6/69/Tom.png/revision/latest?cb=20180715124823';

const jerry = new Image();
jerry.src = 'https://www.cartoon-clipart.co/amp/images/august3116.gif';

const gameData = {
    jerry: {
        x: rand(800),
        y: rand(500),
        width: 45,
        height: 60,
        xDelta: 0,
        yDelta: 0,
        image: jerry,
        draw: function () {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        },
        update: function () {
            if (this.xDelta !== 0 && this.x + this.xDelta >= 0 && this.x + this.xDelta + this.width <= canvas.width) {
                this.x += this.xDelta
            }
            if (this.yDelta !== 0 && this.y + this.yDelta >= 0 && this.y + this.yDelta + this.height <= canvas.height) {
                this.y += this.yDelta
            }
            this.xDelta = 0;
            this.yDelta = 0;
        }


    },
    toms: [],

}


const createToms = function (count, canvasWidth, canvasHeight) {
    let tomArray = [];
    let index = 0
    while (index < count) {
        tomArray[index] = {
            x: rand(canvasWidth - 60),
            y: rand(canvasHeight - 80),
            width: 60,
            height: 80,
            xDelta: 2,
            yDelta: 2,
            image: tom,
            draw: function () {
                context.drawImage(this.image, this.x, this.y, this.width, this.height)
            },
            update: function () {
                if (this.x <= 0 || this.x >= canvas.width - this.width) {
                    this.xDelta *= -1
                };
                if (this.y <= 0 || this.y >= canvas.height - this.height) {
                    this.yDelta *= -1
                };
                this.x += this.xDelta;
                this.y += this.yDelta;
            }
        }
        index++
    }
    gameData.toms = tomArray
}
    

const addTom=function () {
    let index=gameData.toms.length;
    gameData.toms[index]={
        x: rand(canvas.width - 60),
        y: rand(canvas.height - 80),
        width: 60,
        height: 80,
        xDelta: 2,
        yDelta: 2,
        image: tom,
        draw: function () {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        },
        update: function () {
            if (this.x <= 0 || this.x >= canvas.width - this.width) {
                this.xDelta *= -1
            };
            if (this.y <= 0 || this.y >= canvas.height - this.height) {
                this.yDelta *= -1
            };
            this.x += this.xDelta;
            this.y += this.yDelta;
        }
    }
    
    
}

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case upKey:
            gameData.jerry.yDelta = -9;
            break;
        case downKey:
            gameData.jerry.yDelta = 9;
            break;
        case rightKey:
            gameData.jerry.xDelta = 9;
            break;
        case leftKey:
            gameData.jerry.xDelta = -9;
            break;
        default:
            break;
    }

}, false);


const draw = function () {
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    gameData.jerry.draw();
    for (let i = 0; i < gameData.toms.length; i++) {
        const element = gameData.toms[i];
        element.draw();
    }
}

const update = function () {
    gameData.jerry.update();
    for (let i = 0; i < gameData.toms.length; i++) {
        const element = gameData.toms[i];
        element.update();
    }
}

const collision = function () {
    let jerryCenterX = gameData.jerry.x + gameData.jerry.width / 2;
    let jerryCenterY = gameData.jerry.y + gameData.jerry.height / 2;
    for (let i = 0; i < gameData.toms.length; i++) {
        const element = gameData.toms[i];
        let tomCenterX = element.x + element.width / 2;
        let tomCenterY = element.y + element.height / 2;
        if (Math.abs(tomCenterX - jerryCenterX) + 20 <= gameData.jerry.width / 2 + element.width / 2
         && Math.abs(tomCenterY - jerryCenterY) + 10 <= gameData.jerry.height / 2 + element.height / 2) {
            alert('Game Over');
            gameData.jerry.x = rand(800);
            gameData.jerry.y = rand(500);
            createToms(5,canvas.width,canvas.height);
            clearInterval(setId);
            setId=setInterval(function()  {
                addTom();
                
            }, 7000);
        }
    }
}
let setId=setInterval(function()  {
    addTom();
    
}, 7000);
const animate = function () {
    update();
    draw();
    collision();
    requestAnimationFrame(animate);

}
createToms(5, canvas.width, canvas.height);
animate();
