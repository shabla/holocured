import styles from "./IconLink.module.scss";

export interface IconLinkProps extends React.HTMLProps<HTMLAnchorElement> {
	children: React.ReactNode;
}

export function IconLink({ children, ...props }: IconLinkProps) {
	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			{...props}
			className={styles.iconLink}
		>
			{children}
		</a>
	);
}
