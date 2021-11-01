let balls = []
let highlightedBalls = []
let tubes = []
let rects = []

let topRect;
let bottomRect;

let padding = 5
let boundaryPadding = 5

let fileNames = {
    "2021/2022 - zima": "visualization/data/teachers_graph_2021_2022_zimski.json",
    "2020/2021 - poletje": "visualization/data/teachers_graph_2020_2021_poletni.json",
    "2019/2020 - poletje": "visualization/data/teachers_graph_2019_2020_poletni.json"
}

let dayMapper = {
    "dayMON": 0,
    "dayTUE": 1,
    "dayWED": 2,
    "dayTHU": 3,
    "dayFRI": 4
}

function reset() {
    tubes = []
    for (let i = 0; i < 5; i++) {
        tubes.push(
            new Tube(
                i / 5.3 + 0.005,
                0.1 / 2,
                1 / 5.3 - 0.01,
                0.9,
                [130, 50, 125],
                i
            )
        )
    }

    let tmp = getItem('timetable');
    if (tmp !== null) {
        topRect.selection.selected(tmp)
        createBallsFromFile(fileNames[tmp])
    } else {
        createBallsFromFile("visualization/data/teachers_graph_2021_2022_zimski.json")
    }
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    topRect = new Rect_(
        0,
        0,
        1,
        0.1 / 2.5,
        [255, 155, 155],
        true
    );
    topRect.addSelection()
    rects.push(topRect)

    bottomRect = new Rect_(
        0,
        0.96,
        1,
        0.1 / 2.5,
        [255, 155, 155]
    );
    bottomRect.setText("Klikni na krogec.")
    rects.push(bottomRect)

    reset();
}

function draw() {
    background(240);

    rects.forEach(rect => {
        rect.display()
    })

    fill(0)
    textSize((windowHeight + windowWidth) * 0.005)
    text("Predavanja in vaje profesorjev in asistentov na Fakulteti za računalništvo in informatiko",
        windowWidth * 0.01,
        windowHeight * 0.01
    )


    tubes.forEach(tube => {
        tube.update(mouseX, mouseY)
        tube.display()
    })

    createGradient(
        (17/18) * windowWidth,
        (0.1 / 2) * windowHeight,
        (1/18 - 0.006) / 2 * windowWidth,
        0.9 * windowHeight,
        color(0, 0, 0, 255),
        color(155, 155, 255, 255),
        1
    )

    createGradient(
        (17/18 + (1/18 - 0.006) / 2) * windowWidth,
        (0.1 / 2) * windowHeight,
        (1/18 - 0.006) / 2 * windowWidth,
        0.9 * windowHeight,
        color(255, 0, 0, 255),
        color(255, 160, 0, 255),
        1
    )

    createGradientText(
        (17/18 + (1/18 - 0.006) / 2) * windowWidth,
        (0.1 / 4) * windowHeight,
        (1/18 - 0.006) / 2 * windowWidth,
        0.9 * windowHeight
    )
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
    reset();
}


function createBallsFromFile(fileName) {
    readTextFile(fileName, function(text) {
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
                        int(course.length) * 10 * (windowWidth + windowHeight) / 2500,
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


function createGradient(x, y, w, h, c1, c2, axis) {
    noFill();

    if (axis === 1) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
            noStroke();
        }
    } else if (axis === 2) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
            noStroke();
        }
    }
}

function createGradientText(x, y, w, h) {
    let interval = h / 15
    for (let i = 1; i < 16; i++) {
        fill(255, 255, 255)
        textSize((windowHeight + windowWidth) * 0.005)
        text(22 - i + ":00", x, y + i * interval)
    }
}

