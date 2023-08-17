import classNames from "classnames";
import styles from "./Selectable.module.scss";
import { ClearButton } from "./ClearButton";

export interface SelectableProps {
	children: React.ReactNode;
	clearable?: boolean;
	disabled?: boolean;
	selected?: boolean;
	highlighted?: boolean;
	style?: React.CSSProperties;
	onClick?: () => void;
	onClear?: () => void;
}

export const Selectable = ({
	children,
	clearable = false,
	disabled = false,
	selected = false,
	highlighted = false,
	style,
	onClick,
	onClear,
}: SelectableProps): React.ReactElement => {
	return (
		<div
			className={classNames(styles.container, {
				[styles.disabled]: disabled,
				[styles.selected]: selected,
				[styles.highlighted]: highlighted,
			})}
			onClick={disabled ? undefined : onClick}
			style={style}
		>
			{clearable && <ClearButton onClick={onClear} />}
			{children}
		</div>
	);
};
