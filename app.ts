(
  document.onreadystatechange = (): void => {
    if (document.readyState === 'complete') {
      const Hero = document.getElementById(
          'player') as HTMLImageElement;
      const obstacle1 = document.getElementsByClassName(
          'obstacle1')[0] as HTMLImageElement;
      const obstacle2 = document.getElementsByClassName(
          'obstacle2')[0] as HTMLImageElement;
      const gameStatus = document.getElementsByClassName(
          'gameStatus')[0] as HTMLParagraphElement;
      gameStatus.innerHTML = '<i class="fas fa-pause gameStatus"></i>';
      const gameScore = document.getElementsByClassName(
          'score')[0] as HTMLParagraphElement;
      gameScore.innerHTML = String(0);
      const jumpSound = new Audio('./assets/sounds/jump.wav');
      const scoreSound = new Audio('./assets/sounds/score.wav');
      const hitgroundSound = new Audio('./assets/sounds/hitGround.wav');
      const model = {
        velocity: 0,
        pause: true,
        score: 0,
      };
      const startView = {
        init: (): void => {
          // Nothing
        },
      };
      const gameView = {
        init: (): void => {
          // Nothing
        },
      };
      const endView = {
        init: (): void => {
          // Nothing
        },
      };
      const controller = {
        init: (): void => {
          startView.init();
          gameView.init();
          endView.init();
          setInterval(controller.move, 9);
          setInterval(controller.gravity, 10);
        },
        jump: (): void => {
          const currentElevation = Number(Hero.style.top.slice(0, -2));
          model.velocity = 0;
          Hero.src = './assets/images/frame-4.png';
          if (currentElevation >= -15) {
            Hero.style.top = Number(currentElevation) - 5 + 'vh';
          }
        },
        move: (): void => {
          if (model.pause === false) {
            const current1 = Number(obstacle1.style.right.slice(0, -2));
            const current2 = Number(obstacle2.style.right.slice(0, -2));

            if (current1 >= 23 && current1 <= 23.05) {
              model.score += 1;
              gameScore.innerHTML = String(model.score);
              scoreSound.play();
            }
            if (current2 > 54 && current2 <= 54.1) {
              model.score += 1;
              gameScore.innerHTML = String(model.score);
              scoreSound.play();
            }
            if (current1 < 48) {
              obstacle1.style.right = current1 + 0.1 + 'vw';
            } else {
              obstacle1.style.right = current2 - 59 + 'vw';
              const heightVariation = Math.floor(Math.random()*100) % 20;
              obstacle1.style.top = -heightVariation + 'vh';
            }
            if (current2 < 78) {
              obstacle2.style.right = current2 + 0.1 + 'vw';
            } else {
              obstacle2.style.right = current2 - 60 + 'vw';
              const heightVariation = Math.floor(Math.random()*100) % 20;
              obstacle2.style.top = -heightVariation + 'vh';
            }
          }
        },
        gravity: (): void => {
          if (model.pause === false) {
            const currentElevation = Number(Hero.style.top.slice(0, -2));
            console.log(currentElevation);
            if (currentElevation <= 64 && currentElevation >= -30) {
              model.velocity += 0.009;
              Hero.style.top = currentElevation + model.velocity + 'vh';
            }
            if (currentElevation >= 64.1) {
              hitgroundSound.play();
              model.pause = true;
            }
          }
        },
      };
      document.body.onkeyup = function(e): void {
        // Space bar
        if (e.keyCode === 32) {
          if (model.pause === false) {
            Hero.src = './assets/images/frame-1.png';
            setTimeout(() => {
              jumpSound.play();
              controller.jump();
            }, 100);
          }
        }
        // P
        if (e.keyCode === 80) {
          if (model.pause === false) {
            model.pause = true;
            gameStatus.innerHTML = '<i class="fas fa-play"></i>';
          } else {
            model.pause = false;
            gameStatus.innerHTML = '<i class="fas fa-pause"></i>';
          }
        }
      };
      document.body.onmouseup = function(): void {
        if (model.pause === false) {
          Hero.src = './assets/images/frame-1.png';
          setTimeout(() => {
            controller.jump();
          }, 100);
        }
      };
      controller.init();
    }
  }
)();
