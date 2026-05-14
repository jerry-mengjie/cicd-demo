<template>
  <div class="wraps">
    <div style="width: 600px">
      <el-input v-model="search.keyWord" style="margin-bottom: 10px"></el-input>
      <el-button @click="init" style="margin-left: 10px">搜索</el-button>
      <el-button @click="openDialog" type="primary" style="margin-left: 10px"
        >添加</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 600px">
      <el-table-column prop="id" label="id" width="50" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="details" label="详情" />
      <el-table-column width="160">
        <template #default="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="changeSize"
      style="margin-top: 10px"
      background
      layout="prev, pager, next"
      :total="total"
    />
  </div>

  <el-dialog v-model="dialogVisible" title="新闻" width="50%">
    <el-form :model="form">
      <el-form-item prop="title" label="标题">
        <el-input v-model="form.title" placeholder="标题" />
      </el-form-item>
      <el-form-item prop="details" label="详情">
        <el-input v-model="form.details" placeholder="详情"> </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="save"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";
import { addNews, updateNews, delNews, getNewsList } from "@/api";
const total = ref<number>(0);
//搜索框
const search = reactive({
  keyWord: "",
  page: 1,
  pageSize: 10,
});
//表单
const form = reactive({
  title: "",
  details: "",
  id: 0,
});
//清空数据
const resetForm = reactive({ ...form });
//表格数据
const tableData = ref([]);
//弹框开关
const dialogVisible = ref<boolean>(false);
const openDialog = () => {
  dialogVisible.value = true;
  Object.assign(form, resetForm);
};
//初始化表格数据
const init = async () => {
  const list = await getNewsList(search);
  tableData.value = list?.data ?? [];
  total.value = list?.total ?? 0;
};
init();
const changeSize = (page: any) => {
  search.page = page;
  init();
};
//保存 和修改 表格数据
const save = async () => {
  if (form.id) {
    await updateNews(form);
  } else {
    await addNews(form);
  }

  close();
  init();
};
//删除表格数据
const deleteRow = async (row: any) => {
  await delNews({ id: row.id });
  init();
};
//获取 详情
const edit = (row: any) => {
  dialogVisible.value = true;
  Object.assign(form, row);
};
//关闭弹框
const close = () => {
  dialogVisible.value = false;
};
</script>

<style scoped></style>
