
function ewShade(count,time) {
    this._resetShade();
    this.startShade(count,time);
}
ewShade.prototype._resetShade = function () {
    this.children = $('.wrap').children('[class ^= "img-"]');
    for (let i = 0; i < this.children.length; i++) {
        let index = this.children.eq(i).index();
        this.children.eq(i).css('z-index', this.children.length - index);
    }
}
ewShade.prototype.startShade = function (count,time) {
    let _startShade =  () => {
        let firstBackground = this.children.eq(0).css("backgroundImage");
        let firstBackgroundURL = firstBackground.slice(firstBackground.indexOf("_") + 1, firstBackground.lastIndexOf('"'));
        for (let i = 0; i < count; i++) {
            this.children.eq(0).append('<div class="img-child"></div>');
        }
        this.children.eq(0).css({
            "background-image": 'url(" ")',
            "transform-style": "preserve-3d"
        });
        $('.img-child').css({
            width: 100 / count + "%"
        })
        for (let j = 0; j < count; j++) {
            $('.img-child').eq(j).css({
                "background-image": 'url("img/background_' + firstBackgroundURL + '")',
                "background-position": 100 / count * j + "% 0"
            });
        }
        $(".img-child").addClass('img-rotate');
        setTimeout(() => {
            let className = this.children.eq(0).attr('class');
            this.children.eq(0).remove();
            $(".wrap").append('<div class="' + className + '"></div>');
            this.children.eq(this.children.length - 1).css("z-index", 1);
            this._resetShade();
        }, 900)
        setTimeout(_startShade,10 * time);
    }
    _startShade();
}