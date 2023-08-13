import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { App } from "@/components/App/App";
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import "normalize.css";
import "./global.scss";
import styles from "./layout.module.scss";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

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
			<body className={inter.className}>
				<App>
					<Navbar />

					<main className={styles.pageContent}>{children}</main>

					<Footer />
				</App>
			</body>
		</html>
	);
}
