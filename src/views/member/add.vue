<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
    >
      <!-- <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="tel">
        <el-input v-model="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="位置" prop="address">
        <el-select v-model="ruleForm.address" placeholder="请选择位置">
          <el-option
            v-for="item in addressData"
            :key="item.addressid"
            :label="item.addressname"
            :value="item.addressid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-select v-model="ruleForm.level" placeholder="请选择等级">
          <el-option
            v-for="item in levelData"
            :key="item.jrid"
            :label="item.levelname"
            :value="item.jrid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加入战队时间" prop="tel">
        <el-date-picker v-model="time" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item> -->
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
</template>
<script>
import { levelList } from "@/api/level";
import { addressList } from "@/api/address";
import { messageAdd, messageById, updataMessage } from "@/api/message";
import axios from "axios";

export default {
  data() {
    return {
      isUpdata: false,
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
        // imageUrl: ""
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
    };
  },
  created() {
    console.log(this.$route.query.id);
    // this.getSelData();
    if (this.$route.query.id) {
      this.updataInit(this.$route.query.id);
    }
  },
  methods: {
    // 修改初始化
    updataInit(id) {
      this.isUpdata = true;
      axios({
        url: "http://localhost:3000/teamList/getDetail",
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
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // // 获取下拉列表信息
    // getSelData() {
    //   this.loading = true;
    //   let promiseLevel = new Promise((resolve, reject) => {
    //     levelList().then((res) => {
    //       this.levelData = res.data.data;
    //       resolve(res.data.data);
    //     });
    //   });
    //   let promiseAddress = new Promise((resolve, reject) => {
    //     addressList().then((res) => {
    //       this.addressData = res.data.data;
    //       resolve(res.data.data);
    //     });
    //   });

    //   Promise.all([promiseLevel, promiseAddress]).then((res) => {
    //     this.loading = false;
    //   });
    // },
    // 提交修改
    updataForm(formName) {
      axios({
        url: "http://localhost:3000/teamList/updateTeamList",
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
      console.log(this.ruleForm);
      axios({
        url: "http://localhost:3000/teamList/addTeamList",
        method: "post",
        data: {
          name: this.ruleForm.username,
          tel: this.ruleForm.tel,
          age: this.ruleForm.age,
          lev: this.ruleForm.lev,
          position: this.ruleForm.position,
          time: this.ruleForm.time,
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
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
};
</script>
<style scoped>
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
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>