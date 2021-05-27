import NewsList from "./component/news-list";
import Tab from "./component/tab";
import { getNewsList, getTabs } from "./request";
import "./style/reset.less";
import { decoratorThrottle } from "./util";

class App {
    constructor(root) {
        // 根容器元素
        this.root = root;
        this.init();
        this.newsData = [];
    }
    init() {
        this.requestData();
        // 这里主要初始化一个用于装载新闻列表的容器元素
        const newsContainer = document.createElement('div');
        newsContainer.classList.add("news-card-container");
        this.root.appendChild(newsContainer);
        this.container = newsContainer;
        // 无限滚动
        this.onScrollListener(this.container);
    }
    async requestData() {
        // tabs
        const tabsRequest = await getTabs();
        // news
        const newsRequest = await getNewsList();

        const tabs = await tabsRequest;
        const news = await newsRequest;
        this.newsData = news.data;
        // console.log(tabs);

        this.renderTab(tabs);
        this.renderNewsList(this.newsData);
    }
    onScrollListener(scrollElement) {
        // 差异值
        const DISTANCE = 10;
        scrollElement.addEventListener('scroll', () => {
           const { scrollTop,scrollHeight,clientHeight } = scrollElement;
            // console.log(scrollTop,scrollHeight,clientHeight);
            // 当实际滚动值与可见区域相加大于滚动高度减去差异值，则加载列表
            if (scrollTop + clientHeight > scrollHeight - DISTANCE) {
                this.appendNewsList();
            }
        })
    }
    /**
     * 渲染导航
     * @param {*} data 
     */
    renderTab(data) {
        const tab = new Tab({ data });
        tab.mount(this.root);
        //    console.log(tab)
        tab.addHandler();
    }
    /**
     * 渲染新闻列表
     * @param {*} data 
     */
    renderNewsList(data) {
        const news = new NewsList(data);
        news.mount(this.container);
        news.addHandler();
    }
    // 装饰器函数
    @decoratorThrottle()
    async appendNewsList() {
        const newsList = await getNewsList();
        const newData = this.newsData.concat(newsList.data);
        this.renderNewsList(newData);
    }
}

new App(document.body);