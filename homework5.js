const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 1280
canvas.height = 600

const colorArray = ['purple', 'green', 'blue', 'yellow', 'grey', 'orange', 'red'];
const rand = function (num) {
    return Math.floor(Math.random() * num) + 1;
};

let array = [];
const createBoxes = function (count, canvasWidth, canvasHeight) {
    let index = 0
    while (index < count) {
    array[index] = {
        width: 40,
        height: 40,
        x: rand(canvasWidth - 40),
        y: rand(canvasHeight - 40),
        xDelta: rand(count + 5),
        yDelta: rand(count + 5),
        color: colorArray[rand(colorArray.length) - 1],
        draw: function () {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height)
        },
        update: function () {
            if (this.x <= 0 || this.x >= canvas.width - this.width) {
                this.xDelta *= -1;

                this.color = colorArray[rand(colorArray.length) - 1]
            }
            if (this.y <= 0 || this.y >= canvas.height - this.height) {
                this.yDelta *= -1;

                this.color = colorArray[rand(colorArray.length - 1)]
            }
            this.x += this.xDelta;
            this.y += this.yDelta;


        }

    }

        index++
    }
};

const draw = function () {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height)
    let i = 0
    while (i < array.length) {
        array[i].draw();
        i++
    }
}

const update = function () {
    let i = 0
    while (i < array.length) {
        array[i].update();
        i++
    }
}

const animate = function () {
    draw();
    update();
    requestAnimationFrame(animate)
}

animate();
createBoxes(25, canvas.width, canvas.height)