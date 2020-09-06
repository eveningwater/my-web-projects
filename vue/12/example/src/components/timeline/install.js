import Timeline from './timeline.vue';
import TimelineItem from './timeline-item.vue';

Timeline.install = function(Vue){
    Vue.component(Timeline.name,Timeline);
}
TimelineItem.install = function(Vue){
    Vue.component(TimelineItem.name,TimelineItem);
}

export default {
    Timeline,
    TimelineItem
}