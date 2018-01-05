<template>
    <div id="addUser">
        <!-- settings changer -->
        <div class="skins-nav">
            <a href="#" class="skin first_nav selected">
                <span class="icon"></span><span class="text">Default</span>
            </a>
            <a href="#" class="skin second_nav" data-file="css/skins/dark.css">
                <span class="icon"></span><span class="text">Dark skin</span>
            </a>
        </div>


        <div class="container-fluid">
            <div id="pad-wrapper" class="new-user">
                <div class="row-fluid header">
                    <h3>创建一个新组件</h3>
                </div>

                <div class="row-fluid form-wrapper">
                    <!-- left column -->
                    <div class="span10 with-sidebar">
                        <div class="container">
                            <form class="new_user_form inline-input" />
                                <div class="span12 field-box">
                                    <label>组件名:</label>
                                    <input class="span9" type="text" v-model="name" name="add-name"/>
                                </div>

                                <div class="span12 field-box">
                                    <label>版本:</label>
                                    <input class="span9" type="text" v-model="version" name="add-version"/>
                                </div>

                                <div class="span12 field-box">
                                    <label>大小:</label>
                                    <input class="span9" type="text" v-model="size" name="add-size"/>
                                </div>

                                <div class="span12 field-box">
                                    <label>描述信息:</label>
                                    <input class="span9" type="text" v-model="describle" name="add-describle"/>
                                </div>

                                <div class="span12 field-box">
                                    <label>上传文件:</label>
                                    <div class="span9 uploadfile" style="margin-left: -1px;">
                                        <!-- <ul id="example-1">
                                            <li v-for="(index,item) in items">
                                                {{ item.message }}
                                            </li>
                                        </ul> -->
                                        <!-- 列表1  文件夹 -->
                                        <div id="todo-list-example" class="addli">
                                            <ul>
                                                <li v-for="(folder, index) in folders" :key="index">
                                                    {{folder}}
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="upbtn">
                                            <input type='file' name="folderin" id="folderupload" webkitdirectory  @change="getFolder($event)">
                                                <!-- <input type='file' name="folderin" id="folderupload" webkitdirectory > -->
                                                <!-- <input type='file' name="file"> -->
                                                <button v-on:click="folderclick">upload</button>
                                                <!-- <button v-on:click="folderclick">upload</button> -->
                                        </div>

                                        <!-- 列表2 文件 -->
                                        <div id="todo-list-example" class="addli">
                                            <ul>
                                                <li v-for="(file, index) in files" :key="index">
                                                    {{file}}
                                                </li>
                                                <!-- <li is="todo-item" v-for="(file, index) in files"  v-text="sv2"></li> -->
                                            </ul>
                                        </div>
                                        
                                        <div class="upbtn">
                                                <input type='file' name="filein" id="fileupload"  @change="getFile($event)">
                                                <button v-on:click="fileclick">upload</button>
                                        </div> 
                                    </div>
                                </div>

                                <div class="span7 field-box actions">
                                    <input type="button" class="btn-glow primary" value="添加组件" style="width: 100px;" @click="addComp($event)"/>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </div>
        </div>


        <hr/>
        <div>
            {{folders}}
        </div>
        <hr/>
        <div>
            {{files}}
        </div>
        <hr/>
        <div>
            {{allArr}}
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'

/*let folders = [];   //上传文件夹的数组
let files = [];     //上传文件的数组
let allArr = [];    //上传文件夹和文件的总数组
let sv = null;
let sv1 = null;
let sv2 = null;*/
/*Vue.component('todo-item', {
  template: `
            <li v-on:click="$emit('click')">
                {{ text }}
            </li>`,
            props: ['text']
})*/

export default {

        data:function() {
            return {
                name:'',
                version:'',
                size: '',
                describle: '',
                folders: [
                    
                ],
                files: [
                    
                ],
                allArr: [

                ],
                sv1: '',
                sv2: ''
            }
        },
        methods: {
            getFolder(event) {
                this.sv1 = event.target.files[0];
                //console.log(this.sv1.length);
                console.log(this.sv1);

                /*this.sv1 = $("input[name='file']").val();
                if(this.sv1.length != 0){
                    this.folders.push(this.sv1);

                    this.allArr.push(this.sv1);
                    var obj = document.getElementById('fileupload') ; 
                    obj.outerHTML=obj.outerHTML;
                }else{
                    alert("请选择文件夹");
                }*/
            },
            getFile(event) {
                this.sv2 = event.target.files[0];
                //console.log(this.sv2.length);
                console.log(this.sv2);
            },
            folderclick(event) {
                //alert(this.sv);
                //this.sv1 = event.target.files[0];;
                //this.sv1 = $("input[name='folderin']").val();
                event.preventDefault();
                alert(this.sv1);

                if(this.sv1.length != 0){
                    this.folders.push(this.sv1);
                    this.allArr.push(this.sv1);

                    console.log(this.folders);
                    console.log(this.allArr);

                    alert(this.sv1);
                    var obj = document.getElementById('folderupload') ; 
                    obj.outerHTML=obj.outerHTML;
                }else{
                    alert("请选择文件夹");
                }
                
                //this.sv=''
            },
            fileclick(event) {
                //alert(this.sv);
                //this.sv2 = $("input[name='filein']").val();
                event.preventDefault();
                alert(this.sv2);

                if(this.sv2.length != 0){
                    this.files.push(this.sv2);
                    this.allArr.push(this.sv2);

                    console.log(this.files);
                    console.log(this.allArr);

                    var obj = document.getElementById('fileupload'); 
                    obj.outerHTML=obj.outerHTML;
                }else{
                    alert("请选择文件");
                }
                
            },
            addComp(event) {
                alert("A");
                event.preventDefault();
                let formData = new FormData();

                alert("hh");
                formData.append('name', this.name);
                formData.append('version', this.version);
                formData.append('size', this.size);
                formData.append('describle', this.describle);

                formData.append('enctype', "multipart/form-data");

                for(var i=0;i<allArr.length;i++)
                {
                    formData.append('componentfile', allArr[i]);
                    //formData.append("componentfile",fileList[i]);

                }

                //formData.append('componentfile', this.allArr);
                console.log(this.allArr.length);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                this.$axios.post('components', formData, {
                    config,
                    auth: {
                        username: 'admin',
                        password: 'admin'
                    }
                }).then(function (res) {
                    if (res.status === 2000) {
                        /*这里做处理*/
                    }
                })
            }

    }
}

</script>
<style>
    .uploadfile{
        border: 1px solid #cccccc;
        border-radius: 4px;
        min-height: 250px;

    }

    .upbtn{
        margin-top: 5px;
    }

    .addli{
        
        max-height: 90px;
        overflow: auto;
    }
</style>