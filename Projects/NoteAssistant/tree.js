/**
 * Created by 万强 on 2015/9/6 0006.
 */
(function(){
    var rootNode = [], //第一级
        nid = 0;
    result = {};
    result.arr=null; //保存节点的数组
    result.index=0; //节点在数组中的下标
    result.deepth=0;//节点的深度（等级）。

    var CreateOb = function(value){
        this.id = nid;
        nid++;
        this.value = value;
    };

//(function(){
//    rootNode[0]=[];
//    rootNode[0][0]=new CreateOb("00");
//    rootNode[0][1]=[];
//    rootNode[0][1][0]=new CreateOb("010");
//    rootNode[0][1][1]=new CreateOb("011");
//    rootNode[1]=new CreateOb("1");
//    rootNode[2]=[];
//    rootNode[2][0]=new CreateOb("20");
//    rootNode[2][1]=[];
//    rootNode[2][1][0]=new CreateOb("210");
//    rootNode[2][1][1]=new CreateOb("211");
//
//}());
//遍历传入id
    var traversal =function(refId, arr){
        result.deepthbuf = result.deepthbuf||0;
        result.deepthbuf++;

        if(arguments.length<2){ //第二个参数为空时，默认为根节点
            arr=rootNode;
        }
        for(var i = 0; i < arr.length; i++){
            if(Array.isArray(arr[i])){

                arguments.callee(refId,arr[i]);

            }
            else if(typeof arr[i]==="object"){

                if(arr[i].id===refId){
//                    console.log("ok  "+ arr[i].value+" "+i);
                    result.arr=arr;
                    result.index = i;
                    result.deepth=result.deepthbuf;
                    return;
                }
            }

        }
        result.deepthbuf--;
    }
//在节点后建立兄弟节点
    var createNode = function(refId,value,lowerLevel){
        if (lowerLevel){
            traversal(refId);
            result.arr.splice(result.index+1,0,[new CreateOb(value)]);
        } else{
            traversal(refId);
            result.arr.splice(result.index+1,0,new CreateOb(value));
        }
        result={};
    };

//createNode(5,"999",true);
//createNode(7,"9990");

    var deleteNode = function(id){
        traversal(id);
        var deletedArr = result.arr.splice(result.index,1);
        result={};

    };

//合并下个兄弟节点
    var mergeNextNode=function(id){
        traversal(id);
        if(Array.isArray(result.arr[result.index+1]) ){
            console.log("illage");
        } else{
            result.arr.splice(result.index+1,1);
        }
        result={};
    }
//mergeNextNode(5);
//traversal(8);
//console.log(result.arr[result.index].value +" "+ result.deepth);

}());