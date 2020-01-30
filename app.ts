(
  document.onreadystatechange = (): void => {
    if (document.readyState === 'complete') {
      const Hero = document.getElementById(
          'player') as HTMLImageElement;
      // Id's for obstacles, gamestatus
      const obstacle1Up = document.getElementById(
          'obstacle1Up') as HTMLImageElement;
      const obstacle1Down = document.getElementById(
          'obstacle1Down') as HTMLImageElement;
      const obstacle2Up = document.getElementById(
          'obstacle2Up') as HTMLImageElement;
      const obstacle2Down = document.getElementById(
          'obstacle2Down') as HTMLImageElement;
      const gameStatus = document.getElementsByClassName(
          'gameStatus')[0] as HTMLParagraphElement;
      const gameScore = document.getElementsByClassName(
          'score')[0] as HTMLParagraphElement;
      gameScore.innerHTML = String(0);
      const getReady = document.getElementById('getReady') as HTMLDivElement;
      const arrows = document.getElementById('arrows') as HTMLDivElement;
      // Caps for constants
      const jumpSound = new Audio('./assets/sounds/jump.wav');
      const scoreSound = new Audio('./assets/sounds/score.wav');
      const hitgroundSound = new Audio('./assets/sounds/hitGround.wav');
      const model = {
        playSound: true,
        gravityPresent: false,
        obstacleMovement: false,
        playerMovement: true,
        best: 0,
        gravity: 0.001,
        flapping: -3.5,
        viewStatus: 0,
        dY: 0,
        pause: true,
        score: 0,
        screenTop: -68,
        Ground: 10,
        birdJumpYaxis: 3,
        obstacle1Startingpoint: 26,
        obstacle1Endingpoint: 31.5,
        obstacle2Startingpoint: 56,
        obstacle2Endingpoint: 61.5,
        heroObstacle1Startingpoint: 26.5,
        heroObstacle1Endingpoint: 26.6,
        heroObstacle2Startingpoint: 56.5,
        heroObstacle2Endingpoint: 56.65,
        Obstacle1UpBottom: -36.5,
        Obstacle1DownTop: -21.5,
        Obstacle2UpBottom: -36.5,
        Obstacle2DownTop: -21.5,
        obstacle1ScreenleavingPoint: 48,
        obstacle2ScreenleavingPoint: 78,
      };
      const startView = {
        init: (): void => {
          obstacle1Up.style.visibility = 'hidden';
          obstacle2Up.style.visibility = 'hidden';
          obstacle1Down.style.visibility = 'hidden';
          obstacle2Down.style.visibility = 'hidden';
        },
      };
      const gameView = {
        init: (): void => {
          if (model.viewStatus === 0) {
            document.onmouseup = (): void => {
              if (model.viewStatus === 0) {
                model.viewStatus = 1;
                model.pause = false;
                model.gravityPresent = true;
                model.obstacleMovement = true;
                Hero.style.top = 0 + 'vh';
                getReady.style.visibility = 'hidden';
                arrows.style.visibility = 'hidden';
                obstacle1Up.style.visibility = 'visible';
                obstacle2Up.style.visibility = 'visible';
                obstacle1Down.style.visibility = 'visible';
                obstacle2Down.style.visibility = 'visible';
              }
            };
          }
          // P
          const gameViewModal = document.getElementsByClassName(
              'gameViewModal')[0] as HTMLDivElement;
          const resume = document.getElementById('resume') as HTMLButtonElement;
          const volume = document.getElementById('volume') as HTMLButtonElement;
          const soundClass = document.getElementsByClassName(
              'sound')[0] as HTMLIFrameElement;
          volume.onclick = (): void => {
            if (soundClass.classList.contains('fa-volume-mute')) {
              model.playSound = true;
              volume.innerHTML =
                '<i class="fas is-size-1 sound fa-volume-up"></i>';
              soundClass.classList.remove('fa-volume-mute');
              soundClass.classList.add('fa-volume-up');
            } else {
              model.playSound = false;
              volume.innerHTML =
                '<i class="fas is-size-1 sound fa-volume-mute"></i>';
              soundClass.classList.remove('fa-volume-up');
              soundClass.classList.add('fa-volume-mute');
            }
          };
          resume.onclick = (): void => {
            model.pause = false;
            gameViewModal.classList.remove('is-active');
          };
          document.onkeyup = (e): void => {
            if (e.keyCode === 80) {
              model.pause = true;
              gameViewModal.classList.add('is-active');
            }
          };
        },
      };
      const endView = {
        init: (): void => {
          if (model.pause === true) {
            const endviewModal = document.getElementsByClassName(
                'endviewModal')[0] as HTMLDivElement;
            endviewModal.classList.add('is-active');
            const finalScore = document.getElementById(
                'finalScore') as HTMLDivElement;
            const bestScore = document.getElementById(
                'bestScore') as HTMLDivElement;
            finalScore.innerHTML = `SCORE:- ${model.score}`;
            if (model.best < model.score) {
              model.best = model.score;
            }
            bestScore.innerHTML = `BEST:- ${model.best}`;
          }
        },
      };
      const controller = {
        init: (): void => {
          startView.init();
          gameView.init();
          // gameView.init();
          // computational waste
          setInterval(controller.oscillate, 200);
          setInterval(controller.move, 10);
          setInterval(controller.gravity, 1);
        },
        oscillate: (): void => {
          if (model.viewStatus === 0) {
            const currentElevation = Number(Hero.style.top.slice(0, -2));
            if (currentElevation >= -1) {
              Hero.src = './assets/images/frame-4.png';
              Hero.style.top = Number(currentElevation) -
                2 + 'vh';
            }
            if (currentElevation <= +1) {
              Hero.style.top = Number(currentElevation) +
                2 + 'vh';
            }
          }
        },
        sideMovement: (): void => {
          if (model.pause === false) {
            const currentRight = Number(Hero.style.right.slice(0, -2));
            // currentRight -= 0.01;
            Hero.style.right = currentRight - 0.001 + 'vw';
          }
        },
        obstacleCollision: (): void => {
          Hero.style.right = 5 + 'vw';
          model.obstacleMovement = false;
          model.playerMovement = false;
          setInterval(controller.sideMovement, 1);
          setInterval(controller.gravity, 1);
          // model.pause = true;
        },
        pump: (): void => {
          const currentElevation = Number(Hero.style.top.slice(0, -2));
          Hero.src = './assets/images/frame-4.png';
          model.dY += model.flapping;
          if (currentElevation >= model.screenTop) {
            Hero.style.top = Number(currentElevation) -
              model.dY + 'vh';
          }
          model.dY = 0;
        },
        jump: (): void => {
          const currentElevation = Number(Hero.style.top.slice(0, -2));
          Hero.src = './assets/images/frame-4.png';
          model.dY += model.flapping;
          if (currentElevation >= model.screenTop) {
            Hero.style.top = Number(currentElevation) +
              model.dY + 'vh';
          }
          model.dY = 0;
        },
        move: (): void => {
          if (model.pause === false && model.obstacleMovement === true) {
            const obstacle1UpPosition =
              Number(obstacle1Up.style.right.slice(0, -2));
            const obstacle1DownPosition = obstacle1UpPosition;
            const obstacle2UpPosition =
              Number(obstacle2Up.style.right.slice(0, -2));
            const obstacle2DownPosition = obstacle2UpPosition;
            const currentElevation = Number(Hero.style.top.slice(0, -2));
            // console.log('Hero top position:', currentElevation);
            if (obstacle1UpPosition >= model.obstacle1Startingpoint &&
                obstacle1UpPosition <= model.obstacle1Endingpoint) {
              if (model.score === 1) {
                if (currentElevation >= model.Obstacle1DownTop ||
                  currentElevation <= model.Obstacle1UpBottom) {
                  console.log('Hero top position in move:', currentElevation);
                  console.log('Obstacle1DownTop:', model.Obstacle1DownTop);
                  console.log('Obstacle1UpBottom:', model.Obstacle1UpBottom);
                  controller.obstacleCollision();
                  // model.pause = true;
                  console.log('Collision due to obstacle1');
                }
              }
              if (model.score >= 3) {
                if (-25 + currentElevation >= model.Obstacle1DownTop ||
                  -25 + currentElevation <= model.Obstacle1UpBottom) {
                  console.log('Hero top position in move:', currentElevation);
                  console.log('Obstacle1DownTop:', model.Obstacle1DownTop);
                  console.log('Obstacle1UpBottom:', model.Obstacle1UpBottom);
                  controller.obstacleCollision();
                  // model.pause = true;
                  console.log('Collision due to obstacle1');
                }
              }
            }
            if (obstacle2UpPosition >= model.obstacle2Startingpoint &&
              obstacle2UpPosition <= model.obstacle2Endingpoint) {
              if (model.score === 2) {
                if (currentElevation >= model.Obstacle2DownTop ||
                  currentElevation <= model.Obstacle2UpBottom) {
                  console.log('Hero top position in move:', currentElevation);
                  console.log('Obstacle2DownTop:', model.Obstacle2DownTop);
                  console.log('Obstacle2UpBottom:', model.Obstacle2UpBottom);
                  // model.pause = true;
                  controller.obstacleCollision();
                  console.log('Collision due to obstacle2');
                }
              }
              if (model.score >= 3) {
                if (-25 + currentElevation >= model.Obstacle2DownTop ||
                  -25 + currentElevation <= model.Obstacle2UpBottom) {
                  console.log('Hero top position in move:', currentElevation);
                  console.log('Obstacle2DownTop:', model.Obstacle2DownTop);
                  console.log('Obstacle2UpBottom:', model.Obstacle2UpBottom);
                  // model.pause = true;
                  controller.obstacleCollision();
                  console.log('Collision due to obstacle2');
                }
              }
            }
            if (obstacle1UpPosition >= model.heroObstacle1Startingpoint &&
              obstacle1UpPosition <= model.heroObstacle1Endingpoint) {
              model.score += 1;
              gameScore.innerHTML = String(model.score);
              if (model.playSound === true) {
                scoreSound.play();
              }
            }
            if (obstacle2UpPosition > model.heroObstacle2Startingpoint &&
              obstacle2UpPosition <= model.heroObstacle2Endingpoint) {
              model.score += 1;
              gameScore.innerHTML = String(model.score);
              if (model.playSound === true) {
                scoreSound.play();
              }
            }
            const heightVariationObstacle1 = Math.floor(Math.random()*100) % 10;
            if (obstacle1UpPosition < model.obstacle1ScreenleavingPoint) {
              obstacle1Up.style.right = obstacle1UpPosition + 0.111 + 'vw';
              obstacle1Down.style.right = obstacle1UpPosition + 0.111 + 'vw';
            } else {
              obstacle1Up.style.right = obstacle1UpPosition - 59 + 'vw';
              obstacle1Up.style.top = -25 -heightVariationObstacle1 + 'vh';
              model.Obstacle1UpBottom = -36.5 -25 -heightVariationObstacle1;

              obstacle1Down.style.right = obstacle1UpPosition - 59 + 'vw';
              obstacle1Down.style.top = -25 -heightVariationObstacle1 + 'vh';
              model.Obstacle1DownTop = -21.5 -25 -heightVariationObstacle1;
            }

            const heightVariationObstacle2 = Math.floor(Math.random()*100) % 10;

            if (obstacle2UpPosition < model.obstacle2ScreenleavingPoint) {
              obstacle2Up.style.right = obstacle2UpPosition + 0.111 + 'vw';
              obstacle2Down.style.right = obstacle2UpPosition + 0.111 + 'vw';
            } else {
              obstacle2Up.style.right = obstacle2UpPosition - 60 + 'vw';
              obstacle2Up.style.top = -25 -heightVariationObstacle2 + 'vh';
              model.Obstacle2UpBottom = -36.5 -25 - heightVariationObstacle2;

              obstacle2Down.style.right = obstacle2UpPosition - 60 + 'vw';
              obstacle2Down.style.top = -25 -heightVariationObstacle2 + 'vh';
              model.Obstacle2DownTop = -21.5 -25 -heightVariationObstacle2;
            }
          }
        },
        gravity: (): void => {
          if (model.pause === false && model.gravityPresent === true) {
            const currentElevation = Number(Hero.style.top.slice(0, -2));
            if (currentElevation <= model.Ground) {
              model.dY += model.gravity;
              Hero.style.top = currentElevation + model.dY + 'vh';
            } else {
              if (model.playSound === true) {
                hitgroundSound.play();
              }
              model.gravityPresent = false;
              model.pause = true;
              setTimeout(() => {
                endView.init();
              }, 1000);
            }
          }
        },
      };
      document.body.onkeyup = (e): void => {
        // Space bar
        if (e.keyCode === 32 && model.playerMovement === true) {
          if (model.pause === false) {
            Hero.src = './assets/images/frame-1.png';
            setTimeout(() => {
              if (model.playSound === true) {
                jumpSound.play();
              }
              controller.jump();
            }, 100);
          }
        }

        // Z
        if (e.keyCode === 90) {
          if (model.pause === false) {
            Hero.src = './assets/images/frame-1.png';
            setTimeout(() => {
              if (model.playSound === true) {
                jumpSound.play();
              }
              controller.pump();
            }, 100);
          }
        }

        // left key
        if (e.keyCode === 37) {
          const obstacle1UpPosition =
            Number(obstacle1Up.style.right.slice(0, -2));
          const obstacle1DownPosition = obstacle1UpPosition;
          const obstacle2UpPosition =
            Number(obstacle2Up.style.right.slice(0, -2));
          const obstacle2DownPosition = obstacle2UpPosition;

          const heightVariationObstacle1 = Math.floor(Math.random()*100) % 20;
          if (obstacle1UpPosition < model.obstacle1ScreenleavingPoint) {
            obstacle1Up.style.right = obstacle1UpPosition + 1 + 'vw';
          } else {
            obstacle1Up.style.right = obstacle2UpPosition - 59 + 'vw';
            obstacle1Up.style.top = -heightVariationObstacle1 + 'vh';
          }

          if (obstacle1DownPosition < model.obstacle1ScreenleavingPoint) {
            obstacle1Down.style.right = obstacle1UpPosition + 1 + 'vw';
          } else {
            obstacle1Down.style.right = obstacle2UpPosition - 59 + 'vw';
            obstacle1Down.style.top = -heightVariationObstacle1 + 'vh';
          }
          const heightVariationObstacle2 = Math.floor(Math.random()*100) % 20;

          if (obstacle2UpPosition < model.obstacle2ScreenleavingPoint) {
            obstacle2Up.style.right = obstacle2UpPosition + 1 + 'vw';
          } else {
            obstacle2Up.style.right = obstacle2UpPosition - 60 + 'vw';
            obstacle2Up.style.top = -heightVariationObstacle2 + 'vh';
          }

          if (obstacle2DownPosition < model.obstacle2ScreenleavingPoint) {
            obstacle2Down.style.right = obstacle2UpPosition + 1 + 'vw';
          } else {
            obstacle2Down.style.right = obstacle2UpPosition - 60 + 'vw';
            obstacle2Down.style.top = -heightVariationObstacle2 + 'vh';
          }
          const currentElevation = Number(Hero.style.top.slice(0, -2));
        }
        // right key
        if (e.keyCode === 39) {
          const obstacle1UpPosition =
            Number(obstacle1Up.style.right.slice(0, -2));
          const obstacle1DownPosition = obstacle1UpPosition;
          const obstacle2UpPosition =
            Number(obstacle2Up.style.right.slice(0, -2));
          const obstacle2DownPosition = obstacle2UpPosition;
          const heightVariationObstacle1 = Math.floor(Math.random()*100) % 20;
          if (obstacle1UpPosition < model.obstacle1ScreenleavingPoint) {
            obstacle1Up.style.right = obstacle1UpPosition - 1 + 'vw';
          } else {
            obstacle1Up.style.right = obstacle2UpPosition - 59 + 'vw';
            obstacle1Up.style.top = -heightVariationObstacle1 + 'vh';
          }

          if (obstacle1DownPosition < model.obstacle1ScreenleavingPoint) {
            obstacle1Down.style.right = obstacle1UpPosition - 1 + 'vw';
          } else {
            obstacle1Down.style.right = obstacle2UpPosition - 59 + 'vw';
            obstacle1Down.style.top = -heightVariationObstacle1 + 'vh';
          }
          const heightVariationObstacle2 = Math.floor(Math.random()*100) % 20;

          if (obstacle2UpPosition < model.obstacle2ScreenleavingPoint) {
            obstacle2Up.style.right = obstacle2UpPosition - 1 + 'vw';
          } else {
            obstacle2Up.style.right = obstacle2UpPosition - 60 + 'vw';
            obstacle2Up.style.top = -heightVariationObstacle2 + 'vh';
          }

          if (obstacle2DownPosition < model.obstacle2ScreenleavingPoint) {
            obstacle2Down.style.right = obstacle2UpPosition - 1 + 'vw';
          } else {
            obstacle2Down.style.right = obstacle2UpPosition - 60 + 'vw';
            obstacle2Down.style.top = -heightVariationObstacle2 + 'vh';
          }
          const currentElevation = Number(Hero.style.top.slice(0, -2));
        }
      };
      document.body.onmouseup = (): void => {
        if (model.pause === false && model.playerMovement === true) {
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
