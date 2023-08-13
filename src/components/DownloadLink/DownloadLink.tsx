import styles from "./DownloadLink.module.scss";

export function DownloadLink({
	children,
	...linkProps
}: React.HTMLProps<HTMLAnchorElement>) {
	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			{...linkProps}
			className={styles.downloadLink}
		>
			{children}
		</a>
	);
}
