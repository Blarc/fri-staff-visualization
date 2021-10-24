let balls = []
let tubes = []

let padding = 5
let boundaryPadding = 5

let width = 640
let height = 360

let menuTube;

function setup(){
    createCanvas(width, height);

    // balls = [
    //     new Ball('name', 'short', 30),
    //     new Ball('name', 'shortname', 30),
    //     new Ball('name', 'shortname', 30),
    //     new Ball('name', 'shortname', 30)
    // ];
    //
    // for (let i = 0; i < 200; i++) {
    //     balls[i] = new Ball("a", "b", 10, i, balls)
    // }

    createBallsFromFile()

    tubes.push(new Tube(9/10 * width, 0, 1/10 * width, height, [235, 235, 245], [
        new Ball('menu1', 'menu1', 25, [200, 200, 200], new p5.Vector(0, 1), ball => {}),
        new Ball('menu1', 'menu1', 25, [200, 200, 200], new p5.Vector(0, 1),ball => {}),
        new Ball('menu1', 'menu1', 25, [200, 200, 200], new p5.Vector(0, 1),ball => {}),
        new Ball('menu1', 'menu1', 25, [200, 200, 200], new p5.Vector(0, 1),ball => {}),
    ]))

}

function draw() {
    background(255, 0, 0);

    tubes.forEach(tube => {
        tube.update(mouseX, mouseY)
        tube.display()
    })
}

function mousePressed() {
    balls.forEach(ball => {
        ball.onClick(mouseX, mouseY);
    })
}


function createBallsFromFile() {
    readTextFile("visualization/data/classes.json", function(text) {
        let data = JSON.parse(text)
        for (let i in data) {

            let r = random(200);
            let g = random(100);
            let b = random(50);

            let class_ = data[i]
            balls[i] = new Ball(
                class_['name'],
                class_['short'],
                class_['size'] * 2 + 10,
                [r, g, b],
            null,
            ball => {console.log(ball.name)}
            )
        }

        tubes.push(new Tube(0, 0, 9/10 * width, height, [230, 200, 200], balls))
    });
}


function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
