import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: AvatarSize;
  className?: string;
}

const sizes: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: "h-6 w-6", text: "text-xs" },
  sm: { container: "h-8 w-8", text: "text-xs" },
  md: { container: "h-10 w-10", text: "text-sm" },
  lg: { container: "h-12 w-12", text: "text-base" },
  xl: { container: "h-16 w-16", text: "text-xl" },
};

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const { container, text } = sizes[size];

  if (src) {
    return (
      <div
        className={cn(
          "relative rounded-full overflow-hidden flex-shrink-0 bg-[#F7F8FA]",
          container,
          className
        )}
      >
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center flex-shrink-0",
        "bg-[#0D6E6E] text-white font-semibold",
        container,
        text,
        className
      )}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}
