let balls = []
let highlightedBalls = []
let tubes = []
let rects = []

let padding = 5
let boundaryPadding = 5

let tubesWidth = 0
let tubesHeight = 0
let tubesWidthRatio = 0.98
let tubesHeightRatio = 0.9

let menuTube;

let dayMapper = {
    "dayMON": 0,
    "dayTUE": 1,
    "dayWED": 2,
    "dayTHU": 3,
    "dayFRI": 4
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    tubesWidth = windowWidth * tubesWidthRatio
    tubesHeight = windowHeight * tubesHeightRatio

    rects.push(new Rect_(
        // (windowWidth * 0.02) / 2,
        0,
        0,
        // (windowHeight * 0.1) / 15,
        // (windowWidth * 0.98),
        windowWidth,
        (windowHeight * 0.1) / 2.5,
        [255, 155, 155]
        )
    )
    rects.push(new Rect_(
        // (windowWidth * 0.02) / 2,
        0,
        (windowHeight * 0.96),
        // (windowHeight * 0.1) / 15 + (windowHeight * 0.947),
        // (windowWidth * 0.98),
        windowWidth,
        (windowHeight * 0.1) / 2.5,
        // (windowHeight * 0.1) / 2.5,
        [255, 155, 155]
        )
    )

    for (let i = 0; i < 5; i++) {
        tubes.push(
            new Tube(
                i/5 * windowWidth + (windowHeight * 0.005),
                // i/5 * windowWidth * 0.98 + (windowWidth * 0.01),
                (windowHeight * 0.1) / 2,
                // 1/5 * windowWidth * 0.98,
                1/5 * windowWidth - (windowHeight * 0.01),
                windowHeight * 0.9,
                [130, 50, 125],
                i
            )
        )
    }

    createBallsFromFile()
}

function draw() {
    background(255, 255, 255);

    // bottomText = text("HELLO", (windowWidth - tubesWidth) / 2 + padding, (windowHeight - tubesHeight) / 15 + (windowHeight + (1.517 * tubesHeight)) / 2.5)

    rects.forEach(rect => {
        rect.display()
    })

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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function createBallsFromFile() {
    readTextFile("visualization/data/teachers_graph_new.json", function(text) {
        let data = JSON.parse(text)

        for (let teacher in data) {

            for (let subject in data[teacher]) {
                data[teacher][subject]['courses'].forEach(course => {
                    let dayNum = dayMapper[course.day];
                    let ball = new Ball(
                        subject,
                        course.shortName,
                        teacher,
                        dayNum,
                        data[teacher][subject]['professor'],
                        int(course.start),
                        int(course.length) * 10 * (tubesWidth + tubesHeight) / 2250,
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
