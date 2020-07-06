var swiper = new Swiper('.content', {
    //这里配置的值有:"slide","fade","flip",""和"","cube"
    //配置一个分页符
    pagination: '.swiper-pagination',
    effect: 'cube',
    grabCursor: true,
    fade: {
        crossFade: false
    },
    flip: {
        slideShadows: true,
        limitRotation: true
    },
    coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
    },
    cube: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94
    }
})