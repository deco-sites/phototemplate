import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  subTitle: string;
  informations: {
    icon: ImageWidget;
    text: string;
  }[];
  bottomImage: ImageWidget;
}

export default function Experience({ title }: Props) {
  return (
    <div class="bg-[#222] w-full min-h-96 flex flex-col">
      <h3 class="text-4xl mx-auto block text-white pt-11">{title}</h3>
    </div>
  );
}
