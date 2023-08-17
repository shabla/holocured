import BuildPage from "@/components/BuildPage/BuildPage";
import { config } from "@/config";
import { ItemsContextProvider } from "@/context/items-context";
import { Item } from "@/models";

async function fetchItems(): Promise<Item[]> {
	const searchParams = new URLSearchParams({
		perPage: "999",
		fields: "id,name,type,requires,offsets",
	});

	const res = await fetch(
		`http://127.0.0.1:8090/api/collections/items/records?${searchParams.toString()}`,
	);
	const data = await res.json();
	const items: Item[] = data.items.map((rawItem: { offsets: string }) => {
		const rawOffsets = rawItem.offsets.split(",");

		return {
			...rawItem,
			offsets: [parseInt(rawOffsets[0], 10), parseInt(rawOffsets[1], 10)],
		} as Item;
	});

	return items;
}

export default async function Page() {
	const items = await fetchItems();

	return (
		<ItemsContextProvider items={items}>
			<BuildPage />
		</ItemsContextProvider>
	);
}
