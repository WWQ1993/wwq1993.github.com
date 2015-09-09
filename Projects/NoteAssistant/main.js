/**
 * Created by WWQ on 2015/9/1 0001.
 * TODO:
 * 切割<a>乱码
 *
 * //
 //(function(){
        //    rootNode[0]=[];
        //    rootNode[0][0]=new Paragraph.CreateTreeNode("00");
        //    rootNode[0][1]=[];
        //    rootNode[0][1][0]=new Paragraph.CreateTreeNode("010");
        //    rootNode[0][1][1]=new Paragraph.CreateTreeNode("011");
        //    rootNode[1]=new Paragraph.CreateTreeNode("1");
        //    rootNode[2]=[];
        //    rootNode[2][0]=new Paragraph.CreateTreeNode("20");
        //    rootNode[2][1]=[];
        //    rootNode[2][1][0]=new Paragraph.CreateTreeNode("210");
        //    rootNode[2][1][1]=new Paragraph.CreateTreeNode("211");
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
WWQ.choosedLevelBuf={};
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
        if(Array.isArray(WWQ.currentSymbolsArr[currentlevel-1])){
            WWQ.currentSymbolsArr[currentlevel-1].index=0;
        }
        WWQ.currentSymbolsArr[currentlevel-1] = WWQ.allSymbolsArr[WWQ.choosedLevelBuf[currentlevel-1]||(currentlevel-1)];
    }
}());

//Paragraph模型
(function(){
    var rootNode = [], //根节点
        id = 0; //分配标准，不能重置。

    rootNode.domNode = Component.content;

    //接口
    Paragraph.interface = function (func) {
        switch (func){
            case 'updateSymbols':
                updateSymbols();
                break;
            case 'newline':
                newline();
                break;
            case 'levelUp':
                levelUp();
                break;
            case 'levelDown':
                levelDown();
                break;
            case 'createParagraph':
                createParagraph();
                break;
            case 'center':
                center();
        }
    }

    //创建树节点
    var CreateTreeNode = function(domNode){
        this.id = id;
        id++;
        this.index = 0; //节点处于父数组下的位置
        this.level = 0; //节点层级
        this.parentArr = []; //当前节点的父数组
        this.domNode = domNode; //指向一个DOM节点。
    };

    //rootNode[0]=[{id:0},{id:1}];
    //rootNode[1]={id:2};

    //返回id对应节点
    var getNodeById =function(refId){
        var deepthbuf=0;

        function innerFunction(refId,arr){
            deepthbuf++;

            for(var i = 0; i < arr.length; i++){
                if(Array.isArray(arr[i])){
                    var node;
                    if( node = arguments.callee(refId,arr[i])){
                        return node;
                    }
                } else if(arr[i].id==refId){
                    arr[i].index = i;
                    arr[i].level = deepthbuf;
                    arr[i].parentArr = arr;
                    return arr[i];
                }
            }
            deepthbuf--;
        };

        return innerFunction(refId,rootNode);
    };
    //获得传入数组的信息（其父数组、下标索引）
    var getArrData = function(array){

        function innerFunction(inputArray,arr){
            for(var i = 0; i < arr.length; i++){
                if(Array.isArray(arr[i])){
                    if(arr[i]===inputArray){
                        arr[i].inde = i;
                        arr[i].parentArr = arr;
                        return arr[i];
                    }
                    else{
                        //  to be or not to be return——> 递归的关键细节。错误示例：
                        //  arguments.callee(inputArray,arr[i])； 导致最终返回值可能为空（即使找到了）
                        //  return arguments.callee(inputArray,arr[i])； 循环失效
                        var node;
                        if(node= arguments.callee(inputArray,arr[i])){
                            return node;
                        }
                    }
                }
            }
        };
        return innerFunction(array,rootNode);
    }

    //在（本级、上级、下级）建立节点
    var createNodeAfterId = function(refId,domNode,lowerLevel,higherLevel){

        var newNode = new CreateTreeNode(domNode);

        if(refId===null){   //建立rootNode下第一个节点
            rootNode.push(newNode);
            getNodeById(newNode.id);
            return newNode;
        }

        var result = getNodeById(refId);

        if (!result){   //传入id无效
            console.log(refId+"  ：传入id无效");
            return false;
        }
        if (lowerLevel){    //在参考节点后建立下层节点

            result.parentArr.splice(result.index+1,0,[newNode]);

        } else if(higherLevel){ //将元素、元素后的兄弟节点构成的数组 移至其父数组后

            var itsParent = getArrData(result.parentArr),
                nodesAfterthisArr = [];

            for(var j = result.index+1; j<itsParent.length; j++){
                nodesAfterthisArr.push(itsParent[j]);
            }

            if(nodesAfterthisArr.length>0){
                itsParent.parentArr.splice(itsParent.inde+1,0,newNode,nodesAfterthisArr);

            } else {
                itsParent.parentArr.splice(itsParent.inde+1,0,newNode);
            }

            removeNodeById(refId);

            getNodeById(newNode.id);

            //如果移动后数组为空则删除原数组
            itsParent.length=result.index;
            if(!itsParent.length){
                itsParent.parentArr.splice(itsParent.inde,1);
            }
        }

        else{ //在参考节点后建立兄弟节点
            result.parentArr.splice(result.index+1,0,newNode);
        }

        getNodeById(newNode.id);
        return newNode;
    };

    //删除id对应节点
    var removeNodeById = function(id){
        var result= getNodeById(id);
        return result.parentArr.splice(result.index,1);
    };

    //更新所有符号
    var updateSymbols=function(){
        var thisParagraph = document.querySelectorAll('#content>p');
        for(var i = 0; i < thisParagraph.length; i++){
            var node = getNodeById(thisParagraph[i].id);

            //如果和前一个节点处于同级，合并两个节点
            if(thisParagraph[i].previousElementSibling &&
                getNodeById(thisParagraph[i].previousElementSibling.id).level===
                node.level ) {

                newNode = createNodeAfterId(thisParagraph[i].previousElementSibling.id,thisParagraph[i]);
                removeNodeById(thisParagraph[i].id);
                newNode.domNode.id=newNode.id;
                node = getNodeById(thisParagraph[i].id);
            }

            // 去除数组节点对同级编号的影响
            var  realIndex = 0;
            node.parentArr.forEach(function(childNode,index){
                if(!Array.isArray(childNode)) {
                    childNode.realIndex = realIndex++;
                }
            });

            //设置编号样式
            thisParagraph[i].firstElementChild.innerHTML=WWQ.currentSymbolsArr[node.level-1][node.realIndex]||
                WWQ.currentSymbolsArr[node.level-1];

        }
    };

    //删除空行
    var removeNullParagraph=function(){
        var textContent = document.querySelectorAll('#content>p>p');
        for(var i = 0; i < textContent.length; i++){
            if(textContent[i].innerHTML===''){
                removeNodeById(textContent[i].parentNode.id);
                Component.content.removeChild(textContent[i].parentNode) ;
            }
        }
    };

    //"点击文末下方"，新建平级段
    var createParagraph=function(){
        removeNullParagraph();

        var newParagraph = document.createElement("p"),
            lastParagraph = Component.content.lastElementChild||null,
            currentLevel =lastParagraph&&getNodeById(lastParagraph.id).level|| 1,
            span,
            textArea=document.createElement('p'),
            newNode;


        newParagraph.style.marginLeft=(25*currentLevel) +"px";
        newParagraph.className = 'h'+currentLevel;

        textArea.setAttribute('contenteditable','true');
        span = document.createElement('span');
        span.classList.add('spanLevel');

        newParagraph.appendChild(span);
        newParagraph.appendChild(textArea);

        if (lastParagraph) {
            newNode = createNodeAfterId(lastParagraph.id,newParagraph);
        } else{
            newNode = createNodeAfterId(null,newParagraph);
        }
        newNode.domNode.id=newNode.id;

        Component.content.appendChild(newNode.domNode);

        textArea.focus();
        updateSymbols();

        //获取焦点时移除空行
        textArea.onfocus=function(){
            removeNullParagraph();
        }

    };

    //"↓"  切割某段至新建的平级段
    var newline=function(){
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
            thisParagraph = thisTextArea.parentNode,
            currentLevel =getNodeById(thisParagraph.id).level,
            span,
            textArea=document.createElement('p'),
            newNode;

        newParagraph.style.marginLeft=(25*currentLevel) +"px";
        newParagraph.className = 'h'+currentLevel;

        textArea.setAttribute('contenteditable','true');
        span = document.createElement('span');
        span.classList.add('spanLevel');

        newParagraph.appendChild(span);
        newParagraph.appendChild(textArea);

        newNode = createNodeAfterId(thisParagraph.id,newParagraph);

        newNode.domNode.id=newNode.id;

        Component.content.insertBefore(newNode.domNode,thisParagraph.nextElementSibling);

        textArea.focus();
       updateSymbols();

        textArea.innerHTML = newString[1];

        //获取焦点时移除空行
        textArea.onfocus=function(){
           removeNullParagraph();
        }
    };
    //<- 本段级别提升
    var levelUp=function(){
        var thisTextArea = document.activeElement,
            thisParagraph = thisTextArea.parentNode,
            currentLevel = getNodeById(thisParagraph.id).level,
            newNode;

        currentLevel--;
        if(currentLevel<1){
            return;
        }
        thisParagraph.style.marginLeft=(25*currentLevel) +"px";
        thisParagraph.className = 'h'+currentLevel;
        newNode =createNodeAfterId(thisParagraph.id,thisParagraph,false,true);

        newNode.domNode.id=newNode.id;
       updateSymbols();

    };
    //-> 本段级别下降
    var levelDown = function () {
        var thisTextArea = document.activeElement,
            thisParagraph = thisTextArea.parentNode,
            currentLevel = getNodeById(thisParagraph.id).level,
            newNode;

        currentLevel++;
        if(currentLevel>WWQ.levelNum){
            return;
        }
        thisParagraph.style.marginLeft=(25*currentLevel) +"px";
        thisParagraph.className = 'h'+currentLevel;

        newNode =createNodeAfterId(thisParagraph.id,thisParagraph,true);

       removeNodeById(thisParagraph.id);
        newNode.domNode.id=newNode.id;
       updateSymbols();

    };

    //更新文本所有分段符号
    var updateThisLevelSymbols = function(){
    }

    var center =function(){
        var thisTextArea = document.activeElement;
        thisTextArea.style.textAlign = thisTextArea.style.textAlign==="center"?'left':'center';
        Component.toolBar_N.style.textAlign= Component.toolBar_N.style.textAlign==="left"?'center':'left';
    }
}());

//符号横栏每项点击事件
Handle.levelList = function(event ){
    WWQ.choosedLevel = this.j;

    this.style.background="rgba(212, 212, 212, 0.6)";
    Component.symbolList.style.display = "block";

    Component.symbolList.style.left=this.offsetLeft +'px';
    if (navigator.userAgent.indexOf('Firefox') >= 0){
        Component.symbolList.style.left=(this.offsetLeft-5) +'px';
    }
};

//按下按钮事件的处理方法
Handle.toolsBtnMouseDown = function(event ){
    this.style.background="#CACACA";
    event.preventDefault();
};

//鼠标从按下的按钮内移出 的处理方法
Handle.toolsBtnMouseOut = function( ){

    this.style.background="rgba(212, 212, 212, 0.6)";
};

//点击选择分级数目按钮时调用
Handle.chooseNumfunc = function(event){

    //图标切换
    $('chooseLevel').style.backgroundPositionY = $('chooseLevel').style.backgroundPositionY=="-18px"?"10px":"-18px"

    $('numberList').style.display = "block";
    $('numberList').style.left=(Component.chooseLevelNum.offsetLeft )+'px';
    if (navigator.userAgent.indexOf('Firefox') >= 0){
        $('numberList').style.left=(Component.chooseLevelNum.offsetLeft-5) +'px';

    }
    this.style.border = 'outset thin rgba(212, 212, 212, 0.6)';
};

//符号横条更新
(Handle.updateLevelDisplay=function(){
    var i,
        j,
        childNodes = $('levelDetail').childNodes;

    $('numberList').style.display = "none";
    $('chooseLevel').style.backgroundPositionY = "10px"
    Component.symbolList.style.display = "none";

    //横条每项：
    for(i = 0, j = 0; i < childNodes.length; i++) {
        //隐藏每项
        if (childNodes[i].nodeType === 1 ) {
            childNodes[i].style.display="none";
        }
        //设置要显示的项
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
    //符号竖条每一项
    for(i = 0, j = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1 ) {

            //保存字条的每一项
            WWQ.symbolsLevel.push(childNodes[i].innerHTML);
            //按下鼠标事件
            childNodes[i].addEventListener('mousedown', function (event) {
                WWQ.underChooseS=true;
                this.style.background="#CACACA";
                event.preventDefault();
            });
            //鼠标移除事件
            childNodes[i].addEventListener('mouseout',Handle.toolsBtnMouseOut);

            //选好某一级符号后触发
            childNodes[i].ind= j;
            childNodes[i].addEventListener('click',function(event ){
                this.style.background="rgba(212, 212, 212, 0.6)";
                WWQ.underChooseS=false;

                WWQ.symbolsOneArr[WWQ.choosedLevel] = WWQ.symbolsLevel[this.ind];
                Handle.updateLevelDisplay();
                WWQ.choosedLevelBuf[WWQ.choosedLevel] = this.ind;
                WWQ.currentSymbolsArr[WWQ.choosedLevel] = WWQ.allSymbolsArr[WWQ.choosedLevelBuf[WWQ.choosedLevel]];
                Paragraph.interface('updateSymbols') ;
            });
            j++;

        }
    }

})();

//bar点击相关
(function(){

    WWQ.showColorSelector = function(){
        Component.chooseColor.style.display="block";
        if(parseInt(Component.toolBar.style.top,10) + Component.toolBar.offsetHeight >=
            document.documentElement.clientHeight)
        {
            Component.toolBar.style.top=(document.documentElement.clientHeight-
                Component.toolBar.offsetHeight)+ "px";
        }
    }

    Handle.toolBarMouseDown = function(event) {
        if(event.button === 0){
            this.style.backgroundColor="#CACACA";
            Component.chooseColor.style.display="none";
        }
        event.preventDefault(); //使按钮文字不可选,已选的文本不失焦
    };

    Handle.toolBarMouseUp = function(event){
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
                    WWQ.showColorSelector();
                    break;
                case 'toolBar_E':
                    Paragraph.interface('newline') ;
                    break;
                case 'toolBar_L':
                    Paragraph.interface('levelUp') ;
                    break;
                case 'toolBar_R':
                    Paragraph.interface('levelDown') ;
                    break;
                case 'toolBar_N':
                    Paragraph.interface('center');
                    break;
            }
        }
        event.stopPropagation(); //避免隐藏bar。

        this.style.backgroundColor="rgba(212, 212, 212, 0.6)";
    };
    Handle.toolBarMouseout=function(){
        this.style.backgroundColor="rgba(212, 212, 212, 0.6)";
    };

    function addListener(target){
        target.addEventListener("mousedown",Handle.toolBarMouseDown);
        target.addEventListener("mouseup",Handle.toolBarMouseUp);;
        target.addEventListener("mouseout",Handle.toolBarMouseout);
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

        if(!WWQ.underChooseN && !WWQ.underChooseS &&
            (
            $('numberList').style.display === "block"||
            Component.symbolList.style.display === "block"
            )
        ){ //没点数字条或者符号竖条
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
            } else{
                lastY=$('tools').offsetHeight;
            }

            //新建段落
            if ( WWQ.mouseDown.clientY>=lastY && event.clientY>=lastY){            //新建段落
                Paragraph.interface('createParagraph') ;
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

//数字条
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
                this.style.background="#CACACA";
                event.preventDefault();
                WWQ.underChooseN=true;
            });
            childNodes[i].addEventListener('mouseout',Handle.toolsBtnMouseOut);
            childNodes[i].addEventListener('click',function(event ){    //选好等级数
                WWQ.levelNum=this.ind;
                Handle.updateLevelDisplay();
                WWQ.underChooseN=false;
                this.style.background="rgba(212, 212, 212, 0.6)";
            });
        }
    }
})();

