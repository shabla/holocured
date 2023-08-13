import { Item } from "@/models";
import { PlusIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import styles from "./CollabRow.module.scss";
import { Sprite } from "../Sprite/Sprite";

export interface CollabRowProps {
	disabledWeaponIds?: string[];
	disabled?: boolean;
	item: Item;
	items: Item[];
}

export const CollabRow = ({
	disabled,
	disabledWeaponIds = [],
	item,
	items,
}: CollabRowProps) => {
	if (!item.requires) {
		console.error(`Item "${item.name}" doesn't have any required items`, item);
		return null;
	}

	const firstItem = items.find((i) => i.id === item.requires![0])!;
	const secondItem = items.find((i) => i.id === item.requires![1])!;

	const isFirstItemDisabled = disabledWeaponIds.includes(firstItem.id);
	const isSecondItemDisabled = disabledWeaponIds.includes(secondItem.id);

	return (
		<div className={styles.container}>
			<Sprite
				type="items"
				name={firstItem?.name}
				label={firstItem?.name}
				showBackground
				disabled={isFirstItemDisabled}
			/>

			<PlusIcon className={styles.comboOperator} />

			<Sprite
				type="items"
				name={secondItem?.name}
				label={secondItem?.name}
				showBackground
				disabled={isSecondItemDisabled}
			/>

			<ArrowRightIcon className={styles.comboOperator} />

			<Sprite
				type="items"
				name={item.name}
				label={item.name}
				showBackground
				disabled={disabled}
			/>
		</div>
	);
};
