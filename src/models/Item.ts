
type ItemType = "weapon" | "item" | "collab" | "super"

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  desc: string;
  requirement?: string;
  notes?: string;
  requires?: string[];
  // levels: Level[];
  spritesheetOffset: [number, number];
}

export type WeaponsList = [
  Item | undefined,
  Item | undefined,
  Item | undefined,
  Item | undefined,
  Item | undefined,
];

export type WeaponIdsList = [
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
];

export type ItemsList = [
  Item | undefined,
  Item | undefined,
  Item | undefined,
  Item | undefined,
  Item | undefined,
  Item | undefined,
];

export type ItemIdsList = [
  number | undefined,
  number | undefined,
  number | undefined,
  number | undefined,
  number | undefined,
  number | undefined,
];
