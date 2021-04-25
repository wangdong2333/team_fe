<template>
  <div>
    <div class="app-container" v-if="vip">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
      >
        <el-form-item label="姓名" prop="username">
          <el-input
            ref="username"
            v-model="ruleForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input
            ref="age"
            v-model="ruleForm.age"
            placeholder="age"
            name="age"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input
            ref="tel"
            v-model="ruleForm.tel"
            placeholder="tel"
            name="tel"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="游戏" prop="gameName">
          <el-input
            ref="gameName"
            v-model="ruleForm.gameName"
            placeholder="gameName"
            name="gameName"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="等级" prop="lev ">
          <el-select class="lev" v-model="ruleForm.lev" placeholder="请选择">
            <el-option
              v-for="item in levOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="位置" prop="position ">
          <el-select
            class="position"
            v-model="ruleForm.position"
            placeholder="请选择"
          >
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择日期" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="照片" prop="imgUrl">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="isUpdata"
            type="primary"
            @click="updataForm('ruleForm')"
            >立即修改</el-button
          >
          <el-button v-else type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <Permission />
    </div>
  </div>
</template>
<script>
import { levelList } from "@/api/level";
import { addressList } from "@/api/address";
import { messageAdd, messageById, updataMessage } from "@/api/message";
import axios from "axios";
import Permission from "../permission";

export default {
  components: {
    Permission,
  },
  data() {
    return {
      isUpdata: false,
      vip: true,
      positionOptions: [
        {
          value: "上路",
          lable: "上路",
        },
        {
          value: "中路",
          lable: "中路",
        },
        {
          value: "下路",
          lable: "下路",
        },
        {
          value: "辅助",
          lable: "辅助",
        },
        {
          value: "打野",
          lable: "打野",
        },
      ],
      levOptions: [
        {
          value: "初级",
          lable: "初级",
        },
        {
          value: "中级",
          lable: "中级",
        },
        {
          value: "高级",
          lable: "高级",
        },
      ],
      ruleForm: {
        username: "",
        tel: "",
        age: "",
        lev: "",
        position: "",
        time: "",
        imgUrl: "",
        gameName: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        tel: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        age: [{ required: true, message: "请选择年龄", trigger: "blur" }],
        lev: [{ required: true, message: "请选择等级", trigger: "blur" }],
        position: [
          { required: true, message: "请选择位置", trigger: "change" },
        ],
      },
      targetTeam: "",
    };
  },
  created() {
    console.log(this.$route.query.id);
    this.targetTeam = localStorage.getItem("targetTeam");
    console.log(this.targetTeam);
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    if (userData.vip === "团队成员") {
      this.vip = false;
    }
    if (this.$route.query.id) {
      this.updataInit(this.$route.query.id);
    }
  },
  methods: {
    getTeam(oldTeam) {
      if (oldTeam === "IG") {
        oldTeam = "teamList";
      } else if (oldTeam === "LGD") {
        oldTeam = "ladTeam";
      } else if (oldTeam === "V5") {
        oldTeam = "v5Team";
      }
      return oldTeam;
    },
    // 修改初始化
    updataInit(id) {
      this.isUpdata = true;
      let team = this.getTeam(this.targetTeam);
      this.updata(id, team);
    },
    updata(id, team) {
      axios({
        url: `http://localhost:3000/${team}/getDetail`,
        method: "get",
        params: {
          id: id,
        },
      })
        .then((res) => {
          console.log(res.data);
          let _data = res.data;
          this.ruleForm = {
            username: _data.name,
            tel: _data.tel,
            age: _data.age,
            lev: _data.lev,
            position: _data.position,
            time: _data.time,
            imgUrl: _data.imgUrl,
            gameName: _data.gameName,
            
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交修改
    updataForm(formName) {
      let team = this.getTeam(this.targetTeam);
      this.form(team);
    },
    form(team) {
      axios({
        url: `http://localhost:3000/${team}/updateTeamList`,
        method: "post",
        params: {
          id: this.$route.query.id,
        },
        data: {
          name: this.ruleForm.username,
          tel: this.ruleForm.tel,
          age: this.ruleForm.age,
          lev: this.ruleForm.lev,
          position: this.ruleForm.position,
          time: this.ruleForm.time,
          imgUrl: this.ruleForm.imgUrl,
          gameName: this.ruleForm.gameName,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.resetForm("ruleForm");
          this.$router.push("/member/list");
        }
      });
    },
    // 提交操作
    submitForm(formName) {
      // console.log(this.ruleForm);
      let team = this.getTeam(this.targetTeam);
      this.submit(team);
    },
    submit(team) {
      axios({
        url: `http://localhost:3000/${team}/addTeamList`,
        method: "post",
        data: {
          name: this.ruleForm.username,
          tel: this.ruleForm.tel,
          age: this.ruleForm.age,
          lev: this.ruleForm.lev,
          position: this.ruleForm.position,
          time: this.ruleForm.time,
          imgUrl: this.ruleForm.imgUrl,
          gameName: this.ruleForm.gameName,

        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.resetForm("ruleForm");
            this.$router.push("/member/list");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      console.log("111");
    },
    beforeAvatarUpload(file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("dir", "wangdong");
      axios({
        url: "http://121.196.167.117:8085/file/uploadFile",
        method: "post",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          this.ruleForm.imgUrl = "http://121.196.167.117:8085/" + res.data.data;
          console;
          this.$message({
            type: "success",
            message: "上传成功!",
            duration: 1000,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style>
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
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>