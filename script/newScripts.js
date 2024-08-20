
// var Module = (function () {
//     function privateMethod() {
//         // do something
//         console.log("private");
//     }

//     return {
//         publicMothed: function () {
//             console.log("public");
//         },
//     };
// })();
// Module.publicMothed();
// Module.privateMethod();

// male this run only once

// let view;
// function likeTheViode() {
//     let callled = 0;

//     return function () {
//         if (callled > 0) {
//             console.log("Already sunscribed to amen tube");
//         }
//         else {
//             view = "Amen Tube";
//             console.log("Subscribe to", view)
//             callled++;
//         }
//     };
// }

// let isSubscrubed = likeTheViode()
// isSubscrubed();
// isSubscrubed();
// isSubscrubed();
// isSubscrubed();


/// Once Polyfill

// function once(fuc, context) {
//     let ran;

//     return function () {
//         if (fuc) {
//             ran = fuc.apply(context || this, arguments);
//             fuc = null;
//         }
//         return ran
//     };
// }

// const hellow = once((a, b, c) => console.log("hellow", a, b, c))
// hellow(1,2, 3)


// implement cashing/Memoize Fuction

// function myMemoize(fn, context) {
//     const res = {};
//     return function (...args) {
//         var argsCache = JSON.stringify(args);
//         if(!res[argsCache]) {
//             res[argsCache] = fn.call(context || this, ...args);
//         }
//         return res[argsCache];
//     }
// }

// const clumsysquare = (num1, num2) => {
//     for (let i= 1; i< 100000; i++) {}
//     return num1 * num2
// };

// const memoizedClumzyProduct = myMemoize(clumsysquare)

// console.log("First call");
// console.log(memoizedClumzyProduct(123, 123));
// console.log("Second call");


// Difference between closure and Scope

// function f (a) {
//     return function (b) {
//         return `${a} ${b}`
//     };
// }
// console.log(f(5)(6))



// function f (c) {
//     return function (d) {
//         return`${c} ${d}`
//     }
// }

// console.log(f(4)(4))

// function fun (a) {
//     return function (b) {
//         return `${a} ${b}`
//     }
// }

// console.log(fun(5)(4))


// function sum(a) {
//     return function (b) {
//         return function (c) { {
//                 return a+b+c
//             }
//         }
//     }
// }

// console.log(sum(4)(4)(4))

// function sum(a) {
//     return function (b) {
//         return function (c) {
//             return a + b + c
//         }
//     }
// }
// console.log(sum(4)(5)(9))

// function evaluate(operaation) {
//     return function (a) {
//         return function(b) {
//             if (operaation === "sum") return a + b 
//             if (operaation === "multiply") return a * b
//             if (operaation === "divide") return a/b
//             if (operaation === "substract") return a - b
//             else return "Invalide Operationa"
//         }
//     }
// }

// console.log(evaluate("sum")(4)(2))
// console.log(evaluate("multiply")(4)(2))
// console.log(evaluate("divide")(4)(2))
// console.log(evaluate("substract")(4)(2))


//Infinite Currying -> sum()()()

// function add(a) {
//     return function (b) {
//         if (b) return add(a + b)
//             return a;
//     }
// }

// console.log(add(5)(2)(5)(5)())


//Currying and Partial Appliation


// function sum (a) {
//     return function (b, c) {
//         return a + b + c

//     }
// }

// const x = sum(10);
// console.log(x(5,6));
// console.log(x(4,5))

// console.log(sums(2)(3)(4))
// function sums(a) {
//     return function (b) {
//         return function (c) {
//             return a + b +c;
//         }
//     }
// }

 //Manipulating DOM

//  function updateElementText(id) {
//     return function (content) {
//         document.querySelector("#" + id ).textContent = content;
//     };
//  }

//  const updataHeader = updateElementText("heading");
//  updataHeader("Hello update Etha Guda")


// f(a, b, c)into f(a)(b)(c)

// function curry(func) {
//     return function curryingFunc(...args) {
//         if (args.length >= func.length) {
//             return func (...args);
//         }
//         else {
//             return function (...next) {
//                 return curryingFunc (...args, ...next);
//             };
//         }

//     };
// }

// const sum = (a, b, c, d) => a + b + c + d

// const totalSum= curry(sum);
// console.log(totalSum(1)(6)(5)(6))



// console.log("Holle World")

// const backticks = `${2 +3}`
// console.log(backticks)

// const firstNumber = "Hello";
// const secondeNumber = 5;

// const result = firstNumber / secondeNumber
// console.log(typeof result)

//Booleans

//true
//false

// const isCool = false

// if  (isCool) {
//     console.log("Hi man, you are cool")
// } else {
//     console.log("Oh, hi...");
// }

// Null

// var age  = null;

// age = 20

// console.log(age)

// let x = null
// console.log(typeof x)

//Object

// const name = "amen";
// const age = 25;

// const person = {
//     name: "amen",
//     age: "25",
// }

// console.log(typeof person)


// const arr = [1, 3, 4, 5]

// console.log(arr[2])

// const date = new Date();

// console.log(date)

// statically typed
// let message = 'Hellow, World';

// console.log(typeof message)

// message = 5

// console.log(typeof message)
// Dynamically  => typed javascripts

// comparisone operatory => true/falsee

// const a = 5;

// const b = 10;

// console.log(a >= b)

//Strict Equality
//Strict Inequality

//loose Equality
// Doesen't compare Data Types
// console.log(true == 1);
// console.log("5" == 5)
// console.log('' == 0)
// console.log(0 == '')


// logical Operators
// AND && => AL OPERANDS TRUE => TRUE
// OR
// NOT
// console.log(false || false && true)

// NOT
// console.log(!true)

// const age = 91;
//  if (age > 18) {
//     console.log("Your are enter!");
//  }
//  else if (age === 18) {
//         console.log("You just turned 18")
//     } else {
//         console.log("Grow Up");
//     }
 
// The "while" loop

// let i = 0

// while(i < 10) {
//     console.log(i)
//     i++
// }


// The for Loop
// for (initialization, [condotion], [final_expression])
//DRY
// for(let i = 0; i<10; i++) {
//     if (i === 5) {
//         console.log("LeptonGame")
//     }
//     console.log(i*i)
// }


// A BLOCK OF CODE => PERFORMS A TASK

//A FUNCTION DECLARATON (define a function)

// Returns undefines ever fuction in javascripts
// function add(a, b) {
//     return a + b
// }

// const sum = add(2, 3)
// console.log(sum)

//Arrow fuction-

// const sum = () => {

// }


// function reverseString(str) {
//     let reversed = "";

//     for (let i = str.length - 1; i >= 0; i--) {
//         reversed += str[i]
//     }
//     return reversed;
// }

// console.log(reverseString("Hello"))

// function reverseString(str) {
//     return str.split("").reverse("").join("");
// }

// console.log(reverseString("amen"))

// function findLongestWord(sentence) {
//     const words = sentence.split(" ");
//     let longestWord = "";
//     for (let word of words) {
//         console.log(word.length)

//         if (word.length > longestWord.length) {
//             longestWord = word;
//         }
//     }
//     return longestWord
// }

// console.log(findLongestWord("Hi abush you have get posetion at leptonGame"))

// palindrome

// function isPalidrome(str) {
//     const reverseString = str.split("").reverse("").join("")
//     return str === reverseString
// }

// console.log(isPalidrome("racecar"))

// let arr = [1, 2, 3, 4, 5, 5, 6, 6]

// RemovDuplicated

// function removeDuplicates(arr) {
//     return [...new Set(arr)];
// }

// console.log(removeDuplicates(arr))


// check of Anagrams

// function areAnegrams(str1, str2) {
//     const sortedStr1 = str1.split("").sort().join("");
//     const sortedStr2 = str2.split("").sort().join("");
//     console.log(sortedStr1);
//     console.log(sortedStr2)

//     return sortedStr1 === sortedStr2
// }

// console.log(areAnegrams("amen", "nema"))

// function removeWitespace(str) {
//     const result = str.replace(/\s/g, "");
//     return result
// }

// console.log(removeWitespace("   this, is, me, i, have, to, pass, the    interview   "))