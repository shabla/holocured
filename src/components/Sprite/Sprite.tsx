import classNames from "classnames";
import { getSpriteBackground } from "./getSpriteBackground";
import styles from "./Sprite.module.scss";
import { SpriteType, config } from "@/config";

export interface SpriteProps<T = unknown> {
	type: SpriteType;
	offsets?: [number, number];
	selected?: boolean;
	showBackground?: boolean;
	disabled?: boolean;
	scale?: number;
	label?: string;
	alwaysIncludeLabelPadding?: boolean;
	value?: T;
	onSelected?: (value: T) => void;
	onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
}

export const Sprite = <T,>({
	type,
	offsets = [NaN, NaN],
	label,
	showBackground = false,
	scale = 1,
	selected = false,
	alwaysIncludeLabelPadding = false,
	value,
	disabled,
	onSelected,
	onMouseOver,
}: SpriteProps<T>) => {
	const spriteSheet = config.spritesheets[type];

	if (!spriteSheet) {
		return null;
	}

	const { height, width } = spriteSheet;

	const containerStyle: React.CSSProperties = {
		width:
			label != null || alwaysIncludeLabelPadding
				? `calc(${width}px + (2 * var(--spriteLabelOverflow)))`
				: `${width}px`,
		height:
			label != null || alwaysIncludeLabelPadding
				? `calc(${height}px + (${
						alwaysIncludeLabelPadding ? 2 : 1
				  } * var(--spriteLabelOverflow)))`
				: `${height}px`,
	};

	const spriteStyle: React.CSSProperties = {
		width: `${width}px`,
		height: `${height}px`,
		transform: `scale(${scale})`,
		background: `${getSpriteBackground(spriteSheet, offsets)}${
			showBackground ? ", rgba(0, 0, 0, 0.1)" : ""
		}`,
	};

	const containerClasses = classNames(styles.spriteContainer, {
		[styles.disabled]: disabled,
		[styles.selected]: selected,
		[styles.withLabel]: label != null || alwaysIncludeLabelPadding,
		[styles.clickable]: !!onSelected,
	});

	return (
		<div
			className={containerClasses}
			style={containerStyle}
			onMouseOver={onMouseOver}
		>
			{label != null && <div className={styles.spriteLabel}>{label || ""}</div>}

			<div
				className={styles.spriteImage}
				style={spriteStyle}
				onClick={onSelected ? () => onSelected(value!) : undefined}
			/>

			<div />
		</div>
	);
};
