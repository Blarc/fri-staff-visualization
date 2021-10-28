class Rect_ {
    constructor(x, y, width, height, color) {
        this.x = x / windowWidth;
        this.y = y / windowHeight;
        this.width = width / windowWidth;
        this.height = height / windowHeight;
        this.color = color;
    }

    display() {
        fill(this.color[0], this.color[1], this.color[2])
        rect(
            this.x * windowWidth,
            this.y * windowHeight,
            this.width * windowWidth,
            this.height * windowHeight
        )
    }
}
