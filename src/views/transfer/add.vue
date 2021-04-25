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
        <el-form-item label="原战队" prop="oldTeam">
          <el-input
            ref="oldTeam"
            v-model="ruleForm.oldTeam"
            placeholder="oldTeam"
            name="oldTeam"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="转会战队" prop="newTeam">
          <el-input
            ref="newTeam"
            v-model="ruleForm.newTeam"
            placeholder="newTeam"
            name="newTeam"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="选择日期" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            type="date"
            placeholder="选择日期">
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
    <div v-else>
      <Permission/>
    </div>
  </div>
</template>
<script>
import { messageAdd, messageById, updataMessage } from "@/api/message";
import axios from 'axios';
import Permission from '../permission'

export default {
  components: {
    Permission
  },
  data() {
    return {
      isUpdata:false,
      vip: true,
      ruleForm: {
        username: "",
        oldTeam: "",
        time: "",
        newTeam: ''
      },
      rules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        oldTeam: [{ required: true, message: "请输入原战队", trigger: "blur" }],
        newTeam: [{ required: true, message: "请输入新战队", trigger: "blur" }],
      },
    };
  },
  created() {
    console.log(this.$route.query.id);
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userData)
    if(userData.vip === '团队成员') {
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
        url: 'http://localhost:3000/transfer/getDetail',
        method: "get",
        params: {
          id: id
        }
      }).then(res => {
          console.log(res.data);
          let _data = res.data;
          this.ruleForm = {
            username: _data.name,
            oldTeam: _data.oldTeam,
            newTeam: _data.newTeam,
            time: _data.time,
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交修改
    updataForm(formName) {
      axios({
        url: 'http://localhost:3000/transfer/updateTransferList',
        method: "post",
        params: {
          id: this.$route.query.id
        },
        data: {
          name: this.ruleForm.username,
          oldTeam: this.ruleForm.oldTeam,
          newTeam: this.ruleForm.newTeam,
          time: this.ruleForm.time
        }
      }).then(res => {
        console.log(res);
        if(res.data.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.resetForm('ruleForm');
          this.$router.push('/transfer/list');
        }
      })
    },
    // 提交操作
    submitForm(formName) {
      console.log(this.ruleForm);
      axios({
        url: 'http://localhost:3000/transfer/addTransferList',
        method: "post",
        data: {
          name: this.ruleForm.username,
          oldTeam: this.ruleForm.oldTeam,
          newTeam: this.ruleForm.newTeam,
          time: this.ruleForm.time
        }
      }).then(res => {
        console.log(res);
        if(res.data.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.resetForm('ruleForm');
          this.$router.push('/transfer/list');
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.app-container {
  width: 500px;
  margin: 50px auto;
}
</style>