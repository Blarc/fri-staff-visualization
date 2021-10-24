class Tube {
    constructor(x, y, width, height, color, balls) {
        this.x = x + padding;
        this.y = y;
        this.width = width - padding;
        this.height = height;
        this.color = color;
        this.balls = balls;

        this.balls.forEach(ball => {
            ball.position = new p5.Vector(
                random(this.x + ball.r, this.x + this.width - ball.r),
                ball.r
            )
        })
    }

    display() {
        fill(this.color[0], this.color[1], this.color[2])
        rect(this.x, this.y, this.width, this.height)

        this.balls.forEach(ball => {
            ball.display(mouseX, mouseY);
        })
    }

    update() {
        this.balls.forEach(ball => {
            ball.update();
            ball.checkBoundaryCollision(this.x, this.x + this.width, this.y, this.y + this.height);

            this.balls.forEach(other => {
                if (ball !== other) {
                    ball.checkCollision(other)
                }
            })
        })
    }
}
