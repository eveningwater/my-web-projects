const $ = (v,el = document) => el.getElementById(v);
function tog_class(id, cl) {
    var elem = $(id);
    if (elem.classList.contains(cl)) {
        elem.classList.remove(cl);
    } else {
        elem.classList.add(cl);
    }
}
function add_class(id, cl) {
    var elem = $(id);
    if (!elem.classList.contains(cl)) {
        elem.classList.add(cl);
    }
}
function rem_class(id, cl) {
    var elem = $(id);
    if (elem.classList.contains(cl)) {
        elem.classList.remove(cl);
    }
}
function tog_elem(i, elem) {
    $("tile_" + i).onclick = function () {
        tog_class("tile_" + i, "tile_open");
        setTimeout(function () {
            tog_class("tile_icon_" + i, "fa-" + elem);
        }, 0);
    };
}
function add_elem(i, elem) {
    $("tile_" + i).onclick = function () {
        window.openTile = i;
        add_class("tile_" + i, "tile_open");
        add_class("tile_icon_" + i, "fa-" + elem);
        if (window.tileCount == 1) {
            if (i != window.lastTile && window.A[i] == window.A[window.lastTile]) {
                var first = $("tile_" + i); 
                var second = $("tile_" + window.lastTile); 
                first.classList.add("tile_closed"); 
                second.classList.add("tile_closed");
                first.onclick = ""; 
                second.onclick = ""; 
                window.pairCount++; 
                if (window.pairCount == 8) {
                    add_class("overlay_win", "overlay_win_open");
                }
            } else {
                rem_delay(window.openTile, window.lastTile);
            }
            window.tileCount = 0;
        } else {
            window.lastTile = i;
            window.tileCount++;
        } 
    };
}
function rem_select(i) {
    rem_class("tile_" + i, "tile_open");
    rem_class("tile_icon_" + i, "fa-eye");
    rem_class("tile_icon_" + i, "fa-star");
    rem_class("tile_icon_" + i, "fa-heart");
    rem_class("tile_icon_" + i, "fa-diamond");
}
function rem_delay(first, second) {
    setTimeout(function () {
        rem_select(first);
        rem_select(second); 
    }, 1000);
}
function shuffle() {
    var j;
    var t;
    var A = [
        "eye",
        "eye",
        "eye",
        "eye",
        "star",
        "star",
        "star",
        "star",
        "heart",
        "heart",
        "heart",
        "heart",
        "diamond",
        "diamond",
        "diamond",
        "diamond"
    ];
    for (i = 0; i < 16; i++) {
        j = Math.floor(Math.random() * (i + 1));
        t = A[i];
        A[i] = A[j];
        A[j] = t;
    }
    // console.log(A);
    return A;
}
function reset_tiles() {
    for (i = 0; i < 16; i++) {
        rem_select(i);
        add_elem(i, A[i]);
        rem_class("tile_" + i, "tile_closed");
    }
}
function reset() {
    window.A = shuffle();
    window.pairCount = 0;
    window.tileCount = 0;
    window.lastTile = null;
    window.openTile = null;
    reset_tiles();
    rem_class("overlay_win", "overlay_win_open");
}
var A = shuffle();
var pairCount = 0;
var tileCount = 0;
var lastTile = null;
var openTile = null;
for (i = 0; i < 16; i++) {
    add_elem(i, A[i]);
}
$("overlay_win").onclick = function () {
    reset();
};