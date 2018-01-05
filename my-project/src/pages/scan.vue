    <template>
    <div>
        <div class="container-fluid">
                <div id="pad-wrapper" class="users-list span12">
                       
                        <div style="float:left;" class="span2">
                            <input type="text" class="search" placeholder="设备名称" />
                            <div class="row-fluid table">
                                <table class="table table-hover" id="table_value">
                                    <thead>
                                    <tr>
                                        <th>
                                           设备/软件名
                                        </th>
                                        <th>
                                            设备状态
                                        </th>
                                        <th>
                                            软件状态
                                        </th>
                                    </tr>
                                    </thead>
                                </table>

                                <div id="areaTree">
                                    <div class="tree-box">
                                        <div class="zTreeDemoBackground left">
                                            <ul id="treeDemo" class="ztree">
                                            </ul>
                                        </div>
                                    </div>
                                 </div>

                            </div>
                        </div>

                        <div style="float:right" class="span9">               
                            <label style="float:left">查找:</label>
                            <label style="float:left">文件名</label>
                               <select v-model="selected" style="float:left">
                                    <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                                    </option>
                                </select>
                                <!-- <span>Selected: {{ selected }}</span> -->
                            
                            <label style="float:left">后缀名</label>
                              <select v-model="selected" style="float:left">
                                  <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                                  </option>
                              </select>
                                <!-- <span>Selected: {{ selected }}</span> -->
                           
                            <label style="float:left">日期</label>
                            <input type="text" style="float:left;width:94px;height:14px" value="03/29/2014" class="input-large datepicker" />
                            <label style="float:left">到</label>
                            <input type="text" style="float:left;width:94px;height:15px" value="03/29/2014" class="input-large datepicker" />
                      
                            <label style="float:left">设备状态</label>
                          
                                <select v-model="selected">
                                    <option v-for="option in options" v-bind:value="option.value">{{ option.text }}
                                    </option>
                                </select>
                        </div>
  
                </div>
        </div>


        <div class="row ctrls span12">
            <button class="btn-glow span2"><i class="icon-wrench"></i>全部扫描</button>  
            <button class="btn-glow span2"><i class="icon-wrench"></i>快速扫描</button>  
            <button class="btn-glow span2">上一页</button>  
            <button class="btn-glow span2">下一页</button>  
         
          <!--   <label for="" class="span2">跳到第</label>
          <input type="text" class="span2">
          <label for="" class="span2">页</label>
          <button class="btn-glow span2">GO</button>  -->
        </div>

        <div class="pagination pull-right">
                   
           
        </div>


        <hr/>
        <div>
            {{delpoy}}
        </div>

      <hr/>
      <div>
          {{deployplanId}}
      </div>


      <hr/>
      <div>
          {{componentsFile}}
      </div>
       
    </div>
    </template>


    <script>

/* eslint-disable */
    var relativePath="";
  function getCurrentRoot(treeNode){
    if(treeNode.getParentNode()!=null){
      var parentNode = treeNode.getParentNode();
      relativePath=treeNode.getParentNode().name+"/"+relativePath+treeNode.name;
      return getCurrentRoot(parentNode);
    }else{
      return treeNode.id;
    }
  }





let projectId = "5d0bccf0-1298-4be9-bcfa-2fc5571d9460";
let deployplanId = [];

    export default{
            name: 'areaTree',
                components:{
                },
            /* eslint-disable */
            data(){
                return{
                    components:[],
                    deployplanId:[],
                    delpoy:[],
                    componentsFile:[],
                    selected: 'A',
                    selected2: 'B',
                    zNodes:[],
                    options: [
                      { text: 'One', value: 'A' },
                      { text: 'Two', value: 'B' },
                      { text: 'Three', value: 'C' }
                    ],
                    setting: {
                    view: {
                        addHoverDom: this.addHoverDom,
                        removeHoverDom: this.removeHoverDom,
                        selectedMulti: this.true
                    },
                    edit: {
                        enable: true,
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        beforeDrag: this.beforeDrag,
                        beforeEditName: this.beforeEditName,
                        beforeRemove: this.beforeRemove,
                        beforeRename: this.beforeRename,
                        onRemove: this.onRemove,
                        onRename: this.onRename
                    }
                },
                
                }
            },
            created(){
                this.$axios.get('project/'  + projectId + '/deployplan',{
        
                    //设置头
                    headers:{
                        'content-type':'application/x-www-form-urlencoded'
                    },
                    auth: {
                        username: 'admin',
                        password: 'admin'
                    }
                }).then(res=>{
                    this.deployplanId = res.data.data
                    alert(this.deployplanId[0].id);
                })
                .catch(err=>{
                    console.log(err);
                });

                this.$axios.get('deployplan/' + '4a0f3be6-831d-4a99-872f-05578cec973b',{

                    //设置头
                    headers:{
                        'content-type':'application/x-www-form-urlencoded'
                    },
                    auth: {
                        username: 'admin',
                        password: 'admin'
                    }
                }).then(res=>{
                    
                    this.delpoy= res.data.data.deployPlanDetailEntities[0].deviceEntity;

                    this.componentsFile=res.data.data.deployPlanDetailEntities[0].componentEntity;

                   
                })
                .catch(err=>{
                    console.log(err);
                    alert("hh");
                })

            },
        
        methods:{
            beforeDrag: function(treeId, treeNodes) {
                return false;
        },
           beforeEditName: function (treeId, treeNode) {
             var className= $("dark");
                 className = (className === "dark" ? "":"dark");
            this.showLog("[ "+this.getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.selectNode(treeNode);
            setTimeout(function() {
                if (confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？")) {
                    setTimeout(function() {
                        zTree.editName(treeNode);
                    }, 0);
                }
            }, 0);
            return false;
        },
           beforeRemove: function (treeId, treeNode) {
               var className= $("dark");
               className = (className === "dark" ? "":"dark");
               this.showLog("[ "+this.getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
               var zTree = $.fn.zTree.getZTreeObj("treeDemo");
               zTree.selectNode(treeNode);
               return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
            },
            onRemove: function (e, treeId, treeNode) {
                this.showLog("[ "+this.getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
            },
             beforeRename:function(treeId, treeNode, newName, isCancel) {
               var className= $("dark");
                className = (className === "dark" ? "":"dark");
                 this.showLog((isCancel ? "<span style='color:red'>":"") + "[ "+this.getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
                if (newName.length == 0) {
                    setTimeout(function() {
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                        zTree.cancelEditName();
                        alert("节点名称不能为空.");
                    }, 0);
                    return false;
                }
                return true;
            },
            onRename:function(e, treeId, treeNode, isCancel) {
                this.showLog((isCancel ? "<span style='color:red'>":"") + "[ "+this.getTime9()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
            },
            showRemoveBtn:function (treeId, treeNode) {
                return !treeNode.isFirstNode;
            },
            showRenameBtn:function (treeId, treeNode) {
                return !treeNode.isLastNode;
            },
           showLog:function (str) {
               var className= $("dark");
               var log=$("dark");
                if (!log) log = $("#log");
                log.append("<li class='"+className+"'>"+str+"</li>");
                if(log.children("li").length > 8) {
                    log.get(0).removeChild(log.children("li")[0]);
                }
            },
            getTime:function()  {
                var now= new Date(),
                    h=now.getHours(),
                    m=now.getMinutes(),
                    s=now.getSeconds(),
                    ms=now.getMilliseconds();
                return (h+":"+m+":"+s+ " " +ms);
            },

            addHoverDom: function(treeId, treeNode) {

                var newCount = $("1");
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
              var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='add node' onfocus='this.blur();'></span>";
               sObj.after(addStr);
                var btn = $("#addBtn_"+treeNode.tId);
                if (btn) btn.bind("click", function(){
                    relativePath="";
                    getCurrentRoot(treeNode);
                  alert(relativePath);
//                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
//                   zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
                 //   return false;
                });
            },
            removeHoverDom:function (treeId, treeNode) {
                $("#addBtn_"+treeNode.tId).unbind().remove();
            },
             selectAll:function() {
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
            }
        },
        mounted(){
            $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
            this.$nextTick(function () {
                    $(document).ready(function(){
                        $('.datepicker').datepicker().on('changeDate', function (ev) {
                            $(this).datepicker('hide');
                        });
                    });
                    
                });


        }

    }
      
        </script>

     <style type="text/css">
    .field-box {
        margin-bottom: 30px;
        margin-left: 0;
        float: left;
        width: 100%;
    }

    select {
        width: 105px;
        border-radius: 4px;
        color: #555555;
        height:25px
    }
   



 
    </style>