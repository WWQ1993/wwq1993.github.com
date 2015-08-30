
/**
 * Created by 万强 on 2015/8/28 0028.
 */

var WWQ = {};     //保护全局变量

WWQ.index = {};   //保存变量名的后缀数目。如：img保存为：WWQ.index.img，为一个数值，读取该值可知之前命名的img，避免冲突。

WWQ.outputStr = ""; //保存输出dom字符串。

WWQ.button1 = document.getElementsByTagName("Button")[0];
WWQ.button2 = document.getElementsByTagName("Button")[1];
WWQ.inputArea = document.getElementById("inputArea");
WWQ.outputArea = document.getElementById("outputArea");
WWQ.inputFrame = document.getElementById("iIframe");
WWQ.outputFrame = document.getElementById("oIframe");


WWQ.button1.onclick = function () {     //点击提交html代码触发的事件

    'use strict';

    WWQ.index = {};   //重置命名

    WWQ.inputStr = WWQ.inputArea.value;   //获取输入的html代码

    WWQ.inputFrame.contentDocument.getElementsByTagName("p")[0].innerHTML = WWQ.inputStr;    //在右上区域（iframe）展示输入的html代码。

    WWQ.outputStr = "";   //重置输出的dom字符串。

    WWQ.deal(WWQ.inputStr, 'document.body');     //根据输入的html，处理将输出的dom字符串。

    WWQ.outputArea.value = WWQ.outputStr;     //将输出字符串显示到左下区域（TextArea）。

    WWQ.outputFrame.contentWindow.set();    //运行DOM字符串，将效果展示到右下区域（iframe）：删除body所有节点，然后eval字符串。
};

WWQ.button2.onclick = function () {    //点击提交DOM代码触发的事件

    'use strict';

    WWQ.outputStr = WWQ.outputArea.value;     //从左下区域（TextArea）读取字符串。

    WWQ.outputFrame.contentWindow.set();    //运行DOM字符串，将效果展示到右下区域（iframe）。

};

window.onload = function(){//页面加载完毕时，自动提交初始html代码。
    document.execCommand('selectAll');
    WWQ.button1.onclick();

}


/*功    能：将传入字符串分割为标签前的文本字符和标签之后的所有字符。将标签前的文本字符设置为传入节点的子节点；将标签包含的字符（指
 *         开始标签到对应的结束标签之间的字符，不含结束标签）传入WWQ.dealStr()函数，以进行进一步处理。
 *传入参数：字符串，作为父节点的字符串。字符串为即将进行匹配处理的html代码；节点将作为父节点（初始传入document.body），字符串中的文本或标签将添加
 *        到此节点成为其子节点。*/
WWQ.deal = function (str, fatherNode) {

    'use strict';

    var lastIndex = 0,    //全局匹配时，下次匹配开始的位置。
        regexp = /([^<>]+)|(<(?:(\w+)([^>]*)*)>[\S\s]*)/g,  //全局匹配非<>的字符串或者html标签及其后所有字符串
        exResult,
        obj,
        tagStr;

    while (true) {

        exResult = regexp.exec(str);   //执行匹配

        if (exResult === null) {   //全局匹配结束

            break;

        }
        if (exResult[1]) {   //匹配到非<>的字符串。

            lastIndex += exResult[1].length;  //下次匹配从其后开始。

            if(!exResult[1].match(/[^\s\n]+/))
            {
                continue;
            }

            exResult[1] = exResult[1].replace(/\n+/g, "\\n") || exResult[1];    //将换行符替换为\n。（js不允许一条语句多行书写）

            WWQ.createNode("text", exResult[1], fatherNode);  //在传入父亲节下建立文本节点
        } else {   //匹配到html标签。

            obj = WWQ.dealNest(exResult[2]);  //执行WWQ.dealNest（传入标签及其后所有字符）

            tagStr = obj.str;     //WWQ.dealNest()返回的对象中保存着本标签及其子标签（除和开始标签配套的结束标签外）。

            lastIndex += obj.index;   //下次匹配开始位置设为结束标签之后（没有结束标签的则为>之后）

            regexp.lastIndex = lastIndex;

            WWQ.dealStr(tagStr, fatherNode);    //执行WWQ.dealStr（），对标签进行解析。
        }
    }
};

/*功能：对传入标签及其内容进行解析：将标签设置为传入的节点的子节点（同时设置属性）；将内容（指标签的嵌套标签）传给WWQ.deal()进行再次迭代。
 * 参数：还有标签及其内容字符串，作为父节点的字符串。*/
WWQ.dealStr = function (str, fatherNode) {

    'use strict';

    var index,
        regexp = /\n*<(\w+)([^>]*)*>\n*([\s\S]*)/, //将字符串拆分为：换行符、开始标签、换行符、标签内容
        result = regexp.exec(str),
        attrResult;

    if (result === null) {   //没有匹配到标签

        WWQ.createNode("text", str, fatherNode);

        return;
    }

    for (index = 0; result !== null && index < result.length; index = index + 1) {    //对每个捕获组进行迭代

        if (result[index]) {    //捕获组不为空

            if (index === 1) {    //捕获到标签名

                WWQ.createNode(result[index], 0, fatherNode); //创建DOM标签元素

            } else if (index === 2) {   //捕获到标签属性

                WWQ.regAttr = /\s*(\w+)=(["'])?([^'"]+)/g;    //划分为空格、字母、=（匹配一项属性）

                while (true) {

                    attrResult = WWQ.regAttr.exec(result[index]); //再次匹配

                    if (attrResult === null) {
                        break;
                    }
                    WWQ.createAttr(result[1], attrResult[1], attrResult[3]);  //创建属性（传入节点、属性名、属性值）
                }
            } else if (index === 3) {   //捕获到标签内容

                WWQ.deal(result[3], result[1] + WWQ.index[result[1]]); //传给WWQ.deal()进行再次迭代

            }
        }
    }
};

/*功能：处理迭代问题：找到结束标签，并返回标签的内容。没有结束标签则返回本标签（无内容）。
 * 参数：字符串
 * 返回：标签及其内容（去除结束标签），或本标签（无结束标签的情况）*/
WWQ.dealNest = function (str) {

    //找到标签名称，并存入tag。
    var regTag = /<(\w+)[\S\s]*>[\s\n]*/g,
        re = regTag.exec(str),
        tag = re[1],

        reg = /<(\/)?(\w+)[^>]*>[\s\n]*/g,    //匹配同一标签
        nestDeep = 0, //迭代深度。匹配到同一标签：开始标签则加一，匹配到结束标签则减一。为0这说明匹配到对应的结束标签。
        Result,
        obj = {};    //返回的对象

    while (true) {

        Result = reg.exec(str);

        if (Result === null) {      //找不到结束标签
            break;
        }
        if (Result[2] === tag) {   //找到其他标签
            if (!Result[1]) {  //找到了同一标签的开始标签
                nestDeep += 1;
            } else {  //找到了同一标签的结束标签

                nestDeep = nestDeep - 1;
                if (nestDeep === 0) {   //返回一个对象。
                    obj.str = str.slice(0, Result.index);
                    obj.index = reg.lastIndex;
                    return obj;
                }
            }
        }
    }
    //没有匹配到结束标签。

    regTag = /<(\w+)[^>]*>[\s\n]*/g;  //匹配独立标签。
    res = regTag.exec(str);

    //返回对象。
    obj.str = str.slice(0, regTag.lastIndex);
    obj.index = regTag.lastIndex;
    return obj;
};

WWQ.createNode = function (type, value, fatherNode) {   //创建节点

    if (type === "text") {   //创建文本节点
        WWQ.index.text = (WWQ.index.text || 0) + 1;
        WWQ.outputStr += "var text" + WWQ.index.text + "= document.createTextNode('" + value + "');\n";
        WWQ.appendChild("text"   + WWQ.index.text, fatherNode);
    } else {  //创建其他节点
        WWQ.index[type] = (WWQ.index[type] || 0) + 1;
        WWQ.outputStr += "var " + type + WWQ.index[type] + "= document.createElement('" + type + "');\n";
        WWQ.appendChild(type + WWQ.index[type], fatherNode);
    }
};

WWQ.appendChild = function (newNode, fatherNode) {   //添加节点到父节点

    WWQ.outputStr += fatherNode + ".appendChild(" + newNode + ");\n";

};

WWQ.createAttr = function (node, name, value) {   //创建节点属性

    if (name === "class") {
        WWQ.outputStr += node + WWQ.index[node] + ".className = '" + value + "';\n";
    } else {
        WWQ.outputStr += node + WWQ.index[node] + ".setAttribute('" + name + "','" + value + "');\n";
    }
};