interface NavbarLinkConfig {
  href: string;
  title: string;
  icon?: string;
}

export interface Config {
  navbar: NavbarLinkConfig[];
  downloadLink: NavbarLinkConfig & { text: string };
}