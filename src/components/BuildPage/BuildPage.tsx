"use client";

import classNames from "classnames";
import { CollabPicker } from "@/components/CollabPicker/CollabPicker";
import { ItemPicker } from "@/components/ItemPicker/ItemPicker";
import { WeaponsSection } from "@/components/WeaponsSection/WeaponsSection";
import { Item, WeaponsList } from "@/models";
import { uniq, without } from "lodash";
import { useState, useMemo } from "react";
import styles from "./BuildPage.module.scss";
import { useItems } from "@/context/items-context";

function collabRequiresItem(collab: Item, item: Item): boolean {
	return (collab.requires || []).includes(item.id);
}

const findFirstEmptySlotIndex = (selectedItems: WeaponsList): number => {
	return selectedItems.findIndex((slot) => slot === undefined);
};

function getBasicWeapons(items: Item[], selectedItems: Item[]): Item[] {
	return uniq(
		(selectedItems.filter((w) => w !== undefined) as Item[]).reduce(
			(acc, item) => {
				if (item.type === "weapon") {
					return [...acc, item];
				}

				if (item.type === "collab") {
					return [
						...acc,
						...(item.requires || []).map((id) =>
							items.find((i) => i.id === id),
						),
					] as Item[];
				}

				return acc;
			},
			[] as Item[],
		),
	);
}

function getAvailableCollabs(
	items: Item[],
	selectedItems: WeaponsList,
	selectedSlot: number | undefined,
): Item[] {
	const ownedItems = selectedItems.filter((w) => w !== undefined) as Item[];
	const selectedItem =
		selectedSlot !== undefined ? selectedItems[selectedSlot] : undefined;

	let collabs: Item[] = [];

	if (selectedItem !== undefined) {
		if (selectedItem.type === "collab") {
			console.log("selected item is a collab, no availlable collabs");
			return [];
		}

		if (selectedItem.type === "weapon") {
			// only show collabs doable with selected item
			collabs = items.filter(
				(i) => i.type === "collab" && i.requires?.includes(selectedItem.id),
			);
		}
	} else {
		collabs = items.filter((i) => i.type === "collab");
	}

	const ownedCollabs = ownedItems.filter((i) => i.type === "collab");
	const basicWeaponsUsedByOwnedCollabs = getBasicWeapons(items, ownedCollabs);

	return collabs.filter((collab) => {
		// Remove collabs we already own
		const isAlreadyOwned = ownedItems.find((i) => i.id === collab.id);
		if (isAlreadyOwned) {
			return false;
		}

		// Remove collabs that use basic items already used by another owned collab
		for (const id of collab.requires || []) {
			if (basicWeaponsUsedByOwnedCollabs.find((i) => i.id === id)) {
				return false;
			}
		}

		return true;
	});
}

export default function BuildPage() {
	const items = useItems();
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
		// TODO: when nothing is selected, don't assume we want to use existing basic weapon for clicked collab

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

		// 		console.log(`
		// firstItemId:            ${firstItemId}
		// secondItemId:           ${secondItemId}
		// firstItemIndex:         ${firstItemIndex}
		// secondItemIndex:        ${secondItemIndex}
		// isFirstOwned:           ${isFirstOwned}
		// isSecondOwned:          ${isSecondOwned}
		// hasSelection:           ${hasSelection}
		// isSelectedSlotFree:     ${isSelectedSlotFree}
		// selectedItem:           ${selectedItem?.id}
		// isSelectedSlotRequired: ${isSelectedSlotRequired}
		// `);

		const updatedSelectedWeapons = [...selectedWeapons] as WeaponsList;
		let indexForCollab;

		if (!isFirstOwned && !isSecondOwned) {
			if (selectedSlot === undefined) {
				indexForCollab = findFirstEmptySlotIndex(selectedWeapons);
			} else {
				indexForCollab = selectedSlot;
			}
		} else if (isFirstOwned && !isSecondOwned) {
			// only first owned
			if (selectedSlot === undefined) {
				indexForCollab = firstItemIndex;
			} else {
				indexForCollab = selectedSlot;
				updatedSelectedWeapons[firstItemIndex] = undefined;
			}
		} else if (!isFirstOwned && isSecondOwned) {
			// only second owned
			if (selectedSlot === undefined) {
				indexForCollab = secondItemIndex;
			} else {
				indexForCollab = selectedSlot;
				updatedSelectedWeapons[secondItemIndex] = undefined;
			}
		} else {
			// both owned
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
			updatedSelectedWeapons[indexForCollab] = collab;
		}

		setSelectedWeapons(updatedSelectedWeapons);
	};

	const basicWeapons = items?.filter((item) => item.type === "weapon");
	const allCollabs = items.filter((item) => item.type === "collab");

	const disabledBasicWeaponIds = getBasicWeapons(
		items,
		selectedWeapons.filter((w) => w !== undefined) as Item[],
	).map((i) => i.id);

	const availableCollabs = useMemo(() => {
		return getAvailableCollabs(items, selectedWeapons, selectedSlot);
	}, [items, selectedWeapons, selectedSlot]);

	return (
		<div className={styles.buildPage}>
			<WeaponsSection
				selectedSlot={selectedSlot}
				selectedWeapons={selectedWeapons}
				onSlotSelected={setSelectedSlot}
				onChange={setSelectedWeapons}
				onRemove={() => setSelectedSlot(undefined)}
			/>

			<div className={styles.items}>
				<Section className={styles.basicWeapons}>
					<h2>Basic Weapons</h2>
					<ItemPicker
						items={basicWeapons}
						disabledItemIds={disabledBasicWeaponIds}
						onSelect={handleBasicWeaponSelected}
					/>
				</Section>

				<Section className={styles.allCollabs}>
					<h2>Collabs</h2>
					<CollabPicker
						collabs={allCollabs}
						disabledWeaponIds={[]}
						onSelect={handleCollabSelected}
					/>
				</Section>

				<Section className={styles.availableCollabs}>
					<h2>Available Collabs</h2>
					<CollabPicker
						collabs={availableCollabs}
						disabledWeaponIds={[]}
						onSelect={handleCollabSelected}
					/>
				</Section>
			</div>
		</div>
	);
}

function Section({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<div className={classNames(styles.section, className)}>{children}</div>
	);
}
