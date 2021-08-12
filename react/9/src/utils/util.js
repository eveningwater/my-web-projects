export function filterClassName(names){
    const type = Object.prototype.toString.call(names).slice(8,-1).toLowerCase();
    switch(type){
        case "array":
            return names.length ? names.join(" ") : "";
        case "object":
            const keys = Object.keys(names);
            let newClass = "";
            return keys.length ? keys.forEach(key => newClass += names[key] + " ") : "";
        case "string":
            return names;
        case "number":
            return names.toString();
        default:
            return "";
    }
}