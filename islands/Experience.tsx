import { useRef, useEffect, useState } from "preact/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  subTitle: string;
  informations: {
    icon: ImageWidget;
    text: string;
  }[];
  bottomImage: ImageWidget;
}

export default function Experience({
  title,
  subTitle,
  informations,
  bottomImage,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const titleTop = titleRef.current.getBoundingClientRect().top + 100;
        const windowHeight = globalThis.innerHeight;

        // Se a parte superior do título estiver dentro da janela visível
        if (titleTop < windowHeight) {
          setIsVisible(true);
          // Remove o listener após a animação ser aplicada
          globalThis.removeEventListener("scroll", handleScroll);
        }
      }
    };

    // Adiciona um listener para o evento de rolagem da janela
    globalThis.addEventListener("scroll", handleScroll);

    // Remove o listener quando o componente é desmontado para evitar memory leaks
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div class="bg-black w-full min-h-96 flex flex-col relative px-4 pb-8">
        <div
          style={{
            background: "linear-gradient(180deg, black, transparent)",
          }}
          class="absolute w-full left-0 top-0 h-[100px] z-20 pointer-events-none"
        ></div>
        <h3
          ref={titleRef}
          class={`text-2xl lg:text-4xl text-center mx-auto block text-white pt-16 opacity-0 transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : ""
          }`}
        >
          {title}
        </h3>
        <span
          class={`text-center text-white font-normal mx-auto max-w-[800px] pt-6 transition-opacity duration-1000 opacity-0 ${
            isVisible ? "opacity-100" : ""
          }`}
        >
          {subTitle}
        </span>
        <ul class="grid grid-cols-2 md:grid-cols-4 gap-6 xl:flex mx-auto pt-8">
          {informations?.map((info) => (
            <li class="flex flex-col gap-2 justify-center items-center">
              <Image width={44} src={info.icon} alt={info.text} />
              <span class="text-gray-400">{info.text}</span>
            </li>
          ))}
        </ul>
        {bottomImage && (
          <Image
            width={800}
            src={bottomImage}
            class="mx-auto mt-6 mix-blend-hard-light"
          />
        )}
      </div>
    </>
  );
}
