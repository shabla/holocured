import items from "@/assets/spritesheets/items.png";
import skills from "@/assets/spritesheets/skills.png";
import upgrades from "@/assets/spritesheets/upgrades.png";
import idolIcons from "@/assets/spritesheets/idol-icons.png"
import idolModels from "@/assets/spritesheets/idol-models.png";
import { type StaticImageData } from "next/image";
import { SpriteType } from "./SpriteType";

export type SpriteSheetConfig = {
  width: number;
  height: number;
  offsets?: Record<string, number[]>;
  file?: StaticImageData;
};

export type SpriteSheet = Required<SpriteSheetConfig>;

export const spriteSheets: { type: SpriteType, file: StaticImageData }[] = [
  { type: 'idols', file: idolModels },
  { type: 'idols-icon', file: idolIcons },
  { type: 'items', file: items },
  { type: 'upgrades', file: upgrades },
  { type: 'skills', file: skills },
]