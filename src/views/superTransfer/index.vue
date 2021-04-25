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
      <el-table-column type="index" width="100"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="oldTeam" label="原战队"> </el-table-column>
      <el-table-column prop="newTeam" label="转会战队"> </el-table-column>
      <el-table-column prop="time" sortable label="转会时间"> </el-table-column>
      <el-table-column prop="status" label="转会状态"> </el-table-column>
      <el-table-column label="操作" width="150" v-if="vip">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >批准</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >驳回</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      vip: true,
      tableData: [],
      searchInfo: "",
      successMember: {},
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
      console.log(row.oldTeam)
      this.getDetail(row.oldTeam, row.name);
      setTimeout(() =>{
        this.delOld(row.oldTeam);
        this.addNew(row.newTeam ,row.oldTeam);
        this.success(row);
      },2000)
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("此操作驳回此信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("updateTransferList");
          axios({
            url: "http://localhost:3000/transfer/updateTransferList",
            method: "post",
            params: {
              id: row._id,
            },
            data: {
              name: row.name,
              oldTeam: row.oldTeam,
              newTeam: row.newTeam,
              status: "-1",
              time: row.time,
            },
          })
            .then((res) => {
              console.log(res);
              if (res.data.code === 200) {
                this.$message({
                  message: "驳回成功",
                  type: "success",
                });
                this.getList();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消驳回",
          });
        });
    },
    getList() {
      axios({
        url: "http://localhost:3000/transfer/getTransferList",
      })
        .then((res) => {
          console.log(res);
          this.tableData.length = 0;
          res.data.forEach((item) => {
            item.time = moment(item.time).format("YYYY-MM-DD");
            if (item.status === "0") {
              item.status = this.getStatus(item.status);
              this.tableData.push(item);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search() {
      console.log(this.searchInfo);
      if (this.searchInfo) {
        axios({
          url: "http://localhost:3000/transfer/searchTransfer",
          params: {
            name: this.searchInfo,
          },
        })
          .then((res) => {
            console.log(res);
            if (Array.isArray(res.data)) {
              res.data.forEach((item) => {
                item.status = this.getStatus(item.status);
                item.time = moment(item.time).format("YYYY-MM-DD");
              });
              this.tableData = res.data;
            } else {
              let data = [];
              data.push(res.data);
              data.forEach((item) => {
                item.status = this.getStatus(item.status);
                item.time = moment(item.time).format("YYYY-MM-DD");
              });
              this.tableData = data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.getList();
      }
    },
    success(row) {
      axios({
        url: "http://localhost:3000/transfer/updateTransferList",
        method: "post",
        params: {
          id: row._id,
        },
        data: {
          name: row.name,
          oldTeam: row.oldTeam,
          newTeam: row.newTeam,
          status: "1",
          time: row.time,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message({
              message: "批准成功",
              type: "success",
            });
            this.getList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getStatus(status) {
      if (status === "0") {
        status = "转会中,待处理...";
      } else if (status === "-1") {
        status = "已驳回";
      } else if (status === "1") {
        status = "已完成";
      }
      return status;
    },
    getDetail(oldTeam, name) {
      oldTeam = this.getTeam(oldTeam);
      axios({
        url: `http://localhost:3000/${oldTeam}/getNameDetail`,
        method: "get",
        params: {
          name: name,
        },
      }).then((res) => {
        console.log("getDetail", res.data);
        this.successMember = res.data;
      });
    },
    delOld(oldTeam) {
      oldTeam = this.getTeam(oldTeam);
      console.log(oldTeam, 'oldTeam');
      console.log(this.successMember,'this.successMember')
      axios({
        url: `http://localhost:3000/${oldTeam}/delTeamList`,
        params: {
          id: this.successMember._id,
        },
      })
        .then((res) => {
          console.log('delOld',res)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addNew(newTeam, oldTeam) {
      newTeam = this.getTeam(newTeam);
      axios({
        url: `http://localhost:3000/${newTeam}/addTeamList`,
        method: "post",
        data: {
          name: this.successMember.name,
          tel: this.successMember.tel,
          age: this.successMember.age,
          lev: this.successMember.lev,
          position: this.successMember.position,
          time: this.successMember.time,
          imgUrl: this.successMember.imgUrl,
          gameName: this.successMember.gameName,
          oldTeam: oldTeam,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            console.log('addNew');
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
  },
};
</script>
<style scoped>
.search {
  width: 200px;
  margin: 10px;
}
</style>