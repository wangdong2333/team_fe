<template>
  <div class="mine">
    <div class="mine_info">
      <div>
        <img  class="mine_img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.soutu123.cn%2Fback_pic%2F04%2F42%2F19%2F5258515186b9f29.jpg%21%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fpic.soutu123.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620394011&t=013fa2898047bb16cdb8b691da521c14" alt="">
      </div>
      <div>
        <div class="enname">Lanhao</div>
        <div class="chname">兰浩</div>
        <div class="detail">工业园区管委会副主任兰浩通报了2011年全市安全生产情况，并安排部署了2012年安全生产重点工作。会议还表彰了2011年安全生产工作先进单位和先进个人。工业园区管委会副主任兰浩通报了2011年全市安全生产情况，并安排部署了2012年安全生产重点工作。会议还表彰了2011年安全生产工作先进单位和先进个人.</div>
      </div>
    </div>
    <h3>个人数据</h3>
    <el-table :data="tableData" style="width: 100%" class="table">
    <el-table-column type="index" width="150"> </el-table-column>
    <el-table-column prop="name" label="姓名"> </el-table-column>
    <el-table-column prop="age" sortable label="年龄"> </el-table-column>
    <el-table-column prop="position" label="位置"> </el-table-column>
    <el-table-column prop="level" label="等级"> </el-table-column>
    <el-table-column prop="tel" label="手机号"> </el-table-column>
    <el-table-column prop="date" sortable label="加入战队时间"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
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
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "战神",
          position: "上路",
          level: "高级",
          tel: '18103605857',
          age:'19'
        },
        {
          date: "2016-09-02",
          name: "兰浩",
          position: "辅助",
          level: "低级",
          tel: '18103605857',
          age:'3'
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
  .mine_info {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 490px;
    background: url(https://game.gtimg.cn/images/lpl/es/web201612/team_banner-bg.jpg) no-repeat center top #141415;;
  }
  .mine_img{
    width: 580px;
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
    font-family: dinbold,'微软雅黑';
  }
  .chname {
    text-align: center;
    font-size: 30px;
    color: #f2f4f7;
    font-weight: 400;
    height: 55px;
    line-height: 55px;
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

