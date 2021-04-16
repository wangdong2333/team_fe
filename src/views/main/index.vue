<template>
  <div class="main">
    <div class="main_bg">
      <div class="main_photo">
        <img src="https://img.crawler.qq.com/lolwebvideo/20190424151417/265633359ea7736f27a8ab91e1dd36f3/0">
      </div>
      <div class="main_content">
        <div class="main_title">IG</div>
        <p>InvictusGaming</p>
        <div class="main_text">InvictusGaming（简称：iG）成立于2011年，由王思聪先生创立，是国内最老牌的电竞俱乐部之一。作为国内建队最早的英雄联盟战队之一，iG.LOL拥有众多明星选手，实力与人气兼具，以敢打敢拼、永不屈服的风格获得粉丝喜爱。曾获得2013SWL冠军、2013IEM新加坡站冠军，2014年首届德玛西亚杯冠军，2016/2017全国电子竞技大赛冠军，2018德玛西亚杯冬季赛冠军，2019LPL春季赛冠军等荣誉。2018全球总决赛，iG为LPL赛区拿到第一座S赛奖杯，实现了广大国服玩家的八年冠军梦。</div>
      </div>
    </div>
    <div class="main_member">
      <h3>现役成员</h3>
      <div>
        <div class="main_member_card" v-for="(item, index) in memberData" :key='index'>
          <div class="pic">
            <img class="main_member_card_img" :src="item.imgUrl" v-if="item.imgUrl">
            <img class="main_member_card_img" v-if="!item.imgUrl" src="https://img2.baidu.com/it/u=2042214437,350526930&fm=26&fmt=auto&gp=0.jpg">
            <span class="label">{{ item.position }}</span>
          </div>
          <div class="name">
            <p class="ename">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      memberData: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios({
        url: 'http://localhost:3000/teamList/getTeamList'
      })
      .then(res => {
        console.log(res);
        this.memberData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
};
</script>

<style scoped>
  .main_bg {
    background: #000;
    width: 100%;
    height: 456px;
    overflow: hidden;
  }
  .main_photo {
    width: 530px;
    height: 521px;
    padding: 0 37px;
    margin-left: 37px;
    float: left;
  }
  .main_title {
    margin-top: 100px;
    font-size: 48px;
    text-align: left;
    color: #f1f3f6;
  }
  .main_text {
    font-size: 14px;
    text-align: left;
    color: #f1f3f6;
    font-weight: 400;
    line-height: 24px;
    text-indent: 2em;
    padding-top: 32px;
  }
  p{
    font-size: 24px;
    text-align: left;
    color: #f1f3f6;
    font-weight: 400;
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
  .main_member_card {
    width: 236px;
    height: 215px;
    margin: 25px 5px 0;
    border: 2px solid #f7f7f7;
    margin: 10px 10px 50px 20px;
    float: left;
  }
  .pic{
    display: block;
    width: 236px;
    height: 165px;
    position: relative;
  }
  .main_member_card_img {
    width: 156px;
    height: 156px;
    margin: 0 auto;
    position: absolute;
    top: 10px;
    left: 50%;
    margin-left: -83px;
  }
  .label {
    font-size: 14px;
    text-align: center;
    border: 1px solid #b6b6b6;
    border-radius: 20px;
    position: absolute;
    right: 16px;
    top: 14px;
    padding: 0 5px;
    color: #b6b6b6;
  }
  .name {
    transition: .2s;
    /* height: 64px; */
    background: #f1f1f1;
    height: 50px;
    line-height: 50px;
  }
  .ename {
    transition: .2s;
    height: 32px;
    font-size: 28px;
    text-align: center;
    font-weight: 700;
    color: #404040;
  }
</style>

