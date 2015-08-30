
/**
 * Created by ��ǿ on 2015/8/28 0028.
 */

var WWQ = {};     //����ȫ�ֱ���

WWQ.index = {};   //����������ĺ�׺��Ŀ���磺img����Ϊ��WWQ.index.img��Ϊһ����ֵ����ȡ��ֵ��֪֮ǰ������img�������ͻ��

WWQ.outputStr = ""; //�������dom�ַ�����

WWQ.button1 = document.getElementsByTagName("Button")[0];
WWQ.button2 = document.getElementsByTagName("Button")[1];
WWQ.inputArea = document.getElementById("inputArea");
WWQ.outputArea = document.getElementById("outputArea");
WWQ.inputFrame = document.getElementById("iIframe");
WWQ.outputFrame = document.getElementById("oIframe");


WWQ.button1.onclick = function () {     //����ύhtml���봥�����¼�

    'use strict';

    WWQ.index = {};   //��������

    WWQ.inputStr = WWQ.inputArea.value;   //��ȡ�����html����

    WWQ.inputFrame.contentDocument.getElementsByTagName("p")[0].innerHTML = WWQ.inputStr;    //����������iframe��չʾ�����html���롣

    WWQ.outputStr = "";   //���������dom�ַ�����

    WWQ.deal(WWQ.inputStr, 'document.body');     //���������html�����������dom�ַ�����

    WWQ.outputArea.value = WWQ.outputStr;     //������ַ�����ʾ����������TextArea����

    WWQ.outputFrame.contentWindow.set();    //����DOM�ַ�������Ч��չʾ����������iframe����ɾ��body���нڵ㣬Ȼ��eval�ַ�����
};

WWQ.button2.onclick = function () {    //����ύDOM���봥�����¼�

    'use strict';

    WWQ.outputStr = WWQ.outputArea.value;     //����������TextArea����ȡ�ַ�����

    WWQ.outputFrame.contentWindow.set();    //����DOM�ַ�������Ч��չʾ����������iframe����

};

window.onload = function(){//ҳ��������ʱ���Զ��ύ��ʼhtml���롣
    document.execCommand('selectAll');
    WWQ.button1.onclick();

}


/*��    �ܣ��������ַ����ָ�Ϊ��ǩǰ���ı��ַ��ͱ�ǩ֮��������ַ�������ǩǰ���ı��ַ�����Ϊ����ڵ���ӽڵ㣻����ǩ�������ַ���ָ
 *         ��ʼ��ǩ����Ӧ�Ľ�����ǩ֮����ַ�������������ǩ������WWQ.dealStr()�������Խ��н�һ������
 *����������ַ�������Ϊ���ڵ���ַ������ַ���Ϊ��������ƥ�䴦���html���룻�ڵ㽫��Ϊ���ڵ㣨��ʼ����document.body�����ַ����е��ı����ǩ�����
 *        ���˽ڵ��Ϊ���ӽڵ㡣*/
WWQ.deal = function (str, fatherNode) {

    'use strict';

    var lastIndex = 0,    //ȫ��ƥ��ʱ���´�ƥ�俪ʼ��λ�á�
        regexp = /([^<>]+)|(<(?:(\w+)([^>]*)*)>[\S\s]*)/g,  //ȫ��ƥ���<>���ַ�������html��ǩ����������ַ���
        exResult,
        obj,
        tagStr;

    while (true) {

        exResult = regexp.exec(str);   //ִ��ƥ��

        if (exResult === null) {   //ȫ��ƥ�����

            break;

        }
        if (exResult[1]) {   //ƥ�䵽��<>���ַ�����

            lastIndex += exResult[1].length;  //�´�ƥ������ʼ��

            exResult[1] = exResult[1].replace(/\n+/g, "\\n") || exResult[1];    //�����з��滻Ϊ\n����js������һ����������д��

            WWQ.createNode("text", exResult[1], fatherNode);  //�ڴ��븸�׽��½����ı��ڵ�
        } else {   //ƥ�䵽html��ǩ��

            obj = WWQ.dealNest(exResult[2]);  //ִ��WWQ.dealNest�������ǩ����������ַ���

            tagStr = obj.str;     //WWQ.dealNest()���صĶ����б����ű���ǩ�����ӱ�ǩ�����Ϳ�ʼ��ǩ���׵Ľ�����ǩ�⣩��

            lastIndex += obj.index;   //�´�ƥ�俪ʼλ����Ϊ������ǩ֮��û�н�����ǩ����Ϊ>֮��

            regexp.lastIndex = lastIndex;

            WWQ.dealStr(tagStr, fatherNode);    //ִ��WWQ.dealStr�������Ա�ǩ���н�����
        }
    }
};

/*���ܣ��Դ����ǩ�������ݽ��н���������ǩ����Ϊ����Ľڵ���ӽڵ㣨ͬʱ�������ԣ��������ݣ�ָ��ǩ��Ƕ�ױ�ǩ������WWQ.deal()�����ٴε�����
 * ���������б�ǩ���������ַ�������Ϊ���ڵ���ַ�����*/
WWQ.dealStr = function (str, fatherNode) {

    'use strict';

    var index,
        regexp = /\n*<(\w+)([^>]*)*>\n*([\s\S]*)/, //���ַ������Ϊ�����з�����ʼ��ǩ�����з�����ǩ����
        result = regexp.exec(str),
        attrResult;

    if (result === null) {   //û��ƥ�䵽��ǩ

        WWQ.createNode("text", str, fatherNode);

        return;
    }

    for (index = 0; result !== null && index < result.length; index = index + 1) {    //��ÿ����������е���

        if (result[index]) {    //�����鲻Ϊ��

            if (index === 1) {    //���񵽱�ǩ��

                WWQ.createNode(result[index], 0, fatherNode); //����DOM��ǩԪ��

            } else if (index === 2) {   //���񵽱�ǩ����

                WWQ.regAttr = /\s*(\w+)=(["'])?([^'"]+)/g;    //����Ϊ�ո���ĸ��=��ƥ��һ�����ԣ�

                while (true) {

                    attrResult = WWQ.regAttr.exec(result[index]); //�ٴ�ƥ��

                    if (attrResult === null) {
                        break;
                    }
                    WWQ.createAttr(result[1], attrResult[1], attrResult[3]);  //�������ԣ�����ڵ㡢������������ֵ��
                }
            } else if (index === 3) {   //���񵽱�ǩ����

                WWQ.deal(result[3], result[1] + WWQ.index[result[1]]); //����WWQ.deal()�����ٴε���

            }
        }
    }
};

/*���ܣ�����������⣺�ҵ�������ǩ�������ر�ǩ�����ݡ�û�н�����ǩ�򷵻ر���ǩ�������ݣ���
 * �������ַ���
 * ���أ���ǩ�������ݣ�ȥ��������ǩ�����򱾱�ǩ���޽�����ǩ�������*/
WWQ.dealNest = function (str) {

    //�ҵ���ǩ���ƣ�������tag��
    var regTag = /<(\w+)[\S\s]*>[\s\n]*/g,
        re = regTag.exec(str),
        tag = re[1],

        reg = /<(\/)?(\w+)[^>]*>[\s\n]*/g,    //ƥ��ͬһ��ǩ
        nestDeep = 0, //������ȡ�ƥ�䵽ͬһ��ǩ����ʼ��ǩ���һ��ƥ�䵽������ǩ���һ��Ϊ0��˵��ƥ�䵽��Ӧ�Ľ�����ǩ��
        Result,
        obj = {};    //���صĶ���

    while (true) {

        Result = reg.exec(str);

        if (Result === null) {      //�Ҳ���������ǩ
            break;
        }
        if (Result[2] === tag) {   //�ҵ�������ǩ
            if (!Result[1]) {  //�ҵ���ͬһ��ǩ�Ŀ�ʼ��ǩ
                nestDeep += 1;
            } else {  //�ҵ���ͬһ��ǩ�Ľ�����ǩ

                nestDeep = nestDeep - 1;
                if (nestDeep === 0) {   //����һ������
                    obj.str = str.slice(0, Result.index);
                    obj.index = reg.lastIndex;
                    return obj;
                }
            }
        }
    }
    //û��ƥ�䵽������ǩ��

    regTag = /<(\w+)[^>]*>[\s\n]*/g;  //ƥ�������ǩ��
    res = regTag.exec(str);

    //���ض���
    obj.str = str.slice(0, regTag.lastIndex);
    obj.index = regTag.lastIndex;
    return obj;
};

WWQ.createNode = function (type, value, fatherNode) {   //�����ڵ�

    if (type === "text") {   //�����ı��ڵ�
        WWQ.index.text = (WWQ.index.text || 0) + 1;
        WWQ.outputStr += "var text" + WWQ.index.text + "= document.createTextNode('" + value + "');\n";
        WWQ.appendChild("text"   + WWQ.index.text, fatherNode);
    } else {  //���������ڵ�
        WWQ.index[type] = (WWQ.index[type] || 0) + 1;
        WWQ.outputStr += "var " + type + WWQ.index[type] + "= document.createElement('" + type + "');\n";
        WWQ.appendChild(type + WWQ.index[type], fatherNode);
    }
};

WWQ.appendChild = function (newNode, fatherNode) {   //��ӽڵ㵽���ڵ�

    WWQ.outputStr += fatherNode + ".appendChild(" + newNode + ");\n";

};

WWQ.createAttr = function (node, name, value) {   //�����ڵ�����

    if (name === "class") {
        WWQ.outputStr += node + WWQ.index[node] + ".className = '" + value + "';\n";
    } else {
        WWQ.outputStr += node + WWQ.index[node] + ".setAttribute('" + name + "','" + value + "');\n";
    }
};