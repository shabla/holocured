import { Item, WeaponsList } from "@/models";

export function getHighlightedCollabs(
  items: Item[],
  selectedItems: WeaponsList,
): Item[] {
  const { selectedWeaponIds, emptySlots } = selectedItems.reduce(
    (acc: { selectedWeaponIds: string[]; emptySlots: number }, item) => {
      if (item === undefined) {
        acc.emptySlots += 1;
      } else {
        acc.selectedWeaponIds.push(item.id);
      }
      return acc;
    },
    { selectedWeaponIds: [], emptySlots: 0 },
  );

  return items
    .filter((i) => i.type === "collab")
    .filter((collab) => {
      const [reqWeapon1, reqWeapon2] = collab.requires || [];
      const hasItem1 = selectedWeaponIds.includes(reqWeapon1);
      const hasItem2 = selectedWeaponIds.includes(reqWeapon2);

      const bothReqSelected = hasItem1 && hasItem2;
      const oneReqWithEmptySlot = (hasItem1 || hasItem2) && emptySlots > 0;

      return bothReqSelected || oneReqWithEmptySlot;
    });
}