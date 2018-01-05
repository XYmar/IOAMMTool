<template>
    <div >
        <div>  
            <form>
                <input type="text" value="" v-model="name" placeholder="请输入组件名"/>
                <input type="text" value="" v-model="version" placeholder="请输入版本"/>
                <!-- <input type="text" value="" v-model="age" placeholder="请输入年龄">  -->
                <!-- <input type="file" @change="getFile($event)"> -->
                <input type='file' name="folderin" id="folderupload"  @change="getFile($event)" webkitdirectory > 
                <button @click="submitForm($event)">提交</button>
            </form>
            <!-- <form action="" enctype="multipart/form-data">
                <input type='file' name="folderin" id="folderupload"  @change="getFile($event)" webkitdirectory >
                <input type='file' name="file">
                <button @click="addComp($event)">upload</button>
            </form> -->
            
        </div>
        <br/>

        <div class="span7 field-box actions">
            <input type="button" class="btn-glow primary" value="添加组件" style="width: 100px;" @click="addComp($event)"/>
        </div>
    </div>
</template>



<script>
/* eslint-disable */


    export default {

        data:function() {
            return {
                name:'',
                version:'',
                file:[]
            }
        },
        methods: {
            getFile(event) {
                this.file = event.target.files[0];
                console.log(this.file.length);
                console.log(this.file);
            },
            submitForm(event) {
                alert("A");
                event.preventDefault();
                let formData = new FormData();

                alert("hh");
                formData.append('name', this.name);
                formData.append('version', this.version);
                formData.append('componentfile', this.file);
                console.log(this.file.length);

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
            /*folderclick: function (){
                    var qs = require('qs');
                    this.$axios.post('components',qs.stringify({
                            "componentfile": $("input[name='file']").val()
                        }),{

                        headers:{
                            'content-type':'multipart/form-data'
                        },
                        auth: {
                            username: 'admin',
                            password: 'admin'
                        }
                }).then(res=>{
                    
                })
                .catch(err=>{
                    alert("失败！");
                })
            }*/

    }
}
</script>
