"use client";

import { Item } from "@/models";
import { useContext, createContext } from "react";

const ItemsContext = createContext<Item[]>([]);

interface ItemsContextProviderProps {
	items: Item[];
	children: React.ReactNode;
}

export function ItemsContextProvider({
	items,
	children,
}: ItemsContextProviderProps) {
	return (
		<ItemsContext.Provider value={items}>{children}</ItemsContext.Provider>
	);
}

export function useItems() {
	return useContext(ItemsContext);
}
