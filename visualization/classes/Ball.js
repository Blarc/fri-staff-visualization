class Ball {
    constructor(name, shortName, teacher, day, isLecture, start, r, color, velocity, onClickListener) {
        this.name = name;
        this.shortName = shortName;
        this.teacher = teacher;
        this.day = day;
        this.isLecture = isLecture;
        this.start = start;
        if (!velocity) {
            this.velocity = new p5.Vector(random(-0.5, 0.5), r * 0.05);
        } else {
            this.velocity = velocity;
        }
        this.velocity.mult(5);
        this.r = r;
        this.m = r * 0.1;
        this.color = color;
        this.savedColor = color;
        this.onClickListener = onClickListener;

        this.position = null;
        this.ellipse = null;
        this.stroke = null;
        this.tube = null;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.y += (0.001 * this.r)
        this.velocity.x *= 0.999
    }

    checkBoundaryCollision(left, right, top, bottom) {
        if (this.position.x >= right - this.r - boundaryPadding) {
            this.position.x = right - this.r - boundaryPadding;
            this.velocity.x *= -0.3;
        } else if (this.position.x <= left + this.r + boundaryPadding) {
            this.position.x = left + this.r + boundaryPadding;
            this.velocity.x *= -0.3;
        }

        if (this.position.y >= bottom - this.r - boundaryPadding) {
            this.position.y = bottom - this.r - boundaryPadding;
            this.velocity.y *= -0.3;
        } else if (this.position.y <= top + this.r + boundaryPadding) {
            this.position.y = top + this.r + boundaryPadding;
            this.velocity.y += 0.01
        }

        return true
    }

    checkCollision(other) {
        // Get distances between the balls components
        let distanceVect = p5.Vector.sub(other.position, this.position);

        // Calculate magnitude of the vector separating the balls
        let distanceVectMag = distanceVect.mag();

        // Minimum distance before they are touching
        let minDistance = this.r + other.r;

        if (distanceVectMag < minDistance) {
            let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
            let d = distanceVect.copy();
            let correctionVector = d.normalize().mult(distanceCorrection);
            other.position.add(correctionVector);
            this.position.sub(correctionVector);

            // get angle of distanceVect
            let theta = distanceVect.heading();
            // precalculate trig values
            let sine = Math.sin(theta);
            let cosine = Math.cos(theta);

            /* bTemp will hold rotated ball this.positions. You
             just need to worry about bTemp[1] this.position*/
            let bTemp = [new p5.Vector(), new p5.Vector()];

            /* this ball's this.position is relative to the other
             so you can use the vector between them (bVect) as the
             reference point in the rotation expressions.
             bTemp[0].this.position.x and bTemp[0].this.position.y will initialize
             automatically to 0.0, which is what you want
             since b[1] will rotate around b[0] */
            bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
            bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;

            // rotate Temporary velocities
            let vTemp = [new p5.Vector(), new p5.Vector()];

            vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y;
            vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x;
            vTemp[1].x = cosine * other.velocity.x + sine * other.velocity.y;
            vTemp[1].y = cosine * other.velocity.y - sine * other.velocity.x;

            /* Now that velocities are rotated, you can use 1D
             conservation of momentum equations to calculate
             the final this.velocity along the x-axis. */
            let vFinal = [new p5.Vector(), new p5.Vector()];

            // final rotated this.velocity for b[0]
            vFinal[0].x =
                ((this.m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) /
                (this.m + other.m);
            vFinal[0].y = vTemp[0].y;

            // final rotated this.velocity for b[0]
            vFinal[1].x =
                ((other.m - this.m) * vTemp[1].x + 2 * this.m * vTemp[0].x) /
                (this.m + other.m);
            vFinal[1].y = vTemp[1].y;

            // hack to avoid clumping
            // bTemp[0].x += vFinal[0].x;
            // bTemp[1].x += vFinal[1].x;

            /* Rotate ball this.positions and velocities back
             Reverse signs in trig expressions to rotate
             in the opposite direction */
            // rotate balls
            let bFinal = [new p5.Vector(), new p5.Vector()];

            bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
            bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
            bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
            bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

            // update balls to screen this.position
            // other.position.x = this.position.x + bFinal[1].x;
            // other.position.y = this.position.y + bFinal[1].y;

            // this.position.add(bFinal[0]);

            // update velocities
            this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y * this.tube.smooth;
            this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x * this.tube.smooth;
            other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y * this.tube.smooth;
            other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x * this.tube.smooth;
        }
    }

    display(mouseX, mouseY) {

        if (this.isLecture) {
            fill(255, 160 - this.start * 15, 0 - this.start * 15, 255);
        }
        else {
            fill(155 - this.start * 15, 155 - this.start * 15, 255 - this.start * 15, 255);
        }

        if (this.isMouseOnBall(mouseX, mouseY)) {
            strokeWeight(4);
            stroke('white')
        }

        if (this.stroke) {
            strokeWeight(6);
            stroke(this.stroke[0], this.stroke[1], this.stroke[2])
        }

        // Create ellipse
        this.ellipse = ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);

        // Add text
        fill(255, 255, 255);
        noStroke();
        textAlign(CENTER, CENTER)
        textSize(this.r * ((11 - this.shortName.length) / 10));
        text(this.shortName, this.position.x, this.position.y)
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOnBall(mouseX, mouseY)) {
            highlightedBalls.forEach(ball => {
                ball.stroke = null
            })

            highlightedBalls = []
            let subjectsSet = new Set()
            balls.forEach(ball => {
                if (this.teacher === ball.teacher) {
                    ball.stroke = [120, 255, 120]
                    highlightedBalls.push(ball)
                    subjectsSet.add(ball.name)
                }
            })

            bottomRect.setText(this.teacher + ": " + Array.from(subjectsSet).join(', '))
        }
    }

    isMouseOnBall(mouseX, mouseY) {
        let d = dist(mouseX, mouseY, this.position.x, this.position.y);
        return d < this.r;
    }

}
