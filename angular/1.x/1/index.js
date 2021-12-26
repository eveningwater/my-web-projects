const app = angular.module('myApp', []);
function clickOutSideHandler(el, notEl, listener) {
    const rect = el.getBoundingClientRect();
    const notElRect = notEl.getBoundingClientRect();
    const downHandler = (event) => {
        const { target } = event;
        const targetRect = target.getBoundingClientRect();
        if (!target || typeof listener !== "function") {
            return;
        }
        if (notEl && targetRect.x >= notElRect.x && targetRect.y >= notElRect.y && targetRect.width <= notElRect.width && targetRect.height <= notElRect.height) {
            return;
        }
        if (targetRect.x >= rect.x && targetRect.y >= rect.y && targetRect.width <= rect.width && targetRect.height <= rect.height) {
            return;
        }
        listener();
        setTimeout(() => {
            document.removeEventListener("mousedown", downHandler, false);
            document.addEventListener("mousedown", downHandler, false);
        }, 0)
    }
    document.addEventListener("mousedown", downHandler, false);
}
app.directive('clickOutside', ["$document", function () {
    return {
        scope: {
            updateOpen: "&"
        },
        link: function ($scope, $el, $attrs) {
            clickOutSideHandler($el[0], $el[0].previousElementSibling, () => {
                $scope.updateOpen();
            })
        }
    }
}]);
app.controller("myCtrl", ["$scope", function ($scope) {
    $scope.open = true;
    $scope.selectList = [];
    $scope.selectValue = "";
    for (let i = 0; i < 20; i++) {
        $scope.selectList.push({ text: "测试" + (i + 1) });
    }
    $scope.onSelect = function (item) {
        $scope.selectValue = item.text;
        $scope.open = false;
    }
    $scope["updateOpenHandler"] = function () {
        $scope.$apply(() => {
            $scope.open = false;
        })
    }
}])