import { Item } from "@/models";
import React from "react";
import { Selectable } from "../Selectable/Selectable";
import styles from "./CollabPicker.module.scss";
import { CollabRow } from "./CollabRow/CollabRow";

export interface CollabPickerProps {
	collabs: Item[];
	availableCollabs?: Item[];
	disabledCollabIds: string[];
	emptyMessage?: string;
	onSelect: (collab: Item) => void;
}

export const CollabPicker = ({
	disabledCollabIds,
	collabs,
	availableCollabs = [],
	emptyMessage = "No collabs available",
	onSelect,
}: CollabPickerProps) => {
	return (
		<div className={styles.collabPicker}>
			{collabs.length === 0 && (
				<div className={styles.emptyMessage}>{emptyMessage}</div>
			)}

			{collabs.map((collab) => {
				const isDisabled = disabledCollabIds.includes(collab.id);
				const isAvailable = !!availableCollabs.some((c) => c.id === collab.id);

				return (
					<Selectable
						key={collab.id}
						disabled={isDisabled}
						highlighted={isAvailable}
						onClick={() => onSelect(collab)}
						style={{ flex: "1 1 auto" }}
					>
						<CollabRow key={collab.id} collab={collab} disabled={isDisabled} />
					</Selectable>
				);
			})}
		</div>
	);
};
