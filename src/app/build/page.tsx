import styles from "./page.module.scss";
import { Item } from "@/models/Item";

async function listItems(): Promise<Item[]> {
	const res = await fetch(
		"http://127.0.0.1:8090/api/collections/items/records?perPage=999",
		{ cache: "no-store" },
	);
	const data = await res.json();

	return data.items;
}

export default async function BuildPage() {
	const items = await listItems();

	console.log("Items:", items.length);

	return <main className={styles.main}>{items?.map((item) => item.name)}</main>;
}
