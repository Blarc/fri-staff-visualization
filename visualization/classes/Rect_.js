class Rect_ {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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

        if (this.text) {
            fill(0)
            noStroke();
            textAlign(LEFT, TOP)
            let textHeight = (windowHeight + windowWidth) * 0.006;
            textSize(textHeight);
            text(
                this.text,
                12,
                this.y * windowHeight * 1.012,
            )
        }

        if (this.selection) {
            this.selection.position(
                windowWidth * this.width * 0.85,
                windowHeight * this.height * 0.1
            )
            this.selection.size(
                windowWidth * this.width * 0.145,
                windowHeight * this.height * 0.75
            )
        }
    }

    setText(text) {
        this.text = text;
    }

    addSelection() {
        this.selection = createSelect();
        this.selection.option("2020/2021");
    }
}
