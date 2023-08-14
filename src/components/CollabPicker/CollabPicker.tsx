import { Item } from "@/models";
import React from "react";
import { Selectable } from "../Selectable/Selectable";
import styles from "./CollabPicker.module.scss";
import { CollabRow } from "./CollabRow/CollabRow";

export interface CollabPickerProps {
	disabledWeaponIds: string[];
	collabs: Item[];
	emptyMessage?: string;
	onSelect: (collab: Item) => void;
}

export const CollabPicker = ({
	disabledWeaponIds,
	collabs,
	emptyMessage = "No collabs available",
	onSelect,
}: CollabPickerProps) => {
	return (
		<div className={styles.collabPicker}>
			{collabs.length === 0 && (
				<div className={styles.emptyMessage}>{emptyMessage}</div>
			)}

			{collabs.map((collab) => {
				const disabledWeapons =
					collab.requires?.filter((itemId) =>
						disabledWeaponIds.includes(itemId),
					) || [];

				const isDisabled =
					disabledWeaponIds.includes(collab.id) || disabledWeapons.length > 0;

				return (
					<Selectable
						key={collab.id}
						disabled={isDisabled}
						onClick={() => onSelect(collab)}
						style={{
							flex: "1 1 auto",
						}}
					>
						<CollabRow
							key={collab.id}
							item={collab}
							disabledWeaponIds={disabledWeapons}
							disabled={isDisabled}
						/>
					</Selectable>
				);
			})}
		</div>
	);
};
