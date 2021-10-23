let balls = []


function setup(){
    createCanvas(640, 360);

    // balls = [new Ball('name', 'short', 100, 100, 20), new Ball('name', 'shortname', 700, 100, 80)];

    // for (let i = 0; i < numBalls; i++) {
    //     balls[i] = new Ball("a", "b", getRandomInt(width), getRandomInt(height), 10, i, balls)
    // }

    createBallsFromFile()

}

function draw() {
    background(240);

    balls.forEach(ball => {
        ball.update();
        ball.display();
        ball.checkBoundaryCollision();

        balls.forEach(other => {
            if (ball !== other) {
                ball.checkCollision(other)
            }
        })
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
                getRandomInt(width),
                getRandomInt(height),
                class_['size'] * 2 + 10
            )
        }
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
