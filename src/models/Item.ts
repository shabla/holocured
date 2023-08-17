
type ItemType = "weapon" | "item" | "collab" | "super"

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  desc: string;
  offsets: [number, number];
  requirement?: string;
  notes?: string;
  requires?: string[];
}

export type WeaponsList = [
  Item | undefined,
  Item | undefined,
  Item | undefined,
  Item | undefined,
  Item | undefined,
];