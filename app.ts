(
  document.onreadystatechange = (): void => {
    if (document.readyState === 'complete') {
      const model = {

      };
      const startView = {
        init: (): void => {
          const playGameButton = document.getElementsByClassName(
              'playGame') as HTMLCollectionOf<HTMLButtonElement>;
        },
      };
      const gameView = {

      };
      const endView = {

      };
      const controller = {
        init: (): void => {
          startView.init();
        },
      };
      controller.init();
    }
  }
)();
