import { scriptAsDataURI } from "deco/utils/dataURI.ts";

export interface Props {
  rootId: string;
  interval?: number;
  infinite?: boolean;
}

const setup = ({ rootId, interval, infinite }: Props) => {
  const ATTRIBUTES = {
    "data-slider": "data-slider",
    "data-slider-item": "data-slider-item",
    'data-slide="prev"': 'data-slide="prev"',
    'data-slide="next"': 'data-slide="next"',
    "data-dot": "data-dot",
  };

  const FADE_DURATION = 500; // Tempo da animação de fade em milissegundos

  const root = document.getElementById(rootId);
  const slider = root?.querySelector(`[${ATTRIBUTES["data-slider"]}]`);
  const items = root?.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`);
  const prev = root?.querySelector(`[${ATTRIBUTES['data-slide="prev"']}]`);
  const next = root?.querySelector(`[${ATTRIBUTES['data-slide="next"']}]`);
  const dots = root?.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`);

  if (!root || !slider || !items || items.length === 0) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { root, slider, items, rootId },
    );

    return;
  }

  let currentIndex = 0; // Índice do slide atual

  const fadeOut = (element: HTMLElement) => {
    element.style.transition = `opacity ${FADE_DURATION}ms`;
    element.style.opacity = "0";
    setTimeout(() => {
      element.style.display = "none";
    }, FADE_DURATION);
  };

  const fadeIn = (element: HTMLElement) => {
    element.style.display = "block";
    setTimeout(() => {
      element.style.transition = `opacity ${FADE_DURATION}ms`;
      element.style.opacity = "1";
    }, 10); // Pequeno atraso para garantir que a transição seja aplicada corretamente
  };

  const goToItem = (index: number) => {
    if (index < 0 || index >= items.length) return;

    const currentItem = items[currentIndex] as HTMLElement;
    const nextItem = items[index] as HTMLElement;

    fadeOut(currentItem);
    setTimeout(() => {
      fadeIn(nextItem);
      currentIndex = index;
    }, FADE_DURATION);
  };

  const onClickPrev = () => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    goToItem(newIndex);
  };

  const onClickNext = () => {
    const newIndex = (currentIndex + 1) % items.length;
    goToItem(newIndex);
  };

  const observer = new IntersectionObserver(
    (elements) =>
      elements.forEach((item) => {
        const index = Number(item.target.getAttribute("data-slider-item")) || 0;
        const dot = dots?.item(index);

        if (item.isIntersecting) {
          dot?.setAttribute("disabled", "");
        } else {
          dot?.removeAttribute("disabled");
        }

        if (!infinite) {
          if (index === 0) {
            if (item.isIntersecting) {
              prev?.setAttribute("disabled", "");
            } else {
              prev?.removeAttribute("disabled");
            }
          }
          if (index === items.length - 1) {
            if (item.isIntersecting) {
              next?.setAttribute("disabled", "");
            } else {
              next?.removeAttribute("disabled");
            }
          }
        }
      }),
    { threshold: 0.6, root: slider },
  );

  items.forEach((item) => observer.observe(item));

  for (let it = 0; it < (dots?.length ?? 0); it++) {
    dots?.item(it).addEventListener("click", () => goToItem(it));
  }

  prev?.addEventListener("click", onClickPrev);
  next?.addEventListener("click", onClickNext);

  const timeout = interval && setInterval(onClickNext, interval);

  // Unregister callbacks
  return () => {
    for (let it = 0; it < (dots?.length ?? 0); it++) {
      dots?.item(it).removeEventListener("click", () => goToItem(it));
    }

    prev?.removeEventListener("click", onClickPrev);
    next?.removeEventListener("click", onClickNext);

    observer.disconnect();

    clearInterval(timeout);
  };
};

function Slider({
  rootId,
  interval,
  infinite = false,
}: Props) {
  return (
    <script
      defer
      src={scriptAsDataURI(setup, { rootId, interval, infinite })}
    />
  );
}

export default Slider;
