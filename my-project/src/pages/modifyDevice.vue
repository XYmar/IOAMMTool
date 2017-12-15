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
          <h3>修改设备信息</h3>
        </div>

        <div class="row-fluid form-wrapper">
          <!-- left column -->
          <div class="span10 with-sidebar">
            <div class="container">
              <form class="new_user_form inline-input"/>
              <div v-for="(device,index) in devices" :key="index">

                <div class="span12 field-box">
                <label></label>
                <input class="span9" type="hidden" name="edit-id" :value="device.id"/>
                </div>

                <div class="span12 field-box">
                <label>设备名:</label>
                <input class="span9" type="text" name="edit-name" :value="device.name"/>
                </div>
                
                <div class="span12 field-box">
                  <label>IP:</label>
                  <input class="span9" type="text" name="edit-ip" :value="device.ip"/>
                </div>
                
                <div class="span12 field-box">
                  <label>描述:</label>
                  <input class="span9" type="text" name="edit-des" :value="device.description"/>
                </div>
                
                <div class="span7 field-box actions">
                <input type="button" class="btn-glow primary" value="保存" style="width: 100px;" @click="editDevice"/>
                </div>  
              </div>  

              </form>
            </div>
          </div>

          <hr/>
          <div>
              {{devices}}
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
        /* eslint-disable */
        data(){
            return{
                devices:[]
            }
            message: $("input[name='edit-id']").val()
        },created(){
            this.$axios.get('devices',{
                //设置头
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            }).then(res=>{
                this.devices = res.data.data
            })
            .catch(err=>{
                console.log(err);
            })

        },
        methods: {
            editDevice: function (){
                var id = $("input[name='edit-id']").val();
                alert(id);
                var qs = require('qs');
                this.$axios.patch('devices/'+id ,qs.stringify({
                    "id": $("input[name='edit-id']").val(),
                    "name": $("input[name='edit-name']").val(),
                    "ip": $("input[name='edit-ip']").val(),
                    "description": $("input[name='edit-des']").val()
                }),{
                    /*params:{  //get请求在第二个位置，post在第三个位置
                     ID: $("input[name='edit-id']").val()
                    },*/
                    //设置头
                    headers:{
                        'content-type':'application/x-www-form-urlencoded'
                    },
                    auth: {
                        username: 'admin',
                        password: 'admin'
                    }
                }).then(res=>{
                    //this.users = res.data.data
                    //console.log(res);
                    this.$router.replace({ path: '/devices'})
                }).catch(err=>{
                    alert("请重新输入用户名！");
                })
            }
        }
    }
</script>
<style>

</style>