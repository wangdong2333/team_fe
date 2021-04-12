<template>
  <el-table :data="tableData" style="width: 100%">
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
  created() {},
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>