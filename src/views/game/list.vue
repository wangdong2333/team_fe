<template>
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
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary"
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
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      vip :true,
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
    };
  },
  created() {
    this.getList();
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userData)
    if(userData.vip === '团队成员') {
        this.vip = false;
    }
  },
  methods: {
    handleEdit(index, row) {
      this.$router.push({path:'/game/add', query: {id : row._id}});
    },
    handleDelete(index, row) {
      // console.log(index, row);
      axios({
        url: 'http://localhost:3000/game/delGameList',
        params: {
          id: row._id
        }
      })
        .then(res => {
          console.log(res);
          if(res.data.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getVideo(row) {
      console.log(row)
      window.location.href = row.video;
    },
    getList() {
      axios({
        url: 'http://localhost:3000/game/getGameList'
      })
      .then(res => {
        console.log(res);
        this.tableData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
};
</script>