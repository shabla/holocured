import { Item, WeaponsList } from "@/models";
import { Selectable } from "../Selectable/Selectable";
import { ItemComponents } from "../ItemComponents/ItemComponents";
import styles from "./WeaponsSection.module.scss";

export interface WeaponsSectionProps {
	selectedSlot?: number;
	selectedWeapons: WeaponsList;
	onSlotSelected: (slotIndex: number | undefined) => void;
	onChange: (updatedSelection: WeaponsList) => void;
	onRemove: (slot: number) => void;
}

export const WeaponsSection = ({
	selectedSlot,
	selectedWeapons,
	onSlotSelected,
	onChange,
	onRemove,
}: WeaponsSectionProps): React.ReactElement => {
	const handleSlotClicked = (index: number) => {
		onSlotSelected(selectedSlot !== index ? index : undefined);
	};

	const handleClear = (index: number) => {
		const newSelected = [...selectedWeapons] as WeaponsList;
		newSelected[index] = undefined;
		onRemove(index);
		onChange(newSelected);
	};

	return (
		<div className={styles.weaponsSection}>
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
						<ItemComponents item={weapon} />
					) : (
						<div className={styles.emptyMessage}>Pick a weapon</div>
					)}
				</Selectable>
			))}
		</div>
	);
};
