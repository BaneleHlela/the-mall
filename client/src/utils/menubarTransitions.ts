export const transitions = {
  downToUp: {
    enter: "opacity-0 translate-y-full",
    exit: "opacity-20 translate-y-0",
  },
  slideInFromLeft: {
    enter: "-translate-x-full",
    exit: "translate-x-0 opacity-100",
  },
  scaleAndRotate: {
    enter: "scale-0 rotate-45",
    exit: "scale-100 rotate-0 opacity-100",
  },
  slideInFromRight: {
    enter: "translate-x-full",
    exit: "translate-x-0 opacity-100",
  },
  burstInAndOut: {
    enter: "h-0",
    exit: "h-full opacity-100",
  },
  zoomIn: {
    enter: "scale-0",
    exit: "scale-100 opacity-100",
  },
  rotateAndSlideFromTop: {
    enter: "rotate-45 -translate-y-full",
    exit: "rotate-0 translate-y-0 opacity-100",
  },
  diagonalSlideFromTopLeft: {
    enter: "translate-x-full -translate-y-full",
    exit: "translate-x-0 translate-y-0 opacity-100",
  },
};

