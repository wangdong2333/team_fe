<template>
  <div class="mine">
    <div class="mine_info">
      <div>
        <img
          class="mine_img"
          :src="tableData[0].imgUrl"
        />
      </div>
      <div>
        <div class="enname">{{tableData[0].enname}}</div>
        <div class="chname">{{tableData[0].userName}}</div>
        <div class="detail">
          工业园区管委会副主任兰浩通报了2011年全市安全生产情况，并安排部署了2012年安全生产重点工作。会议还表彰了2011年安全生产工作先进单位和先进个人。工业园区管委会副主任兰浩通报了2011年全市安全生产情况，并安排部署了2012年安全生产重点工作。会议还表彰了2011年安全生产工作先进单位和先进个人.
        </div>
      </div>
    </div>
    <h3>个人数据</h3>
    <el-table :data="tableData" style="width: 100%" class="table">
      <el-table-column min-width="100px" label="姓名">
        <template scope="scope">
          <el-input
            v-show="scope.row.edit"
            size="small"
            v-model="scope.row.userName"
          ></el-input>
          <span v-show="!scope.row.edit">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="年龄">
        <template scope="scope">
          <el-input
            v-show="scope.row.edit"
            size="small"
            v-model="scope.row.age"
          ></el-input>
          <span v-show="!scope.row.edit">{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="位置">
        <template scope="scope">
          <el-input
            v-show="scope.row.edit"
            size="small"
            v-model="scope.row.position"
          ></el-input>
          <span v-show="!scope.row.edit">{{ scope.row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="等级">
        <template scope="scope">
          <el-input
            v-show="scope.row.edit"
            size="small"
            v-model="scope.row.lev"
          ></el-input>
          <span v-show="!scope.row.edit">{{ scope.row.lev }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="电话号码">
        <template scope="scope">
          <el-input
            v-show="scope.row.edit"
            size="small"
            v-model="scope.row.tel"
          ></el-input>
          <span v-show="!scope.row.edit">{{ scope.row.tel }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="date" sortable label="加入战队时间"> -->

      <el-table-column min-width="100px" label="加入战队时间">
        <template scope="scope">
          <el-input
            v-show="scope.row.edit"
            size="small"
            v-model="scope.row.createDate"
          ></el-input>
          <span v-show="!scope.row.edit">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template scope="scope">
          <el-button
            v-show="!scope.row.edit"
            type="primary"
            @click="scope.row.edit = true;"
            size="small"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            v-show="scope.row.edit"
            type="success"
            @click="reSet(scope)"
            size="small"
            icon="el-icon-check"
            >完成</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment';


export default {
  data() {
    return {
      tableData: [
        {
          createDate: "2016-05-02",
          userName: "战神",
          enname: "MingCheng",
          position: "上路",
          lev: "高级",
          tel: "18103605857",
          age: "19",
          imgUrl: "",
          edit: false
        },
      ],
    };
  },
  computed:{
    ...mapState(["userInfo"]),
  },
  mounted() {
    console.log(localStorage.getItem('userInfo'), 'localStorage');
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo.userName);
    this.tableData[0].userName = userInfo.userName;
    this.tableData[0].position = userInfo.position;
    this.tableData[0].lev = userInfo.lev;
    this.tableData[0].tel = userInfo.tel;
    this.tableData[0].age = userInfo.age;
    this.tableData[0].createDate = moment(userInfo.createDate).format('YYYY-MM-DD');
    this.tableData[0].imgUrl = userInfo.imgUrl;
  },
  methods: {
    reSet(scope) {
      console.log(scope.row);
      scope.row.edit = false;
      localStorage.setItem('userInfo', JSON.stringify(scope.row));
    }
  },
};
</script>

<style scoped>
.mine_info {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 490px;
  background: url(https://game.gtimg.cn/images/lpl/es/web201612/team_banner-bg.jpg)
    no-repeat center top #141415;
}
.mine_img {
  width: 510px;
  height: 490px;
  float: left;
}
.enname {
  margin-top: 100px;
  text-align: center;
  font-size: 100px;
  color: #f2f4f7;
  height: 110px;
  line-height: 86px;
  font-family: dinbold, "微软雅黑";
}
.chname {
  text-align: center;
  font-size: 30px;
  color: #f2f4f7;
  font-weight: 400;
  height: 55px;
  line-height: 55px;
  margin-top: 10px;
}
.detail {
  font-size: 14px;
  text-align: left;
  color: #f1f3f6;
  font-weight: 400;
  line-height: 24px;
  text-indent: 2em;
  padding-top: 32px;
  margin-left: 620px;
  margin-top: 20px;
}
h3 {
  width: 1350px;
  margin: 0 auto;
  color: #404040;
  font-size: 26px;
  border-bottom: 3px solid #ededee;
  font-weight: 400;
  padding-top: 30px;
  padding-bottom: 5px;
}
.table {
  margin-bottom: 30px;
}
</style>

