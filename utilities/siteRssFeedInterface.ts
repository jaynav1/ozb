import config from '../config.json';
import { XMLParser } from 'fast-xml-parser';


// const parser: Parser<CustomItem> = new Parser({
//     customFields: {
//       item: ['bar']
//     }
// });

const options = {
    ignoreAttributes: false,
    attributeNamePrefix : "@_",
    unpairedTags: ['ozb:meta'],
    cdataPropName: "content"
};

const parser = new XMLParser(options);


function cleanFeed(feed: Array<Object>) {
    return feed.map(item => {
        const cleanItem = {
            message: (item['ozb:title-msg'] ? item['ozb:title-msg'] : null),
            title: item['title'],
            description: item['description']['content'].split('</div>',2)[1],
            info: item['ozb:meta'],
            author: item['dc:creator'],
            date: item['pubDate'],
        }
        return cleanItem;
    });

    // console.log(feed);
    // feed.forEach(item => {
    //     console.log(item['title'])
    //     console.log(item['description']['content'])
    //     console.log(item['dc:creator'])
    //     console.log(item['ozb:meta'])
    //     console.log(item['ozb:title-msg'])
    //     console.log(item['pubDate'])
    // });
}

export async function getCategoryFeed(feedOptions: object) {
    if (Object.values(config.CATGORIES).includes(feedOptions.category)) {
        var url = `${config.CATEGORY_URL}${feedOptions.category}/${config.SUFFIX}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            const feed = parser.parse(data);
            return cleanFeed(feed['rss']['channel']['item']);
        } catch (error) {
            console.log(error);
        }
    }
}

export async function getFrontPageFeed(feedOptions: object) {
    var url = `${config.BASE_URL}/${config.SUFFIX}${config.SEARCH_OPTIONS.page}${feedOptions.page}`;
    try {
        const response = await fetch(url);
        const data = await response.text();
        const feed = parser.parse(data);
        return cleanFeed(feed['rss']['channel']['item']);
    } catch (error) {
        console.log(error);
    }
}