<script>
import { oneOf } from '../../utils/util'
export default {
    name:"timeline",
    provide(){
        return {
            timeline:this
        }
    },
    props:{
        reverse:{
            type:Boolean,
            default:false
        },
        direction:{
            type:String,
            default:'vertical',
            validator:(value) => {
                return oneOf(['vertical','horizontal'],value,'vertical');
            }
        }
    },
    render(){
        const reverse = this.reverse;
        const direction = this.direction;
        const classes = {
            'is-reverse':reverse,
            ['is-'+direction]:true,
            'timeline':true
        }

        let slots = this.$slots.default || [];
        if(reverse)slots = slots.reverse();

        return (<div class={ classes }>{ slots }</div>);
    }
}
</script>
<style lang="less">
.timeline {
        margin: 0;
        font-size: 14px;
        .timeline-item {
            position: relative;
            padding-bottom: 20px;
            .timeline-item-tail {
                position: absolute;
            }
            .timeline-item-node {
                border-radius: 50%;
                position: absolute;
                background: #e3e4d5;
                &.timeline-item-node-normal {
                    width: 12px;
                    height: 12px;
                    left: -9px;
                }
                &.timeline-item-node-large {
                    width: 14px;
                    height: 14px;
                    left: -10px;
                }
                &.timeline-item-node-info {
                    background-color: #44444f;
                }
                &.timeline-item-node-primary {
                    background-color: #2396ef;
                }
                &.timeline-item-node-success {
                    background-color: #3dff55;
                }
                &.timeline-item-node-warning {
                    background-color: #ffda23;
                }
                &.timeline-item-node-error {
                    background-color: #f57a7a;
                }
            }
            .timeline-item-wrapper {
                position: relative;
                .timeline-item-content {
                    color:#535353;
                    font-size: 13px;
                }
                .timeline-item-timestamp {
                    color: #939490;
                    font-size: 12px;
                    &.is-top {
                        margin-bottom: 5px;
                        padding-top: 3px;
                    }
                    &.is-bottom {
                        margin-top: 5px;
                    }
                }
            }
            &:last-child .timeline-item-tail {
                display: none;
            }
        }
        &.is-vertical {
            .timeline-item-tail {
                border-left: 2px solid #e3e4d5;
                left: -4px;
                height: 100%;
            }
            .timeline-item-node {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .timeline-item-wrapper {
                padding-left: 28px;
                top: -3px;
            }
        }
        &.is-horizontal {
            &::after {
                content:" ";
                display: block;
                height: 0;
                visibility: hidden;
                clear: both;
            }
            .timeline-item {
                float: left;
            }
            .timeline-item-tail {
                width: 100%;
                border-top: 2px solid #e3e4d5;
                top: 5px;
            }
            .timeline-item-wrapper {
                padding-top: 28px;
                padding-left: 10px;
                left: -18px;
            }
        }
    }
</style>