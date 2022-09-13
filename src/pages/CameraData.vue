<template>
  <div class="content">
    <div class="col-12">
      <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
        <div style="margin-bottom: 10px">
          <el-row>
            <div style="margin-left: 10px">
              设备ID：
              <el-input class="el-input" type="text" v-model="robotNum"></el-input>
              <=此数据配合下边所有按钮数据使用，下边每一个按钮之间数据互不干扰
            </div>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="24">
              <span style="margin-left: 10px">姿态获取: 读取磁编码角度 [航向角度, 俯仰角度, 横滚角度]</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="getMagneticCodingAngle">读取磁编码角度</el-button>
                roll
                <el-input class="el-input" :disabled="true" type="text" v-model="magneticCodingAngle.roll"></el-input>
                yaw
                <el-input class="el-input" :disabled="true" type="text" v-model="magneticCodingAngle.yaw"></el-input>
                pitch
                <el-input class="el-input" :disabled="true" type="text" v-model="magneticCodingAngle.pitch"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="12">
              <span style="margin-left: 10px">设置:云台姿态主动送出</span>
              <div style="margin-left: 10px">
                <el-radio v-model="enable" :label=true>确定</el-radio>
                <el-radio v-model="enable" :label=false>否定</el-radio>
                <el-button type="primary" plain @click="setGimbalPostureAutoPush">设置</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <span style="margin-left: 10px">设置:陀螺仪姿态主动送出</span>
              <div style="margin-left: 10px">
                <el-radio v-model="enable3" label="true">确定</el-radio>
                <el-radio v-model="enable3" label="false">否定</el-radio>
                <el-button type="primary" plain @click="setGyroPostureAutoPush">设置</el-button>
              </div>
            </el-col>
          </el-row>
          <div style="margin: 10px"></div>
          <el-row>
            <el-col :span="12">
              <span style="margin-left: 10px">查询:云台姿态主动送出</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="getGimbalPostureAutoPush">查询</el-button>
                <el-input class="el-input" :disabled="true" type="text" v-model="enable2"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <span style="margin-left: 10px">查询:陀螺仪姿态主动送出</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="getGyroPostureAutoPush">查询</el-button>
                <el-input class="el-input" :disabled="true" type="text" v-model="enable4"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="24">
              <span style="margin-left: 10px">查询:录像状态 返回录像状态：第一个字符串是可见光：“1” ，在录像； “0”，未在录像;   第二个字符串是热成像：“1” ，在录像； “0”，未在录像</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="getRecordStatus">查询</el-button>
                <el-input class="el-input" :disabled="true" type="text" v-model="recordStatus"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="24">
              <span style="margin-left: 10px">拍照</span>
              <div style="margin-left: 10px">
                <el-checkbox v-model="camera1">可见光</el-checkbox>
                <el-checkbox v-model="camera2">热成像</el-checkbox>
                <el-button style="margin-left: 10px" type="primary" plain @click="capture">拍照</el-button>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="24">
              <span style="margin-left: 10px">设置：可见光分辨率</span>
              <div style="margin-left: 10px">
                <el-select v-model="resolutionType" placeholder="分辨率类型">
                  <el-option
                    v-for="item in Type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="resolutionValue" placeholder="分辨率值">
                  <el-option
                    v-for="item in Value"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button style="margin-left: 10px" type="primary" plain @click="setResolution">设置</el-button>
              </div>
            </el-col>
          </el-row>
          <div style="margin: 10px"></div>
          <el-row>
            <el-col :span="24">
              <span style="margin-left: 10px">查询：可见光分辨率</span>
              <div style="margin-left: 10px">
                <el-select v-model="resolutionType2" placeholder="分辨率类型">
                  <el-option
                    v-for="item in Type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button style="margin-left: 10px" type="primary" plain @click="getResolution">查询</el-button>
                分辨率结果：
                <el-input class="el-input" :disabled="true" type="text" v-model="resolutionValue2"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="12">
              <span style="margin-left: 10px">设置：RTSP码率</span>
              <div style="margin-left: 10px">
                <el-radio v-model="bitrateId" :label=1>1</el-radio>
                <el-radio v-model="bitrateId" :label=2>2</el-radio>
                <el-radio v-model="bitrateId" :label=3>3</el-radio>
                <el-radio v-model="bitrateId" :label=4>4</el-radio>
                <el-radio v-model="bitrateId" :label=5>5</el-radio>
                <el-radio v-model="bitrateId" :label=6>6</el-radio>
                <el-radio v-model="bitrateId" :label=7>7</el-radio>
                <el-button style="margin-left: 10px" type="primary" plain @click="setBitrate">设置</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <span style="margin-left: 10px">查询: RTSP码率</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="getBitrate">查询</el-button>
                <el-input class="el-input" :disabled="true" type="text" v-model="bitrate"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="24">
              <span style="margin-left: 10px">获取剩余容量</span>
              <div style="margin-left: 10px">
                <el-radio v-model="queryType" :label=0>获取剩余容量</el-radio>
                <el-radio v-model="queryType" :label=1>获取总容量</el-radio>
                <el-button type="primary" plain @click="getSDCapacity">查询</el-button>
                <el-input class="el-input" :disabled="true" type="text" v-model="SDCapacity"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="12">
              <span style="margin-left: 10px">设置：翻转镜像值(打勾180°，不打勾0°)</span>
              <div style="margin-left: 10px">
                <el-checkbox v-model="setRotate">是否翻转</el-checkbox>
                <el-button style="margin-left: 10px" type="primary" plain @click="setRotate180Degree">翻转</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <span style="margin-left: 10px">查询：180度翻转镜像值</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="getRotate180Degree">查询</el-button>
                <el-input class="el-input" :disabled="true" type="text" v-model="getRotate"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="8">
              <span style="margin-left: 10px">网络设置：ip</span>
              <div style="margin-left: 10px">
                <el-input class="el-input" type="text" v-model="ip"></el-input>
                <el-button type="primary" plain @click="setNetIpAddress">设置</el-button>
              </div>
            </el-col>
            <el-col :span="8">
              <span style="margin-left: 10px">网络设置：gateway</span>
              <div style="margin-left: 10px">
                <el-input class="el-input" type="text" v-model="ipGateway"></el-input>
                <el-button type="primary" plain @click="setNetGateway">设置</el-button>
              </div>
            </el-col>
            <el-col :span="8">
              <span style="margin-left: 10px">网络设置：重置</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="setNetReset">重置</el-button>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="8">
              <span style="margin-left: 10px">设置：时间</span>
              <div style="margin-left: 10px">
                <el-date-picker
                  v-model="datetime"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyyMMddHHmmss">
                </el-date-picker>
                <el-button type="primary" plain @click="setTime">设置</el-button>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="12">
              <span style="margin-left: 10px">画中画</span>
              <div style="margin-left: 10px">
                <el-radio v-model="pipType" :label=0>可见光</el-radio>
                <el-radio v-model="pipType" :label=1>可见光+红外</el-radio>
                <el-radio v-model="pipType" :label=2>红外+可见光</el-radio>
                <el-radio v-model="pipType" :label=3>红外</el-radio>
                <el-button style="margin-left: 10px" type="primary" plain @click="setPictureInPicture">设置</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <span style="margin-left: 10px">查询：画中画</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="getPictureInPicture">查询</el-button>
                <el-input class="el-input" :disabled="true" type="text" v-model="getRotate2"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="24">
              <span style="margin-left: 10px">设置：伪彩</span>
              <div style="margin-left: 10px">
                <div>
                  <el-radio v-model="colorType" :label=0>黑白</el-radio>
                  <el-radio v-model="colorType" :label=1>黑白高温红色</el-radio>
                  <el-radio v-model="colorType" :label=2>红热</el-radio>
                  <el-radio v-model="colorType" :label=3>黄热勾边</el-radio>
                  <el-radio v-model="colorType" :label=4>黄热</el-radio>
                  <el-radio v-model="colorType" :label=5>伪彩 4</el-radio>
                </div>
                <div>
                  <el-radio v-model="colorType" :label=6>伪彩 5</el-radio>
                  <el-radio v-model="colorType" :label=7>伪彩 6</el-radio>
                  <el-radio v-model="colorType" :label=8>伪彩 7</el-radio>
                  <el-radio v-model="colorType" :label=9>伪彩 8</el-radio>
                  <el-radio v-model="colorType" :label=10>Next</el-radio>
                  <el-radio v-model="colorType" :label=11>Pre</el-radio>
                  <el-button style="margin-left: 10px" type="primary" plain @click="setCamera2ColorType">设置</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <span style="margin-left: 10px">查询：伪彩</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="getCamera2ColorType">查询</el-button>
                <el-input class="el-input" :disabled="true" type="text" v-model="getColorType"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span="24">
              <span style="margin: 10px">执行一个记录动作</span>
              <div style="margin: 10px">
                执行完成后的文件前缀名:
                <el-input class="el-input" type="text" v-model="prefixName"></el-input>
                <el-button style="margin-left: 10px" type="primary" plain @click="recordStart" :loading="doVideo">开始
                </el-button>
                <el-button type="primary" plain @click="recordStop">停止</el-button>
              </div>
              <div style="margin: 10px">
                返回的录像路径：
                <el-input class="el-input" type="text" v-model="resultPath"></el-input>
                <el-button type="primary" plain @click="copy()">复制</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </card>
    </div>
  </div>
</template>
<script>

import axios from "axios";
import qs from "querystring";

export default {
  name: 'Camera',
  data() {
    return {
      robotNum: 'robot001',
      // robotNum: '4435ee-YZY001',
      magneticCodingAngle: '',

      //姿态设置查询
      enable: true,
      enable2: '',
      enable3: true,
      enable4: '',

      recordStatus: '',

      camera1: true,
      camera2: true,

      Type: [{
        value: 0,
        label: '录像分辨率'
      }, {
        value: 1,
        label: '拍照分辨率'
      }, {
        value: 2,
        label: 'RTSP分辨率'
      }],
      resolutionType: 0,
      resolutionType2: 0,
      Value: [{
        value: 0,
        label: '3840*2160'
      }, {
        value: 1,
        label: '1920*1080'
      }, {
        value: 2,
        label: '1280*720'
      }, {
        value: 3,
        label: '640*480'
      }],
      resolutionValue: 0,
      resolutionValue2: '',

      bitrateId: 1,
      bitrate: '',
      queryType: 0,
      SDCapacity: '',
      setRotate: true,
      getRotate: '',
      getRotate2: '',

      ip: '192.168.144.108',
      ipGateway: '192.168.144.10',

      datetime: '',
      pipType: 1,

      colorType: 1,
      getColorType: '',

      prefixName: '/abc',
      resultPath: '',

      doVideo: false,
    }
  },
  methods: {
    copy() {
      try {
        let value = this.resultPath
        let input = document.createElement('input')
        //将input的值设置为需要复制的内容
        input.value = value;
        //添加input标签
        document.body.appendChild(input)
        //选中input标签
        input.select()
        //执行复制
        document.execCommand('copy')
        //移除input标签
        document.body.removeChild(input)
        this.$message.success("复制成功");
      } catch (e) {
        this.$message.error("复制失败");
      }
    },
    getMagneticCodingAngle() {
      let that = this
      axios.get('/api/test/camera/get/magnetic/coding/angle' + '?robotNum=' + that.robotNum).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
          that.magneticCodingAngle = response.data.result.magneticCodingAngle
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setGimbalPostureAutoPush() {
      let that = this
      let data = {}
      data.enable = this.enable
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/set/gimbal/posture/auto/push', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setGyroPostureAutoPush() {
      let that = this
      let data = {}
      data.enable = this.enable3
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/set/gimbal/posture/auto/push', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    getGimbalPostureAutoPush() {
      let that = this
      axios.get('/api/test/camera/get/gimbal/posture/auto/push' + '?robotNum=' + that.robotNum).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
          that.enable2 = response.data.result
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    getGyroPostureAutoPush() {
      let that = this
      axios.get('/api/test/camera/get/gyro/posture/auto/push' + '?robotNum=' + that.robotNum).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
          that.enable4 = response.data.result
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    getRecordStatus() {
      let that = this
      axios.get('/api/test/camera/get/record/status' + '?robotNum=' + that.robotNum).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
          that.recordStatus = response.data.result
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    capture() {
      let that = this
      let data = {}
      data.camera1 = that.camera1
      data.camera2 = that.camera2
      if (that.camera1 !== true && that.camera2 !== true) {
        this.$message.error('未选择如何拍照');
        return
      }
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/capture', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000" && (that.camera1 !== false || that.camera2 !== false)) {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setResolution() {
      let that = this
      let data = {}
      data.type = that.resolutionType
      data.value = that.resolutionValue
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/set/resolution', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    getResolution() {
      let that = this
      axios.get('/api/test/camera/get/resolution' + "?type=" + that.resolutionType + '&robotNum=' + that.robotNum).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
          that.resolutionValue2 = response.data.result
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setBitrate() {
      let that = this
      let data = {}
      data.bitrateId = that.bitrateId
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/set/bitrate', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    getBitrate() {
      let that = this
      axios.get('/api/test/camera/get/bitrate' + '?robotNum=' + that.robotNum).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
          that.bitrate = response.data.result
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    getSDCapacity() {
      let that = this
      axios.get('/api/test/camera/get/sd/capacity' + "?queryType=" + that.queryType + '&robotNum=' + that.robotNum).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
          that.SDCapacity = response.data.result
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setRotate180Degree() {
      let that = this
      let data = {}
      data.enable = this.setRotate
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/set/rotate180/degree', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    getRotate180Degree() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.get('/api/test/camera/get/rotate180/degree' + '?robotNum=' + that.robotNum).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
          that.getRotate = response.data.result
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setNetIpAddress() {
      let that = this
      let data = {}
      data.ip = that.ip
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/set/net/ip/address', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setNetGateway() {
      let that = this
      let data = {}
      data.gateway = that.ipGateway
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/set/net/gateway', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setNetReset() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/set/net/reset', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setTime() {
      let that = this
      let data = {}
      data.datetime = that.datetime
      data.robotNum = that.robotNum
      if (that.datetime === '' || that.datetime === null) {
        this.$message.error('请选择时间');
        return
      }
      axios.post('/api/test/camera/set/time', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setPictureInPicture() {
      let that = this
      let data = {}
      data.pipType = that.pipType
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/set/picture/in/picture', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    getPictureInPicture() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.get('/api/test/camera/get/picture/in/picture' + '?robotNum=' + that.robotNum).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
          that.getRotate2 = response.data.result
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setCamera2ColorType() {
      let that = this
      let data = {}
      data.colorType = that.colorType
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/set/camera2/color/type', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    getCamera2ColorType() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.get('/api/test/camera/get/camera2/color/type' + '?robotNum=' + that.robotNum).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
          that.getColorType = response.data.result
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    recordStart() {
      this.doVideo = true
      let that = this
      let data = {}
      data.path = "/home/yuntai"
      data.prefixName = that.prefixName
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/record/start', qs.stringify(data)).then(
        response => {
          console.log(response)
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    recordStop() {
      this.doVideo = false
      let that = this
      let data = {}
      data.path = "/home/yuntai"
      data.timeSpan = that.timeSpan
      data.prefixName = that.prefixName
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/record/stop', qs.stringify(data)).then(
        response => {
          console.log(response)
          this.resultPath = response.data.result
          if (response.data.errorNum === "1000") {
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: '2000'
            });
          } else if (response.data.errorNum === "1001") {
            this.$notify({
              title: '失败',
              message: '请求错误',
              type: 'error',
              duration: '2000'
            });
          }
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
  }
}

</script>
<style>

</style>
