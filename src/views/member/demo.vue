<template>
  <el-upload
  class="avatar-uploader"
  action="#"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
   <video preload='auto' id='my-video' src='http://121.196.167.117:8085/uploads/wangdong/20210418132107_38614.mp4' webkit-playsinline='true'
        playsinline='true' x-webkit-airplay='true' x5-video-player-type='h5' x5-video-player-fullscreen='true' controls="controls" x5-video-ignore-metadata='true' width='100%' height='100%'>
            <p>当前视频不支持</p>
    </video>
</el-upload>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
        imageUrl: ''
      };
  },
  created() {
    
  },
  methods: {
      handleAvatarSuccess(res, file) {
        console.log('111')
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('dir', 'wangdong');
        axios({
          url: "http://121.196.167.117:8085/file/uploadFile",
          method: "post",
          data: formData
        }).then((res) => {
          console.log(res);
          this.imageUrl = "http://121.196.167.117:8085/" + res.data.data;
          this.$message({
            type: "success",
            message: "上传成功!",
            duration: 1000,
          });
        })
        .catch((e) => {
          console.log(e);
        });
      }
    }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>