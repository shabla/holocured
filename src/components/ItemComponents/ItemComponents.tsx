import { Sprite } from "../Sprite/Sprite";
import { Item } from "@/models";
import styles from "./ItemComponents.module.scss";

export interface ItemComponentsProps {
	item: Item;
	items: Item[];
}

export const ItemComponents = ({ item, items }: ItemComponentsProps) => {
	const components =
		(item.requires
			?.map((itemId) => items.find((i) => i.id === itemId))
			.filter((item) => !!item) as Item[]) || [];

	return (
		<div className={styles.collabContainer}>
			<Sprite type="items" name={item.name} label={item.name} showBackground />

			{components.length > 0 && (
				<>
					<div className={styles.bars} />

					<div className={styles.componentsContainer}>
						{components.map((item) => (
							<Sprite
								key={item.id}
								type="items"
								name={item.name}
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
