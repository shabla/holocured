import { Item } from "@/models";
import { PlusIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import styles from "./CollabRow.module.scss";
import { Sprite } from "@/components/Sprite/Sprite";
import { useItems } from "@/context/items-context";

export interface CollabRowProps {
	disabledWeaponIds?: string[];
	disabled?: boolean;
	collab: Item;
}

export const CollabRow = ({
	disabled,
	disabledWeaponIds = [],
	collab,
}: CollabRowProps) => {
	const items = useItems();

	if (!collab.requires) {
		console.error(
			`Item "${collab.name}" doesn't have any required items`,
			collab,
		);
		return null;
	}

	const [firstItemId, secondItemId] = collab.requires;
	const firstItem = items.find((i) => i.id === firstItemId);
	const secondItem = items.find((i) => i.id === secondItemId);
	const isFirstItemDisabled = disabledWeaponIds.includes(firstItemId);
	const isSecondItemDisabled = disabledWeaponIds.includes(secondItemId);

	return (
		<div className={styles.container}>
			<Sprite
				type="items"
				offsets={firstItem?.offsets}
				label={firstItem?.name}
				showBackground
				disabled={isFirstItemDisabled}
			/>

			<PlusIcon className={styles.comboOperator} />

			<Sprite
				type="items"
				offsets={secondItem?.offsets}
				label={secondItem?.name}
				showBackground
				disabled={isSecondItemDisabled}
			/>

			<ArrowRightIcon className={styles.comboOperator} />

			<Sprite
				type="items"
				offsets={collab.offsets}
				label={collab.name}
				showBackground
				disabled={disabled}
			/>
		</div>
	);
};
