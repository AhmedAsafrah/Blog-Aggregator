
import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedUrl: string): Promise<RSSFeed> {
  const response = await fetch(feedUrl, {
    headers: { "User-Agent": "gator" },
  });
    if (!response.ok) {
        throw new Error("Failed to fetch feed: " + response.statusText);
    }
    const xml = await response.text();
    const parser = new XMLParser();
    const result = parser.parse(xml);
    const channel = result.rss?.channel;
    if (!channel) {
        throw new Error("Invalid RSS feed format");
    }

    if (!channel.item) {
        channel.item = [];
    } else if (!Array.isArray(channel.item)) {
        channel.item = [channel.item];
    }

    const cannelMetadata = {
        title: channel.title,
        link: channel.link,
        description: channel.description,
    };

    const items: RSSItem[]   = channel.item.filter((item: any) => item.title && item.link && item.description && item.pubDate).map((item: any) => ({
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate,
    }));

    return {
        channel: {
            ...cannelMetadata,
            item: items,
        },
    };

}
