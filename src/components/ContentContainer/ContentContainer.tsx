import classNames from "classnames";
import styles from "./ContentContainer.module.scss";

export interface ContentContainerProps extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode;
}

export function ContentContainer({
	children,
	className,
	...props
}: ContentContainerProps) {
	return (
		<div className={classNames(className, styles.contentContainer)} {...props}>
			{children}
		</div>
	);
}
