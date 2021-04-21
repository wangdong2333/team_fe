<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" width="100"> </el-table-column>
    <el-table-column prop="name" label="姓名"> </el-table-column>
    <el-table-column prop="oldTeam" label="原战队"> </el-table-column>
    <el-table-column prop="time" sortable label="转会时间"> </el-table-column>
    <el-table-column label="操作" width="150" v-if="vip">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import axios from 'axios';
import moment from "moment";
export default {
  data() {
    return {
      vip :true,
      tableData: [
        {
          name: "战神",
          oldTeam: 'LOL',
          time: "2016-11-11",
        },
        {
          name: "六立",
          oldTeam: 'WE',
          time: "2017-11-11",
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
    // console.log(moment('2021-04-16T06:01:32.628Z').format('YYYY-MM-DD'));
  },
  methods: {
    handleEdit(index, row) {
      this.$router.push({path:'/transfer/add', query: {id : row._id}});
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios({
            url: 'http://localhost:3000/transfer/delTransferList',
            params: {
              id: row._id
            }
          }).then(res => {
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
          url: 'http://localhost:3000/transfer/getTransferList'
        })
        .then(res => {
          console.log(res);
          res.data.forEach((item) =>{
            item.time = moment(item.time).format('YYYY-MM-DD');
          })
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      }
  },
};
</script>