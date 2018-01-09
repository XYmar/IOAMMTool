<template>
	<div>

	    <div class="row-fluid login-wrapper">
	        <a href="index.html">
	            <img class="logo" src="img/logo-white.png" />
	        </a>

	        <div class="span4 box">
	            <div class="content-wrap">
	                <h6>登录</h6>
	                <input id ="username" class="span12" type="text" placeholder="用户名" />
	                <input id ="password" class="span12" type="password" placeholder="密码"/>
	                <a href="#" class="forgot">忘记密码?</a>
	                <div class="remember">
	                    <input id="remember-me" type="checkbox" />
	                    <label for="remember-me">记住我</label>
	                </div>
					<button class="btn-glow primary" style="width: 100px;" v-on:click="login">登录</button>
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
export default {
  data() {
    username: "";
    password: "";
    return {};
  },
  methods: {
    login: function() {
      //debugger;
      var username = $("input#username").val();
      var password = $("input#password").val();
      if (username.length == 0 || password.length == 0) {
		alert("请输入正确的用户名或密码。");
		return;
      }
      this.$axios
        .post(
          "users/login",
          {},
          {
            auth: {
              username: username,
              password: password
            }
          }
        )
        .then(response => {
          this.$router.replace({ path: "/selectProject" });
        })
        .catch(function(error) {
          alert("请输入正确的用户名或密码。");
        });
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      //背景
      $("html").css("background-image", "url('img/bgs/10.jpg')");
    });
  }
};
</script>

<style>

</style>