import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Icons } from "@/components";
import HOLOCURE_LOGO from "@/assets/holocure-logo-sm.png";
import "normalize.css";
import "./global.scss";
import styles from "./layout.module.scss";
import { App } from "./_components/App/App";
import { IconLink } from "./_components/IconLink/IconLink";
import { DownloadLink } from "./_components/DownloadLink/DownloadLink";
import configJson from "@/config.json";
import { Config } from "@/models/Config";

const config = configJson as Config;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Holocured",
	description: "Build Assistant for Holocure",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<head />
			<body className={inter.className}>
				<App>
					<nav className={styles.navbar}>
						<div className={styles.contentContainer}>
							<Image
								src={HOLOCURE_LOGO}
								alt="HoloCure Logo"
								height="50"
								width="119"
							/>

							<section className={styles.navbarLinks}>
								Build
								{/* <NavbarLink to="build">Build</NavbarLink>
								<NavbarLink to="upgrades">Upgrades</NavbarLink> */}
							</section>

							{config.navbar.map((link) => (
								<IconLink key={link.href} href={link.href} title={link.title}>
									{link.icon && Icons[link.icon]}
								</IconLink>
							))}

							<DownloadLink
								href={config.downloadLink.href}
								title={config.downloadLink.title}
							>
								{config.downloadLink.text}
							</DownloadLink>
						</div>
					</nav>

					<main className={styles.pageContent}>{children}</main>
				</App>
			</body>
		</html>
	);
}
