
import { Component } from 'vue';

const components:Record<string,{ default: Component}> = import.meta.glob('@/views/*.vue',{ eager:true });

const filterComponents:Record<string,Component> = {};

Object.keys(components).forEach(key => {
    const newKey = key.slice(key.lastIndexOf('/') + 1,key.lastIndexOf('.'));
    filterComponents[newKey] = components[key]?.default
})

export const keys = Object.keys(filterComponents)

export default filterComponents