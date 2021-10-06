export const mouseDown = (setMouseDown: React.Dispatch<React.SetStateAction<boolean>>) => {
  setMouseDown(true);
};

export const mouseUp = (
  e: React.MouseEvent<HTMLElement>,
  setMouseDown: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  (e.target as HTMLElement).style.cursor = 'grab';
  setMouseDown(false);
};

export const mouseMove = (
  e: React.MouseEvent<HTMLElement>,
  setMouseDown: React.Dispatch<React.SetStateAction<boolean>>,
  setPointX: React.Dispatch<React.SetStateAction<number>>,
  setPointY: React.Dispatch<React.SetStateAction<number>>,
  pointX: number,
  pointY: number,
  isMouseDown: boolean,
  elemHeight: number,
  elemWidth: number,
) => {
  const fullElem = e.currentTarget as HTMLElement;
  const headerElem = e.target as HTMLElement;
  if (isMouseDown && headerElem.className === 'header') {
    setPointX(Number(fullElem.style.left.split('px').shift()));
    setPointY(Number(fullElem.style.top.split('px').shift()));
    headerElem.style.cursor = 'grabbing';
    fullElem.style.left = `${e.clientX - elemWidth / 2}px`;
    fullElem.style.top = `${e.clientY + window.pageYOffset - 20}px`;
  }
  if (pointX > window.innerWidth - elemWidth - 50) {
    fullElem.style.left = `${window.innerWidth - elemWidth - 50}px`;
    setPointX(window.innerWidth - elemWidth - 50);
    mouseUp(e, setMouseDown);
  }
  if (pointX < 0) {
    fullElem.style.left = `${50}px`;
    setPointX(50);
    mouseUp(e, setMouseDown);
  }
  if (pointY > document.body.scrollHeight - elemHeight) {
    fullElem.style.top = `${document.body.scrollHeight - elemHeight - 50}px`;
    setPointY(document.body.scrollHeight - elemHeight - 50);
    mouseUp(e, setMouseDown);
  }
  if (pointY < 0) {
    fullElem.style.top = `${50}px`;
    setPointY(50);
    mouseUp(e, setMouseDown);
  }
};
