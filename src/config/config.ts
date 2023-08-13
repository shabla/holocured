import configJSON from "@/assets/config.json";
import { SpriteType } from "./SpriteType";
import { NavbarLinkConfig } from "./NavbarLinkConfig";
import { SpriteSheet, SpriteSheetConfig, spriteSheets } from "./SpriteSheet";


type SpriteSheets = Record<SpriteType, SpriteSheet>;

interface RawConfig {
  navbar: NavbarLinkConfig[];
  downloadLink: NavbarLinkConfig & { text: string };
  spritesheets: Record<SpriteType, SpriteSheetConfig>;
}

interface Config extends RawConfig {
  spritesheets: SpriteSheets;
}

function loadConfig(rawConfig: RawConfig): Config {
  const spritesheetsByType = spriteSheets.reduce((acc, spriteSheet) => {
    const spritesheet: SpriteSheetConfig = rawConfig.spritesheets[spriteSheet.type];

    acc[spriteSheet.type] = {
      ...spritesheet,
      offsets: spritesheet.offsets || {},
      file: spriteSheet.file
    } as SpriteSheet;

    return acc;
  }, {} as Partial<Record<SpriteType, SpriteSheet>>)


  return {
    ...rawConfig,
    spritesheets: spritesheetsByType as SpriteSheets
  }
}

export const config = loadConfig(configJSON);
