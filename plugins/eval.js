// the function like eval method by new Function
const evalLike = v => new Function(`return ${v}`)();
// apply as follow:
// evalLike("console.log('this is eval method!')") //this is eval method