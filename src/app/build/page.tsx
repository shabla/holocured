import styles from "./page.module.scss";
import { fetchItems } from "@/api/fetchItems";
import { config } from "@/config";
import { WeaponsPicker } from "./_components/WeaponsPicker";
import { Log } from "@/components/Log";

export default async function BuildPage() {
	const items = await fetchItems();

	return (
		<div className={styles.main}>
			<Log>{[items, config]}</Log>

			<WeaponsPicker items={items} />
		</div>
	);
}
