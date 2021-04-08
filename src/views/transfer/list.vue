<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" width="100"> </el-table-column>
    <el-table-column prop="name" label="姓名"> </el-table-column>
    <el-table-column prop="lastName" label="原战队"> </el-table-column>
    <el-table-column prop="time" sortable label="转会时间"> </el-table-column>
    <el-table-column label="操作" width="150">
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
          name: "战神",
          lastName: 'LOL',
          time: "2016-11-11",
        },
        {
          name: "六立",
          lastName: 'WE',
          time: "2017-11-11",
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