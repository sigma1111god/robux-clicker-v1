let robux = 10; // STARTING ROBUX
let perClick = 2;
let auto = [
  {id:'auto1', value:1, cost:50},
  {id:'auto20', value:20, cost:100},
  {id:'auto150', value:150, cost:500},
  {id:'auto5000', value:5000, cost:1000000}
];

let autoPerSecond = 0;

// Elements
const robuxDisplay = document.getElementById("robux");
const robuxCircle = document.getElementById("robuxCircle");
const clickSound = document.getElementById("clickSound");

// Update counter
function update() {
  robuxDisplay.textContent = Math.floor(robux);
  updateShop();
}

// Shop buttons
function updateShop() {
  document.getElementById('clickerUpgrade').textContent = `Click +2 (${clickerCost})`;
  auto.forEach(a=>{
    document.getElementById(a.id).textContent = `Auto +${a.value}/sec (${a.cost})`;
  });
}

// Click circle
robuxCircle.onclick = (e)=>{
  robux += perClick;
  playSound();
  spawnFlyingRobux(e);
  update();
};

// Clicker upgrade
let clickerCost = 20;
document.getElementById('clickerUpgrade').onclick = ()=>{
  if(robux >= clickerCost){
    robux -= clickerCost;
    perClick += 2;
    clickerCost += 50;
    update();
  } else { alert("Not enough Robux!"); }
}

// Auto clickers
auto.forEach(a=>{
  document.getElementById(a.id).onclick = ()=>{
    if(robux >= a.cost){
      robux -= a.cost;
      autoPerSecond += a.value;
      // Increase price
      if(a.value === 1 || a.value === 20) a.cost += 50;
      if(a.value === 150) a.cost += 150;
      if(a.value === 5000) a.cost += 500000;
      update();
    } else { alert("Not enough Robux!"); }
  }
});

// Auto robux per second
setInterval(()=>{ robux += autoPerSecond; update(); }, 1000);

// Sound
function playSound(){
  clickSound.currentTime = 0;
  clickSound.play();
}

// Flying Robux
function spawnFlyingRobux(e){
  for(let i=0;i<5;i++){
    const coin = document.createElement('img');
    coin.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Robux_Icon.png/240px-Robux_Icon.png";
    coin.className = 'flyingRobux';
    document.body.appendChild(coin);
    // Start at click
    coin.style.left = (e.clientX - 15) + 'px';
    coin.style.top = (e.clientY - 15) + 'px';
    // Random flying direction
    const xMove = Math.random()*100 - 50;
    const yMove = Math.random()*100 - 150;
    requestAnimationFrame(()=>{
      coin.style.transform = `translate(${xMove}px, ${yMove}px)`;
      coin.style.opacity = 0;
    });
    // Remove after animation
    setTimeout(()=>coin.remove(),1000);
  }
}

// Initial update
update();