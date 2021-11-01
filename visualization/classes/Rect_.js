class Rect_ {
    constructor(x, y, width, height, color, legend) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.legend = legend;
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
            let textHeight = (windowHeight + windowWidth) * 0.005;
            textSize(textHeight);
            text(
                this.text,
                12,
                this.y * windowHeight * 1.012,
                this.width * windowHeight
            )
        }

        if (this.legend) {
            fill(255, 70, 0, 255);
            ellipse(
                this.width * 0.7 * windowWidth,
                this.height * 0.5 * windowHeight,
                this.height * 0.5 * windowHeight,
                this.height * 0.5 * windowHeight
            )
            fill(0)
            text(
                "profesorji",
                this.width * 0.65 * windowWidth,
                this.height * 0.5 * windowHeight
            )

            fill(115, 115, 215, 255);
            ellipse(
                this.width * 0.8 * windowWidth,
                this.height * 0.5 * windowHeight,
                this.height * 0.5 * windowHeight,
                this.height * 0.5 * windowHeight
            )

            fill(0)
            text(
                "asistenti",
                this.width * 0.75 * windowWidth,
                this.height * 0.5 * windowHeight
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
        for (let key in fileNames) {
            this.selection.option(key)
        }
        this.selection.changed(() => {
            storeItem('timetable', this.selection.value())
            reset()
        })
    }
}
