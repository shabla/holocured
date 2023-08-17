"use client";

import classNames from "classnames";
import { CollabPicker } from "@/components/CollabPicker/CollabPicker";
import { ItemPicker } from "@/components/ItemPicker/ItemPicker";
import { WeaponsSection } from "@/components/WeaponsSection/WeaponsSection";
import { Item, WeaponsList } from "@/models";
import { useState, useMemo } from "react";
import styles from "./BuildPage.module.scss";
import { useItems } from "@/context/items-context";
import { getHighlightedCollabs } from "./utils/getHighlightedCollabs";
import { findFirstEmptySlotIndex } from "./utils/findFirstEmptySlotIndex";
import { getBasicWeapons } from "./utils/getBasicWeapons";
import { getDisabledCollabIds } from "./utils/getDisabledCollabIds";
import { Section } from "./components/Section";

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
		const indexToReplace =
			selectedSlot === undefined
				? findFirstEmptySlotIndex(selectedWeapons)
				: selectedSlot;

		if (indexToReplace !== undefined) {
			const updatedWeapons = [...selectedWeapons] as WeaponsList;
			updatedWeapons[indexToReplace] = item;

			setSelectedWeapons(updatedWeapons);
		}
	};

	const handleCollabSelected = (collab: Item) => {
		// TODO: probably need some love here

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
	const collabs = items?.filter((item) => item.type === "collab");

	const disabledBasicWeaponIds = getBasicWeapons(
		selectedWeapons.filter((w) => w !== undefined) as Item[],
	);

	const availableCollabs = useMemo(
		() => getHighlightedCollabs(items, selectedWeapons),
		[items, selectedWeapons],
	);

	const disabledCollabIds = useMemo(
		() => getDisabledCollabIds(items, selectedWeapons),
		[items, selectedWeapons],
	);

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

				<Section className={styles.collabs}>
					<h2>Collabs</h2>
					<CollabPicker
						collabs={collabs}
						availableCollabs={availableCollabs}
						disabledCollabIds={disabledCollabIds}
						onSelect={handleCollabSelected}
					/>
				</Section>
			</div>
		</div>
	);
}
