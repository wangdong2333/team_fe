<template>
  <div>
    <el-input
      class="search"
      placeholder="按成员姓名进行搜索"
      v-model="searchInfo"
      clearable
    >
    </el-input>
    <el-button type="primary" icon="el-icon-search" @click="search()"
      >搜索</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="150"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" sortable label="年龄"> </el-table-column>
      <el-table-column prop="gameName" label="游戏"> </el-table-column>
      <el-table-column prop="position" label="位置"> </el-table-column>
      <el-table-column prop="lev" label="等级"> </el-table-column>
      <el-table-column prop="tel" label="手机号"> </el-table-column>
      <el-table-column prop="time" sortable label="加入战队时间">
      </el-table-column>
      <el-table-column label="操作" v-if="vip" width="300px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="handleTransfer(scope.$index, scope.row)"
            >转会</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="申请转会" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="转会战队" :label-width="formLabelWidth">
          <el-select
            v-model="form.transferTeam"
            placeholder="请选择想要转会的战队"
          >
            <el-option label="IG" value="IG"></el-option>
            <el-option label="LGD" value="LGD"></el-option>
            <el-option label="V5" value="V5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="transferCancle">取 消</el-button>
        <el-button type="primary" @click="transferConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      vip: true,
      tableData: [
        {
          time: "2016-05-02",
          name: "战神",
          position: "上路",
          lev: "高级",
          tel: "18103605857",
          age: "19",
        },
        {
          time: "2016-09-02",
          name: "兰浩",
          position: "辅助",
          lev: "低级",
          tel: "18103605857",
          age: "3",
        },
      ],
      searchInfo: "",
      targetTeam: "",
      dialogFormVisible: false,
      rowName: "",
      form: {
        transferTeam: "",
      },
      formLabelWidth: "100px",
    };
  },
  created() {
    this.getList();
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userData);
    if (userData.vip === "团队成员") {
      this.vip = false;
    }
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({ path: "/member/add", query: { id: row._id } });
    },
    handleDelete(index, row) {
      console.log(row._id);
      this.$confirm("此操作将永久删除此成员信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.targetTeam === "IG") {
            axios({
              url: "http://localhost:3000/teamList/delTeamList",
              params: {
                id: row._id,
              },
            })
              .then((res) => {
                console.log(res);
                if (res.data.code === 200) {
                  this.$message({
                    message: "删除成功",
                    type: "success",
                  });
                  this.getList();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.targetTeam === "LGD") {
            axios({
              url: "http://localhost:3000/ladTeam/delTeamList",
              params: {
                id: row._id,
              },
            })
              .then((res) => {
                console.log(res);
                if (res.data.code === 200) {
                  this.$message({
                    message: "删除成功",
                    type: "success",
                  });
                  this.getList();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.targetTeam === "V5") {
            axios({
              url: "http://localhost:3000/v5Team/delTeamList",
              params: {
                id: row._id,
              },
            })
              .then((res) => {
                console.log(res);
                if (res.data.code === 200) {
                  this.$message({
                    message: "删除成功",
                    type: "success",
                  });
                  this.getList();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleTransfer(index, row) {
      this.rowName = row.name;
      this.dialogFormVisible = true;
    },
    transferConfirm() {
      console.log(this.form.transferTeam);
      axios({
        url: "http://localhost:3000/transfer/addTransferList",
        method: "post",
        data: {
          name: this.rowName,
          oldTeam: this.targetTeam,
          newTeam: this.form.transferTeam,
          status: "0",
          time: this.getNowFormatDate(),
        },
      })
        .then((res) => {
          console.log(res);
          this.$message({
            message: "申请成功",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.transferCancle();
    },
    transferCancle() {
      this.dialogFormVisible = false;
    },
    getList() {
      this.targetTeam = localStorage.getItem("targetTeam");
      if (this.targetTeam === "IG") {
        axios({
          url: "http://localhost:3000/teamList/getTeamList",
        })
          .then((res) => {
            console.log(res);
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.targetTeam === "LGD") {
        console.log("11111");
        axios({
          url: "http://localhost:3000/ladTeam/getLgdTeam",
        })
          .then((res) => {
            console.log(res);
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.targetTeam === "V5") {
        console.log("222");
        axios({
          url: "http://localhost:3000/V5Team/getV5Team",
        })
          .then((res) => {
            console.log(res);
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
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
    search() {
      console.log(this.searchInfo);
      if (this.searchInfo) {
        let team = this.getTeam(this.targetTeam);
        this.searchMember(team);
      } else {
        this.getList();
      }
    },
    searchMember(team) {
      axios({
        url: `http://localhost:3000/${team}/searchMember`,
        params: {
          name: this.searchInfo,
        },
      })
        .then((res) => {
          console.log(res);
          if (Array.isArray(res.data)) {
            res.data.forEach((item) => {
              item.time = moment(item.time).format("YYYY-MM-DD");
            });
            this.tableData = res.data;
          } else {
            let data = [];
            data.push(res.data);
            data.forEach((item) => {
              item.time = moment(item.time).format("YYYY-MM-DD");
            });
            this.tableData = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
  },
};
</script>
<style scoped>
.search {
  width: 200px;
  margin: 10px;
}
</style>