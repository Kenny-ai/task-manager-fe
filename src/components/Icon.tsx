import Image from "next/image";
import React from "react";

interface IconProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}

const Icon = ({ src, alt, className, priority }: IconProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      className={`${className} w-auto h-auto`}
      priority={priority}
    />
  );
};

export default Icon;
