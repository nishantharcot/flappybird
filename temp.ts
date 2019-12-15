(
  document.onreadystatechange = (): void => {
    if (document.readyState === 'complete') {
      const model = {

      };
      const view = {
        render: (): void => {
          const addgrids = document.getElementById('grids') as HTMLDivElement;
          console.log(addgrids);
        },
      };
    }
  }
)();
