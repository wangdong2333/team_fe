<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" width="100"> </el-table-column>
    <el-table-column prop="name" label="赛事名称"> </el-table-column>
    <el-table-column prop="timeName" label="赛事阶段"> </el-table-column>
    <el-table-column prop="count" sortable label="出场次数" width="100"> </el-table-column>
    <el-table-column prop="win" sortable label="胜率"> </el-table-column>
    <el-table-column prop="kill" sortable label="总击杀(场均)" width="150"> </el-table-column>
    <el-table-column prop="death" sortable label="总死亡(场均)" width="150"> </el-table-column>
    <el-table-column prop="putEye" sortable label="场均插眼" width="100"> </el-table-column>
    <el-table-column prop="removeEye" sortable label="场均排眼" width="100"> </el-table-column>
    <el-table-column prop="money" sortable label="场均金钱" width="100"> </el-table-column>

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
          timeName: "春季",
          win: "909",
          kill: '223',
          count:'19',
          death: '89',
          putEye: '89',
          removeEye: '89',
          money: '10989'
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