export const globalData = {
  en: {
    documentTitle: "insect-catch-game",
    firstTitle: "Catch The Insect",
    playText: "Play Game",
    secondTitle: 'What is your "favorite" insect?',
    insectNameList: ["Fly", "Mosquito", "Spider", "Roach"],
    countTime: "Time:",
    score: "Score:",
    title:"Kind tips",
    message:
      "Tell you a bad news, will you be angry? Actually you are playing a game that never ends!!",
    continueText: "Continue Play",
    restartPlayText: "Restart Play",
    tabList: ["en", "zh"],
  },
  zh: {
    documentTitle: "捉虫小游戏",
    firstTitle: "捉虫",
    playText: "玩游戏",
    secondTitle: '你"最喜欢"的昆虫是什么?',
    insectNameList: ["苍蝇", "蚊子", "蜘蛛", "蟑螂"],
    countTime: "时间:",
    score: "得分:",
    title:"温馨提示",
    message:
      "告诉你一个不好的消息，你会不会生气呢?其实你在玩一个永远都不结束的游戏!!",
    continueText: "继续玩",
    restartPlayText: "重新玩",
    tabList: ["英文", "中文"],
  },
};
export const insectNameList = [
  { name: "fly" },
  { name: "mosquito" },
  { name: "spider" },
  { name: "roach" },
];
export type GlobalDataType = typeof globalData;
export type GlobalDataKey = keyof GlobalDataType;
export const IMAGE_URL =
  "https://eveningwater.com/my-web-projects/js/108/images/";
