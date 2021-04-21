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
      <el-table-column prop="position" label="位置"> </el-table-column>
      <el-table-column prop="lev" label="等级"> </el-table-column>
      <el-table-column prop="tel" label="手机号"> </el-table-column>
      <el-table-column prop="time" sortable label="加入战队时间">
      </el-table-column>
      <el-table-column label="操作" v-if="vip">
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getList() {
      axios({
        url: "http://localhost:3000/teamList/getTeamList",
      })
        .then((res) => {
          console.log(res);
          res.data.forEach((item) => {
            item.time = moment(item.time).format("YYYY-MM-DD");
          });
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search() {
      console.log(this.searchInfo);
      if (this.searchInfo) {
        axios({
          url: "http://localhost:3000/teamList/searchMember",
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
      } else {
        this.getList();
      }
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