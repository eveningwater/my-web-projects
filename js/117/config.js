
const PROXY = "https://www.eveningwater.com/sweet-language-proxy.php";

// 通过代理请求的 action 参数
// qinghua = lovelive 土味情话
// twqh    = zxki 土味情话
// hitokoto = 一言
const ACTION = "qinghua";

// 最终请求 URL
const API = PROXY + "?action=" + ACTION;
