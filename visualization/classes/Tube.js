class Tube {
    constructor(x, y, width, height, color, index) {
        this.x = x / windowWidth;
        this.y = y / windowHeight;
        this.width = width / windowWidth;
        this.height = height / windowHeight;
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
}
