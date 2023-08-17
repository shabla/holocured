import { Item } from "@/models";
import React from "react";
import { Selectable } from "../Selectable/Selectable";
import { Sprite } from "../Sprite/Sprite";
import styles from "./ItemPicker.module.scss";

export interface ItemPickerProps {
	disabledItemIds: string[];
	items: Item[];
	style?: React.CSSProperties;
	onSelect: (item: Item) => void;
}

export const ItemPicker = ({
	disabledItemIds,
	items,
	style,
	onSelect,
}: ItemPickerProps) => {
	return (
		<div className={styles.itemPicker} style={style}>
			{items.map((item) => {
				const isDisabled = disabledItemIds.includes(item.id);

				return (
					<Selectable
						key={item.id}
						disabled={isDisabled}
						onClick={isDisabled ? undefined : () => onSelect(item)}
					>
						<Sprite
							type="items"
							offsets={item.offsets}
							disabled={isDisabled}
							showBackground
							label={item.name}
							value={item}
						/>
					</Selectable>
				);
			})}
		</div>
	);
};
