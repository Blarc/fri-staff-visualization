days = ["Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek"]

class Tube {
    constructor(x, y, width, height, color, index) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.index = index;

        this.balls = [];
        this.visibleBalls = [];
        this.smooth = 1.0;
        this.ballResize = 1;
    }

    start() {
        setInterval(
            (balls, visibleBalls) => {
                if (balls.length > 0) {
                    visibleBalls.push(balls.pop())
                }
            },
            100,
            this.balls,
            this.visibleBalls
        )
    }

    addBall(ball) {
        ball.position = new p5.Vector(
            random(
                this.x * windowWidth + ball.r,
                this.x * windowWidth + this.width * windowWidth - ball.r
            ),
            ball.r
        )
        ball.tube = this;
        this.balls.push(ball)
    }

    sortTube() {
        this.balls.sort((a, b) => {
            return b.start - a.start
        })
    }

    display() {
        fill(this.color[0], this.color[1], this.color[2])
        rect(
            this.x * windowWidth,
            this.y * windowHeight,
            this.width * windowWidth,
            this.height * windowHeight
        )

        fill(255, 255, 255)
        textAlign(LEFT, TOP)
        textSize((windowHeight + windowWidth) * 0.008);
        text(
            this.getDay(this.index),
            (this.x * windowWidth + this.width * windowWidth / 2) - textWidth( this.getDay(this.index)) * 0.5,
            this.y * windowHeight + 0.01 * windowHeight
        )

        this.visibleBalls.forEach(ball => {
            ball.display(mouseX, mouseY);
        })
    }

    update() {
        this.visibleBalls.forEach(ball => {
            ball.update();
            this.visibleBalls.forEach(other => {
                if (ball !== other) {
                    ball.checkCollision(other)
                }
            })
            ball.checkBoundaryCollision(
                this.x * windowWidth,
                (this.x + this.width) * windowWidth,
                this.y * windowHeight,
                (this.y + this.height) * windowHeight
            );
        })
        this.smooth *= 0.9999
    }

    getDay(number) {
        return days[number]
    }

}
