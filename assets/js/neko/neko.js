// based on oneko.js from https://github.com/adryd325/oneko.js, licensed under MIT
// with petting functionality from https://maia.crimew.gay/oneko.js
// artwork from https://twitter.com/_Anunnery

(function oneko() {
  const nekoEl = document.createElement("div");
  let persistPosition = true;

  let nekoPosX = 32;
  let nekoPosY = 32;

  let mousePosX = 0;
  let mousePosY = 0;
  let mouseButtonDown = false;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;

  let isAwake = false;

  const nekoSpeed = 10;
  const scratchWallDistance = 96;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
    scratchWallN: [[0, 0], [0, -1]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, 0], [-4, -1]],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1]],
    N:  [[-1, -2], [-1, -3]],
    NE: [[0, -2],  [0, -3]],
    E:  [[-3, 0],  [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S:  [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W:  [[-4, -2], [-4, -3]],
    NW: [[-1, 0],  [-1, -1]],
    heart: [[-8, 0], [-8, -1], [-8, -2], [-8, -3]],
  };

  // ─── Posicionamento ────────────────────────────────────────────────────────

  // Enquanto dormindo usamos position:fixed — relativo ao viewport.
  // Isso elimina o bug do mobile onde window.scrollY=0 no load causa offset errado,
  // e também o delay de "esperar layout estabilizar" porque getBoundingClientRect
  // já é relativo ao viewport e é imediato.
  function getAnchorViewportPos() {
    const targetElement = document.querySelector('h1.post-title');
    if (!targetElement) return null;

    const boldSpan = targetElement.querySelector('.font-weight-bold');
    const target = boldSpan || targetElement;
    const r = target.getBoundingClientRect();

    if (r.width === 0 && r.height === 0) return null;

    // Posição relativa ao VIEWPORT (funciona diretamente com position:fixed)
    const top  = r.top + 20 + 5;
    const left = (boldSpan ? r.right + 10 : r.left + 20) + 190;

    return { x: left, y: top };
  }

  function setFixedPosition(x, y) {
    // Salva posição absoluta para uso quando acordar e trocar para absolute
    nekoPosX = x + window.scrollX;
    nekoPosY = y + window.scrollY;
    nekoEl.style.left = `${x - 16}px`;
    nekoEl.style.top  = `${y - 16}px`;
  }

  function repositionToAnchor() {
    if (isAwake) return;
    const pos = getAnchorViewportPos();
    if (!pos) return;
    setFixedPosition(pos.x, pos.y);
  }

  function switchToAbsolute() {
    nekoEl.style.position = 'absolute';
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top  = `${nekoPosY - 16}px`;
  }

  // ─── Init ──────────────────────────────────────────────────────────────────

  function init() {
    let nekoFile = "/assets/js/neko/neko.gif";
    const curScript = document.currentScript;
    if (curScript && curScript.dataset.cat) {
      nekoFile = curScript.dataset.cat;
    }
    if (curScript && curScript.dataset.persistPosition) {
      persistPosition = curScript.dataset.persistPosition === ""
        ? true
        : JSON.parse(curScript.dataset.persistPosition.toLowerCase());
    }

    idleAnimation = "sleeping";
    idleAnimationFrame = 0;
    isAwake = false;

    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";   // começa fixed!
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = "-100px";      // fora da tela até posicionar
    nekoEl.style.top  = "-100px";
    nekoEl.style.zIndex = 500;
    nekoEl.style.backgroundImage = `url(${nekoFile})`;

    const initialSprite = spriteSets["sleeping"][0];
    nekoEl.style.backgroundPosition = `${initialSprite[0] * 32}px ${initialSprite[1] * 32}px`;

    document.body.appendChild(nekoEl);

    // Posiciona imediatamente — sem setTimeout, sem esperar load
    const pos = getAnchorViewportPos();
    if (pos) {
      setFixedPosition(pos.x, pos.y);
    }

    // Reposiciona quando fontes/imagens terminarem (pode mudar altura do título)
    window.addEventListener("load", () => {
      if (!isAwake) repositionToAnchor();
    });

    // Reposiciona em resize (rotação de tela, janela redimensionada)
    window.addEventListener("resize", () => {
      if (!isAwake) repositionToAnchor();
    });

    // Scroll: atualiza nekoPosX/Y absolutos para quando acordar.
    // Não precisa mover o elemento pois está fixed.
    window.addEventListener("scroll", () => {
      if (!isAwake) {
        nekoPosX = parseFloat(nekoEl.style.left) + 16 + window.scrollX;
        nekoPosY = parseFloat(nekoEl.style.top)  + 16 + window.scrollY;
      }
    }, { passive: true });

    // Mouse
    document.addEventListener("mousemove", function (event) {
      mousePosX = event.clientX + window.pageXOffset;
      mousePosY = event.clientY + window.pageYOffset;
    });
    document.addEventListener("mousedown", toggleMouseState);
    document.addEventListener("mouseup",   toggleMouseState);

    // Touch (mobile)
    document.addEventListener("touchmove", function (event) {
      const t = event.touches[0];
      mousePosX = t.clientX + window.pageXOffset;
      mousePosY = t.clientY + window.pageYOffset;
    }, { passive: true });
    document.addEventListener("touchstart", function (event) {
      const t = event.touches[0];
      mousePosX = t.clientX + window.pageXOffset;
      mousePosY = t.clientY + window.pageYOffset;
      mouseButtonDown = true;
    }, { passive: true });
    document.addEventListener("touchend", () => { mouseButtonDown = false; }, { passive: true });

    if (persistPosition) {
      window.addEventListener("beforeunload", function () {
        window.localStorage.setItem("oneko", JSON.stringify({
          nekoPosX, nekoPosY, mousePosX, mousePosY,
          frameCount, idleTime, idleAnimation, idleAnimationFrame,
          bgPos: nekoEl.style.backgroundPosition,
        }));
      });
    }

    window.requestAnimationFrame(onAnimationFrame);
  }

  // ─── Animação ──────────────────────────────────────────────────────────────

  function toggleMouseState(e) {
    const flags = e.buttons !== undefined ? e.buttons : e.which;
    mouseButtonDown = (flags & 1) === 1;
  }

  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    if (!nekoEl.isConnected) return;
    if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    if (!spriteSets[name]) { name = "idle"; }
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle(diffX, diffY) {
    idleTime += 1;

    if (idleTime > 10 && Math.floor(Math.random() * 50) === 0 && idleAnimation == null) {
      let available = ["sleeping", "scratchSelf"];
      if (nekoPosX < scratchWallDistance) available.push("scratchWallW");
      if (nekoPosY < scratchWallDistance) available.push("scratchWallN");
      if (nekoPosX > window.innerWidth  - scratchWallDistance) available.push("scratchWallE");
      if (nekoPosY > window.innerHeight - scratchWallDistance) available.push("scratchWallS");
      idleAnimation = available[Math.floor(Math.random() * available.length)];

      if (idleAnimation?.startsWith("scratchWall")) {
        if (idleAnimation === "scratchWallW") nekoPosX = 16;
        if (idleAnimation === "scratchWallE") nekoPosX = window.innerWidth  - 16;
        if (idleAnimation === "scratchWallN") nekoPosY = 16;
        if (idleAnimation === "scratchWallS") nekoPosY = window.innerHeight - 16;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top  = `${nekoPosY - 16}px`;
      }
    }

    switch (idleAnimation) {
      case "sleeping":
        if (mouseButtonDown && Math.abs(diffX) < 32 && Math.abs(diffY) < 32) {
          setSprite("heart", Math.floor(idleAnimationFrame / 4));
        } else {
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        }
        if (idleAnimationFrame > 999) idleAnimationFrame = 0;
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) resetIdleAnimation();
        break;
      default:
        if (mouseButtonDown && Math.abs(diffX) < 32 && Math.abs(diffY) < 32) {
          idleAnimation = "sleeping";
          idleAnimationFrame = 0;
          setSprite("tired", 0);
        } else {
          setSprite("idle", 0);
        }
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (!isAwake) {
      if (mouseButtonDown && Math.abs(diffX) < 32 && Math.abs(diffY) < 32) {
        isAwake = true;
        switchToAbsolute(); // troca para absolute ao acordar
        resetIdleAnimation();
      } else {
        idle(diffX, diffY);
        return;
      }
    }

    if (distance < nekoSpeed || distance < 48) {
      idle(diffX, diffY);
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction = "";
    direction += diffY / distance >  0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance >  0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    if (direction === "") direction = "idle";

    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), document.documentElement.scrollWidth  - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), document.documentElement.scrollHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top  = `${nekoPosY - 16}px`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

})();