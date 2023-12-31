import { Sprite } from "../Sprite/Sprite";
import { Item } from "@/models";
import styles from "./ItemComponents.module.scss";
import { useItems } from "@/context/items-context";

export interface ItemComponentsProps {
	item: Item;
}

export const ItemComponents = ({ item }: ItemComponentsProps) => {
	const items = useItems();
	const components =
		(item.requires
			?.map((itemId) => items.find((i) => i.id === itemId))
			.filter((item) => !!item) as Item[]) || [];

	return (
		<div className={styles.collabContainer}>
			<Sprite
				type="items"
				offsets={item.offsets}
				label={item.name}
				showBackground
			/>

			{components.length > 0 && (
				<>
					<div className={styles.bars} />

					<div className={styles.componentsContainer}>
						{components.map((item) => (
							<Sprite
								key={item.id}
								type="items"
								offsets={item.offsets}
								label={item.name}
								showBackground
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};
