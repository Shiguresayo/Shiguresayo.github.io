const images = ["pamo1.jpg","pamo2.jpg","pamo3.jpg"];
const reels = document.querySelectorAll(".reel-inner");
const btn = document.getElementById("startBtn");
const resultDiv = document.getElementById("result");

let indices = [0,0,0];

// 初期表示
reels.forEach((reel, i) => {
  const imgs = reel.querySelectorAll("img");
  imgs.forEach((img, idx) => img.style.display = (idx === indices[i]) ? "block" : "none");
});

btn.addEventListener("click", () => {
  btn.disabled = true;
  resultDiv.textContent = "";

  const intervalTime = 50; // 高速回転
  const startDelays = [0, 200, 400]; // 各リールのスタート遅延(ms)
  const stopDelays  = [1000, 1500, 2000]; // 各リールの停止タイミング(ms)
  
  reels.forEach((reel, i) => {
    let elapsed = 0;
    let interval;

    setTimeout(() => { // スタート遅延
      interval = setInterval(() => {
        indices[i] = (indices[i]+1) % images.length;
        const imgs = reel.querySelectorAll("img");
        imgs.forEach((img, idx) => img.style.display = (idx === indices[i]) ? "block" : "none");

        elapsed += intervalTime;
        if(elapsed >= stopDelays[i]) { // 停止タイミング
          clearInterval(interval);
          // 最終的にランダム表示
          const finalIndex = Math.floor(Math.random()*images.length);
          imgs.forEach((img, idx) => img.style.display = (idx === finalIndex) ? "block" : "none");
          indices[i] = finalIndex;

          // 全リール停止後の結果判定
          if(indices.every((v, _, arr) => v === arr[0])) {
            resultDiv.textContent = "当たり！🎉";
          } else if(reels.every((r,j) => elapsed >= stopDelays[j])) {
            resultDiv.textContent = "はずれ";
            btn.disabled = false;
          }
        }
      }, intervalTime);
    }, startDelays[i]);
  });
});
