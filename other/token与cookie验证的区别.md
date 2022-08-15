http 是无状态的， 为了授权验证，服务器需要验证每个客户端发送的请求。验证方式有2种,即token验证和cookie验证。

1. token验证

一个服务器的请求通常使用token来验证，这意味着需要设置特定的http请求头，然后就可以发送任意的http请求到服务端，例如post请求。

token验证的优点:

* 只能验证授权过的请求，而cookie是可以为每个请求都携带cookie授权。
* 对xsrf免疫。xsrf的示例如: 我会在电子邮件中向您发送一个看起来像 `<img src="http://bank.example?withdraw=1000&to=myself" />` 的链接，如果您已登录通过 cookie 对 bank.example 进行身份验证，而 bank.example 没有任何 XSRF 保护手段，我将从您的帐户中提取资金，因为您的浏览器将触发对该 url 的授权 GET 请求。）注意您可以使用基于 cookie 的身份验证来执行防伪措施 - 但您必须实施这些措施。
* 绑定多个域名，而cookie只能绑定单个域名。在域 foo.example 上创建的 cookie 无法被域 bar.example 读取，而token可以发送到任何域。这对于使用多个需要授权的服务的单页应用程序特别有用——因此我可以在域 myapp.example 上有一个 Web 应用程序，它可以向 myservice1.example 和 myservice2.example 发出授权的客户端请求。


token验证的缺点

* 必须要将token存储到某一个地方，然而cookie是开箱即用的存储的，token通常我们可以选择存储在localStorage或者是sessionStorage中。
* 对于下载文件的请求只会对授权用户有效，因此需要使用File API,而对于cookie的身份验证，只需要相同的验证请求即可。

2. cookie验证

对服务器的验证始终授权cookie验证登录。

cookie验证的优点:

* cookie可以标记为`http-only`,即只能是http请求，这可以使得它们无法在客户端被读取，这更适合xss攻击的保护。
* 开箱即用，不必在客户端实现任何的代码。

缺点:

* 绑定到单个域名，如果要向多个服务发送请求的单页应用程序，可能会需要额外增加别的操作，例如反向代理，因此也容易受到xsrf的攻击，也就是说必须要实施额外的措施来保护站点不会被跨站点请求伪造而攻击。
* 每一个请求都可以发送出去，即使是不需要身份验证的请求。

总的说来，token有更好的灵活性，因为没有绑定单个域名，当然token的缺点就是必须自己要在客户端做一些额外的编码。

https://stackoverflow.com/questions/17000835/token-authentication-vs-cookies

