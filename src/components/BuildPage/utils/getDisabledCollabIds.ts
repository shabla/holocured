import { Item, WeaponsList } from "@/models";
import { uniq } from "lodash";
import { getBasicWeapons } from "./getBasicWeapons";

export function getDisabledCollabIds(items: Item[], selectedItems: WeaponsList): string[] {
  const slottedItems: Item[] = selectedItems.filter((i) => i !== undefined) as Item[];
  const selectedCollabs: Item[] = slottedItems.filter(i => i.type === 'collab');
  const weaponIdsUsedBySelectedCollabs: string[] = getBasicWeapons(selectedCollabs);

  return uniq(
    items
      .filter(i => i.type === "collab")
      .filter(collab => {
        const requiredWeaponIds = collab.requires || [];
        const hasFirstWeapon = slottedItems.some(i => i.id === requiredWeaponIds[0]);
        const hasSecondWeapon = slottedItems.some(i => i.id === requiredWeaponIds[1]);

        return (
          // Disable collab if we already have 4 selected
          selectedCollabs.length >= 4 ||

          // Disable collab if it's already selected
          selectedCollabs.some(c => c.id === collab.id) ||

          // Disable collab if it requires a weapon already used by another selected collab
          weaponIdsUsedBySelectedCollabs.some(id => requiredWeaponIds.includes(id)) ||

          // Disable collab if we already have 3 collabs, 4 items are selected and we don't have at least one 
          // of the 2 required weapons
          (selectedCollabs.length >= 3 && slottedItems.length >= 4 && !(hasFirstWeapon || hasSecondWeapon)) ||

          // Disable if all slots are full and we don't have the 2 required items
          slottedItems.length === 5 && !(hasFirstWeapon && hasSecondWeapon)
        )
      })
      .map(collab => collab.id)
  )
}