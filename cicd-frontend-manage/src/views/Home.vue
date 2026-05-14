<template>
  <div>
    <h1 class="title">使用k8s+nest微服务+mysql部署案例</h1>
    <div class="wraps">
      <el-card class="card">
        <a href="/swagger/user" target="_blank">用户模块swagger</a>
        <div class="desc">
          使用axios方式调用user微服务列表接口，可调java接口
        </div>
        <User />
      </el-card>
      <el-card class="card">
        <a href="/swagger/news" target="_blank">新闻模块swagger</a>
        <div class="desc"></div>
        <News />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import User from "./User.vue";
import News from "./News.vue";
</script>

<style scoped>
.title {
  text-align: center;
}
.wraps {
  display: flex;
  justify-content: center;
}
.card {
  margin: 20px;
}
.desc {
  margin-bottom: 10px;
}
</style>
