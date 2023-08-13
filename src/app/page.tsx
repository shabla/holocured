import styles from "./page.module.scss";
import { fetchItems } from "@/api/fetchItems";
import { config } from "@/config";
import { Log } from "@/components/Log";
import { WeaponsPicker } from "./_components/WeaponsPicker/WeaponsPicker";

export default async function BuildPage() {
	const items = await fetchItems();

	return (
		<div className={styles.main}>
			{/* <Log>{[items, config]}</Log> */}

			<WeaponsPicker items={items} />
		</div>
	);
}
