import { config } from "@/config";
import { Item } from "@/models";

export async function fetchItems(): Promise<Item[]> {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/items/records?perPage=999",
    { cache: "no-store" },
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