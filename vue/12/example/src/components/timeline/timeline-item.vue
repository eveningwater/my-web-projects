<template>
    <div class="timeline-item">
        <div class="timeline-item-tail"></div>
        <div class="timeline-item-node" 
            v-if="!$slots.dot"
            :class="[
                `timeline-item-node-${ nodeType }`,
                `timeline-item-node-${ nodeSize }`
            ]"
            :style="{ backgroundColor:nodeColor }"
        ></div>
        <div class="timeline-item-node" v-if="$slots.dot"><slot name="dot"></slot></div>
        <div class="timeline-item-wrapper">
            <div class="timeline-item-stamp" 
                :class="'is-'+timestampPlacement" 
                v-if="showTimestamp && timestampPlacement === 'top'">
                {{ timestamp }}
            </div>
            <div class="timelin-item-content"><slot></slot></div>
            <div class="timeline-item-stamp" 
                :class="'is-'+timestampPlacement" 
                v-if="showTimestamp && timestampPlacement === 'bottom'">
                {{ timestamp }}
            </div>
        </div>
    </div>
</template>
<script>
import { oneOf } from '../../utils/util'
export default {
    name:"timeline-item",
    inject:['timeline'],
    props:{
        timestamp:String,
        showTimestamp:{
            type:Boolean,
            default:false
        },
        timestampPlacement:{
            type:String,
            default:'bottom',
            validator:(value) => {
                return oneOf(['top','bottom'],value,'bottom');
            }
        },
        nodeColor:String,
        nodeSize:{
            type:String,
            default:'normal',
            validator:(value) => {
                return oneOf(['normal','large'],value,'normal');
            }
        },
        nodeType:{
            type:String,
            default:'default',
            validator:(value) => {
                return oneOf(['default','info','primary','success','warning','error'],value,'default');
            }
        }
    }
}
</script>