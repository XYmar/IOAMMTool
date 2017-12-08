<template>
	<!-- main container -->
    <div>
  
        <div class="container-fluid">
            <div id="pad-wrapper">
                
                <!-- products table-->
                <!-- the script for the toggle all checkboxes from header is located in js/theme.js -->
                <div class="table-wrapper products-table">
                    <div class="row-fluid head">
                        <div class="span12">
                            <h4>用户</h4>
                        </div>
                    </div>

                    <div class="row-fluid filter-block">
                        <div class="pull-right">
                            <div class="ui-select">
                                <select>
                                  <option />Filter users
                                  <option />Signed last 30 days
                                  <option />Active users
                                </select>
                            </div>
                            <input type="text" class="search" />
                            <a class="btn-flat success new-product">+ Add product</a>
                        </div>
                    </div>

                    <div class="row-fluid">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th class="span3">
                                        姓名
                                    </th>
                                    <th class="span3">
                                        <span class="line"></span>密码
                                    </th>
                                    <th class="span3">
                                        <span class="line"></span>操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row -->
                                <tr class="first" v-for="(user,index) in users" :key="index">
                                    <td>
                                        {{user.username}}
                                    </td>
                                    <td class="description">
                                        {{user.password}}
                                    </td>
                                    <td>
                                        <span class="label label-success">Active</span>
                                        <ul class="actions">
                                            <li><a href="#">Edit</a></li>
                                            <li class="last"><a href="#">Delete</a></li>
                                        </ul>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- end products table -->
            </div>
        </div>
        <hr/>
        <div>
            {{users}}
        </div>
    </div>
</template>

<script>
    export default{
        /* eslint-disable */
        data(){
            return{
                users:[]
            }
        },created(){
            this.$axios.get('users',{
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
                this.users = res.data.data
            })
            .catch(err=>{
                console.log(err);
            })

        }
    }
</script>
<style>
	
</style>