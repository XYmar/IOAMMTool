    <template>
    <div>
        <div class="container-fluid">
                <div id="pad-wrapper" class="users-list span12">
                       
                        <div style="float:left;" class="span2">
                                <div>
                               <!--  <input class="search" type="text" placeholder="搜索设备.." v-model="searchQuery" @change="change"/> -->
                                <h3>扫描</h3>
                       
                                </div>
                                    
                                <br/> 
                                    <div class="row-fluid table drag-content" style="width:220px">
                                        <table class="table table-hover" id="table_value">
                                            <thead>
                                            <tr>
                                                <th>
                                                   设备/软件名
                                                </th>
                                               
                                                <th>
                                                    部署路径
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

                                    <div class="btn-group">
                                        <button class="btn-glow"  @click="scanAll()"><i class="icon-wrench"></i>全盘扫描</button>  
                                        <button class="btn-glow"  @click="scanQuick()"><i class="icon-wrench"></i>快速扫描</button>  

                                    </div>
                        </div>

                        <div style="float:right" class="span9">   
                        <div style="margin-bottom: -5px;">            
                            <label style="float:left">查找:</label>
                            <label style="float:left">文件名</label>
                            <input type="text" style="float:left;width:100px;height:15px" class="input-large"/>

                                <!-- <span>Selected: {{ selected }}</span> -->
                            
                            <label style="float:left">后缀名</label>
                              <select v-model="selected" style="float:left" @change="changeExtension">
                                  <option v-for="extension in extensions" v-bind:value="extension.value">
                                    {{ extension.text }}
                                  </option>
                              </select>
                                <!-- <span>Selected: {{ selected }}</span> -->
                           
                            <label style="float:left">日期</label>
                            <input type="text" style="float:left;width:94px;height:15px"  class="input-large datepicker" data-date-format="yyyy-mm-dd"/>
                            <label style="float:left">到</label>
                            <input type="text" style="float:left;width:94px;height:15px"  class="input-large datepicker" data-date-format="yyyy-mm-dd"/>
                      
                            <label style="float:left">设备状态</label>
                                <select v-model="selected2" @change="changeState">
                                    <option v-for="state in states" v-bind:value="state.value">
                                    {{ state.text }}
                                    </option>
                                </select>
                            </div>

                            <br/>


                            <div class="drag-content" >
                              <div class="row-fluid table">
                                <table class="table table-hover" id="table_value">
                                    <thead>
                                    <tr>
                                       
                                        <th class="span4 sortable">
                                           文件名
                                        </th>
                                        <th class="span3 sortable">
                                            <span class="line"></span>路径
                                        </th>
                                        <th class="span3">
                                            <span class="line"></span>文件类型
                                        </th>
                                        <th class="span3">
                                            <span class="line"></span>日期
                                        </th>
                                        <th class="span3">
                                            <span class="line"></span>文件大小
                                        </th>
                                        <th class="span3">
                                            <span class="line"></span>状态
                                        </th>
                                    
                                    
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <!-- row -->
                                    <tr class="first" v-for="(component,index) in componentEntity" :key="index">
                                            <td style="display:none">{{component.id}}</td>
                                            <td>{{component.name}}</td>
                                            <td>
                                                {{component.path}}
                                            </td>
                                            <td>
                                               {{component.type}}
                                            </td>
                                            <td>
                                                {{component.createTime}}
                                            </td>
                                            <td>
                                               {{component.size}}
                                            </td>
                                            <td>
                                               {{component.state}}
                                            </td>
                                
                                        </tr>
                                    <!-- row -->

                                    </tbody>
                                </table>
                           </div>
                        </div>

                            <br/>
                              
                        </div>
  
                </div>
        </div>


      <hr/>
      <div>
          {{componentEntity}}
      </div>

      <hr/>
      <div>
          {{entity}}
      </div>

      <hr/>
      <div>
          {{scanDevice}}
      </div>

      <hr/>
      <div>
          {{scanComponent}}
      </div>
       
    </div>
    </template>


    <script>
/* eslint-disable */
var relativePath = "";
function getCurrentRoot(treeNode) {
  if (treeNode.getParentNode() != null) {
    var parentNode = treeNode.getParentNode();
    relativePath =
      treeNode.getParentNode().name + "/" + relativePath + treeNode.name;
    return getCurrentRoot(parentNode);
  } else {
    return treeNode.id;
  }
}

let projectId = "5a922835-a587-4dad-b3b7-bb5005ef4c99";

let deviceNodeId;
let deployPlanId;
let deviceId;
let componentNodeId;

let zNodes=[];
let deployplan=[];

let map={};

export default {
  name: "areaTree",
  components: {},
  /* eslint-disable */
  data() {
    return {
      searchQuery: '',
      componentEntity: [],

      currentPage: 0,
      pages: [],
      jumpPage: 0,

      deviceItem: {},
      componentItem: {},

      components: [],
      entity:[],

      scanDevice: [],
      scanComponent: [],

      selected: "all",

      extensions: [
        { text: "全部", value: "all" },
        { text: "exe", value: "exe" },
        { text: "xml", value: "xml" },
        { text: "dll", value: "dll" },
        { text: "ini", value: "ini" },
        { text: "docx", value: "docx" },
        { text: "chm", value: "chm" },
        { text: "sql", value: "sql" },
        { text: "txt", value: "txt" },
        { text: "PDF", value: "PDF" },
        { text: "pdf", value: "pdf" },
        { text: "doc", value: "doc" },
    
      ],
      states: [{ text: "全部" }, { text: "在线" }, { text: "离线" }]
    };
  },
  created() {
    this.$nextTick(function() {
      $(document).ready(function() {
        $(".datepicker")
          .datepicker()
          .on("changeDate", function(ev) {
            $(this).datepicker("hide");
          });
      });
    });

    this.$axios.get("project/" + projectId + "/deployplan", {
        //设置头
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: "admin",
          password: "admin"
        }
      }).then(res => {
        this.entity=res.data.data;

        deployplan = res.data.data;

        let setting = {
          view: {
            addHoverDom: this.addHoverDom,
            removeHoverDom: this.removeHoverDom,
            selectedMulti: this.true
          },
          edit: {
            enable: true
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
            onRename: this.onRename,
            onClick: this.zTreeOnClick
          }
        };

        
        let count=0;
            
        for (let i = 0; i < res.data.data.length; i++) {

          for (let j = 0;j < res.data.data[i].deployPlanDetailEntities.length;j++) {

            count++;
            let deviceNode = {};
            let componentNode = {};
            

            deviceNode.id =res.data.data[i].deployPlanDetailEntities[j].deviceEntity.id;
           
            componentNode.id =
              res.data.data[i].deployPlanDetailEntities[j].componentEntity.id;
            componentNode.name =
              res.data.data[i].deployPlanDetailEntities[j].componentEntity.name;
            componentNode.deviceId =
              res.data.data[i].deployPlanDetailEntities[j].deviceEntity.id; 
            componentNode.deployPlanId =res.data.data[i].id;
            componentNode.state = null;

            console.log(deviceNode);
            console.log(componentNode);
            console.log(i);
            console.log(j);

           
            if(zNodes.length>0){


              let temp={};
              let flag=true;

              console.log("进来");

              bbb:
              for(let k=0;k<zNodes.length;k++){

                 if(zNodes[k].id==deviceNode.id){
                    console.log("$$$$$");
                    console.log(zNodes[k]);

                    for(let l=0;l<zNodes[k].children.length;l++){
                       if(zNodes[k].children[l].id==componentNode.id){
                       flag=false;
                       break bbb;

                       }

                    }

                    zNodes[k].children.push(componentNode);

                    flag=false;
                    break;
                 }  
              }

              console.log(flag);

              if(flag){
                  deviceNode.name =
                  res.data.data[i].deployPlanDetailEntities[j].deviceEntity.name +
                  res.data.data[i].deployPlanDetailEntities[j].deviceEntity.ip;

                 deviceNode.deployPlanId = res.data.data[i].id;
                
                 let children = [];
                 children.push(componentNode);
                 deviceNode.children = children;


                 console.log(deviceNode);
                 console.log(componentNode);

                 zNodes.push(deviceNode);


              }
               console.log("第一个");
               console.log(zNodes);
               
            }else{
             console.log("进来4");

             deviceNode.name =
              res.data.data[i].deployPlanDetailEntities[j].deviceEntity.name +
              res.data.data[i].deployPlanDetailEntities[j].deviceEntity.ip;

             deviceNode.deployPlanId = res.data.data[i].id;
            
             let children = [];
             children.push(componentNode);
             deviceNode.children = children;


             console.log(deviceNode);
             console.log(componentNode);

             zNodes.push(deviceNode);

             console.log(zNodes);
            }
        }
    };


        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        console.log(count);

      }).catch(err => {
        console.log(err);
      });
  },

  methods: {


     changeState: function() {
       alert(this.selected);

       
    },



    changeExtension: function() {

      if(this.componentEntity.length>1){
      this.componentEntity = [];

      this.$axios
        .get("deployplan/" + deployPlanId + "/devices/" + deviceNodeId, {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          auth: {
            username: "admin",
            password: "admin"
          }
        })
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            for (
              let j = 0;
              j < res.data.data[i].componentEntity.componentFileEntities.length;
              j++
            ) {
              if (
                res.data.data[i].componentEntity.componentFileEntities[j]
                  .type == this.selected
              ) {
                this.componentEntity.push(
                  res.data.data[i].componentEntity.componentFileEntities[j]
                );
              } else if (this.selected == "all") {
                this.componentEntity.push(
                  res.data.data[i].componentEntity.componentFileEntities[j]
                );
              } else {
                this.componentEntity = [];
              }
            }
          }
        })
        .catch(err => {
          console.log("后缀名下拉框事件错误！");
        });

      }else{

         this.componentEntity = [];

         this.$axios.get("components/" + componentNodeId,{
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          auth: {
            username: "admin",
            password: "admin"
          }
        })
        .then(res => {

         
            for (let j = 0;j < res.data.data.componentFileEntities.length;j++) {
              if (res.data.data.componentFileEntities[j].type == this.selected) {
                this.componentEntity.push(
                  res.data.data.componentFileEntities[j]
                );
              } else if (this.selected == "all") {
                this.componentEntity.push(res.data.data.componentFileEntities[j]);
              } else {
                this.componentEntity = [];
              }
            }
          
        })
        .catch(err => {
          console.log("后缀名下拉框事件错误！");
        });

      }
     
    },



    zTreeOnClick: function(e, treeId, treeNode) {

      deviceNodeId='';
      deployPlanId='';
      componentNodeId='';
      deviceId='';
      this.componentEntity = [];
      let zTree = $.fn.zTree.getZTreeObj("treeDemo");
      zTree.expandNode(treeNode);
     

      if(zTree.getSelectedNodes()[0].deviceId){
          componentNodeId=zTree.getSelectedNodes()[0].id;
          deviceId=zTree.getSelectedNodes()[0].deviceId;
          deployPlanId = zTree.getSelectedNodes()[0].deployPlanId;
          this.$axios.get("components/" + componentNodeId, {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          auth: {
            username: "admin",
            password: "admin"
          }
        })
        .then(res => {
          for (let i = 0; i < res.data.data.componentFileEntities.length; i++) {
              this.componentEntity.push(res.data.data.componentFileEntities[i]);
            }
        })
        .catch(err => {
          console.log("点击组件请求错误！");
        });
      }else{
          deviceNodeId = zTree.getSelectedNodes()[0].id;
          deployPlanId = zTree.getSelectedNodes()[0].deployPlanId;
          this.$axios
        .get("deployplan/" + deployPlanId + "/devices/" + deviceNodeId, {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          auth: {
            username: "admin",
            password: "admin"
          }
        })
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            for (
              let j = 0;
              j < res.data.data[i].componentEntity.componentFileEntities.length;
              j++
            ) {
              this.componentEntity.push(
                res.data.data[i].componentEntity.componentFileEntities[j]
              );
            }
          }
        })
        .catch(err => {
          console.log("点击设备请求错误！");
        });
      }
      
    },


    scanAll: function() {
      console.log(deployPlanId);
      console.log(deviceNodeId);

      this.$axios
        .get(
          "deployplan/" +
            "scan/" +
            deployPlanId +
            "/devices/" +
            deviceNodeId,
          {
            //设置头
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            },
            auth: {
              username: "admin",
              password: "admin"
            }
          }

        )
        .then(res => {
          this.scanDevice = res.data.data;
          let scanState=flase;



          for(let i=0;i<res.data.data.length;i++){

            for(let j=0;j<res.data.data[i].correctComponentFiles.length;j++){

               for(let k=0;k<this.componentEntity.length;k++){

                 if(res.data.data[i].correctComponentFiles[j].id==this.componentEntity[k].id){
                       this.componentEntity.state='√';
                       scanState=true;


                }

               }
                
            } 
          };
          for(let i=0;i<res.data.data.length;i++){

            for(let j=0;j<res.data.data[i].modifyedComponentFiles.length;j++){

               for(let k=0;k<this.componentEntity.length;k++){

                if(res.data.data[i].modifyedComponentFiles[j].id==this.componentEntity[k].id){
                      this.componentEntity.state='×';
                      scanState=true;
                }

               }
                
            } 
          };
          for(let i=0;i<res.data.data.length;i++){

            for(let j=0;j<res.data.data[i].unknownFiles.length;j++){

               for(let k=0;k<this.componentEntity.length;k++){

                 if(res.data.data[i].unknownFiles[j].id==this.componentEntity[k].id){
                      this.componentEntity.state='?';
                      scanState=true;
                }

               }
                
            } 
          };

          if(scanState==flase){
             alert("扫描无数据！");

          }
        })
        .catch(err => {
          console.log(err);
          alert("全盘扫描请求错误！");
        });
    },

    scanQuick: function() {
      console.log(deployPlanId);
      console.log(deviceId);
      console.log(componentNodeId);

      this.$axios
        .get(
          "deployplan/" +
            "scan/" +
            deployPlanId +
            "/devices/" +
            deviceId +
            "/components/" +
            componentNodeId,
          {
            //设置头
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            },
            auth: {
              username: "admin",
              password: "admin"
            }
          }
        )
        .then(res => {
          this.scanComponent = res.data.data;

            for(let i=0;i<res.data.data.length;i++){

            for(let j=0;j<res.data.data[i].correctComponentFiles.length;j++){

               for(let k=0;k<this.componentEntity.length;k++){

                 if(res.data.data[i].correctComponentFiles[j].id==this.componentEntity[k].id){
                       this.componentEntity.state='√';

                }

               }
                
            } 
          };
          for(let i=0;i<res.data.data.length;i++){

            for(let j=0;j<res.data.data[i].modifyedComponentFiles.length;j++){

               for(let k=0;k<this.componentEntity.length;k++){

                if(res.data.data[i].modifyedComponentFiles[j].id==this.componentEntity[k].id){
                      this.componentEntity.state='×';
                }

               }
                
            } 
          };
          for(let i=0;i<res.data.data.length;i++){

            for(let j=0;j<res.data.data[i].unknownFiles.length;j++){

               for(let k=0;k<this.componentEntity.length;k++){

                 if(res.data.data[i].unknownFiles[j].id==this.componentEntity[k].id){
                      this.componentEntity.state='?';
                }

               }
                
            } 
          }
        })
        .catch(err => {
          console.log(err);
          alert("快速扫描请求错误！");
        });
    },

    beforeDrag: function(treeId, treeNodes) {
      return false;
    },

    beforeEditName: function(treeId, treeNode) {
      var className = $("dark");
      className = className === "dark" ? "" : "dark";
      this.showLog(
        "[ " +
          this.getTime() +
          " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name
      );
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

    beforeRemove: function(treeId, treeNode) {
      var className = $("dark");
      className = className === "dark" ? "" : "dark";
      this.showLog(
        "[ " +
          this.getTime() +
          " beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name
      );
      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      zTree.selectNode(treeNode);
      return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
    },
    onRemove: function(e, treeId, treeNode) {
      this.showLog(
        "[ " +
          this.getTime() +
          " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name
      );
    },

    beforeRename: function(treeId, treeNode, newName, isCancel) {
      var className = $("dark");
      className = className === "dark" ? "" : "dark";
      this.showLog(
        (isCancel ? "<span style='color:red'>" : "") +
          "[ " +
          this.getTime() +
          " beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name +
          (isCancel ? "</span>" : "")
      );
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
    onRename: function(e, treeId, treeNode, isCancel) {
      this.showLog(
        (isCancel ? "<span style='color:red'>" : "") +
          "[ " +
          this.getTime9() +
          " onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name +
          (isCancel ? "</span>" : "")
      );
    },
    showRemoveBtn: function(treeId, treeNode) {
      return !treeNode.isFirstNode;
    },
    showRenameBtn: function(treeId, treeNode) {
      return !treeNode.isLastNode;
    }
  }
};
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
  height: 25px;
  font-size: 12px;
}


.row {
  margin-left: 211px;
}

button {
  height: 29px;
  width: 110px;
}

.drag-content {
    border: 2px solid rgba(204, 204, 204, 1);
    height: 350px;
    width: 736px;
    overflow: auto;
}

label {
  font-size: 13px;
  line-height: 26px;
}
</style>