import BuildPage from "@/components/BuildPage/BuildPage";
import { config } from "@/config";
import { Item } from "@/models";

async function fetchItems(): Promise<Item[]> {
	const res = await fetch(
		"http://127.0.0.1:8090/api/collections/items/records?perPage=999",
	);
	const data = await res.json();
	const items: Item[] = data.items;

	items.forEach((item) => {
		item.spritesheetOffset = config.spritesheets.items.offsets[item.name] as [
			number,
			number,
		];
	});

	return items;
}

export default async function Page() {
	const items = await fetchItems();

	return <BuildPage items={items} />;
}
