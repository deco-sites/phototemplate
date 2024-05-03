import { useEffect, useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

export interface Nav {
  logo?: {
    src?: string;
    alt?: string;
  };
  navigation?: {
    links: {
      label?: string;
      url?: string;
    }[];
    buttons: CTA[];
  };
}

export default function Header({
  logo = {
    src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
    alt: "Logo",
  },
  navigation = {
    links: [
      { label: "Home", url: "/" },
      { label: "About us", url: "/" },
      { label: "Pricing", url: "/" },
      { label: "Contact", url: "/" },
    ],
    buttons: [
      { id: "change-me-1", href: "/", text: "Change me", outline: false },
      { id: "change-me-2", href: "/", text: "Change me", outline: true },
    ],
  },
}: Nav) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = globalThis.scrollY;
      const threshold = 300; // Altere esse valor conforme necessário

      setIsScrolled(scrollTop > threshold);
    };

    globalThis.addEventListener("scroll", handleScroll);

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 ${
        isScrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <input id="mobile-drawer-nav" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content container lg:px-0 px-4 flex gap-8 items-center justify-between py-4">
        <a href="/">
          <Image src={logo.src || ""} width={100} height={28} alt={logo.alt} />
        </a>

        <div className="hidden items-center justify-center lg:flex w-full">
          <ul className="flex">
            {navigation.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  aria-label={link.label}
                  className={`${
                    isScrolled ? "text-black" : "text-white"
                  } link no-underline font-semibold hover:underline p-4 [text-shadow:_2px_2px_5px_rgb(0_0_0_/_40%)]`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex gap-3">
            {navigation.buttons?.map((item, index) => (
              <a
                key={item?.id || index}
                id={item?.id}
                href={item?.href ?? "#"}
                target={item?.href?.includes("http") ? "_blank" : "_self"}
                className={`font-normal btn btn-primary ${
                  item.outline && "btn-outline"
                }`}
              >
                {item?.text}
              </a>
            ))}
          </ul>
        </div>

        <label
          htmlFor="mobile-drawer-nav"
          className="flex lg:hidden btn btn-ghost drawer-button"
        >
          <Icon id="Bars3" size={24} strokeWidth={0.1} />
        </label>
      </div>

      <aside className="drawer-side z-50 overflow-x-hidden">
        <label
          htmlFor="mobile-drawer-nav"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <div className="flex flex-col gap-8 min-h-full w-80 bg-base-100 text-base-content">
          <a className="p-4" href="/">
            <Image
              src={logo.src || ""}
              width={100}
              height={28}
              alt={logo.alt}
            />
          </a>

          <ul className="menu">
            {navigation?.links.map((link, index) => (
              <li key={index}>
                <a href={link.url} aria-label={link.label}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="p-4 flex items-center gap-3">
            {navigation.buttons?.map((item, index) => (
              <a
                key={item?.id || index}
                id={item?.id}
                href={item?.href ?? "#"}
                target={item?.href?.includes("http") ? "_blank" : "_self"}
                className={`font-normal btn btn-primary ${
                  item.outline && "btn-outline"
                }`}
              >
                {item?.text}
              </a>
            ))}
          </ul>
        </div>
      </aside>
    </nav>
  );
}
