export const tabList = [
    {
        key:"1",
        text:"航海王",
        icon:"home"
    },
    {
        key:"2",
        text:"犬夜叉",
        icon:"box"
    },
    {
        key:"3",
        text:"火影忍者",
        icon:"book-open"
    },
    {
        key:"4",
        text:"名侦探柯南",
        icon:"users"
    }
];

export type TabListType = typeof tabList;
export type TabListKey = Record<keyof TabListType[number],string>;

export const IMAGE_URL = 'https://eveningwater.com/my-web-projects/js/95/images/';

export const carouselList = [
    {
        key:"1",
        src:IMAGE_URL + '1.png',
        alt:tabList[0].text
    },
    {
        key:"2",
        src:IMAGE_URL + '2.png',
        alt:tabList[1].text
    },
    {
        key:"3",
        src:IMAGE_URL + '3.png',
        alt:tabList[2].text
    },
    {
        key:"4",
        src:IMAGE_URL + '4.png',
        alt:tabList[3].text
    }
];

export type CarouselListType = typeof carouselList;
export type CarouselListKey = Record<keyof CarouselListType[number],string>;