import { SpriteSheet } from "@/config/SpriteSheet";

export const getSpriteBackground = (
  spriteSheet: SpriteSheet,
  offsets: [number, number],
): string => {
  const [xOffset, yOffset] = offsets;

  if (!isNaN(xOffset) && !isNaN(yOffset)) {
    const x = -xOffset * spriteSheet.width;
    const y = -yOffset * spriteSheet.height;

    return `url(${spriteSheet.file.src}) ${x}px ${y}px`;
  }

  return `url(https://via.placeholder.com/${spriteSheet.width}x${spriteSheet.height}.png?text=???)`;
};
