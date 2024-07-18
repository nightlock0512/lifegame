const container = document.querySelector(".container");

let size = 100;
let map = [];
let map_b = [];
let wall = 0;

for (let i = 0; i < size; i++) {
    map.push([]);
    map_b.push([]);
    for (let j = 0; j < size; j++) {
        map[i].push(0);
        map_b[i].push(0);
    }
}

for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        let elm = document.createElement("div");
        elm.classList.add("cells");
        elm.addEventListener("click", () => {
            map[i][j] = map[i][j] == 1 ? 0 : 1;
            elm.classList.toggle("black");
        });
        container.appendChild(elm);
    }
}

const cells = document.querySelectorAll(".cells");


const getValue = (i, j) => {
    if (map[i] == undefined || map[i][j] == undefined) {
        return wall;
    } else {
        return map[i][j];
    }
}

const update = () => {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            map_b[i][j] = map[i][j];
        }
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let sum = getValue(i - 1, j - 1) + getValue(i - 1, j) + getValue(i - 1, j + 1) + getValue(i, j - 1) + getValue(i, j + 1) + getValue(i + 1, j - 1) + getValue(i + 1, j) + getValue(i + 1, j + 1);
            switch (true) {
                case sum == 3:
                    map_b[i][j] = 1;
                    cells[i * size + j].classList.add("black");
                    break;
                
                case sum <= 1:
                    map_b[i][j] = 0;
                    cells[i * size + j].classList.remove("black");
                    break;

                case sum >= 4:
                    map_b[i][j] = 0;
                    cells[i * size + j].classList.remove("black");
                    break;

                default:
                    break;
            }
        }
    }
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            map[i][j] = map_b[i][j];
        }
    }
}

const randomCell = (val = 0.3) => {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (Math.random() < val) {
                map[i][j] = 1;
                cells[i * size + j].classList.add("black");
            } else {
                map[i][j] = 0;
                cells[i * size + j].classList.remove("black");
            }
        }
    }
}

let interval;
const autoUpdate = (time = 200) => {
    clearInterval(interval);
    if (time == "stop") {
        return;
    }
    interval = setInterval(() => {
        update();
    }, time);
}