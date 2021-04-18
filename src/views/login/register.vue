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
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          姓名：
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
          密码：
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="age">
        <span class="svg-container">
          年龄：
        </span>
        <el-input
          ref="age"
          v-model="loginForm.age"
          placeholder="age"
          name="age"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="tel">
        <span class="svg-container">
          电话：
        </span>
        <el-input
          ref="tel"
          v-model="loginForm.tel"
          placeholder="tel"
          name="tel"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="lev ">
        <span class="svg-container">
          等级：
        </span>
         <el-select class="lev" v-model="loginForm.lev" placeholder="请选择">
              <el-option
                v-for="item in levOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
      </el-form-item>
      <el-form-item prop="position ">
        <span class="svg-container">
          位置：
        </span>
         <el-select class="position" v-model="loginForm.position" placeholder="请选择">
              <el-option
                v-for="item in positionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
      </el-form-item>
      <el-form-item prop="vip">
        <span class="svg-container">
          管理：
        </span>
         <el-select class="vip" v-model="loginForm.vip" placeholder="请选择">
              <el-option
                v-for="item in permissionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
      </el-form-item>
      <el-form-item prop="imgUrl" class="img">
          <span class="svg-container">
            <svg-icon icon-class="user" />
            上传头像：
          </span>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="loginForm.imgUrl" :src="loginForm.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >注册</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { register, getInfo } from "@/api/user";
import axios from 'axios'

export default {
  name: "Login",
  data() {
    return {
      permissionOptions: [
        {
          value: '团队管理员',
          lable: '团队管理员'
        },
        {
          value: '团队成员',
          lable: '团队成员'
        }
      ],
      positionOptions:[{
        value:'上路',
        lable:'上路'
      },{
        value:'中路',
        lable:'中路'
      },{
        value:'下路',
        lable:'下路'
      },{
        value:'辅助',
        lable:'辅助'
      },{
        value:'打野',
        lable:'打野'
      }],
      levOptions:[
        {
        value:'初级',
        lable:'初级'
      },{
        value:'中级',
        lable:'中级'
      },{
        value:'高级',
        lable:'高级'
      },
      ],
      loginForm: {
        username: "",
        password: "",
        tel: "",
        age: "",
        lev: "",
        position: "",
        vip: "",
        imgUrl: ""
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
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
    async handleLogin() {
      console.log(this.loginForm);
      axios({
          url: 'http://localhost:3000/user/registUser',
          method: "post",
          data: {
            userName: this.loginForm.username,
            password: this.loginForm.password,
            tel: this.loginForm.tel,
            age: this.loginForm.age,
            lev: this.loginForm.lev,
            position: this.loginForm.position,
            vip: this.loginForm.vip,
            imgUrl: this.loginForm.imgUrl
          }
      }).then((res) =>{
        console.log(res);
        if(res.data.code === 200 ) {
           this.$message({
              message: '注册成功',
              type: 'success'
            });
          this.$router.push("/login");
        }else if (res.data.code === 201 ) {
          this.$message.error('注册失败');
        }
      });
    },
    getUserInfo() {
      getInfo().then((res) => {
        console.log(res.data.data);
        localStorage.setItem("userinfo", JSON.stringify(res.data.data));
      });
    },
    handleAvatarSuccess(res, file) {
      console.log('111')
    },
    beforeAvatarUpload(file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('dir', 'wangdong');
      axios({
        url: "http://121.196.167.117:8085/file/uploadFile",
        method: "post",
        data: formData
      }).then((res) => {
        console.log(res);
        this.loginForm.imgUrl = "http://121.196.167.117:8085/" + res.data.data;
        console
        this.$message({
          type: "success",
          message: "上传成功!",
          duration: 1000,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    }
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
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    // width: 30px;
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

  .app-container {
  width: 500px;
  margin: 50px auto;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    margin: 0 auto;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  // .img{
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
}
</style>
