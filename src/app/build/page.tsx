import styles from "./page.module.scss";
import { Generation } from "@/models/Generation";

async function listGenerations(): Promise<Generation[]> {
	const res = await fetch(
		"http://127.0.0.1:8090/api/collections/generations/records",
		{ cache: "no-store" },
	);
	const data = await res.json();

	return data.items;
}

export default async function BuildPage() {
	const gens = await listGenerations();

	console.log(gens);

	return <main className={styles.main}>{gens?.map((gen) => gen.name)}</main>;
}
