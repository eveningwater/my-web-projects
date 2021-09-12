export function createUUID(){
    return Math.floor(Math.random() * 10000) + '-' + Date.now().toString().slice(0, 4) + '-' + Math.floor(Math.random() * 10000);
}
export function getNotesData(key = "notes"){
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        return [];
    }
}
export function setNotesData(key,value){
    return localStorage.setItem(key,JSON.stringify(value));
}