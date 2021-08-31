import React from "react";
export function isString(value){
    return typeof value === "string";
}
export function isClassComponent(component) {
    return typeof component === 'function' && !!component.prototype.isReactComponent;
}

export function isFunctionComponent(component) {
    return typeof component === 'function' && String(component).indexOf('return React.createElement') > -1;
}

export function isReactComponent(component) {
    return isClassComponent(component) || isFunctionComponent(component);
}

export function isElement(element) {
    return React.isValidElement(element);
}

export function isDOMTypeElement(element) {
    return isElement(element) && typeof element.type === 'string';
}

export function isCompositeTypeElement(element) {
    return isElement(element) && typeof element.type === 'function';
}