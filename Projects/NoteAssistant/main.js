/**
 * Created by WWQ on 2015/9/1 0001.
 */
var WWQ={};

WWQ.toolBar_B = $("toolBar_B");
WWQ.toolBar_I = $("toolBar_I");
WWQ.toolBar_U=$("toolBar_U");
WWQ.toolBar_C=$("toolBar_C");
WWQ.toolBar=$('toolBar');
WWQ.content=$('content');
WWQ.chooseColor=$('chooseColor');
WWQ.yellowColorBtn=$('yellow');
WWQ.blueColorBtn=$('blue');
WWQ.pinkColorBtn=$('pink');
WWQ.orangeColorBtn=$('orange');
WWQ.chooseLevel = $('chooseLevel');
WWQ.test1=$('test');
WWQ.test2=$('test2');
WWQ.levelNum = 5;
WWQ.symbolList = $('symbols');
WWQ.symbols=[];
WWQ.symbolsArr = ['一','1','(1)','○','■','□','○','■'];
WWQ.choosedLevelListNum = 0;
WWQ.color={
    yellow:'rgba(255, 255, 0, 0.8)',
    blue:'rgba(0, 0, 255,0.4)',
    pink:'rgba(255, 0, 255,0.4)',
    orange:'rgba(255, 120, 0,0.6)'
};
WWQ.mouseDown={};
WWQ.seletedText = "";

WWQ.stopPro = function(e){//TODO delete
    e.stopPropagation();
};

WWQ.toolsBtnMouseDown = function(event ){
    this.style.background="darkgrey";
    event.preventDefault();
};
WWQ.toolsBtnMouseOut = function( ){
    this.style.background="#ced3d7";
};

WWQ.chooseNumfunc = function(event){

    if(this === WWQ.chooseLevel &&$('chooseLevel').style.backgroundPositionY==='-18px'){
        $('chooseLevel').style.backgroundPositionY = $('chooseLevel').style.backgroundPositionY=="-18px"?"10px":"-18px"

        return;
    }
    $('chooseLevel').style.backgroundPositionY = $('chooseLevel').style.backgroundPositionY=="-18px"?"10px":"-18px"

    $('numbers').style.display = "block";

    this.style.border = 'outset thin rgba(212, 212, 212, 0.41)';
};

//符号横条更新
(WWQ.updateLevelDisplay=function(){
    var i,
        j,
        childNodes = $('levelDetail').childNodes;

    $('numbers').style.display = "none";
    $('chooseLevel').style.backgroundPositionY = "10px"
    WWQ.symbolList.style.display = "none";


    for(i = 0, j = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1 ) {

            childNodes[i].style.display="none";
        }
    }
    for(i = 0, j = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1 && j<WWQ.levelNum) {
            j++;
            childNodes[i].style.display="inline-block";
            childNodes[i].innerHTML=WWQ.symbolsArr[j-1];
            childNodes[i].addEventListener('mousedown',WWQ.toolsBtnMouseDown);
            childNodes[i].addEventListener('mouseout',WWQ.toolsBtnMouseOut);

            childNodes[i].j = j-1;
            childNodes[i].addEventListener('click',function(event ){
                WWQ.choosedLevelListNum = this.j;

                this.style.background="#ced3d7";
                WWQ.symbolList.style.display = "block";
                WWQ.symbolList.style.left=(this.offsetLeft-1  )+'px';
            });
        }
    }
})();

//符号竖条
(function(){
    var i,
        j,
        childNodes = WWQ.symbolList.childNodes;
    for(i = 0, j = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1 ) {
            WWQ.symbols.push(childNodes[i].innerHTML);
            childNodes[i].addEventListener('mousedown', function (event) {
                WWQ.underChooseS=true;
                this.style.background="darkgrey";
                event.preventDefault();
            });
            childNodes[i].addEventListener('mouseout',WWQ.toolsBtnMouseOut);
            childNodes[i].ind= j;
            childNodes[i].addEventListener('click',function(event ){
                this.style.background="#ced3d7";
                WWQ.underChooseS=false;
                //console.log(this.ind)
                console.log(WWQ.choosedLevelListNum )
                WWQ.symbolsArr[WWQ.choosedLevelListNum] = WWQ.symbols[this.ind];
                WWQ.updateLevelDisplay();
            });
            j++;

        }
    }

})();

//TODO
WWQ.test1.addEventListener('click', WWQ.stopPro);
WWQ.test2.addEventListener('click', WWQ.stopPro);

//bar点击相关
(function(){
    WWQ.toolBarMouseDown = function(event) {
        if(event.button === 0){
            this.style.backgroundColor="grey";
            WWQ.chooseColor.style.display="none";
        }
        event.preventDefault(); //使按钮文字不可选,已选的文本不失焦

    };
    WWQ.toolBarMouseUp = function(event){
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
                case 'toolBar_C':
                    WWQ.chooseColor.style.display="block";
                    if(parseInt(WWQ.toolBar.style.top,10) + WWQ.toolBar.offsetHeight >=document.documentElement.clientHeight)
                    {
                        WWQ.toolBar.style.top=(document.documentElement.clientHeight-WWQ.toolBar.offsetHeight)+ "px";
                    }

                    break;
            }
        }
        event.stopPropagation(); //避免隐藏bar。

        this.style.backgroundColor="rgba(212, 212, 212, 0.41)";
    };
    WWQ.toolBarMouseout=function(){
        this.style.backgroundColor="rgba(212, 212, 212, 0.41)";
    };

    WWQ.chooseColorUp=function(event){
        var i = 0;
        WWQ.choosedColor=WWQ.color[this.id];
        WWQ.chooseColor.style.display="none";
        document.execCommand('backcolor',false,WWQ.choosedColor);


        event.stopPropagation(); //避免隐藏bar。

    };
    WWQ.chooseColorDown=function(event){
        this.classList.add('blackBorder');

        event.preventDefault();
    };
    WWQ.toolBar_B.addEventListener("mousedown",WWQ.toolBarMouseDown);
    WWQ.toolBar_B.addEventListener("mouseup",WWQ.toolBarMouseUp);
    WWQ.toolBar_B.addEventListener("mouseout",WWQ.toolBarMouseout);

    WWQ.toolBar_I.addEventListener("mousedown",WWQ.toolBarMouseDown);
    WWQ.toolBar_I.addEventListener("mouseup",WWQ.toolBarMouseUp);
    WWQ.toolBar_I.addEventListener("mouseout",WWQ.toolBarMouseout);

    WWQ.toolBar_U.addEventListener("mousedown",WWQ.toolBarMouseDown);
    WWQ.toolBar_U.addEventListener("mouseup",WWQ.toolBarMouseUp);
    WWQ.toolBar_U.addEventListener("mouseout",WWQ.toolBarMouseout);

    WWQ.toolBar_C.addEventListener("mousedown",WWQ.toolBarMouseDown);
    WWQ.toolBar_C.addEventListener("mouseup",WWQ.toolBarMouseUp);
    WWQ.toolBar_C.addEventListener("mouseout",WWQ.toolBarMouseout);

    WWQ.blueColorBtn.addEventListener('mouseup',WWQ.chooseColorUp);
    WWQ.yellowColorBtn.addEventListener('mouseup',WWQ.chooseColorUp);
    WWQ.pinkColorBtn.addEventListener('mouseup',WWQ.chooseColorUp);
    WWQ.orangeColorBtn.addEventListener('mouseup',WWQ.chooseColorUp);

    WWQ.blueColorBtn.addEventListener('mousedown',WWQ.chooseColorDown);
    WWQ.yellowColorBtn.addEventListener('mousedown',WWQ.chooseColorDown);
    WWQ.pinkColorBtn.addEventListener('mousedown',WWQ.chooseColorDown);
    WWQ.orangeColorBtn.addEventListener('mousedown',WWQ.chooseColorDown);

    WWQ.chooseColor.addEventListener('mouseout',function(event){
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

        //TODO
        console.log();
        if(!WWQ.underChooseN&&!WWQ.underChooseS&&
            (
            $('numbers').style.display === "block"||
            WWQ.symbolList.style.display === "block")){ //没点数字条或者符号竖条

            WWQ.updateLevelDisplay();
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
        if (!WWQ.seletedText || WWQ.mouseDown.clientY < WWQ.content.offsetTop)    //未选取文字时隐藏
        {
            WWQ.toolBar.style.display="none";
            WWQ.chooseColor.style.display="none";
            var lastY=WWQ.content.lastElementChild.offsetTop - document.body.scrollTop; //lastchild距离浏览器顶部距离。

            if ( WWQ.mouseDown.clientY>=lastY && event.clientY>=lastY){            //新建段落

                var paragraph,
                    i,
                    childNodes = WWQ.content.childNodes;

                for (i = 0; i < childNodes.length; i++){
                    if (childNodes[i].nodeType===1 &&　!childNodes[i].innerHTML){
                        WWQ.content.removeChild(childNodes[i]);
                    }
                }
                paragraph = document.createElement("p");
                paragraph.setAttribute('contenteditable','true');
                WWQ.content.appendChild(paragraph);
                paragraph.focus();
                paragraph.addEventListener('click', WWQ.stopPro);
            }

            return;
        }
        WWQ.toolBar.style.display="block";
        //修正bar位置
        if(event.clientY>=0) {
            if(event.clientY + WWQ.toolBar.offsetHeight >=document.documentElement.clientHeight)
            {
                WWQ.toolBar.style.top=(document.documentElement.clientHeight-WWQ.toolBar.offsetHeight)+ "px";
            }
            else
                WWQ.toolBar.style.top = (event.clientY + 3)+ "px";
        } else{
            WWQ.toolBar.style.top = "0px";
        }
        if(event.clientX-WWQ.toolBar.offsetWidth/2>0){
            if(event.clientX+WWQ.toolBar.offsetWidth< document.documentElement.clientWidth){
                WWQ.toolBar.style.left=(event.clientX-WWQ.toolBar.offsetWidth/2)+ "px";
            } else{
                WWQ.toolBar.style.left=document.documentElement.clientWidth-WWQ.toolBar.offsetWidth+"px";
            }
        } else{
            WWQ.toolBar.style.left="0px";
        }
    });

    //屏蔽右击
    WWQ.content.oncontextmenu = function(event){
        return false;
    };
})();

//选数按钮
(function(){
    WWQ.chooseLevel.addEventListener('mousedown',function(e){
        this.style.border = 'outset thin black';
    });

    //WWQ.chooseLevel.addEventListener('mouseup',function(e){
    //    this.style.border = 'outset thin rgba(212, 212, 212, 0.41)';
    //
    //});
    WWQ.chooseLevel.addEventListener('click',WWQ.chooseNumfunc);

}());

//数字条事件
(function () {
    var childNodes = $('numbers').childNodes,
        arr = [],
        i,
        j;
    for(i = 0, j = 0; i < childNodes.length; i++){
        if(childNodes[i].nodeType === 1){
            j++;
            childNodes[i].ind = j;
            childNodes[i].addEventListener('mousedown',function(e){
                this.style.background="darkgrey";
                event.preventDefault();
                WWQ.underChooseN=true;
            });
            childNodes[i].addEventListener('mouseout',WWQ.toolsBtnMouseOut);
            childNodes[i].addEventListener('click',function(event ){    //选好等级数
                WWQ.levelNum=this.ind;
                WWQ.updateLevelDisplay();
                WWQ.underChooseN=false;
                this.style.background="#ced3d7";
            });
        }
    }
})();

