# 非严格等和加法的'潜规则'


记得在某次面试的时候，面试官问了我一个问题，即![]的答案是多少，当然，对于自认为把 JavaScript 学的还算可以的我来说不是什么问题，立即回答 false，因为一切对象转换为布尔值都是true。还不算完，接着立即问了我下一个问题，true == [] 吗？这问的有点懵，有点不知所措，不确定的答到是的，然后就回答了一些稀奇古怪的东西，反正就是不怎么了解慌张应付。当然，答案是错误的，为了心中的求知欲，我在网上找了大量的资料，写了很多 demo ，终于总结出一份还算满意的js隐式转换的逻辑和步骤，接下来，为你呈现~


## JS的隐式转换
要说到 JS 这门语言的特点，可以说是非常的多了，不过最让人印象深刻的莫过于上手容易不需要像强类型语言那样申明变量和计算比较繁琐。但是在使用过程中有一件事儿是让人头疼的，就是为了可以让不同类型的变量进行直接操作就要进行大量的隐式转换，其中的规则也不是特别清晰，特别是当你刚刚接触这门语言的时候。本篇文章以介绍最为常见的 == 和 + 为你揭开隐式转换的神秘面纱。


### 什么是隐式转换
到底什么是隐式转换。简单的一句话可以概括。

隐式转换：**在不同类型的操作数运算时为了让它们能够正常运行得到正确的结果，将其中一个或者多个操作数转换为同一类型的动作就是隐式转换**。

当然，这也是JS的特色了，学习成本相比较于其他强类型的语言来说很低了，但是学到后面的坑也是一样的多。特别是早期的JS，大部分的函数都包含有隐式转换，直到后面ECMAScript的演进，倾向于将错误给抛出来
![image.png](http://note.youdao.com/yws/res/1054/WEBRESOURCE2f1b58661ef286d1ab3c37d87c607d41)
这个图是TypeError关键字在 [ECMAScript](https://262.ecma-international.org/6.0/) 文档出现的次数，也就是说后面的标准文档更倾向于将这个类型转换的错误给用户抛出来而不是向以前那样进行一个隐式转换。


## 基本知识

要了解隐式转换需要提前知道以下几个概念


## ToPrimitive ( input [ , PreferredType ] )
要提到隐式转换，不得不提及的一个函数就是 ToPrimitive() ,当然在 [ECMAScript sec-toprimitive](https://262.ecma-international.org/6.0/#sec-toprimitive) 的文档上对该函数也有非常详细的解释，这里用一个流程图来说明一下它的特性。



![image.png](http://note.youdao.com/yws/res/300/WEBRESOURCEaaff2deee44a87331a5b868679e2e433)

1. 如果输入的是一个原始值，那么函数的结果就是直接返回本身。
2. 如果输入的是对象类型的值，且 preferredType 的值是 string ，那么就会先调用 `toString()` 得到返回值，如果该返回值还是引用数值那么还会继续调用 `valueOf()` 得到返回值，如果该返回值还是引用数值就会抛出一个TypeError的错误，否则返回这次的返回值。
3. 如果 preferredType 的值是 number ，那么调用的顺序和（2）的步骤相反，先调用 `valueOf()` ，再调用 `toString()` 方法，当然里面的结果判断都是和步骤2一致。
4. 如果缺少 preferredType， Date 类创建的实例对象隐式转换调用这个方法 preferredType 的值是string，其他引用数据隐式转换 preferredType 是number

下面举一个恰当的例子

```javascript
let x={
    valueOf(){
        console.log('valueof');
        return []
    },
    toString(){
        console.log('tostring');
        return []
    },
}
console.log(String(x));
// tostring
// valueof
// Uncaught TypeError: Cannot convert object to primitive value
```
从上述的结果可以看出当在调用 `String()` 方法显式转换的时候，此刻的 preferredType 值是string，会先调用 `toString()` 再调用 `valueOf()` 方法，当然最后的valueOf方法返回的是[] ,还是一个引用数值，所以会抛出 TypeError


###  ToNumber()

在 非严格等 == 的操作数两边是不确定数据类型的，为了让两边能够正常的比较值，最终的结果比较往往是 `Number(x) == Number(y)`。

该函数也是在 [ECMA文档  sec-tonumber](https://262.ecma-international.org/6.0/#sec-tonumber)中有详细的说明，简单的用一个表格来说明一下转换的结果。


Argument Type  | Result
---|---
undefined | NaN
null | +0
boolean | true is converted to 1, false is converted to +0
string | parse the number in the string. For example, "324" is converted to 324
symbol | TypeError: cannot convert a Symbol value to a number
object | ToPrimitive(obj, Number) and then applying ToNumber() to the (primitive) result.

下面针对表格中的特殊情况说明一下
1. 引用数据类型在使用 `ToNumber()` 方法时会先调用 `ToPrimitive(obj, Number)` 尽可能的得到一个原始值，然后再把该原始值调用 `oNumber()` 得到结果

```
let y={
    valueOf(){
        console.log('valuey');
        return []
    },
    toString(){
        console.log('string');
        return '99'
    },
}

console.log(Number(y));
// valuey
// string
// 99
```
当然，上述调用的 `Number()` 函数是可以让用户显示调用 `ToNumber()` 的方法，通过结果可以看出对象是先调用了 `ToPrimitive()` 再将得到的原始值转换为number类型

2. symbol 类型在进行 ToNumber 操作时会报错，所以在进行 == 非严格等比较有 symbol 类型时如果不是和自身比较会直接等于 false


```
console.log(Symbol() == Symbol()); // false
console.log(Number(Symbol())); // Uncaught TypeError: Cannot convert a Symbol value to a number
```

### ToBoolean()

当然，谈及隐式转换怎么能少得了 `ToBoolean()`，在日常开发中经常使用的 !x可是ToBoolean的杰作，关于 `ToBoolean` 的转换细节在[ECMAScript文档 -sec-toboolean](https://262.ecma-international.org/6.0/#sec-toboolean)中说明，下面用一个表格来说明它的转换结果。
 Argument Type  | 	Result
--- | ---
 Undefined |	Return false.
Null | Return false.
Boolean	| Return argument.
Number |	Return false if argument is +0, −0, or NaN; otherwise return true.
String	|  Return false if argument is the empty String (its length is zero); otherwise return true.
Symbol |	Return true.
Object | Return true.

特别注意的有以下几点：
1. 所以对象转换结果都是 true
2. Symbol 类型转换结果全都为true
3. string类型只有空字符串转为false
4. 在数字进行 ToBoolean操作时，负数是会转换为 true 的，这在平时开发过程中需要注意。


`Boolean(undefined) = true`

## 场景分析

### === 严格等的比较分析

在 === 比较时有一个重要的结论，

>   === 不会进行隐式转换

所以对于a === b 严格等的规则对于 == 来说要简单的多，总结了一下，有以下几点

    Strict Equality Comparison
    The comparison x === y, where x and y are values, produces true or false. Such a comparison is performed as follows:
    
    If Type(x) is different from Type(y), return false.
    If Type(x) is Number, then
    a. If x is NaN, return false.
    b. If y is NaN, return false.
    c. If x is the same Number value as y, return true.
    d. If x is +0 and y is ‐0,return true.
    e. If x is ‐0 and y is +0, return true.
    f. Return false.
    Return SameValueNonNumber(x, y).
    NOTE This algorithm differs from the SameValue Algorithm in its treatment of signed zeroes and NaNs.

上述的结论是[ECMAScript文档 - sec-strict-equality-comparison ](https://262.ecma-international.org/6.0/#sec-strict-equality-comparison)对于严格等的结论描述，简单的翻译一下有以下几点


1. a 和 b 的类型不同，一定返回false
2. 引用数值不是比较同一个引用情况直接返回 false
3. 同一个类型原始值值相等返回true，不相等返回 false
4. symbol 类型的值只有和本身比较才为 true
5. +0 和 -0 全等，返回 true



### == 抽象等的比较分析

在分析之前，考一考你们下面的12个等式结果会是多少,因为在日常开发中通常会进行值判断，所以列举了很多与 boolean 值相转换的例子，希望在理解这些转换以后会对你的日常开发值判断有一些帮助。

```
[] == true
![] == true
2 == true
'1' == true
-1 == false
[1] == '1'
!null == false
null == false
!'' == true
!'0' == true
'' == 0
'0' == 0
```
似曾相识的感觉，却又无法推理出正确的答案，不急，这就为你呈现上述的结果步骤


对于抽象等而言，其中会多一个隐式转换的步骤，下面是[ECMAScript文档 sec-abstract-equality-comparison](https://262.ecma-international.org/6.0/#sec-abstract-equality-comparison) 对于抽象等的描述

    Abstract Equality Comparison
    The comparison x == y, where x and y are values, produces true or false. Such a comparison is performed as follows:
    
    ReturnIfAbrupt(x).
    ReturnIfAbrupt(y).
    If Type(x) is the same as Type(y), then
    Return the result of performing Strict Equality Comparison x === y.
    If x is null and y is undefined, return true.
    If x is undefined and y is null, return true.
    If Type(x) is Number and Type(y) is String,
    return the result of the comparison x == ToNumber(y).
    If Type(x) is String and Type(y) is Number,
    return the result of the comparison ToNumber(x) == y.
    If Type(x) is Boolean, return the result of the comparison ToNumber(x) == y.
    If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).
    If Type(x) is either String, Number, or Symbol and Type(y) is Object, then
    return the result of the comparison x == ToPrimitive(y).
    If Type(x) is Object and Type(y) is either String, Number, or Symbol, then
    return the result of the comparison ToPrimitive(x) == y.
    Return false.
    
简单的翻译总结一下，有以下几点：


1. undefined 和 null 只有和 本身或者另一个null 或者 undefined 比较结果为true，其余的结果皆为 false
2. Symbol只有和自身比较才为 true
3. **不同类型的操作数两边比较将尽量转换为 `ToNumber(x)` 和 `ToNumber(y)`  的比较**
4. 相同类型的操作数比较会和 === 的结果保持一致。



上述的1 和 2 比较好理解，但是对于第三点来说左右两边的数据类型错综复杂，所以只要记住抽象等的结果会**将是两个数字值的比较**那么一切的问题都会变得简单起来。下面对于这点进行说明。

- 首先，对于两边是引用数据来说，和严格等的情况一致，不会进行显示转换。
- 两边都是原始值类型会调用 ToNumber() 方法得到数值进行比较。
- 一边是引用数值一边是引用数值，会先将引用数值调用 `ToPrimitive()` 方法转换为原始值，然后就会是两个原始值的比较。


#### 解析例子

##### 空数组比较

```
[] == true // false
![] == true // false
['1'] == 1 // true
```
对于上述的三个例子,都是一个数组和 boolean 值比较，但是它们的转换形式却完全不同，具体情况具体分析:
1. [] == true 的情况，左边是引用数据，右边是原始值，那么会先调用 `ToPrimitive()` 方法把[] 转换为''(先调用 valueOf 方法,再调用toString方法) ,接下来的结果就变成了 '' == true ;其次会再次调用 `ToNumber()` 方法进行比较，这样结果就变成了 `ToNumber('') == ToNumber(true)` ,按照上诉对 `ToNumber()` 的描述，结果就变成了 `0 == 1`，所以结果就是 false。
2. ![] == true 的情况，首先要明确的是取反操作符会隐式的调用 `toBoolean()` 方法得到一个确定的 boolean 值，还有一个点就是所有的对象转换为 boolean 一定是 true，所以![] 会变成 `!(toBoolean([])`,那么结果就会变成 `false == true` ，结果自然是 false。
3. `['1'] == 1` 的比较和第一个式子的转换方式特别相似。调用 `ToPrimitive()` 得到 `'1' == 1` ，然后再把 '1' 调用 `ToNumber()` 方法得到 `1 ==1`，结果为 true。

##### 原始值类型之间比较

```
2 == true // false
'1' == true // true
-1 == false // false
```

对于 string 类型和 boolean 类型来说，不是同一种类型的操作数会调用 `ToNumber()` 方法得到相对应的 number 类型再进行比较。例如在 `2 == true` 的比较中，true 是 boolean 类型的值，通过调用 `ToNumber(true)` 将会得到 1，最终的比较结果就是 `2 == 1`，答案自然是 false。同理，在第三例中，`ToNumber(false)` 的结果为0，最终比较结果为 `-1 == 0`，所以答案也是 false。

##### !取反符号多作怪？
```
!null == false // false
null == false // false
!'' == true // true
!'0' == true // false
```
null 是一个比较特殊的值，代表原型链的顶端或者是表示此处不该有值，对于第二个例子，null 只能和undefined 或者 null非严格等，而不是去执行 `ToNumber(null)`。抛开第二个例子以外，其余的三个例子都和一个符号相关，取反符号!，接下来逐个分析。!null == false，!操作数的时候会将隐式的调用 `toBoolean(null)` 得到false(查表可得) 结果就变成了 !false ==false ，结果自然是false。对于第三个例子和第四个例子是同一个情况，都会先调用 `toBoolean()` 方法，不过需要**注意**的是，`toBoolean('0')` 的结果是 true，因为它是一个有具体内容的字符串，这一点我在开发的时候经常出错。


### + 运算符的操作过程

 +号运算在日常开发中使用频率也比较高，大部分都是相同类型基本数据之间相加（当然这也是最符合规范的），但是如果不小心进行了不同类型的操作数的相加甚至是和对象相加呢，那这里面会碰撞出怎样的火花呢？假如以下几个例子的结果会是什么呢？
 
 ```
2+[3,4]
[]+{}
{}+[]
{}+null
 ```
#### 加法运算步骤

1. 将 + 号运算符两边的引用值转换为原始值再相加
2. 原值值转换为 `ToNumber(x) + ToNumber(y)` 


##### 预设类型

首先，在 + 号运算中需要明确的是，+ 号运算两边是不确定左右操作数基本类型的，也就是说

**如果一个运算无法确定类型，那么在类型转换前，它的运算数将被预设为 number**。


这个结论非常重要，它会直接影响到 `ToPrimitive` 函数的 `<button></buttom>` preferredType是number,然后将引用值转换为基础类型会先调用 `valueOf()` 再调用 `toString()` 方法。

 - [] 先调用 `valueOf()` 会得到本身 [] ,之后再调用 `toString()` 方法会得到''    
 - {} 先调用 `valueOf()` 会得到本身 {} ,调用 `toString()` 方法会得到 [object Object]   
 - [3,4] 和空数组不同的是,调用 `toString()` 方法会将里面的元素全部取出来再转换为字符串 '3,4'



##### 原始值的相加

当操作数两边都转换为基本数据类型的时候，事情就变得容易起来，只要数据类型不是number类型时就会去调用 `ToNumber()` 函数转换为 number 类型的值。例如下面的几个例子:

```
null + undefined ?
false + true ?
Symbol()+Symbol() ?
``` 
根据上面的 ToNumber函数查表可以得到 `ToNumber(null) = 0` , `ToNumber(undefined) =NaN`, `ToNumber(false) = 0`, `ToNumber(true) = 1`, `ToNumber(Symbol())` 会抛出一个错误，所以最终的结果就是

```
null + undefined = NaN
false + true = 1
Symbol()+Symbol()  TypeError: Cannot convert a Symbol value to a number
```


##### 字符串拼接

当然，在操作数相加过程中，难免会出现有字符串参与，不管是在引用值转换为基础值的过程中还是原本就是字符串，它的相加就会变成**字符串相加**，而且在相加过程只要有一个操作数变成了字符串类型那么就会拼接不管位置是前还是后。

举一个简单的例子：
```
const y={
    valueOf(){
        console.log('valueOf');
        return {}
    },
    toString(){
        console.log('toString');
        return '99'
    },
}
console.log(null + y) 
// valueOf
// toString
// null99
```

在上述的例子中，在 null 和 引用值 y 相加的时候，由于 y 是一个引用数据类型所以要先调用 `ToPrimitive(y)` 得到一个基本数据类型。由于在 + 号运算符中不知道运算类型会把 preferredType 预设为number，所以会先调用 `valueOf()` 方法再调用 `toString()` 方法得到了字符串 '99'。但是此处最为**重要**的是有两点：
- 判断是否执行完 `valueOf()` 方法 还继续执行 `toString()` 方法是根据 `valueOf()` 函数的返回值是否为引用数据类型而不是本身
- 在判断是否进行字符串拼接也是根据 `valueOf()` 函数和 `toString()` 函数返回值是否是字符串类型。


#### 分析例子

 ```
2+[3,4] // 23,4
[]+{} // [object Object]
{}+[] // 0
{}+null // 0
 ```
 
 在上面例子中包含了两种情况，分别是
- 包含引用数据类型的字符串拼接
- 在 {} 开头的 加法处理


##### 字符串拼接情况

- 在 [3,4] 和 2 相加的过程中，会把[3,4]转换为基本数据类型 '3,4'(通过调用ToPrimitive()),最后和2相加答案就是 23,4
- [] + {} 和上例的处理方式一致，唯一的区别就是在最后调用 `toString()` 方法的时候得到不同的值，[] 会得到空字符串，{} 会得到 '[object Object]'，所以最终的答案就是 [object Object]


##### {} 开头的处理

这里要特意的说明一下 {} + x 这样格式相加的例子，因为有一个比较重要的知识点

**Automatic Semicolon Insertion (ASI)：自动分号插入**

> 自动分号插入是 javascript 设计史上最大的铁板

关于自动分号插入的具体可以参考这个[链接](https://2ality.com/2011/05/semicolon-insertion.html)

上面的代码会变成
```
{};+[]
{};+null
```
而且不幸的是这样的例子居然能够通过，所以最后的结果就会变成 +[] 和 +null。由于 + 号运算符能够明显的知道最终的结果要转换为number ,所以会直接调用 `toNumber([])` 和 `toNumber(null)`，参考前面所提及的 `toNumber` 函数转换规则，最终的答案就会变成 0 和 0。

## 最后

虽然 javascript 的隐式转换被后人一直诟病，后面也设计出一些可以进行数据类型检测的辅助语言 Typescript或者是 Flow，对于在可维护性和可读性上都有着非常大的提升。但是早期的 javascript语言对于 隐式转换所涉及的规范却是非常有意思的，这也许就是 Brendan Eich 在10天 通过借鉴 C语言、Java语言、Scheme语言、Self语言所设计出来的'混子语言'的魅力吧。

> 与其说我爱 Javascript，不如说我恨它。它是C语言和Self语言一夜情的产物。十八世纪英国文学家约翰逊博士说得好：'它的优秀之处并非原创，它的原创之处并不优秀。        - Brendan Eich

## 参考链接

- [ECMAScript-6.0文档](https://262.ecma-international.org/6.0/)
- [What is {} + {} in JavaScript?](https://2ality.com/2012/01/object-plus-object.html)
- [JS布尔值(Boolean)转换规则](https://louiszhai.github.io/2015/12/11/js.boolean/)
- [JavaScript 中的相等性判断](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)




 


    