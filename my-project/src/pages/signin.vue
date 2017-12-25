<template>
	<div>

	    <div class="row-fluid login-wrapper">
	        <a href="index.html">
	            <img class="logo" src="img/logo-white.png" />
	        </a>

	        <div class="span4 box">
	            <div class="content-wrap">
	                <h6>登录</h6>
	                <input class="span12" type="text" placeholder="用户名" />
	                <input class="span12" type="password" placeholder="密码" />
	                <a href="#" class="forgot">忘记密码?</a>
	                <div class="remember">
	                    <input id="remember-me" type="checkbox" />
	                    <label for="remember-me">记住我</label>
	                </div>
	                <router-link to="/selectProject"  class="btn-glow primary login">
			           登录
			        </router-link>
	                <!-- <a class="btn-glow primary login" href="index.html">登录</a> -->
	            </div>
	        </div>

	        <div class="span4 no-account">
	            <p>Don't have an account?</p>
	            <a href="signup.html">Sign up</a>
	        </div>
	    </div>
	</div>
</template>

<script>
/* eslint-disable */
export default{
	data(){
		return {

		}
	},
	mounted: function(){
		this.$nextTick(function () {
			//背景
            $("html").css("background-image", "url('img/bgs/10.jpg')");
		})

	
	}
}
	
</script>

<style>
	
</style>