<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">电子战队信息管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >快速登录</el-button
      >
      <el-button
      class="zhuce"
        :loading="loading"
        type="primary"
        style="width: 100%"
        @click.native.prevent="handleRegister"
        >快来注册</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { register, getInfo } from "@/api/user";
import router, { resetRouter } from "@/router";
import { mapGetters } from "vuex";
import axios from 'axios'
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      dialogFormVisible: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['loginAction']),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleRegister() {
      this.$router.push(`/register`);
    },
    async handleLogin() {
      axios({
          url: 'http://localhost:3000/user/loginUser',
          method: "post",
          data: {
            userName: this.loginForm.username,
            password: this.loginForm.password,
          }
      }).then((res) =>{
        if(res.data.code === 200 ) {
           this.$message({
              message: '登录成功',
              type: 'success'
            });
          localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo));
          this.loginAction(res.data.userInfo);
          if (res.data.userInfo.vip === "超级管理员") {
            this.$router.push('/super');
            
          } else {
            let targetTeam = JSON.parse(localStorage.getItem('userInfo'));
            localStorage.setItem('targetTeam', targetTeam.team);
            this.$router.push('/main/index')
          }
        }else if (res.data.code === 201 ) {
          this.$message.error('账号或密码错误');
        }
      });
    },
    getUserInfo() {
      getInfo().then((res) => {
        localStorage.setItem("userinfo", JSON.stringify(res.data.data));
    // this.$router.push("/")
        this.$router.replace({ path: this.redirect || "/" });
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
.zhuce{
  margin-left:0px;
}
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
