class Tube {
    constructor(x, y, width, height, color, balls) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.balls = balls;

        this.balls.forEach(ball => {
            ball.position = new p5.Vector(
                this.x + this.width / 2,
                120
            )
        })
    }

    display() {
        fill(this.color)
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
