# FRI staff visualization
A simple visualization of the lectures of the Faculty of Computer and Information Science in Ljubljana.

It can be seen on: https://blarc.github.io/fri-staff-visualization/

## Motivation
In this visualization I was trying to show the load of work of proffesors and assistants in a way, that we can compare them between eachother. Furthermore, I sorted the work by week days, colored the circles depending on when in the day they are scheduled and represented the amount of hours of work with circle's size. You can also choose between different semesters in the top right corner and click on a circle, to see all the lectures/labs of the chosen proffesor/assistant.

## Result
From the visualization, we can clearly see that on friday there is the least amount of lectures and labs. We can also see that overall, assistants have more labs than proffesors have lectures. However, both lectures and labs are pretty evenly distributed thoughout the day.

## Repository structure
This repository cotains the following folders and files:
- `data` contains python scripts for scraping the data, that was used for visualization, from the timetable
- `visualization` contains the visualization script and classes implemented in javascript with p5.js library
- `index.html` is the main .html file that runs everything

## Running localy
To run the visualization localy you just have to clone the repo and open `index.html` in a web browser.
```
git clone https://github.com/Blarc/fri-staff-visualization.git
```



