"use client";

import { CollabPicker } from "@/components/CollabPicker/CollabPicker";
import { ItemPicker } from "@/components/ItemPicker/ItemPicker";
import { WeaponsSection } from "@/components/WeaponsSection/WeaponsSection";
import { Item, WeaponsList } from "@/models";
import { uniq, without } from "lodash";
import { useState } from "react";
import styles from "./BuildPage.module.scss";

interface BuildPageProps {
	items: Item[];
}

const findFirstEmptySlotIndex = (selectedItems: WeaponsList): number => {
	return selectedItems.findIndex((slot) => slot === undefined);
};

export default function BuildPage({ items }: BuildPageProps) {
	const [selectedSlot, setSelectedSlot] = useState<number>();
	const [selectedWeapons, setSelectedWeapons] = useState<WeaponsList>([
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
	]);

	const handleBasicWeaponSelected = (item: Item) => {
		let indexToReplace = selectedSlot;

		// no slot selected, find first empty slot
		if (indexToReplace === undefined) {
			indexToReplace = findFirstEmptySlotIndex(selectedWeapons);
		}

		if (indexToReplace !== undefined) {
			const updatedWeapons = [...selectedWeapons] as WeaponsList;
			updatedWeapons[indexToReplace] = item;

			setSelectedWeapons(updatedWeapons);
		}
	};

	const handleCollabSelected = (collab: Item) => {
		// TODO: simplify this?

		const firstItemId = collab.requires?.[0] as string;
		const secondItemId = collab.requires?.[1] as string;

		const firstItemIndex = selectedWeapons.findIndex(
			(item) => item?.id === firstItemId,
		);
		const secondItemIndex = selectedWeapons.findIndex(
			(item) => item?.id === secondItemId,
		);

		const isFirstOwned = firstItemIndex !== -1;
		const isSecondOwned = secondItemIndex !== -1;

		const hasSelection = selectedSlot !== undefined;
		const isSelectedSlotFree =
			hasSelection && selectedWeapons[selectedSlot] === undefined;

		const selectedItem = (hasSelection &&
			!isSelectedSlotFree &&
			selectedWeapons[selectedSlot]) as Item;

		const isSelectedSlotRequired =
			selectedItem && collab.requires?.includes(selectedItem.id);

		console.log(`
firstItemId:            ${firstItemId}
secondItemId:           ${secondItemId}
firstItemIndex:         ${firstItemIndex}
secondItemIndex:        ${secondItemIndex}
isFirstOwned:           ${isFirstOwned}
isSecondOwned:          ${isSecondOwned}
hasSelection:           ${hasSelection}
isSelectedSlotFree:     ${isSelectedSlotFree}
selectedItem:           ${selectedItem?.id}
isSelectedSlotRequired: ${isSelectedSlotRequired}
`);

		const updatedSelectedWeapons = [...selectedWeapons] as WeaponsList;
		let indexForCollab;

		if (!isFirstOwned && !isSecondOwned) {
			console.log("both non owned");

			if (selectedSlot === undefined) {
				indexForCollab = findFirstEmptySlotIndex(selectedWeapons);
				console.log("find first empty slot", indexForCollab);
			} else {
				indexForCollab = selectedSlot;
				console.log("put in selected slot", selectedSlot);
			}
		} else if (isFirstOwned && !isSecondOwned) {
			// only first owned
			if (selectedSlot === undefined) {
				indexForCollab = firstItemIndex;
			} else {
				indexForCollab = selectedSlot;
				updatedSelectedWeapons[firstItemIndex] = undefined;
			}
			console.log("first owned", firstItemIndex);
		} else if (!isFirstOwned && isSecondOwned) {
			// only second owned
			if (selectedSlot === undefined) {
				indexForCollab = secondItemIndex;
			} else {
				indexForCollab = selectedSlot;
				updatedSelectedWeapons[secondItemIndex] = undefined;
			}
			console.log("second owned", secondItemIndex);
		} else {
			// both owned
			console.log("both owned", isSelectedSlotFree);

			if (isSelectedSlotRequired || isSelectedSlotFree) {
				indexForCollab = selectedSlot;
			} else if (selectedSlot === secondItemIndex) {
				indexForCollab = secondItemIndex;
			} else {
				// Replace the left-most item
				indexForCollab = Math.min(firstItemIndex, secondItemIndex);
			}

			if (indexForCollab === firstItemIndex) {
				updatedSelectedWeapons[secondItemIndex] = undefined;
			}
			if (indexForCollab === secondItemIndex) {
				updatedSelectedWeapons[firstItemIndex] = undefined;
			}
		}

		// found somewhere to put the collab in
		if (indexForCollab !== undefined) {
			console.log("updating this field", indexForCollab);
			updatedSelectedWeapons[indexForCollab] = collab;
		}

		setSelectedWeapons(updatedSelectedWeapons);
	};

	const basicWeapons = items?.filter((item) => item.type === "weapon");
	const allCollabs = items.filter((item) => item.type === "collab");
	let availableCollabs: Item[] = [];

	// TODO: dont disable basic weapons if they're part of selected item's required items
	const disabledBasicWeaponIds =
		selectedWeapons.filter((w) => w !== undefined).length === 5
			? items.map((i) => i.id)
			: selectedWeapons.reduce((acc: string[], slottedWeapon) => {
					if (slottedWeapon?.type === "weapon") {
						return uniq([...acc, slottedWeapon.id]);
					}

					if (slottedWeapon?.type === "collab") {
						return uniq([...acc, ...(slottedWeapon.requires || [])]);
					}

					return acc;
			  }, []);

	function collabRequiresItem(collab: Item, item: Item): boolean {
		return (collab.requires || []).includes(item.id);
	}

	if (selectedSlot !== undefined) {
		const owned = selectedWeapons.filter((item) => !!item) as Item[];
		const selectedItem = selectedWeapons[selectedSlot];
		// console.log("owned", owned);
		// console.log("selected item", selectedItem);

		if (selectedItem) {
			const otherOwned: Item[] = without(owned, selectedItem);

			// console.log("other owned", otherOwned);

			availableCollabs = allCollabs.filter((collab) => {
				return collabRequiresItem(collab, selectedItem);
			});
			// .filter((collab) => {
			// 	// Is pickable (not already picked)
			// 	const alreadyOwned =
			// 		otherOwned.find((item) => {
			// 			if (item.type === "weapon") {
			// 				return item.id === collab.id;
			// 			}

			// 			if (item.type === "collab") {
			// 				return (item.requires || []).includes(collab.id);
			// 			}

			// 			return false;
			// 		}) !== null;

			// 	return !alreadyOwned;
			// });
		}
	}

	// .filter((collab) => {
	// 	const item = selectedWeapons[selectedSlot];
	// 	if (!item) {
	// 		return false;
	// 	}

	// 	return collabRequiresItem(collab, item);
	// })
	// .filter((collab) => {
	// 	const unavailable = (collab.requires || []).find((id) => {
	// 		return disabledWeaponIds.includes(id);
	// 	});

	// 	return unavailable;
	// });

	return (
		<div className={styles.pageContainer}>
			<WeaponsSection
				items={items}
				selectedSlot={selectedSlot}
				selectedWeapons={selectedWeapons}
				onSlotSelected={setSelectedSlot}
				onChange={setSelectedWeapons}
			/>

			<div className={styles.items}>
				<div className={styles.basicWeaponsSection}>
					<h2>Weapons</h2>
					<ItemPicker
						items={basicWeapons}
						disabledItemIds={disabledBasicWeaponIds}
						onSelect={handleBasicWeaponSelected}
					/>
				</div>

				<div className={styles.allCollabsSection}>
					<h2>Collabs</h2>
					<CollabPicker
						items={items}
						collabs={allCollabs}
						disabledWeaponIds={[]}
						onSelect={handleCollabSelected}
					/>
				</div>

				<div className={styles.availableCollabsSection}>
					<h2>Available Collabs</h2>
					<CollabPicker
						items={items}
						collabs={availableCollabs}
						disabledWeaponIds={[]}
						onSelect={handleCollabSelected}
					/>
				</div>
			</div>
		</div>
	);
}
