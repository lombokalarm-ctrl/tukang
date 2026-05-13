import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
    </div>
  );
}
