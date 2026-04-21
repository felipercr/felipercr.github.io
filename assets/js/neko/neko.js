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
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
    heart: [
      [-8, 0],
      [-8, -1],
      [-8, -2],
      [-8, -3],
    ],
  };

  // ─── FIX 1 & 2: aguarda o elemento alvo estar estável antes de posicionar ───
  // Tenta obter a posição do elemento. Retorna null se ainda não está pronto.
  function getAnchorPosition() {
    const targetElement = document.querySelector('h1.post-title');
    if (!targetElement) return null;

    const boldSpan = targetElement.querySelector('.font-weight-bold');
    const target = boldSpan || targetElement;
    const r = target.getBoundingClientRect();

    // Se o elemento ainda não tem dimensões, o layout não terminou
    if (r.width === 0 && r.height === 0) return null;

    const absoluteTop  = r.top  + window.scrollY + 20;
    const absoluteLeft = (boldSpan ? r.right + 10 : r.left + 20) + window.scrollX + 190;

    return { x: absoluteLeft, y: absoluteTop + 5 };
  }

  // Aplica a posição ao elemento DOM
  function applyNekoPosition(x, y) {
    nekoPosX = x;
    nekoPosY = y;
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top  = `${nekoPosY - 16}px`;
  }

  function repositionToAnchor() {
    if (isAwake) return;
    const pos = getAnchorPosition();
    if (!pos) return;
    applyNekoPosition(pos.x, pos.y);
  }

  // Espera o elemento estar pronto com posição estável e executa o callback.
  // Usa um loop de rAF com verificação de estabilidade (2 leituras iguais).
  function waitForStableAnchor(callback) {
    let lastTop = -1;
    let stableCount = 0;
    const NEEDED_STABLE_FRAMES = 3; // quantos frames consecutivos com mesma posição
    const MAX_ATTEMPTS = 120;       // ~2s a 60fps antes de desistir
    let attempts = 0;

    function check() {
      attempts++;
      const pos = getAnchorPosition();

      if (pos) {
        const top = Math.round(pos.y);
        if (top === lastTop) {
          stableCount++;
        } else {
          stableCount = 0;
          lastTop = top;
        }

        if (stableCount >= NEEDED_STABLE_FRAMES) {
          callback(pos);
          return;
        }
      }

      if (attempts < MAX_ATTEMPTS) {
        requestAnimationFrame(check);
      } else {
        // Fallback: usa o que tiver mesmo sem estabilidade
        if (pos) callback(pos);
      }
    }

    requestAnimationFrame(check);
  }
  // ─────────────────────────────────────────────────────────────────────────────

  function init() {
    let nekoFile = "/assets/js/neko/neko.gif";
    const curScript = document.currentScript;
    if (curScript && curScript.dataset.cat) {
      nekoFile = curScript.dataset.cat;
    }
    if (curScript && curScript.dataset.persistPosition) {
      if (curScript.dataset.persistPosition === "") {
        persistPosition = true;
      } else {
        persistPosition = JSON.parse(curScript.dataset.persistPosition.toLowerCase());
      }
    }

    if (persistPosition) {
      const storedNeko = JSON.parse(window.localStorage.getItem("oneko"));
      if (storedNeko) {
        isAwake = storedNeko.isAwake || false;
        idleAnimation = storedNeko.idleAnimation;
      }
    }

    idleAnimation = "sleeping";
    idleAnimationFrame = 0;
    isAwake = false;

    // Monta o elemento com posição temporária (invisível até posicionarmos)
    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "absolute";
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top  = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 500;
    nekoEl.style.visibility = "hidden"; // esconde até ter a posição certa
    nekoEl.style.backgroundImage = `url(${nekoFile})`;

    const initialSprite = spriteSets["sleeping"][0];
    nekoEl.style.backgroundPosition = `${initialSprite[0] * 32}px ${initialSprite[1] * 32}px`;

    document.body.appendChild(nekoEl);

    // ── Aguarda posição estável e só então mostra o neko ──
    waitForStableAnchor(function(pos) {
      applyNekoPosition(pos.x, pos.y);
      nekoEl.style.visibility = "visible"; // aparece já no lugar certo
    });

    // Reposiciona no resize/scroll enquanto dormindo
    window.addEventListener("resize", () => {
      if (!isAwake) repositionToAnchor();
    });

    window.addEventListener("scroll", () => {
      if (!isAwake) window.requestAnimationFrame(repositionToAnchor);
    }, { passive: true });

    // Reposiciona após load completo (imagens, fontes web, etc.)
    window.addEventListener("load", () => {
      if (!isAwake) repositionToAnchor();
    });

    document.addEventListener("mousemove", function (event) {
      mousePosX = event.clientX + window.pageXOffset;
      mousePosY = event.clientY + window.pageYOffset;
    });

    document.addEventListener("mousedown", toggleMouseState);
    document.addEventListener("mouseup", toggleMouseState);

    if (persistPosition) {
      window.addEventListener("beforeunload", function () {
        window.localStorage.setItem("oneko", JSON.stringify({
          nekoPosX: nekoPosX,
          nekoPosY: nekoPosY,
          mousePosX: mousePosX,
          mousePosY: mousePosY,
          frameCount: frameCount,
          idleTime: idleTime,
          idleAnimation: idleAnimation,
          idleAnimationFrame: idleAnimationFrame,
          bgPos: nekoEl.style.backgroundPosition,
        }));
      });
    }

    window.requestAnimationFrame(onAnimationFrame);
  }

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
    if (!spriteSets[name]) {
      console.warn(`Unknown sprite direction: "${name}", defaulting to idle`);
      name = "idle";
    }
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle(diffX, diffY) {
    idleTime += 1;

    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 50) === 0 &&
      idleAnimation == null
    ) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < scratchWallDistance) avalibleIdleAnimations.push("scratchWallW");
      if (nekoPosY < scratchWallDistance) avalibleIdleAnimations.push("scratchWallN");
      if (nekoPosX > window.innerWidth - scratchWallDistance) avalibleIdleAnimations.push("scratchWallE");
      if (nekoPosY > window.innerHeight - scratchWallDistance) avalibleIdleAnimations.push("scratchWallS");

      idleAnimation = avalibleIdleAnimations[Math.floor(Math.random() * avalibleIdleAnimations.length)];

      if (idleAnimation?.startsWith("scratchWall")) {
        if (idleAnimation === "scratchWallW") nekoPosX = 16;
        if (idleAnimation === "scratchWallE") nekoPosX = window.innerWidth - 16;
        if (idleAnimation === "scratchWallN") nekoPosY = 16;
        if (idleAnimation === "scratchWallS") nekoPosY = window.innerHeight - 16;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top  = `${nekoPosY - 16}px`;
      }
    }

    switch (idleAnimation) {
      case "sleeping":
        if (mouseButtonDown && diffY < 32 && diffY > -32 && diffX < 32 && diffX > -32) {
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
        if (mouseButtonDown && diffY < 32 && diffY > -32 && diffX < 32 && diffX > -32) {
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
    direction += diffY / distance > 0.5  ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5  ? "W" : "";
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
    document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 0); });
  } else {
    setTimeout(init, 0);
  }

})();