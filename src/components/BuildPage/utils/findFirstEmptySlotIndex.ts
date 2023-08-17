import { WeaponsList } from "@/models";

export function findFirstEmptySlotIndex(selectedItems: WeaponsList): number {
  return selectedItems.findIndex((slot) => slot === undefined);
}