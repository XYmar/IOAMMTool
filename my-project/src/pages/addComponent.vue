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
                                <input class="span9" type="text" name="add-name"/>
                            </div>

                            <div class="span12 field-box">
                                <label>版本:</label>
                                <input class="span9" type="text" name="add-version"/>
                            </div>


                            <div class="span12 field-box">
                                <label>描述信息:</label>
                                <input class="span9" type="text" name="add-describle"/>
                            </div>

                            <div class="span12 field-box">
                                <label>大小:</label>
                                <input class="span9" type="text" name="add-size"/>
                            </div>

                            <div class="span12 field-box">
                                <label>上传文件:</label>
                                <div class="span9 uploadfile" style="margin-left: -1px;">
                                    <!-- <ul id="example-1">
                                        <li v-for="(index,item) in items">
                                            {{ item.message }}
                                        </li>
                                    </ul> -->
                                    <div id="todo-list-example" class="addli">
                                        <!-- <button v-on:click="ss">保存 </button> -->
                                        <ul>
                                            <li is="todo-item" v-for="(file, index) in files"  v-text="sv"></li>
                                        </ul>
                                    </div>
                                    <div class="upbtn">
                                        <!-- <form method="POST" enctype=multipart/form-data> -->
                                            <input type='file' name="file" webkitdirectory >
                                            <input type='file' name="file">
                                            <button v-on:click="ss">upload</button>
                                        <!-- </form>  -->
                                    </div>
                                </div>
                            </div>

                            <div class="span7 field-box actions">
                                <input type="button" class="btn-glow primary" value="创建" style="width: 100px;" @click="addUser"/>
                            </div>
                            </form>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'

let files = [];
let sv = null;
Vue.component('todo-item', {
  template: `
            <li v-on:click="$emit('click')">
                {{ text }}
            </li>`,
            props: ['text']
})

    export default{

        data(){
            return{
                files: [
                    
                ],
                sv: ''
            }
        },
        methods: {
            addUser: function (){
                var qs = require('qs');
                this.$axios.post('components',qs.stringify({
                        "componentfile": $("input[name='file']").val()
                    }),{
                
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            }).then(res=>{
                
            })
            .catch(err=>{
                alert("失败！");
            })
            },
            ss: function() {
                //alert(this.sv);
                this.sv = $("input[name='file']").val();
                this.files.push(this.sv)
                //this.sv=''
            }
        }




    }
</script>
<style>
    .uploadfile{
        border: 1px solid #cccccc;
        border-radius: 4px;
        height: 200px;

    }

    .upbtn{
        margin-top: 5px;
    }

    .addli{
        
        max-height: 130px;
        overflow: auto;
    }
</style>