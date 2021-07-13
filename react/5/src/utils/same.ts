export function computeSameAnswer(correct:number = 0,userAnswer:string,correctAnswers:string [],index:number):number {
    if(userAnswer === correctAnswers[index - 1] && correct <= 25){
        correct++;
    }
    return correct;
}