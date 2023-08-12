import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { YoutubeIcon } from "./YoutubeIcon";
import { RedditIcon } from "./RedditIcon";

export const Icons: Record<string, React.ReactNode> = {
	youtube: <YoutubeIcon />,
	reddit: <RedditIcon />,
	github: <GitHubLogoIcon />,
	twitter: <TwitterLogoIcon />,
};
