<template>
  <div>
    <el-input
      class="search"
      placeholder="按赛事名称进行搜索"
      v-model="searchInfo"
      clearable
    >
    </el-input>
    <el-button type="primary" icon="el-icon-search" @click="search()"
      >搜索</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="name" label="赛事名称"> </el-table-column>
      <el-table-column prop="timeName" label="赛事阶段"> </el-table-column>
      <el-table-column prop="count" sortable label="出场次数" width="100">
      </el-table-column>
      <el-table-column prop="win" sortable label="胜率"> </el-table-column>
      <el-table-column prop="win" sortable label="总击杀(场均)" width="150">
      </el-table-column>
      <el-table-column prop="death" sortable label="总死亡(场均)" width="150">
      </el-table-column>
      <el-table-column prop="putEye" sortable label="场均插眼" width="100">
      </el-table-column>
      <el-table-column prop="removeEye" sortable label="场均排眼" width="100">
      </el-table-column>
      <el-table-column
        prop="money"
        sortable
        label="场均金钱"
        width="100"
      ></el-table-column>
      <el-table-column prop="money" sortable label="查看视频" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="getVideo(scope.row)"
            type="success"
            round
            >查看视频</el-button
          >
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" v-if="vip">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
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
export default {
  data() {
    return {
      vip: true,
      tableData: [
        {
          name: "战神",
          timeName: "春季",
          win: "909",
          kill: "223",
          count: "19",
          death: "89",
          putEye: "89",
          removeEye: "89",
          money: "10989",
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
      this.$router.push({ path: "/game/add", query: { id: row._id } });
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将永久删除此比赛信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios({
            url: "http://localhost:3000/game/delGameList",
            params: {
              id: row._id,
            },
          })
            .then((res) => {
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
    getVideo(row) {
      console.log(row);
      window.location.href = row.video;
    },
    getList() {
      axios({
        url: "http://localhost:3000/game/getGameList",
      })
        .then((res) => {
          console.log(res);
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
          url: "http://localhost:3000/game/searchGame",
          params: {
            name: this.searchInfo,
          },
        })
          .then((res) => {
            console.log(res);
            if (Array.isArray(res.data)) {
              this.tableData = res.data;
            } else {
              let data = [];
              data.push(res.data);
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