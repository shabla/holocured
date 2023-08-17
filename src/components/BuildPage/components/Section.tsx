import classNames from "classnames";
import styles from "../BuildPage.module.scss";

export interface SectionProps {
	children: React.ReactNode;
	className?: string;
}

export function Section({ children, className }: SectionProps) {
	return (
		<div className={classNames(styles.section, className)}>{children}</div>
	);
}
