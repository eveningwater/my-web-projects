import components from './install';
import Vue from 'vue';

if(typeof window.Vue !== 'undefined' && window.Vue){
    components.Timeline.install(window.Vue);
    components.TimelineItem.install(window.Vue);
}else{
    components.Timeline.install(Vue);
    components.TimelineItem.install(Vue);
}