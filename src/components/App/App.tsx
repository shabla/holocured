import styles from "./App.module.scss";

export function App({ children }: { children: React.ReactNode }) {
	return <div className={styles.app}>{children}</div>;
}
