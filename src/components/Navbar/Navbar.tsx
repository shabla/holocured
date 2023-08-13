import HOLOCURE_LOGO from "@/assets/holocure-logo-sm.png";
import { config } from "@/config";
import { ContentContainer } from "../ContentContainer/ContentContainer";
import { DownloadLink } from "../DownloadLink/DownloadLink";
import styles from "./NavBar.module.scss";

export function Navbar() {
	return (
		<nav className={styles.navbar}>
			<ContentContainer style={{ justifyContent: "space-between" }}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={HOLOCURE_LOGO.src}
					alt="HoloCure Logo"
					height="50"
					width="119"
				/>

				<DownloadLink
					href={config.navbar.downloadLink.href}
					title={config.navbar.downloadLink.title}
				>
					{config.navbar.downloadLink.text}
				</DownloadLink>
			</ContentContainer>
		</nav>
	);
}
