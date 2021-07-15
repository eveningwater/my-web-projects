export interface QuestionArray {
    question:string,
    answer:string [],
    correct:string
}
interface ObjectDetail {
    output:string,
    answer:string,
    successMsg:string,
    errorMsg:string,
    detail:string [],
    tabs:string [],
    title:string,
    startContent:string,
    endContent:string,
    startBtn:string,
    endBtn:string
}
export interface parseObjectType {
    [index:string]:ObjectDetail,
    en:ObjectDetail,
    zh:ObjectDetail
}
export const questions:QuestionArray [] = [
    {
        question:"true + false",
        answer:[
            "\"truefalse\"",
            "1",
            "NaN",
            "SyntaxError"
        ],
        correct:"1"
    },
    {
        question:"[,,,].length",
        answer:[
            "0",
            "3",
            "4",
            "SyntaxError"
        ],
        correct:"3"
    },
    {
        question:"[1, 2, 3] + [4, 5, 6]",
        answer:[
            "\"123456\"",
            "\"1,2,34,5,6\"",
            "\"1,2,3,4,5,6\"",
            "NaN"
        ],
        correct:"\"1,2,34,5,6\""
    },
    {
        question:"0.2 + 0.1 === 0.3",
        answer:[
            "true",
            "false",
            "NaN",
            "SyntaxError"
        ],
        correct:"false"
    },
    {
        question:"10,2",
        answer:[
            "10.2",
            "10",
            "2",
            "20"
        ],
        correct:"2"
    },
    {
        question:"!!\"\"",
        answer:[
            "true",
            "false",
            "undefined",
            "SyntaxError"
        ],
        correct:"false"
    },
    {
        question:"+!![]",
        answer:[
            "true",
            "false",
            "0",
            "1"
        ],
        correct:"1"
    },
    {
        question:"!!!true",
        answer:[
            "true",
            "false",
            "0",
            "SyntaxError"
        ],
        correct:"false"
    },
    {
        question:"true === \"true\"",
        answer:[
            "true",
            "false",
            "undefined",
            "SyntaxError"
        ],
        correct:"false"
    },
    {
        question:"010 - 03",
        answer:[
            "7",
            "5",
            "3",
            "NaN"
        ],
        correct:"5"
    },
    {
        question:"\"\"- - \"\"",
        answer:[
            "\"\"",
            "0",
            "NaN",
            "SyntaxError"
        ],
        correct:"0"
    },
    {
        question:"null + 0",
        answer:[
            "0",
            "\"null0\"",
            "NaN",
            "TypeError"
        ],
        correct:"0"
    },
    {
        question:"0/0",
        answer:[
            "0",
            "Infinity",
            "NaN",
            "SyntaxError"
        ],
        correct:"NaN"
    },
    {
        question:"1/0 > Math.pow(10, 1000)",
        answer:[
            "true",
            "false",
            "NaN",
            "SyntaxError"
        ],
        correct:"false"
    },
    {
        question:"true++",
        answer:[
            "2",
            "undefined",
            "NaN",
            "SyntaxError"
        ],
        correct:"SyntaxError"
    },
    {
        question:"\"\" - 1",
        answer:[
            "\"1\"",
            "\"-1\"",
            "-1",
            "NaN"
        ],
        correct:"-1"
    },
    {
        question:"(null - 0) + \"0\"",
        answer:[
            "\"null0\"",
            "\"00\"",
            "0",
            "NaN"
        ],
        correct:"\"00\""
    },
    {
        question:"true + (\"true\" - 0)",
        answer:[
            "1",
            "2",
            "NaN",
            "SyntaxError"
        ],
        correct:"NaN"
    },
    {
        question:"!5 + !5",
        answer:[
            "0",
            "10",
            "25",
            "NaN"
        ],
        correct:"0"
    },
    {
        question:"[] + []",
        answer:[
            "[]",
            "[,]",
            "\"\"",
            "NaN"
        ],
        correct:"\"\""
    },
    {
        question:"NaN === NaN",
        answer:[
            "true",
            "false",
            "TypeError",
            "SyntaxError"
        ],
        correct:"false"
    },
    {
        question:"NaN++",
        answer:[
            "NaN",
            "undefined",
            "TypeError",
            "SyntaxError"
        ],
        correct:"NaN"
    },
    {
        question:"undefined + false",
        answer:[
            "\"undefinedfalse\"",
            "0",
            "NaN",
            "SyntaxError"
        ],
        correct:"NaN"
    },
    {
        question:"+0 === -0",
        answer:[
            "true",
            "false",
            "TypeError",
            "SyntaxError"
        ],
        correct:"true"
    },
    {
        question:"- \"\" + + \"1\" * null - [,]",
        answer:[
            "0",
            "\"0\"",
            "NaN",
            "I give up"
        ],
        correct:"0"
    },
];
export const parseObject:parseObjectType = {
    "en":{
        output:"Output",
        answer:"You answered",
        successMsg:"You got it right!",
        errorMsg:"You answered incorrectly.",
        detail:[
            `
                This question sets the tone for many of the upcoming questions. 
                All four options may sound quite reasonable for someone who does not already know the answer. 
                The short answer is that the booleans are converted to their numeric representations. 
                Learn more in the [ECMAScript Language Specification](https://262.ecma-international.org/5.1/#sec-11.6).
***Number(true); // -> 1
Number(false); // -> 0
1 + 0; // -> 1***
            `,
            `
                [,,,] outputs an array with three empty slots. The last comma is a trailing comma.
                If you don't think this is weird enough yet, then take a look at this:
***[,] + [,]; // -> ""
[] + [] === [,] + [,]; // -> true
[,,,] + [,,,]; // -> ",,,,"
([,,,] + [,,,]).length === [,,,,].length; // -> true***
                To find resources that explain the addition operator with arrays, take a look at the explanation for question 3, directly below this.
            `,
            `
                The extremely simplified answer is that the arrays are converted to strings and are then concatenated. 
                See [Denys Dovhan's explanation](https://github.com/denysdovhan/wtfjs#adding-arrays) for how this happens. 
                To learn more about this behavior, visit [this StackOverflow answer](https://stackoverflow.com/questions/9032856/what-is-the-explanation-for-these-bizarre-javascript-behaviours-mentioned-in-the) 
                for a mid-level explanation or [this blog post](https://2ality.com/2012/01/object-plus-object.html) for a more detailed one.
                Adding a trailing comma doesn't change anything, by the way:
***[1, 2, 3,] + [4, 5, 6]; // -> "1,2,34,5,6"***
                But, I suppose, if you really want to convert your arrays to comma-separated strings and combine them, you could write something stupid like this:
***[1, 2, 3] + [, 4, 5, 6]; // -> "1,2,3,4,5,6"***
                Or, even dumber, this:
***[1, 2, 3, ""] + [4, 5, 6]; // -> "1,2,3,4,5,6"***
                Probably best not to use the addition operator together with arrays, though. If you do want to combine two arrays for real, this is a better approach:
***[...[1, 2, 3], ...[4, 5, 6]];***
            `,
            `
                This is a dilemma of comparing floating-point values. 
                Instead of comparing two floating points directly, one should compare the floating points with some level of tolerance. 
                [This StackOverflow answer](https://stackoverflow.com/questions/588004/is-floating-point-math-broken) 
                explains this problem in greater detail.
***0.2 + 0.1; // -> 0.30000000000000004;
0.2 + 0.1 > 0.3; // -> true***
            `,
            `
            The [comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator) 
            simply returns the value of the last operand.
***10, 2; // -> 2
1, 2, 3, 4; // -> 4
42, "pineapple", true; // -> true***
            `,
            `
            You can add two exclamation marks before any value to get its boolean representation. 
            Usually, anything with a value is true, and anything with an "empty" value is false.
***Boolean(""); // -> false
Boolean(0); // -> false
Boolean("Pineapple"); // -> true
Boolean(42); // -> true***
            `,
            `
            In the explanation above, I mentioned that empty values are usually represented by the boolean false. 
            An empty array is an exception, however. 
            It's represented by true. 
            The plus character then converts true to its numeric representation.
***Boolean([]); // -> true
Number(true); // -> 1***
            `,
            `
            It's incredibly unusual to put three or more exclamation marks in a row, so you may not realize that it is something you can even do.
            But why stop at only three when you could write incredibly unreadable code?
***!!!!!!!!!!!!true; // -> true***
            `,
            `
            According to the rules of 
            [abstract equality comparison](https://262.ecma-international.org/11.0/#sec-abstract-equality-comparison), 
            both of these values are converted to numbers.
***Number(true); // -> 1
Number("true"); // -> NaN
1 == NaN; // -> false***
            `,
            `
            010 is treated as an octal number by JavaScript. 
            Thus, its value is in base 8. 
            [See Mozilla's explanation for octal numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#octal_numbers).
***010; // -> 8
03; // -> 3
8 - 3; // -> 5***
            You can go all out with octal numbers, if you'd like:
***01111111111111111; // -> 40210710958665***
            By the way, the number of leading zeroes doesn't matter:
***010 === 0000000010; // -> true***
            `,
            `
            These two empty strings are both converted to 0.
***Number(""); // -> 0
0 - - 0; // -> 0***
            The expression might become a bit clearer if I write it like this:
***+"" - -"";
+0 - -0;***
            Please note that, while I put the space between the minus sign and the empty string simply to attempt to confuse you, 
            the space between the minus signs themselves is important:
***- -""; // -> 0
--""; // -> SyntaxError***
            `,
            `
            Null converts to its numeric representation: 0.
***Number(null); // -> 0
0 + 0; // -> 0***
            This also means that while...
***null === false; // -> false***
            ... this is true:
***+null === +false; // -> true***
            `,
            `
            As there is no meaningful numerical answer to the equation 0/0, the output is simply NaN.
***isNaN(0/0); // -> true***
            `,
            `
            JavaScript treats both of these values as infinite, and infinity is equal to infinity. 
            [Learn more about infinities](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Infinities).
***1/0; // -> Infinity
Math.pow(10, 1000); // -> Infinity
Infinity > Infinity; // -> false***
            `,
            `
            Our first and only syntax error. 
            I put SyntaxError as an option on a lot of the questions, 
            hoping that some users would find some syntax so bizarre that it could not possibly be allowed. 
            So, I felt that I had to add at least one expression that actually does result in a SyntaxError.
            By the way, undefined++ does not result in a SyntaxError:
***1++; // -> SyntaxError
"x"++; // -> SyntaxError
undefined++; // -> NaN***
            And, of course, just to be completely clear, this is valid syntax:
***let _true = true;
_true++;
_true; // -> 2***
            `,
            `
            While the addition operator (+) is used both for numbers and strings, 
            the subtraction operator (-) has no use for strings, so JavaScript interprets this as an operation between numbers. 
            An empty string converts to 0.
***Number(""); // -> 0
0 - 1; // -> -1;***
            This would still be true even if the string had a space (or more) inside of it:
***" " - 1; // -> -1;***
            However, if we use the addition operator, then string concatenation takes priority:
***"" + 1; // -> "1";***
            `,
            `
***Number(null) - 0; // -> 0
0 + "0"; // -> "00"***
            But if the question had used only the subtraction operator, the result would have been different:
***(null - 0) - "0"; // -> 0***
            `,
            `
            You might suspect that JS is so bananas that it would convert the string literal to its boolean value and 
            then its numerical representation. It's not quite that bananas, however. 
            What actually happens is that it tries to convert the string to a number and fails.
***Number("true"); // -> NaN***
            `,
            `
            All positive numbers are represented by the boolean true. The opposite of true is false, and false converts to 0.
***Boolean(5); // -> true
!true; // -> false
Number(false); // -> 0
0 + 0; // -> 0***
            `,
            `
            This question is closely tied to question 3. 
            Again, the extremely simplified answer is that JavaScript converts the arrays to strings. 
            Scroll up to question 3 to find resources that explain this behavior.
***[].toString(); // -> ""
"" + ""; // -> ""***
            Also, like I mentioned in the explanation for question 2, these expressions are equal, due to trailing commas:
***[] + [] === [,] + [,]; // -> true***
            Even though these arrays are different, they are both converted to empty strings:
***[].length; // -> 0
[,].length; // -> 1
[].toString() === [,].toString(); // -> true***
            Of course, this is also true:
***Number([]) === Number([,]); // -> true***
            `,
            `
            This is due to a decision made by the IEEE-754 committee for a few reasons, 
            such as space efficiency and the fact that the function isNaN didn't exist at the time. 
            See [Stephen Canon's explanation](https://stackoverflow.com/questions/1565164/what-is-the-rationale-for-all-comparisons-returning-false-for-ieee754-nan-values#1573715) 
            for why NaN isn't equal to itself.
            Also, while NaN may not be equal to itself...
***NaN === NaN; // -> false***
            ... these two statements are true.
***isNaN(NaN); // -> true
Object.is(NaN, NaN); // -> true***
            `,
            `
            Attempting to increment NaN will simply output NaN.
***let _NaN = NaN;
_NaN++;
isNaN(_NaN); // -> true
_NaN--;
isNaN(_NaN); // -> true
_NaN *= 10;
isNaN(_NaN); // -> true***
            `,
            `
            While false can be converted to a number, undefined cannot.
***Number(false); // -> 0
Number(undefined); // -> NaN
NaN + 0; // -> NaN***
            However, undefined is represented by false:
***!!undefined === false; // -> true***
            Which means that we can add undefined and false like so:
***!!undefined + false; // -> 0***
            `,
            `
            Positive zero and negative zero are equal in JavaScript. 
            Interestingly, though, the Object.is function disagrees. 
            There are a few scenarios where === and Object.is disagree with one another, and this is one of them.
***Object.is(0, -0); // -> false***
            `,
            `
            The finale wraps up much of the bizarre syntax that I've covered in this quiz. Let's break it down, piece by piece:
***-""; // -> -0
+"1"; // -> 1
Number(null); // -> 0
Number([,]); // -> 0***
            Add it all together:
***-0 + 1 * 0 - 0; // -> 0***
            `
        ],
        tabs:["en","zh"],
        title:"JS Is Weird",
        startContent:"JavaScript is a great programming language, but thanks to the fact that its initial release was built in only ten days back in 1995, coupled with the fact that JS is backward-compatible, it's also a bit weird. It doesn't always behave the way you might think. In this quiz, you'll be shown 25 quirky expressions and will have to guess the output. Even if you're a JS developer, most of this syntax is probably, and hopefully, not something you use in your daily life.",
        endContent:`
            I hope you thought this little quiz was fun, and, hopefully, you even learned something new. 
            This quiz was made by [Jacob Bergdahl](https://jacobbergdahl.com/). 
            If you have any suggestions, corrections, or feedback, do send me an [e-mail](mailto:854806732@qq.com).
            I'm sure I've made some mistakes! 
            If you want more of this, I'd recommend checking out [this GitHub repository by Denys Dovhan](https://github.com/denysdovhan/wtfjs), 
            which is full of funny and tricky JavaScript examples. 
            This repository is part of what inspired me to create this quiz. 
            If you want to go deeper, you can always grab a lantern and head into the [depths of the ECMAScript publications](https://www.ecma-international.org/publications-and-standards/standards/). 
            Have fun in there!
            <blockquote>Special Note:This website inspired by <a href="https://jsisweird.com/" target="blank">https://jsisweird.com/</a></blockquote>
        `,
        startBtn:"let's start",
        endBtn:"Start over"
    },
    "zh":{
        output:"输出",
        answer:"你的回答",
        successMsg:"回答正确",
        errorMsg:"回答错误",
        detail:[
            `
                这个问题为许多即将出现的问题奠定了基调。对于还不知道答案的人来说，所有四个选项听起来都非常合理。简短的回答是布尔值被转换为它们的数字表示。
                欲了解更多可以参考[ECMAScript 语言规范](https://262.ecma-international.org/5.1/#sec-11.6)。
***Number(true); // -> 1
Number(false); // -> 0
1 + 0; // -> 1***
            `,
            `
                [,,,] 输出一个包含三个空槽的数组。 最后一个逗号是尾随逗号。如果你觉得这还不够奇怪，那么看看这个：
***[,] + [,]; // -> ""
[] + [] === [,] + [,]; // -> true
[,,,] + [,,,]; // -> ",,,,"
([,,,] + [,,,]).length === [,,,,].length; // -> true***
                要查找解释数组加法运算符的资源，请直接在此下方中查看问题 3 的解释。
            `,
            `
                极其简单的答案是将数组转换为字符串，然后进行连接。
                查看[Denys Dovhan 的解释](https://github.com/denysdovhan/wtfjs#adding-arrays)是如何发生的。
                要了解有关此行为的更多信息，请访问[这个StackOverflow的答案](https://stackoverflow.com/questions/9032856/what-is-the-explanation-for-these-bizarre-javascript-behaviours-mentioned-in-the)中的解答，
                或者[这篇博文](https://2ality.com/2012/01/object-plus-object.html)以获取更详细的信息。
                顺便说一下，添加尾随逗号不会改变任何东西：
***[1, 2, 3,] + [4, 5, 6]; // -> "1,2,34,5,6"***
                但是，我想，如果您真的想将数组转换为逗号分隔的字符串并将它们组合起来，您可以编写如下愚蠢的代码：
***[1, 2, 3] + [, 4, 5, 6]; // -> "1,2,3,4,5,6"***
                或者，更愚蠢的是，这个：
***[1, 2, 3, ""] + [4, 5, 6]; // -> "1,2,3,4,5,6"***
                不过，最好不要将加法运算符与数组一起使用。 如果您确实想真正组合两个数组，这是一个更好的方法：
***[...[1, 2, 3], ...[4, 5, 6]];***
            `,
            `
            这是比较浮点值的困境。与其直接比较两个浮点数，不如将浮点数与某种程度的公差进行比较。
            [这个 StackOverflow 答案](https://stackoverflow.com/questions/588004/is-floating-point-math-broken)更详细地解释了这个问题。
***0.2 + 0.1; // -> 0.30000000000000004;
0.2 + 0.1 > 0.3; // -> true***
            `,
            `
            [逗号运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator)
             简单地返回最后一个操作数的值。
***10, 2; // -> 2
1, 2, 3, 4; // -> 4
42, "pineapple", true; // -> true***
            `,
            `
            您可以在任何值之前添加两个感叹号以获取其布尔表示。通常，任何有值的都是真，任何有“空”值的都是假。
***Boolean(""); // -> false
Boolean(0); // -> false
Boolean("Pineapple"); // -> true
Boolean(42); // -> true***
            `,
            `
            在上面的解释中，我提到空值通常由布尔值 false 表示。但是，空数组是一个例外。它由 true 表示。 然后加号操作将 true 转换为其数字表示。
***Boolean([]); // -> true
Number(true); // -> 1***
            `,
            `
            连续放置三个或更多感叹号是非常不寻常的，因此您可能没有意识到您甚至可以这样做。
            但是，当您可以编写令人难以置信的不可读代码时，为什么只停在三个？
***!!!!!!!!!!!!true; // -> true***
            `,
            `
            根据[抽象相等比较](https://262.ecma-international.org/11.0/#sec-abstract-equality-comparison)的规则，这两个值都被转换为数字。
***Number(true); // -> 1
Number("true"); // -> NaN
1 == NaN; // -> false***
            `,
            `
            010 被 JavaScript 视为八进制数。
            因此，它的值以 8 为底。 
            [见 Mozilla 对八进制数的解释](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#octal_numbers).
***010; // -> 8
03; // -> 3
8 - 3; // -> 5***
            如果你愿意，你可以写全整个八进制数:
***01111111111111111; // -> 40210710958665***
            顺便说一句，前导零的数量无关紧要:
***010 === 0000000010; // -> true***
            `,
            `
            这两个空字符串都转换为0。
***Number(""); // -> 0
0 - - 0; // -> 0***
            如果我这样写，表达式可能会变得更清晰一些：
***+"" - -"";
+0 - -0;***
            请注意，虽然我在减号和空字符串之间放置空格只是为了让您感到困惑，但减号之间的空格本身很重要：
***- -""; // -> 0
--""; // -> SyntaxError***
            `,
            `
            null 转换为其数字表示形式：0。
***Number(null); // -> 0
0 + 0; // -> 0***
            这也意味着，虽然...
***null === false; // -> false***
            ...但如下返回的是 true:
***+null === +false; // -> true***
            `,
            `
            由于方程 0/0 没有有意义的数字答案，因此输出只是 NaN。
***isNaN(0/0); // -> true***
            `,
            `
            JavaScript 将这两个值都视为Infinity(无穷大)，Infinity等于Infinity。
            [了解有关Infinity的更多信息](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Infinities)。
***1/0; // -> Infinity
Math.pow(10, 1000); // -> Infinity
Infinity > Infinity; // -> false***
            `,
            `
            我们的第一个也是唯一的"SyntaxError"(语法错误)。我把"SyntaxError"作为很多问题的一个选项，
            希望一些用户会发现一些语法如此奇怪以至于不可能被允许。 
            所以，我觉得我必须至少添加一个实际上会导致"SyntaxError"的表达式。
            顺便说一下， ***undefined++***不会导致"SyntaxError"：
***1++; // -> SyntaxError
"x"++; // -> SyntaxError
undefined++; // -> NaN***
            而且，当然，为了完全清楚，这是有效的"Syntax"(语法)：
***let _true = true;
_true++;
_true; // -> 2***
            `,
            `
            虽然加法运算符 (+) 用于数字和字符串，但减法运算符 (-) 不用于字符串，因此 JavaScript 将其解释为数字之间的运算。空字符串转换为 0。
***Number(""); // -> 0
0 - 1; // -> -1;***
            即使字符串内部有空格（或更多），这仍然是正确的：
***" " - 1; // -> -1;***
            但是，如果我们使用加法运算符，则字符串优先执行转换然后再执行拼接：
***"" + 1; // -> "1";***
            `,
            `
***Number(null) - 0; // -> 0
0 + "0"; // -> "00"***
            但是如果问题只使用了减法运算符，结果就会不同：
***(null - 0) - "0"; // -> 0***
            `,
            `
            您可能会怀疑 JS 太笨了，以至于它会将字符串文字转换为其布尔值并且紧接着转换成它的数字表示。然而，这并不完全是愚蠢的。
            实际发生的是它尝试将字符串转换为数字并失败。
***Number("true"); // -> NaN***
            `,
            `
            所有正数都由布尔值 true 表示。 true 的反义词是 false，false 转换为 0。
***Boolean(5); // -> true
!true; // -> false
Number(false); // -> 0
0 + 0; // -> 0***
            `,
            `
            这个问题与问题 3 密切相关。同样，极其简单的答案是 JavaScript 将数组转换为字符串。向上滚动到问题 3 以查找解释此行为的源码。            
***[].toString(); // -> ""
"" + ""; // -> ""***
            另外，就像我在问题 2 的解释中提到的那样，由于尾随逗号，这些表达式是相等的：
***[] + [] === [,] + [,]; // -> true***
            尽管这些数组不同，但它们都被转换为空字符串：
***[].length; // -> 0
[,].length; // -> 1
[].toString() === [,].toString(); // -> true***
            当然，这也是 true ：
***Number([]) === Number([,]); // -> true***
            `,
            `
            这是由于 IEEE-754 委员会出于几个原因做出的决定，例如空间效率以及当时不存在函数 isNaN 的事实。
            详见 [Stephen Canon's explanation](https://stackoverflow.com/questions/1565164/what-is-the-rationale-for-all-comparisons-returning-false-for-ieee754-nan-values#1573715) 
            为什么 NaN 不等于它自己。
            此外，虽然 NaN 可能不等于自身...
***NaN === NaN; // -> false***
            ...这两种写法都是正确的。
***isNaN(NaN); // -> true
Object.is(NaN, NaN); // -> true***
            `,
            `
            尝试增加 NaN 只会输出 NaN。
***let _NaN = NaN;
_NaN++;
isNaN(_NaN); // -> true
_NaN--;
isNaN(_NaN); // -> true
_NaN *= 10;
isNaN(_NaN); // -> true***
            `,
            `
            虽然 false 可以转换为数字，但 undefined 不能。
***Number(false); // -> 0
Number(undefined); // -> NaN
NaN + 0; // -> NaN***
            但是， undefined 用 false 表示：
***!!undefined === false; // -> true***
            这意味着我们可以像这样添加 undefined 和 false ：
***!!undefined + false; // -> 0***
            `,
            `
            正零和负零在 JavaScript 中是相等的。有趣的是，Object.is 函数则不痛。有几种情况 === 和 Object.is 彼此不一致，这就是其中之一。
***Object.is(0, -0); // -> false***
            `,
            `
            结局总结了我在本测验中涵盖的大部分奇怪的语法。让我们一块一块地分解它：
***-""; // -> -0
+"1"; // -> 1
Number(null); // -> 0
Number([,]); // -> 0***
            把它们加在一起：
***-0 + 1 * 0 - 0; // -> 0***
            `
        ],
        tabs:["英文","中文"],
        title:"JS很奇怪",
        startContent:"JavaScript 是一种很棒的编程语言，但由于它的初始版本是在 1995 年仅用十天时间构建的，再加上 JS 向后兼容的事实，它也有点奇怪。 它并不总是像你想象的那样行事。 在这个测验中，您将看到 25 个古怪的表达式，并且必须猜测输出。 即使您是一名 JS 开发人员，大部分语法也可能并且希望不是您在日常生活中使用的东西。",
        endContent:`
            我希望你觉得这个小测验很有趣，希望你甚至学到了一些新东西。本测验由 [Jacob Bergdahl](https://jacobbergdahl.com/) 制作。
            如果您有任何建议、更正或反馈，请发送给我 [邮件](mailto:854806732@qq.com)。我确定我犯了一些错误！
            如果你想要更多这样的东西，我建议你查看 [通过 Denys Dovhan 创建的这个代码库](https://github.com/denysdovhan/wtfjs)，里面有很多有趣和棘手的 JavaScript 示例。
            这个代码库是启发我创建这个测验的一部分。如果你想更深入，你可以随时提着灯笼进入[depths of the ECMAScript publications](https://www.ecma-international.org/publications-and-standards/standards/)。
            你将在那里玩得开心！
            <blockquote>特别说明:本网站启发于 <a href="https://jsisweird.com/" target="blank">https://jsisweird.com/</a></blockquote>
        `,
        startBtn:"让我们开始吧",
        endBtn:"重来"
    }
}
/**
 * 当前第几题
 * @param lang 
 * @param order 
 * @param total 
 * @returns 
 */
export function getCurrentQuestion(lang:string="en",order:number | string = 1,total:number | string = questions.length){
    return lang === 'en' ? `Question ${ order } of ${ total }` : `第${ order }题，共${ total }题`;
}
/**
 * 答对了多少题
 * @param lang 
 * @param correctNum 
 * @param total 
 * @returns 
 */
export function getCurrentAnswers(lang:string = "en",correctNum:number | string = 0,total:number | string = questions.length){
    return lang === 'en' ? `You got ${ correctNum } out of ${ total } correct!` : `共 ${ total }道题，您答对了 ${ correctNum } 道题！`;
}