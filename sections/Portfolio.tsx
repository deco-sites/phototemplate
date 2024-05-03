import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface PorfolioImage {
  src?: ImageWidget;
  /** @description text alternative */
  altText?: string;
}

export interface Props {
  title?: string;
  images?: PorfolioImage[];
}

const IMG_PLACEHODLER = Array(30)
  .fill(0)
  .map(() => ({
    src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/03fbcc78-ca86-4616-a59a-b8aa18331a9c",
    altText: "Image",
  }));

export default function Portfolio({
  title = "Edit this heading however you want",
  images = IMG_PLACEHODLER,
}: Props) {
  const slideContent = (
    <div class="flex items-center gap-20">
      {images?.map((image) => {
        return (
          <Image
            src={image.src || ""}
            alt={image.altText || ""}
            width={400}
            height={400}
            loading="lazy"
            class="h-full object-cover"
          />
        );
      })}
    </div>
  );
  return (
    <div class="lg:container md:max-w-6xl lg:mx-auto mx-4 py-6 lg:py-14">
      <div class="flex flex-col gap-12">
        <p class="text-2xl xl:text-4xl font-bold">{title}</p>
        <div class="relative w-full overflow-hidden h-[400px]">
          <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-[400px]">
            {slideContent}
          </div>
        </div>
        <a
          href="#"
          class="ml-auto text-end text-xl xl:text-2xl hover:underline"
        >
          View more
        </a>
      </div>
    </div>
  );
}
