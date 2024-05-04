const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let mouse = {
    x: null,
    y: null
};

const maxRadius = 40;

let colorArray = [
    "#348888",
    "#22BABB",
    "#9EF8EE",
    "#FA7F08",
    "#F24405",
];

window.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

class Circle{

    constructor(x, y, dx, dy, radius){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update = () => {

        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx *= -1;
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy *= -1;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        //Interactivity

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        }
        else if(this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }

}


let circleArray = [];
let arrayLength = 700;


function init(){
   
    circleArray = [];

    for(let i = 0; i < arrayLength; i++){

        let radius = Math.random() * 3 + 1; ///podemos hacerlo con maxRadius si queremos
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 1;
        let dy = (Math.random() - 0.5) * 1;
        const circle = new Circle(x,y,dx,dy,radius);
        circleArray.push(circle);
    }
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < arrayLength; i++){

        circleArray[i].update();
    }

}

init();
animate();