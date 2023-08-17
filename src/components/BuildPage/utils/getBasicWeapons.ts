import { Item } from "@/models";

export function getBasicWeapons(items: Item[]): string[] {
  const weapons: string[] = [];

  items.forEach((item) => {
    if (item?.type === "weapon") {
      weapons.push(item.id);
    } else if (item?.type === "collab") {
      weapons.push(...(item.requires || []));
    }
  });

  return weapons;
}