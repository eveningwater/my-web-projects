/**
 * 正则判定功能记录
 * @createDate 2022-01-28 11:06 (星期五)
 * @directory D:\project\mytest\regexp-assert\js
**/

// 原始HTML字符串
const formStr = `<main class="form-group">
  <!-- 用户注册 -->
  <form action="" autocomplete="on" name="userInfo" novalidate>
    <!-- 必填部分 -->
    <div class="form-line">
      <label>账号:</label>
      <input name="username" type="text" placeholder="请使用手机或邮箱地址" />
    </div>
    <div class="form-line">
      <label>昵称:</label>
      <input name="nickname" type="text" placeholder="请输入的您的称呼" />
    </div>
    <div class="form-line">
      <label>密码:</label>
      <input name="userPwd" type="password" placeholder="密码至少要求8位，可以由英文、数字和字符组成" />
    </div>
    <div class="form-line">
      <label>确认密码:</label>
      <input name="userRePwd" type="password" placeholder="请再次输入密码" />
    </div>
    <!-- 非必填部分 -->
    <div class="form-line">
      <label>身份证号:</label>
      <input name="idCardNum" type="text" placeholder="请输入您的18位身份证号" />
    </div>
    <div class="form-line">
      <label>公司名称:</label>
      <input name="companyName" type="text" placeholder="请输入您的公司全称" />
    </div>
    <div class="form-line">
      <label>公司地址:</label>
      <input name="companyAddress" type="text" placeholder="请输入您的公司地址" />
    </div>
    <div class="form-line">
      <label>家庭住址:</label>
      <input name="HomeAddress" type="text" placeholder="请输入您的家庭地址" />
    </div>
    <div class="form-line btn-group">
      <button name="btnSubmit" type="submit">提交</button>
    </div>
  </form>
</main>`;

console.time('替换耗时');

// 调用初始化代码显示面板函数
initCodePanel(document.querySelector('.code-html'), formStr);

/**
 * 初始化代码显示面板函数
 * @param {Element} codePanel 代码容器
 * @param {String} codeString 代码字符串（ES6模版字符串）
 */
function initCodePanel(codePanel, codeString) {
  // 加工后的HTML字符串
  let htmlCodeStr;

  const charSign = {
    // 左标签括号
    leftBrackets: '__LEFT_BRACKETS__',
    // 左标签括号（带结束符）
    leftBracketsHasEnd: '__LEFT_BRACKETS_HASEND__',
    // 右侧标签括号
    rightBrackets: '__RIGHT_BRACKETS__',
    // 右侧标签括号（带结束符）
    rightBracketsHasEnd: '__RIGHT_BRACKETS_HASEND__',
  }

  // 标记替换法 -- 标签括号
  htmlCodeStr = codeString.replace(/(<)(?!\/|!--)(?=.*?>)/g, charSign.leftBrackets);
  htmlCodeStr = htmlCodeStr.replace(/(<\/)(?=.*?>)/g, charSign.leftBracketsHasEnd);
  htmlCodeStr = htmlCodeStr.replace(/(?<=(__LEFT_BRACKETS__|__LEFT_BRACKETS_HASEND__).*?)(?!--)>/g, charSign.rightBrackets);
  htmlCodeStr = htmlCodeStr.replace(/\/__RIGHT_BRACKETS__/g, charSign.rightBracketsHasEnd);

  // 标记替换法 -- 注释
  htmlCodeStr = htmlCodeStr.replace(
    /<!--.*?-->/g,
    (prevChar) => {
      let commnet = prevChar.replace(/</, '&lt;');
      commnet.replace(/>/, '&gt;');
      return `__##${commnet}##__`
    }
  );

  // 标记替换法 -- 标签名
  htmlCodeStr = htmlCodeStr.replace(
    /(?<=(__LEFT_BRACKETS__|__LEFT_BRACKETS_HASEND__))(.*?)(?=(__RIGHT_BRACKETS__|\s))/g,
    prevChar => `__#${prevChar}#__`
  );

  // 标记替换法 -- 属性名
  htmlCodeStr = htmlCodeStr.replace(
    /(?<=\s)[A-Za-z\-]+?(?=(=|\s|__RIGHT_BRACKETS__))/g,
    prevChar => `__\$${prevChar}\$__`
  );

  // 标记替换法 -- 属性值
  htmlCodeStr = htmlCodeStr.replace(
    /(?<=\=)".*?"(?=)/g,
    prevChar => `__%${prevChar}%__`
  );
  /**
   * 正则规则函数
   * @param {RegExp-String} char 正则字符串
   * @param {String} mod 修饰符字符
   */
  const regx = (char, mod="g") => new RegExp(char, mod);

  // 将标记替换为含有样式的标签
  // 标签括号替换部分
  htmlCodeStr = htmlCodeStr.replace(regx(charSign.leftBrackets), '<span class="code-brackets">&lt;</span>');
  htmlCodeStr = htmlCodeStr.replace(regx(charSign.leftBracketsHasEnd), '<span class="code-brackets">&lt;\/</span>');
  htmlCodeStr = htmlCodeStr.replace(regx(charSign.rightBrackets), '<span class="code-brackets">&gt;</span>');
  htmlCodeStr = htmlCodeStr.replace(regx(charSign.rightBracketsHasEnd), '<span class="code-brackets">\/&gt;</span>');
  // 注释替换部分
  htmlCodeStr = htmlCodeStr.replace(/__##.*?##__/g, (prevChar) => {
    const tagName = prevChar.replace(/(__##|##__)/g, '');
    return `<span class="code-comment">${tagName}</span>`
  });
  // 标签名替换部分
  htmlCodeStr = htmlCodeStr.replace(/__#\w*?#__/g, (prevChar) => {
    const tagName = prevChar.replace(/(__#|#__)/g, '');
    return `<span class="code-tagname">${tagName}</span>`
  });
  // 属性名替换部分
  htmlCodeStr = htmlCodeStr.replace(/__\$\w*?\$__/g, (prevChar) => {
    const attrName = prevChar.replace(/(__\$|\$__)/g, '');
    return `<span class="code-attribute">${attrName}</span>`
  });
  // 属性值替换部分
  htmlCodeStr = htmlCodeStr.replace(/__%.*?%__/g, (prevChar) => {
    const attrVal = prevChar.replace(/(__%|%__)/g, '');
    return `<span class="code-value">${attrVal}</span>`
  });

  const formCode = document.getElementById('formCode');
  formCode.innerHTML = htmlCodeStr;

  // 生成行号容器
  const lineNumContainer = document.createElement('div');
  lineNumContainer.className = 'line-num-container';
  // 获取行数
  const lineLength = codeString.match(/\n/g).length + 1;
  for(let i = 1; i <= lineLength; i++) {
    const lineSpan = document.createElement('span');
    lineSpan.textContent = i;
    lineNumContainer.append(lineSpan);
  }
  codePanel.append(lineNumContainer);
  // 获取行号容器的宽度
  const lineNumWidth = lineNumContainer.offsetWidth;
  // 设置代码容器的左内间距
  codePanel.style.paddingLeft = lineNumWidth + 12 + 'px';
}

console.timeEnd('替换耗时');