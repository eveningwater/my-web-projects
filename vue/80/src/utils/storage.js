export function saveLocalStorage(key,data){
    return localStorage.setItem(key,JSON.stringify(data));
}
export function getLocalStorage(key){
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        return null;
    }
}
export function deleteLocalStorage(key){
    return localStorage.removeItem(key);
}