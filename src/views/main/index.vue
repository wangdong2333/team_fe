<template>
  <div class="main">
    <div class="main_bg" v-if="targetTeam === 'IG' || !targetTeam">
      <div class="main_photo">
        <img
          src="https://img.crawler.qq.com/lolwebvideo/20190424151417/265633359ea7736f27a8ab91e1dd36f3/0"
        />
      </div>
      <div class="main_content">
        <div class="main_title">IG</div>
        <p>InvictusGaming</p>
        <div class="main_text">
          BigInvictusGameGaming（简称：BIGG）成立于2011年，由王六六先生创立，是国内最老牌的电竞俱乐部之一。作为国内建队最早的英雄联盟战队之一，iG.LOL拥有众多明星选手，实力与人气兼具，以敢打敢拼、永不屈服的风格获得粉丝喜爱。曾获得2013SWL冠军、2013IEM新加坡站冠军，2014年首届德玛西亚杯冠军，2016/2017全国电子竞技大赛冠军，2018德玛西亚杯冬季赛冠军，2019LPL春季赛冠军等荣誉。2018全球总决赛，iG为LPL赛区拿到第一座S赛奖杯，实现了广大国服玩家的八年冠军梦。
        </div>
      </div>
    </div>
    <div class="main_bg" v-if="targetTeam === 'LGD'">
      <div class="main_photo">
        <img
          src="https://img.crawler.qq.com/lolwebvideo/20210109181944/1a8ed564e4a0c831d45041be9b6ffb5d/0"
        />
      </div>
      <div class="main_content">
        <div class="main_title">LGD</div>
        <p>LEDGaming</p>
        <div class="main_text">
          LGD英雄联盟分部成立于2012年，成立一年后斩获TGA冬季赛总决赛冠军，成功完成晋级LPL英雄联盟职业联赛的使命。2015年豪夺LPL职业联赛春季赛亚军、夏季赛冠军，取得了参加S5全球总决赛的资格。同年，获德玛西亚杯年度颁奖典礼提名LPL年度最佳俱乐部。2020年作为LPL赛区四号种子参加S10全球总决赛。
        </div>
      </div>
    </div>
    <div class="main_bg" v-if="targetTeam === 'V5'">
      <div class="main_photo">
        <img
          src="https://img.crawler.qq.com/lolwebvideo/20181224214416/6af32b0adfd0f82820311a9750b5974c/0"
        />
      </div>
      <div class="main_content">
        <div class="main_title">V5</div>
        <p>ShenzhenVictoryFive</p>
        <div class="main_text">
          V5电子竞技俱乐部（VictoryFive），由澳门电子竞技总会会长何猷君创立于2018年。V5电子竞技俱乐部以企业化模式规范俱乐部运作并辅以顶尖的商业化运作能力持续提升俱乐部发展，独有的人才培养机制也保证了高端选手的人员稳定性。2020年9月V5主场馆落地深圳，成为LPL联盟第六个拥有主场的电竞战队。V5俱乐部作为中国顶级的新生代电子竞技俱乐部，立足大湾区，不断开拓及探索多元共生的电子竞技产业链，带动港澳台地区电竞产业链的发展。
        </div>
      </div>
    </div>
    <div class="main_member">
      <h3>现役成员</h3>
      <div>
        <div
          class="main_member_card"
          v-for="(item, index) in memberData"
          :key="index"
        >
          <div class="pic" @click="godetail(item)">
            <img
              class="main_member_card_img"
              :src="item.imgUrl"
              v-if="item.imgUrl"
            />
            <img
              class="main_member_card_img"
              v-if="!item.imgUrl"
              src="https://img2.baidu.com/it/u=2042214437,350526930&fm=26&fmt=auto&gp=0.jpg"
            />
            <span class="label">{{ item.position }}</span>
            <span class="gameName">{{ item.gameName }}</span>
            
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
import axios from "axios";
export default {
  data() {
    return {
      memberData: [],
      targetTeam: "",
    };
  },
  created() {
    this.targetTeam = localStorage.getItem("targetTeam");
    this.getList();
  },
  methods: {
    getList() {
      if (this.targetTeam === "IG") {
        axios({
          url: "http://localhost:3000/teamList/getTeamList",
        })
          .then((res) => {
            console.log(res);
            this.memberData = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.targetTeam === "LGD") {
        console.log('11111')
        axios({
          url: "http://localhost:3000/ladTeam/getLgdTeam",
        })
          .then((res) => {
            console.log(res);
            this.memberData = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.targetTeam === "V5") {
        console.log('222')
        axios({
          url: "http://localhost:3000/V5Team/getV5Team",
        })
          .then((res) => {
            console.log(res);
            this.memberData = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    godetail(item) {
      console.log(item);
      this.$router.push({path :'/personal', query: {item: JSON.stringify(item)}});
    },
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
p {
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
.pic {
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
.gameName {
  font-size: 14px;
  text-align: center;
  border: 1px solid #b6b6b6;
  border-radius: 20px;
  position: absolute;
  left: 16px;
  top: 14px;
  padding: 0 5px;
  color: #b6b6b6;
}
.name {
  transition: 0.2s;
  /* height: 64px; */
  background: #f1f1f1;
  height: 50px;
  line-height: 50px;
}
.ename {
  transition: 0.2s;
  height: 32px;
  font-size: 28px;
  text-align: center;
  font-weight: 700;
  color: #404040;
}
</style>

