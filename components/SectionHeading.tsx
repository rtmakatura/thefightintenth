import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  light?: boolean;
  center?: boolean;
};

export default function SectionHeading({
  children,
  light = false,
  center = false,
}: SectionHeadingProps) {
  const color = light ? "text-text-light" : "text-text-pri";
  const align = center ? "text-center" : "text-left";

  return (
    <h2
      className={`font-display text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance ${color} ${align}`}
    >
      {children}
    </h2>
  );
}
