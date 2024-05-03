import Slider from "site/components/ui/Slider/index.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import { useId } from "site/sdk/useId.ts";
import Icon from "site/components/ui/Icon.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Image text subtitle */
    subTitle: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Show arrows
   * @description show arrows to navigate through the images
   */
  arrows?: boolean;
  /**
   * @title Show dots
   * @description show dots to navigate through the images
   */
  dots?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  text?: {
    title: string;
    subTitle: string;
  };
  photographer?: {
    image: ImageWidget;
    text: string;
  };
}

const DEFAULT_PROPS = {
  images: [
    {
      alt: "/feminino",
      action: {
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      action: {
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      action: {
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
  ],
  preload: true,
};

function BannerItem({
  image,
  lcp,
  id,
}: {
  image: Banner;
  lcp?: boolean;
  id: string;
}) {
  const { alt, mobile, desktop, action } = image;

  return (
    <a
      id={id}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative overflow-y-hidden w-full"
    >
      {action && (
        <div class="absolute top-0 md:bottom-0 bottom-1/2 left-0 right-0 sm:right-auto max-w-[407px] flex flex-col justify-end gap-4 px-8 py-12">
          <span class="text-2xl font-light text-base-100">{action.title}</span>
          <span class="font-normal text-4xl text-base-100">
            {action.subTitle}
          </span>
          <button
            class="bg-base-100 text-sm font-light py-4 px-6 w-fit"
            aria-label={action.label}
          >
            {action.label}
          </button>
        </div>
      )}
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={430}
          height={590}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={600}
        />
        <img
          class="object-cover w-full h-full max-h-screen"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
      <ul class="carousel flex flex-col z-10 absolute right-9 top-1/2 -translate-y-1/2">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-2">
                <div class="w-2 h-2 rounded-full bg-gray-500 group-disabled:bg-white transition-all duration-200" />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn btn-circle glass">
          <Icon
            class="text-base-100"
            size={24}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="btn btn-circle glass">
          <Icon
            class="text-base-100"
            size={24}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function HeroCarousel(props: Props) {
  const id = useId();
  const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };

  return (
    <div
      id={id}
      class="relative grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] sm:min-h-min min-h-[660px] bg-black"
    >
      <Slider
        rootId={id}
        interval={interval && interval * 1e3}
        infinite
        class="carousel carousel-center w-full col-span-full row-span-full"
      >
        {images?.map((image, index) => {
          const params = { promotion_name: image.alt };
          return (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem
                image={image}
                lcp={index === 0 && preload}
                id={`${id}::${index}`}
              />
            </Slider.Item>
          );
        })}
      </Slider>

      {props.arrows && <Buttons />}

      {props.dots && <Dots images={images} interval={interval} />}

      {props.text && (
        <div class="absolute px-4 w-full xl:w-auto text-center xl:text-start top-16 left-1/2 -translate-x-1/2 xl:translate-x-0 xl:top-1/2 xl:-translate-y-1/2 xl:left-32">
          <h1 class="text-white text-4xl font-bold [text-shadow:_5px_5px_0_rgb(0_0_0_/_40%)]">
            {props.text.title}
          </h1>
          <span class="text-white text-2xl font-medium [text-shadow:_0_2px_0_rgb(0_0_0_/_40%)]">
            {props.text.subTitle}
          </span>
        </div>
      )}

      {props.photographer && (
        <div class="absolute w-full xl:w-auto px-4 bottom-8 left-1/2 -translate-x-1/2 xl:left-[unset] xl:translate-x-0 xl:top-1/2 xl:-translate-y-1/2 xl:right-32 flex flex-row-reverse xl:flex-col gap-2 items-center justify-center">
          <Picture preload>
            <Source
              media="(max-width: 1279px)"
              fetchPriority="high"
              src={props.photographer.image}
              width={150}
              height={150}
            />
            <Source
              media="(min-width: 1280px)"
              fetchPriority="high"
              src={props.photographer.image}
              width={450}
              height={450}
            />
            <img
              class="rounded-full opacity-50 hover:opacity-100 transition-opacity"
              loading="eager"
              src={props.photographer.image}
              alt="Photographer"
            />
          </Picture>
          <span class="text-white text-center font-medium max-w-[250px]">
            {props.photographer.text}
          </span>
        </div>
      )}
    </div>
  );
}

export default HeroCarousel;
