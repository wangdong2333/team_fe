<template>
  <div>
    <div class="app-container" v-if="vip">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
      >
        <el-form-item label="赛事名称" prop="name">
          <el-input
            ref="name"
            v-model="ruleForm.name"
            placeholder="name"
            name="name"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item label="赛事阶段" prop="timeName">
          <el-input
            ref="timeName"
            v-model="ruleForm.timeName"
            placeholder="timeName"
            name="timeName"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="出场次数" prop="count">
          <el-input
            ref="count"
            v-model="ruleForm.count"
            placeholder="count"
            name="count"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="胜率" prop="win">
          <el-input
            ref="win"
            v-model="ruleForm.win"
            placeholder="win"
            name="win"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="总击杀(场均)" prop="kill">
          <el-input
            ref="kill"
            v-model="ruleForm.kill"
            placeholder="kill"
            name="kill"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="总死亡(场均)" prop="death">
          <el-input
            ref="death"
            v-model="ruleForm.death"
            placeholder="death"
            name="death"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="场均插眼" prop="putEye">
          <el-input
            ref="putEye"
            v-model="ruleForm.putEye"
            placeholder="putEye"
            name="putEye"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="场均排眼" prop="removeEye">
          <el-input
            ref="removeEye"
            v-model="ruleForm.removeEye"
            placeholder="removeEye"
            name="removeEye"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="场均金钱" prop="money">
          <el-input
            ref="money"
            v-model="ruleForm.money"
            placeholder="money"
            name="money"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="比赛视频" prop="video">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >             
            <video
              preload="auto"
              v-if="ruleForm.video"
              :src="ruleForm.video"
              webkit-playsinline="true"
              playsinline="true"
              x-webkit-airplay="true"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="true"
              controls="controls"
              x5-video-ignore-metadata="true"
              width="100%"
              height="100%"
            ></video>
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
      ruleForm: {
        name: "",
        timeName: "",
        count: "",
        win: "",
        kill: "",
        death: "",
        putEye: "",
        removeEye: "",
        money: "",
        video: "",
      },
      rules: {
        name: [{ required: true, message: "请输入赛事名称", trigger: "blur" }],
        timeName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        count: [{ required: true, message: "请输入出场次数", trigger: "blur" }],
      },
    };
  },
  created() {
    console.log(this.$route.query.id);
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userData);
    if (userData.vip === "团队成员") {
      this.vip = false;
    }
    if (this.$route.query.id) {
      this.updataInit(this.$route.query.id);
    }
  },
  methods: {
    // 修改初始化
    updataInit(id) {
      this.isUpdata = true;
      axios({
        url: "http://localhost:3000/game/getDetail",
        method: "get",
        params: {
          id: id,
        },
      })
        .then((res) => {
          console.log(res.data);
          let _data = res.data;
          this.ruleForm = {
            name: _data.name,
            timeName: _data.timeName,
            win: _data.win,
            kill: _data.kill,
            count: _data.count,
            death: _data.death,
            putEye: _data.putEye,
            removeEye: _data.removeEye,
            money: _data.money,
            video: _data.video,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交修改
    updataForm(formName) {
      axios({
        url: "http://localhost:3000/game/updateGameList",
        method: "post",
        params: {
          id: this.$route.query.id,
        },
        data: {
          name: this.ruleForm.name,
          timeName: this.ruleForm.timeName,
          win: this.ruleForm.win,
          kill: this.ruleForm.kill,
          count: this.ruleForm.count,
          death: this.ruleForm.death,
          putEye: this.ruleForm.putEye,
          removeEye: this.ruleForm.removeEye,
          money: this.ruleForm.money,
          video: this.ruleForm.video,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.resetForm("ruleForm");
          this.$router.push("/game/list");
        }
      });
    },
    // 提交操作
    submitForm(formName) {
      console.log(this.ruleForm.putEye);
      axios({
        url: "http://localhost:3000/game/addGameList",
        method: "post",
        data: {
          name: this.ruleForm.name,
          timeName: this.ruleForm.timeName,
          win: this.ruleForm.win,
          kill: this.ruleForm.kill,
          count: this.ruleForm.count,
          death: this.ruleForm.death,
          putEye: this.ruleForm.putEye,
          removeEye: this.ruleForm.removeEye,
          money: this.ruleForm.money,
          video: this.ruleForm.video,
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
            this.$router.push("/game/list");
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
          this.ruleForm.video = "http://121.196.167.117:8085/" + res.data.data;
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
<style scoped>
.app-container {
  width: 500px;
  margin: 50px auto;
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