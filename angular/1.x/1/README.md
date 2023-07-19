# 一个简易版本的下拉框组件(angular.js 1.x)

ng-app 指令定义一个 AngularJS 应用程序。如下:

```html
<body ng-app="myApp">
  .....
</body>
```

ng-controller 指明了一个控制器。如下:

```html
<body ng-controller="myCtrl">
  .....
</body>
```

angular.module 定义一个应用，如下:

```js
const app = angular.module("myApp", []);
// 第一个参数值与ng-app绑定的值保持一致，也就是说此时ng-app="myApp"
```
