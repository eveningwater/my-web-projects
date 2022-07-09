const BASE_URL = "https://www.eveningwater.com/my-web-projects/jQuery/7/img/";
const createWrap = (wrap) => {
  return new Promise((resolve) => {
    for (let i = 0; i < 10; i++) {
      const item = document.createElement("div");
      item.className = `wrap-item wrap-item-${i + 1}`;
      item.innerHTML = `<img class='wrap-item-img' src="${
        BASE_URL + (i + 1)
      }.jpg">`;
      wrap.appendChild(item);
    }
    resolve();
  });
};
