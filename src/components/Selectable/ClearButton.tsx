import styles from "./Selectable.module.scss";

interface ClearButtonProps {
	onClick?: () => void;
}

export function ClearButton({ onClick }: ClearButtonProps) {
	return (
		<button
			type="button"
			className={styles.clearButton}
			onClick={
				onClick
					? (e) => {
							e.stopPropagation();
							onClick();
					  }
					: undefined
			}
		>
			Remove
		</button>
	);
}
