(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const model = {

      };
      const startView = {
        init: (): void => {

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
