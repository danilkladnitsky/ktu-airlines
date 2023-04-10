const url = require('url');

export const getVkDisplayName = (link: string): string | false => {
    try {
        const urlConfig = url.parse(link);
        return urlConfig.pathname.replace("/", "");
    } catch (err) {
        return false;
    }

}