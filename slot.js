const images = [
  "pamo1.jpg",
  "pamo2.jpg",
  "pamo3.jpg"
];

const reel = document.getElementById("reel");
const start = document.getElementById("start");
const result = document.getElementById("result");

let index = 0;
let timer = null;
let state = "idle";

start.addEventListener("click", () => {

  if (state === "idle") {

    
    state = "spinning";
    start.textContent = "STOP";
    result.textContent = "";

    timer = setInterval(() => {
      index = (index + 1) % images.length;
      reel.src = images[index];
    }, 100);

  } else if (state === "spinning") {

    
    start.disabled = true;

    setTimeout(() => {
      clearInterval(timer);
      state = "idle";
      start.textContent = "START";
      start.disabled = false;


      if (images[index].includes("star")) {
        result.textContent = "✨ 当たり！ ✨";
      } else {
        result.textContent = "はずれ";
      }

    }, 2000);
  }
});
