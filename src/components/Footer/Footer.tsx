import { config } from "@/config";
import { ContentContainer } from "../ContentContainer/ContentContainer";
import { IconLink } from "../IconLink/IconLink";
import { Icons } from "../Icons/Icons";
import styles from "./Footer.module.scss";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<ContentContainer style={{ justifyContent: "center" }}>
				{config.footer.map((link) => (
					<IconLink key={link.href} href={link.href} title={link.title}>
						{link.icon && Icons[link.icon]}
					</IconLink>
				))}
			</ContentContainer>
		</footer>
	);
}
