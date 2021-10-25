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

                for (let day in data[teacher][subject]['lectures']) {
                    let amount = data[teacher][subject]['lectures'][day]
                    if (amount > 0) {
                        let dayNum = dayMapper[day];
                        let ball = new Ball("", "", teacher, dayNum, true, max(15 * amount, 15), [255, 200, 255], null, {});
                        tubes[dayNum].addBall(ball)
                        balls.push(ball)
                    }
                }

                for (let day in data[teacher][subject]['labs']) {
                    let amount = data[teacher][subject]['labs'][day]
                    if (amount > 0) {
                        let dayNum = dayMapper[day];
                        let ball = new Ball("", "", teacher, dayNum, true, 15 * amount, [155, 200, 255], null, {});
                        tubes[dayNum].addBall(ball)
                        balls.push(ball)
                    }
                }
            }
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
