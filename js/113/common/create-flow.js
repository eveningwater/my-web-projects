const createFlow = (wrap,cols = 0) => {
  let divList = Array.from(wrap.children);
  let pageW = document.documentElement.clientWidth;
  let divW = cols > 0 ? parseInt((pageW - (cols + 1) * 10) / cols) : divList[0].clientWidth;
  cols = cols > 0 ? cols : Math.floor(pageW / divW);
  let arrH = [];
  divList.forEach((item, index) => {
    if(cols > 0){
      item.style.width = `calc(100% / ${cols} - 20px / ${cols})`;
    }
    if (index < cols) {
      arrH.push(item.clientHeight);
      item.style.left = index * divW + index * 10 + "px";
    }
  });
  for (let i = cols; i < divList.length; i++) {
    let minH = Math.min.apply(null, arrH);
    let idx_min = arrH.indexOf(minH);
    divList[i].style.left = divList[idx_min].style.left;
    // 10为间隙距离
    divList[i].style.top = minH + 10 + "px";
    arrH[idx_min] = minH + divList[i].clientHeight + 10;
  }
};
