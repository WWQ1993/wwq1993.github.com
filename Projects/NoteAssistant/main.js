/**
 * Created by WWQ on 2015/9/1 0001.
 * TODO:  点分段样式时，会同时新建段
 * 切割<a>乱码
 *
 * //
 //(function(){
        //    rootNode[0]=[];
        //    rootNode[0][0]=new paragraph.CreateOb("00");
        //    rootNode[0][1]=[];
        //    rootNode[0][1][0]=new paragraph.CreateOb("010");
        //    rootNode[0][1][1]=new paragraph.CreateOb("011");
        //    rootNode[1]=new paragraph.CreateOb("1");
        //    rootNode[2]=[];
        //    rootNode[2][0]=new paragraph.CreateOb("20");
        //    rootNode[2][1]=[];
        //    rootNode[2][1][0]=new paragraph.CreateOb("210");
        //    rootNode[2][1][1]=new paragraph.CreateOb("211");
        //
        //}());
 *
 *
 */

var WWQ={};
var Component = {}; //GUI控件命名空间
var Handle ={}; //事件处理函数命名空间
var Paragraph = {}; //段落相关命名空间

Component.toolBar=$('toolBar');
Component.content=$('content');
Component.toolBar_B = $("toolBar_B");
Component.toolBar_I = $("toolBar_I");
Component.toolBar_U=$("toolBar_U");
Component.toolBar_C=$("toolBar_C");
Component.toolBar_E=$("toolBar_E");
Component.toolBar_L=$("toolBar_L");
Component.toolBar_R=$("toolBar_R");
Component.toolBar_N=$("toolBar_N");

Component.chooseColor=$('chooseColor');
Component.yellowColorBtn=$('yellow');
Component.blueColorBtn=$('blue');
Component.pinkColorBtn=$('pink');
Component.orangeColorBtn=$('orange');
Component.chooseLevelNum = $('chooseLevel');
Component.test1=$('test');
Component.test2=$('test2');
Component.symbolList = $('symbols');//符号竖条控件
WWQ.levelNum = 5;
WWQ.symbolsLevel=[]; //符号竖条字符
WWQ.symbolsOneArr = ['一.','1.','(1)','○','■','□','○','■']; //显示符号横栏字符
WWQ.allSymbolsArr = []; //按符号竖条顺序保存每个符号所有项数组
WWQ.choosedLevel = 0;  //选中的等级
WWQ.currentSymbolsArr=[]; //当前所需级别符号数组。按符号横栏顺序排。
WWQ.mouseDown={};
WWQ.seletedText = "";
WWQ.color={
    yellow:'rgba(255, 255, 0, 0.8)',
    blue:'rgba(0, 0, 255,0.4)',
    pink:'rgba(255, 0, 255,0.4)',
    orange:'rgba(255, 120, 0,0.6)'
};
Paragraph={};   //段落相关

//分级符号初始化
(function(){
    var i,
        str0,
        str1,
        str2,
        str,
        str4,
        str5,
        str6,
        str7,
        str8,
        str9,
        str10

    for(i = 0; i < 9; i++){
        WWQ.allSymbolsArr[i]=[];

    }

    for(i = 1; i < 100; i++){
        str = i;
        str2 = str0 = i.toString();

        if(str0 > 9)
        {
            str0=str0.split("");
            str0.splice(1,0,"A")
            str0=str0.join("");
        }
        str0 = str0.replace(/1/g,'一')
            .replace(/2/g,'二')
            .replace(/3/g,'三')
            .replace(/4/g,'四')
            .replace(/5/g,'五')
            .replace(/6/g,'六')
            .replace(/7/g,'七')
            .replace(/8/g,'八')
            .replace(/9/g,'九')
            .replace(/A0/g,'十')
            .replace(/A/g,'十')
            .replace('一十','十');
        WWQ.allSymbolsArr[0].push(str0);

        str1 = str2 + '.';
        WWQ.allSymbolsArr[1].push(str1);

        str2 ="(" + str2 + ')';
        WWQ.allSymbolsArr[2].push(str2);

        var str30=parseInt(str /10, 10), //十位
            str31= str % 10;
        switch (str30){
            case 0:str30 = '';break;
            case 1:str30 = 'X';break;
            case 2:str30 = 'XX';break;
            case 3:str30 = 'XXX';break;
            case 4:str30 = 'XL';break;
            case 5:str30 = 'L';break;
            case 6:str30 = 'LX';break;
            case 7:str30 = 'LXX';break;
            case 8:str30 = 'LXX';break;
            case 9:str30 = 'XC';break;
        }
        switch (str31){
            case 0:str31 = '';break;
            case 1:str31 = 'I';break;
            case 2:str31 = 'II';break;
            case 3:str31 = 'III';break;
            case 4:str31 = 'IV';break;
            case 5:str31 = 'V';break;
            case 6:str31 = 'VI';break;
            case 7:str31 = 'VII';break;
            case 8:str31 = 'VIII';break;
            case 9:str31 = 'IX';break;
        }
        WWQ.allSymbolsArr[3].push(str30 + str31);

        var str40,  //左位
            str41;
        if (str<27){
            str40 = '';
            str41 = String.fromCharCode(64 + str);
        } else{
            str40 = parseInt(str /26, 10);
            str41= (str) % 26;
            if(str41===0) {
                str40--;
                str41=26;
            }
            str40 = String.fromCharCode(64 + str40);
            str41 = String.fromCharCode(64 + str41);
        }

        WWQ.allSymbolsArr[4].push(str40 + str41);

        var str50,  //左位
            str51;

        if (str<27){
            str50 = '';
            str51 = String.fromCharCode(96 + str);

        } else{
            str50 = parseInt(str /26, 10);
            str51= str % 26;
            if(str51===0) {
                str50--;
                str51=26;
            }
            str50 = String.fromCharCode(96 + str50);
            str51 = String.fromCharCode(96 + str51);
        }
        WWQ.allSymbolsArr[5].push(str50 + str51);
    }
    WWQ.allSymbolsArr[6]='○';
    WWQ.allSymbolsArr[7]='●';
    WWQ.allSymbolsArr[8]='□';
    WWQ.allSymbolsArr[9]='■';
    WWQ.allSymbolsArr[10]='';

    //按照横栏初始值初始化符号等级
    WWQ.currentSymbolsArr[0] = WWQ.allSymbolsArr[0];
    WWQ.currentSymbolsArr[1] = WWQ.allSymbolsArr[1];
    WWQ.currentSymbolsArr[2] = WWQ.allSymbolsArr[2];
    WWQ.currentSymbolsArr[3] = WWQ.allSymbolsArr[6];
    WWQ.currentSymbolsArr[4] = WWQ.allSymbolsArr[9];
    WWQ.currentSymbolsArr[5] = WWQ.allSymbolsArr[8];
    WWQ.currentSymbolsArr[6] = WWQ.allSymbolsArr[6];
    WWQ.currentSymbolsArr[7] = WWQ.allSymbolsArr[9];

    WWQ.levelSymbolsControl={};
    WWQ.levelSymbolsControl.getSymbol=function(currentlevel){
        var arr = WWQ.currentSymbolsArr[currentlevel-1];
        if(Array.isArray(arr)){
            arr.index=arr.index||0;
            arr.index++;
            return arr[arr.index-1];
        }
        return arr;
    };
    WWQ.levelSymbolsControl.resetSymbols=function(currentlevel) {
        WWQ.currentSymbolsArr[currentlevel-1].index=0;
        WWQ.currentSymbolsArr[currentlevel-1] = WWQ.allSymbolsArr[currentlevel-1];
    }
}());

//段落相关方法初始化
(function(){
    var paragraph={};

//样式树
    (function(){
        rootNode = [], //根节点
            id = 0;


        paragraph.CreateOb = function(value){
            this.id = id;
            id++;
            this.value = value;
        };

        //遍历传入id
        paragraph.getNodeData =function(refId, arr){
            var result = {},
                deepthbuf=0

            refId = Number(refId);
            if(!arr){  //第二个参数为空时，默认为根节点
                arr=rootNode;
            }

            (function innerFunction(){
                deepthbuf++;

                for(var i = 0; i < arr.length; i++){
                    if(Array.isArray(arr[i])){

                        arguments.callee(refId,arr[i]);

                    }
                    else if(typeof arr[i]==="object"){

                        if(arr[i].id===refId){
                            result.arr=arr; //保存节点的数组
                            result.index = i;//节点在数组中的下标
                            result.deepth = deepthbuf;//节点的深度（等级）。
                            console.log("find")
                            return true;
                        }
                    }
                }
                deepthbuf--;
            }());

            return result;
        }
        //在节点后建立兄弟节点
        paragraph.createNode = function(refId,value,lowerLevel){
            if(refId===null){
                rootNode[0]=new paragraph.CreateOb(value);
                return;
            }
            var result = paragraph.getNodeData(refId);


            if (!result.arr){
                console.log(refId+"  result is null");
                return;
            }
            if (lowerLevel){
                result.arr.splice(result.index+1,0,[new paragraph.CreateOb(value)]);
            } else{
                //console.log(00.index);
                //paragraph.getNodeData(refId);
                result.arr.splice(result.index+1,0,new paragraph.CreateOb(value));
            }
        };

   paragraph.deleteNode = function(id){
            var result= paragraph.getNodeData(id);
            var deletedArr = result.arr.splice(result.index,1);
        };

        //合并下个兄弟节点
        paragraph.mergeNextNode=function(id){
            var result = paragraph.getNodeData(id);
            if(Array.isArray(result.arr[result.index+1]) ){
                console.log("illage");
            } else{
                result.arr.splice(result.index+1,1);
            }
        }
    })();
    //段落方法
    (function(){
        paragraph.currentLevel=1;   //当前等级，从1开始

        //"点击文末下方"
        paragraph.createParagraph=function(){
            var newParagraph = document.createElement("p"),
                i,
                span,
                textArea;

            newParagraph.style.marginLeft="50px";
            newParagraph.classList.add('h'+paragraph.currentLevel);

            textArea= document.createElement('p');
            textArea.setAttribute('contenteditable','true');
            span = document.createElement('span');
            span.classList.add('spanLevel');

            console.log(Component.content.lastElementChild)
            if (Component.content.lastElementChild) {
                var ref =Number(Component.content.lastElementChild.firstElementChild.id) ;
                span.innerHTML=WWQ.levelSymbolsControl.getSymbol(paragraph.getNodeData(ref).deepth);
                paragraph.createNode(ref,span.innerHTML);

            } else{
                span.innerHTML=WWQ.levelSymbolsControl.getSymbol(paragraph.currentLevel);
                paragraph.createNode(null,span.innerHTML);
            }
            span.id=id-1;
            newParagraph.appendChild(span);
            newParagraph.appendChild(textArea);
            Component.content.appendChild(newParagraph);
            textArea.focus();
        };

        //"↓"
        paragraph.newline=function(){
            document.execCommand('createlink',false,"mark");
            var thisTextArea = document.activeElement;
            var newString = thisTextArea.innerHTML.replace('<a href="mark">','<#>');
            newString = newString.replace(/<a href="mark">/g,'');   //清除富文本自动<a>嵌套
            newString= newString.replace(/<\/a>/g,'');
            newString= newString.split('<#>');

            //解决切割后的特效消失问题
            (function dealTheString(){
                var bString = newString[0],
                    aString = newString[1],
                    Reg = /<(\/)?([^\s>]+)[^>]*>/g,
                    resultArrB = [],
                    resultArrA = [],
                    tag = {},
                    i = 0,
                    pushToAfter = [],
                    pushToBefore = [],
                    regResult

                //before
                while (regResult = Reg.exec(bString)){
                    resultArrB.unshift(regResult);
                }
                for(i = 0; i < resultArrB.length; i++){
                    tag[resultArrB[i][2]] = tag[resultArrB[i][2]] || 0;
                    if (resultArrB[i][1]==="/"){
                        tag[resultArrB[i][2]]--;
                    } else{
                        tag[resultArrB[i][2]]++;
                    }
                    if(tag[resultArrB[i][2]]===1){
                        tag[resultArrB[i][2]]=0;

                        pushToAfter.unshift(resultArrB[i][0]);
                    }
                }
                pushToAfter=pushToAfter.join('');

                //after
                tag = {};
                while (regResult = Reg.exec(aString)){
                    resultArrA.push(regResult);
                }
                for(i = 0; i < resultArrA.length; i++){
                    tag[resultArrA[i][2]] = tag[resultArrA[i][2]] || 0;

                    if (resultArrA[i][1]==="/"){
                        tag[resultArrA[i][2]]--;
                    } else{
                        tag[resultArrA[i][2]]++;
                    }
                    if(tag[resultArrA[i][2]]===-1){
                        tag[resultArrA[i][2]]=0;
                        pushToBefore.push(resultArrA[i][0]);
                    }
                }
                pushToBefore=pushToBefore.join('');

                newString[0]= newString[0] + pushToBefore ;
                newString[1]=pushToAfter+ newString[1] ;
            }());
            thisTextArea.innerHTML = newString[0];

            var newParagraph = document.createElement("p"),
                i,
                span,
                textArea;

            newParagraph.style.marginLeft="50px";
            newParagraph.classList.add('h'+paragraph.currentLevel);

            textArea= document.createElement('p');
            textArea.setAttribute('contenteditable','true');
            textArea.innerHTML = newString[1];
            span = document.createElement('span');
            span.classList.add('spanLevel');

            var ref = thisTextArea.previousElementSibling.id;
            span.innerHTML=WWQ.levelSymbolsControl.getSymbol(paragraph.getNodeData(ref).deepth);
            paragraph.createNode(ref,span.innerHTML);

            span.id=id-1;
            newParagraph.appendChild(span);
            newParagraph.appendChild(textArea);
            Component.content.insertBefore(newParagraph,thisTextArea.parentNode.nextElementSibling);
            textArea.focus();
            Paragraph.updateThisLevelSymbols(ref);

        };
        //TODO 删除节点，更新标号，更新树
        paragraph.removeNullParagraph =function(){    //移除空段

        };
        paragraph.mergeNextParagraph = function(){
            var thisParagraph = document.activeElement;
            var nextP = thisParagraph.nextElementSibling;
            //for(var m = 0; m < thisParagraph.childNodes.length; m++){
            //    console.log(thisParagraph.childNodes[m].nodeName)
            //}
            nextP.removeChild(nextP.firstElementChild);

            thisParagraph.innerHTML += nextP.innerHTML;

            nextP.innerHTML='';
        };
        paragraph.levelUp=function(){

        };
        paragraph.levelDown = function () {

        };
        //修改本级所有分段符号，并更新文本所有分段符号
        paragraph.updateThisLevelSymbols = function(id){
            var thisLevelarr =Paragraph.getNodeData(id).arr,
                currentLevel = Paragraph.getNodeData(id).deepth;

            WWQ.levelSymbolsControl.resetSymbols(currentLevel );

            for(var i = 0; i < thisLevelarr.length; i++){
                if(!Array.isArray(thisLevelarr[i])){
                    thisLevelarr[i].value=WWQ.levelSymbolsControl.getSymbol(currentLevel);
                }
            }
            //更新文本所有分段符号
            //建议多使用querySelector。简化操作
            var span= document.querySelectorAll('#content>p>span')

            for(var j =0; j<span.length; j++) {
                console.log(span[j].id)
                var ob = Paragraph.getNodeData(span[j].id);
                span[j].innerHTML = ob.arr[ob.index].value;
            }

        }
    })();


    Paragraph=paragraph;
}());
Handle.levelList = function(event ){
    WWQ.choosedLevel = this.j;

    this.style.background="#ced3d7";
    Component.symbolList.style.display = "block";

    Component.symbolList.style.left=this.offsetLeft +'px';
    if (navigator.userAgent.indexOf('Firefox') >= 0){
        Component.symbolList.style.left=(this.offsetLeft-5) +'px';
    }
};

Handle.toolsBtnMouseDown = function(event ){
    this.style.background="darkgrey";
    event.preventDefault();
};
Handle.toolsBtnMouseOut = function( ){
    this.style.background="#ced3d7";
};
//点击选择分级数目按钮时调用
Handle.chooseNumfunc = function(event){

    if(this === Component.chooseLevelNum &&$('chooseLevel').style.backgroundPositionY==='-18px'){
        $('chooseLevel').style.backgroundPositionY = $('chooseLevel').style.backgroundPositionY=="-18px"?"10px":"-18px"

        return;
    }
    $('chooseLevel').style.backgroundPositionY = $('chooseLevel').style.backgroundPositionY=="-18px"?"10px":"-18px"

    $('numberList').style.display = "block";
    $('numberList').style.left=(Component.chooseLevelNum.offsetLeft )+'px';
    if (navigator.userAgent.indexOf('Firefox') >= 0){
        $('numberList').style.left=(Component.chooseLevelNum.offsetLeft-5) +'px';

    }
    this.style.border = 'outset thin rgba(212, 212, 212, 0.41)';
};

//符号横条更新
(Handle.updateLevelDisplay=function(){
    var i,
        j,
        childNodes = $('levelDetail').childNodes;

    $('numberList').style.display = "none";
    $('chooseLevel').style.backgroundPositionY = "10px"
    Component.symbolList.style.display = "none";

    for(i = 0, j = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1 ) {
            childNodes[i].style.display="none";
        }
    }
    for(i = 0, j = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1 && j<WWQ.levelNum) {
            childNodes[i].style.display="inline-block";
            childNodes[i].innerHTML=WWQ.symbolsOneArr[j];
            childNodes[i].addEventListener('mousedown',Handle.toolsBtnMouseDown);
            childNodes[i].addEventListener('mouseout',Handle.toolsBtnMouseOut);

            childNodes[i].j = j;
            childNodes[i].addEventListener('click', Handle.levelList);
            j++;

        }
    }
})();



//符号竖条
(function(){
    var i,
        j,
        childNodes = Component.symbolList.childNodes;
    for(i = 0, j = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1 ) {
            WWQ.symbolsLevel.push(childNodes[i].innerHTML);
            childNodes[i].addEventListener('mousedown', function (event) {
                WWQ.underChooseS=true;
                this.style.background="darkgrey";
                event.preventDefault();
            });
            childNodes[i].addEventListener('mouseout',Handle.toolsBtnMouseOut);
            childNodes[i].ind= j;
            childNodes[i].addEventListener('click',function(event ){
                this.style.background="#ced3d7";
                WWQ.underChooseS=false;

                WWQ.symbolsOneArr[WWQ.choosedLevel] = WWQ.symbolsLevel[this.ind];
                Handle.updateLevelDisplay();
                WWQ.currentSymbolsArr[WWQ.choosedLevel] = WWQ.allSymbolsArr[this.ind];

                for (var index = 0; index < WWQ.levelNum; index++){
                    if(Array.isArray(WWQ.currentSymbolsArr[index])){
                        console.log(WWQ.currentSymbolsArr[index][0]);
                    }
                    else{
                        console.log(WWQ.currentSymbolsArr[index])
                    }
                }
            });
            j++;

        }
    }

})();

//bar点击相关
(function(){


    Component.toolBarMouseDown = function(event) {
        if(event.button === 0){
            this.style.backgroundColor="grey";
            Component.chooseColor.style.display="none";
        }
        event.preventDefault(); //使按钮文字不可选,已选的文本不失焦

    };
    Component.toolBarMouseUp = function(event){
        if(event.button === 0){
            switch (this.id){
                case 'toolBar_B':
                    document.execCommand('bold',false,null);
                    break;
                case 'toolBar_I':
                    document.execCommand('italic',false,null);
                    break;
                case 'toolBar_U':
                    document.execCommand('underline',false,null);
                    break;
                case 'toolBar_C':  //弹出选色菜单
                    Component.chooseColor.style.display="block";
                    if(parseInt(Component.toolBar.style.top,10) + Component.toolBar.offsetHeight >=document.documentElement.clientHeight)
                    {
                        Component.toolBar.style.top=(document.documentElement.clientHeight-Component.toolBar.offsetHeight)+ "px";
                    }
                    break;
                case 'toolBar_E':
                    Paragraph.newline();

                    break;
                case 'toolBar_L':
                    //Paragraph.mergeNextParagraph();

                    break;
                case 'toolBar_R':
                    Paragraph.levelDown();
                    break;
                case 'toolBar_N':
                    break;
            }
        }
        event.stopPropagation(); //避免隐藏bar。

        this.style.backgroundColor="rgba(212, 212, 212, 0.41)";
    };
    Component.toolBarMouseout=function(){
        this.style.backgroundColor="rgba(212, 212, 212, 0.41)";
    };

    function addListener(target){
        target.addEventListener("mousedown",Component.toolBarMouseDown);
        target.addEventListener("mouseup",Component.toolBarMouseUp);;
        target.addEventListener("mouseout",Component.toolBarMouseout);
    };
    addListener(Component.toolBar_B);
    addListener(Component.toolBar_I);
    addListener(Component.toolBar_U);
    addListener(Component.toolBar_C);
    addListener(Component.toolBar_E);
    addListener(Component.toolBar_L);
    addListener(Component.toolBar_R);
    addListener(Component.toolBar_N);


    Component.chooseColorUp=function(event){
        var i = 0;
        WWQ.choosedColor=WWQ.color[this.id];
        Component.chooseColor.style.display="none";
        document.execCommand('backcolor',false,WWQ.choosedColor);

        event.stopPropagation(); //避免隐藏bar。

    };
    Component.chooseColorDown=function(event){
        this.classList.add('blackBorder');

        event.preventDefault();
    };

    Component.blueColorBtn.addEventListener('mouseup',Component.chooseColorUp);
    Component.yellowColorBtn.addEventListener('mouseup',Component.chooseColorUp);
    Component.pinkColorBtn.addEventListener('mouseup',Component.chooseColorUp);
    Component.orangeColorBtn.addEventListener('mouseup',Component.chooseColorUp);

    Component.blueColorBtn.addEventListener('mousedown',Component.chooseColorDown);
    Component.yellowColorBtn.addEventListener('mousedown',Component.chooseColorDown);
    Component.pinkColorBtn.addEventListener('mousedown',Component.chooseColorDown);
    Component.orangeColorBtn.addEventListener('mousedown',Component.chooseColorDown);

    Component.chooseColor.addEventListener('mouseout',function(event){
        var nodes=this.childNodes,
            i = 0;
        for (i; i < nodes.length; i++ ){
            if(nodes[i].nodeType==1&& nodes[i].classList.contains('blackBorder'))
            {
                nodes[i].classList.remove('blackBorder');
            }
        }
    });
}());

//文档点击事件
(function () {
    //mousedown
    document.addEventListener('mousedown',function(event){
        if(event.button!==0){
            return;
        }
        WWQ.mouseDown.clientY=event.clientY;

        if(!WWQ.underChooseN&&!WWQ.underChooseS&&
            (
            $('numberList').style.display === "block"||
            Component.symbolList.style.display === "block")){ //没点数字条或者符号竖条
            Handle.updateLevelDisplay();
            event.preventDefault()
        }
    });

    //mouseup
    document.addEventListener('mouseup',function(event){

        event.preventDefault();

        WWQ.seletedText = "";
        if(event.button!==0){   //忽略非左击操作
            return;
        }

        //获取选择的文本
        if(window.getSelection)
        {
            WWQ.seletedText=window.getSelection().toString();
        }
        else
        {
            WWQ.seletedText=document.selection.createRange().text.toString();
        }

        if (!WWQ.seletedText || WWQ.mouseDown.clientY < Component.content.offsetTop)    //未选取文字时隐藏
        {
            Component.toolBar.style.display="none";
            Component.chooseColor.style.display="none";
            //lastchild距离浏览器顶部距离。
            var lastY = 0;
            if(Component.content.lastElementChild){
                lastY=Component.content.lastElementChild.offsetTop + Component.content.lastElementChild.offsetHeight
                    - (document.body.scrollTop||document.documentElement.scrollTop);
            }
            else{
                lastY=$('tools').offsetHeight;
            }

            //新建段落
            if ( WWQ.mouseDown.clientY>=lastY && event.clientY>=lastY){            //新建段落

                Paragraph.createParagraph();
            }

            return;
        }
        Component.toolBar.style.display="block";
        //修正bar位置
        if(event.clientY>=0) {
            if(event.clientY + Component.toolBar.offsetHeight >=document.documentElement.clientHeight)
            {
                Component.toolBar.style.top=(document.documentElement.clientHeight-Component.toolBar.offsetHeight)+ "px";
            }
            else
                Component.toolBar.style.top = (event.clientY + 3)+ "px";
        } else{
            Component.toolBar.style.top = "0px";
        }
        if(event.clientX-Component.toolBar.offsetWidth/2>0){
            if(event.clientX+Component.toolBar.offsetWidth< document.documentElement.clientWidth){
                Component.toolBar.style.left=(event.clientX-Component.toolBar.offsetWidth/2)+ "px";
            } else{
                Component.toolBar.style.left=document.documentElement.clientWidth-Component.toolBar.offsetWidth+"px";
            }
        } else{
            Component.toolBar.style.left="0px";
        }
    });

    //屏蔽右击
    Component.content.oncontextmenu = function(event){
        return false;
    };
})();

//选数按钮
(function(){
    Component.chooseLevelNum.addEventListener('mousedown',function(e){
        this.style.border = 'outset thin black';
    });

    Component.chooseLevelNum.addEventListener('click',Handle.chooseNumfunc);

}());

//数字条事件
(function () {
    var childNodes = $('numberList').childNodes,
        arr = [],
        i,
        j;
    for(i = 0, j = 0; i < childNodes.length; i++){
        if(childNodes[i].nodeType === 1){
            j++;
            childNodes[i].ind = j;
            childNodes[i].addEventListener('mousedown',function(event){
                this.style.background="darkgrey";
                event.preventDefault();
                WWQ.underChooseN=true;
            });
            childNodes[i].addEventListener('mouseout',Handle.toolsBtnMouseOut);
            childNodes[i].addEventListener('click',function(event ){    //选好等级数
                WWQ.levelNum=this.ind;
                Handle.updateLevelDisplay();
                WWQ.underChooseN=false;
                this.style.background="#ced3d7";
            });
        }
    }
})();
