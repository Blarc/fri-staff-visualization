let balls = []
let tubes = []

let padding = 5
let boundaryPadding = 3

function setup(){
    createCanvas(640, 360);

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

}

function draw() {
    background(240);

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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomIntInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function createBallsFromFile() {
    readTextFile("visualization/data/classes.json", function(text) {
        let data = JSON.parse(text)
        for (let i in data) {
            let class_ = data[i]
            balls[i] = new Ball(
                class_['name'],
                class_['short'],
                class_['size'] * 2 + 10, ball => {console.log(ball.name)}
            )
        }

        tubes = [
            new Tube(0, 0, width, height, 200, balls),
        ]
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
