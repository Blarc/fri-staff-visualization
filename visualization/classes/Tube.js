class Tube {
    constructor(x, y, width, height, color) {
        this.x = x + padding;
        this.y = y;
        this.width = width - padding;
        this.height = height;
        this.color = color;
        this.balls = [];
        this.visibleBalls = [];
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
            random(this.x + ball.r, this.x + this.width - ball.r),
            ball.r
        )
        this.balls.push(ball)
    }

    sortTube() {
        this.balls.sort((a, b) => {
            return b.start - a.start
        })
    }

    display() {
        fill(this.color[0], this.color[1], this.color[2])
        rect(this.x, this.y, this.width, this.height)

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
            ball.checkBoundaryCollision(this.x, this.x + this.width, this.y, this.y + this.height);
        })
    }
}
