import { Item, WeaponsList } from "@/models";
import { Selectable } from "../Selectable/Selectable";
import { ItemComponents } from "../ItemComponents/ItemComponents";
import styles from "./WeaponsSection.module.scss";

export interface WeaponsSectionProps {
	items: Item[];
	selectedSlot?: number;
	selectedWeapons: WeaponsList;
	onSlotSelected: (slotIndex: number | undefined) => void;
	onChange: (updatedSelection: WeaponsList) => void;
}

export const WeaponsSection = ({
	items,
	selectedSlot,
	selectedWeapons,
	onSlotSelected,
	onChange,
}: WeaponsSectionProps): React.ReactElement => {
	const handleSlotClicked = (index: number) => {
		onSlotSelected(selectedSlot !== index ? index : undefined);
	};

	const handleClear = (index: number) => {
		const newSelected = [...selectedWeapons] as WeaponsList;
		newSelected[index] = undefined;
		onChange(newSelected);
	};

	return (
		<div className={styles.container}>
			{selectedWeapons.map((weapon, index) => (
				<Selectable
					key={`weapon-slot-${index}`}
					style={{
						flex: "1 1 170px", // for max 3 per row
						minWidth: 170,
						width: 170,
						height: 190,
					}}
					selected={selectedSlot === index}
					clearable={!!weapon}
					onClick={() => handleSlotClicked(index)}
					onClear={() => handleClear(index)}
				>
					{weapon ? (
						<ItemComponents items={items} item={weapon} />
					) : (
						<div className={styles.emptyMessage}>Pick a weapon</div>
					)}
				</Selectable>
			))}
		</div>
	);
};
