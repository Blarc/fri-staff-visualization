let balls = []
let highlightedBalls = []
let tubes = []

let padding = 5
let boundaryPadding = 5

let width = 1280
let height = 720

let menuTube;

let dayMapper = {
    "dayMON": 0,
    "dayTUE": 1,
    "dayWED": 2,
    "dayTHU": 3,
    "dayFRI": 4
}

function setup(){
    createCanvas(width, height);

    for (let i = 0; i < 5; i++) {
        tubes.push(new Tube(i/5 * width, 0, 1/5 * width, height, [255, 0, 100]))
    }

    createBallsFromFile()
}

function draw() {
    background(255, 255, 0);

    tubes.forEach(tube => {
        tube.update(mouseX, mouseY)
        tube.display()
    })
}

function mousePressed() {
    if (balls.length > 0) {
        balls.forEach(ball => {
            ball.onClick(mouseX, mouseY);
        })
    }
}


function createBallsFromFile() {
    readTextFile("visualization/data/teachers_graph_new.json", function(text) {
        let data = JSON.parse(text)

        for (let teacher in data) {

            for (let subject in data[teacher]) {
                data[teacher][subject]['courses'].forEach(course => {
                    let dayNum = dayMapper[course.day];
                    let ball = new Ball(
                        "",
                        "",
                        teacher,
                        dayNum,
                        data[teacher][subject]['professor'],
                        int(course.start),
                        int(course.length) * 10,
                        [100, 100, 100],
                        null,
                        {}
                    )
                    tubes[dayNum].addBall(ball)
                    balls.push(ball)
                })
            }
        }

        tubes.forEach(tube => {
            tube.sortTube()
            tube.start()
        })
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
