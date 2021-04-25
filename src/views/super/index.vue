<template>
  <div class="main">
    <div class="title">电子竞技战队</div>
    <div class="super">
      <div class="team" @click="goDetail('IG')">
        <img
          class="img"
          src="https://img.crawler.qq.com/lolwebvideo/20190424151401/5985071337c7c4a785fbbdd3b8a75ae8/0"
          alt=""
        />
        <p>IG</p>
      </div>
      <div class="team" @click="goDetail('LGD')">
        <img
          class="img"
          src="https://img.crawler.qq.com/lolwebvideo/20210109181904/0d8c3963b36b2516ccf669b34a3bfc23/0"
          alt=""
        />
        <p>LGD</p>
      </div>
      <div class="team" @click="goDetail('V5')">
        <img
          class="img"
          src="https://img.crawler.qq.com/lolwebvideo/20181224214105/448aac8501e04a27db7594cb1f441c17/0"
          alt=""
        />
        <p>V5</p>
      </div>
    </div>
    <el-button
      class="transfer"
      type="success"
      icon="el-icon-setting"
      @click="transfer()"
      >转会信息处理</el-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    goDetail(targetTeam) {
      localStorage.setItem('targetTeam',targetTeam);
      this.$router.push({path: "/", query:{targetTeam : targetTeam}});
    },
    transfer() {
      this.$router.push('/superTransfer');
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
}
.super {
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 120px;
}
.team {
  transition: 0.5s;
  width: 300px;
  height: 300px;
  border: 3px solid #eaeaea;
  box-shadow: 0 2px 6px #e6e6e6;
  margin: 20px 10px 0;
  position: relative;
  padding-top: 10px;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  float: left;
}
.img {
  width: 280px;
}
.transfer {
  position: absolute;
  margin-top: 50px;
  left: 50%;
  /* 设置元素的相对于自身的偏移度为负50%(也就是元素自身尺寸的一半)*/
  transform: translate(-50%);
  width: 180px;
}
.title {
  position: absolute;
  left: 50%;
  top: -70px;
  /* 设置元素的相对于自身的偏移度为负50%(也就是元素自身尺寸的一半)*/
  transform: translate(-50%);
  font-size: 36px;
  font-weight: 700;
  color: #404040;
}
</style>