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
                                <input class="span9" type="password" name="add-password"/>
                            </div>

                          <div class="span12 field-box">
                          <label>描述信息:</label>
                          <input class="span9" type="password" name="add-password"/>
                        </div>

                          <!-- <div class="span12 field-box">
                            <label>大小:</label>
                            <input class="span9" type="password" name="add-password"/>
                          </div> -->





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
    export default{
        /* eslint-disable */
        data(){
            return{

            }
        },
        methods: {
            addUser: function (){
                var qs = require('qs');
                this.$axios.post('users',qs.stringify({
                    "username": $("input[name='add-name']").val(),
                    "password": $("input[name='add-password']").val()
                }),{
                    /*params:{  //get请求在第二个位置，post在第三个位置
                     ID:'c02da6e9-a334-4e41-b842-c59eb7d0d3f3'
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
                    this.$router.replace({ path: '/xy1'})
                })
                    .catch(err=>{
                        alert("请重新输入用户名！");
                    })
            }
        }
    }

</script>
<!--<script>-->
    <!--var myData = [-->
        <!--{-->
            <!--'id': '1',-->
            <!--'menuName': '基础管理',-->
            <!--'menuCode': '10',-->
            <!--'children': [-->
                <!--{-->
                    <!--'menuName': '用户管理',-->
                    <!--'menuCode': '11'-->
                <!--},-->
                <!--{-->
                    <!--'menuName': '角色管理',-->
                    <!--'menuCode': '12',-->
                    <!--'children': [-->
                        <!--{-->
                            <!--'menuName': '管理员',-->
                            <!--'menuCode': '121'-->
                        <!--},-->
                        <!--{-->
                            <!--'menuName': 'CEO',-->
                            <!--'menuCode': '122'-->
                        <!--},-->
                        <!--{-->
                            <!--'menuName': 'CFO',-->
                            <!--'menuCode': '123'-->
                        <!--},-->
                        <!--{-->
                            <!--'menuName': 'COO',-->
                            <!--'menuCode': '124'-->
                        <!--},-->
                        <!--{-->
                            <!--'menuName': '普通人',-->
                            <!--'menuCode': '124'-->
                        <!--}-->
                    <!--]-->
                <!--},-->
                <!--{-->
                    <!--'menuName': '权限管理',-->
                    <!--'menuCode': '13'-->
                <!--}-->
            <!--]-->
        <!--},-->
        <!--{-->
            <!--'id': '2',-->
            <!--'menuName': '商品管理',-->
            <!--'menuCode': ''-->
        <!--},-->
        <!--{-->
            <!--'id': '3',-->
            <!--'menuName': '订单管理',-->
            <!--'menuCode': '30',-->
            <!--'children': [-->
                <!--{-->
                    <!--'menuName': '订单列表',-->
                    <!--'menuCode': '31'-->
                <!--},-->
                <!--{-->
                    <!--'menuName': '退货列表',-->
                    <!--'menuCode': '32',-->
                    <!--'children': []-->
                <!--}-->
            <!--]-->
        <!--},-->
        <!--{-->
            <!--'id': '4',-->
            <!--'menuName': '商家管理',-->
            <!--'menuCode': '',-->
            <!--'children': []-->
        <!--}-->
    <!--];-->

    <!--import myTree from 'pages/launchtree.vue'-->
    <!--export default {-->
        <!--components: {-->
            <!--myTree-->
        <!--},-->
        <!--data() {-->
            <!--return {-->
                <!--theModel: myData-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->
<style>

</style>
