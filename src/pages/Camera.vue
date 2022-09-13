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
            <el-col :span="6">
              <span style="margin-left: 10px">画面</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @mousedown.native="zoomIn" @mouseup.native="zoomStop" @mouseleave.native="zoomStop">放大</el-button>
                <el-button type="primary" plain @mousedown.native="zoomOut" @mouseup.native="zoomStop" @mouseleave.native="zoomStop">缩小</el-button>
                <!--                <el-button type="primary" plain @click="zoomStop">停止</el-button>-->
              </div>
            </el-col>
            <el-col :span="6">
              <span style="margin-left: 10px">焦点</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @mousedown.native="focusIncrease" @mouseup.native="zoomStop" @mouseleave.native="zoomStop">focus+
                </el-button>
                <el-button type="primary" plain @mousedown.native="focusReduce" @mouseup.native="zoomStop" @mouseleave.native="zoomStop">focus-
                </el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <span style="margin-left: 10px">自动对焦</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="focusAuto">自动对焦切换</el-button>
                <el-button type="primary" plain @click="focusAutoSave">自动对焦保存</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <span style="margin-left: 10px">手动对焦</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="focusManual">手动对焦切换</el-button>
                <el-button type="primary" plain @click="focusManualSave">手动对焦保存</el-button>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <span style="margin-left: 10px">当前focus位置值</span>
            <div style="margin-left: 10px">
              <el-button type="primary" plain @click="readFocus">获取</el-button>
              当前focus位置:{{ focus1 }}
            </div>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span=12>
              <span style="margin-left: 10px">只设置zoom,设置后自动对焦</span>
              <div style="margin-left: 10px">
                <el-input class="el-input" type="text" v-model="zoom1"></el-input>
                <el-button type="primary" plain @click="setZoom">设置</el-button>
              </div>
            </el-col>
            <el-col :span=12>
              <span style="margin-left: 10px">设置zoom 和 focus</span>
              <div style="margin-left: 10px">
                <el-input class="el-input" type="text" v-model="zoom2" placeholder="zoom"></el-input>
                <el-input class="el-input" type="text" v-model="focus2" placeholder="focus"></el-input>
                <el-button type="primary" plain @click="setZoomAndFocus">设置</el-button>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span=12>
              <span style="margin-left: 10px">日夜切换</span>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @click="icrDay">到白天</el-button>
                <el-button type="primary" plain @click="icrNight">到夜晚</el-button>
                <el-button type="primary" plain @click="icrFlip">状态翻转</el-button>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <span style="margin-left: 10px">云台控制</span>
          <el-row>
            <el-col :span=8>
              <div style="margin-left: 10px">
                <el-button type="primary" plain @mousedown.native="ptzUp" @mouseup.native="ptzStop" @mouseleave.native="ptzStop">上</el-button>
                <el-button type="primary" plain @mousedown.native="ptzDown" @mouseup.native="ptzStop" @mouseleave.native="ptzStop">下</el-button>
                <el-button type="primary" plain @mousedown.native="ptzLeft" @mouseup.native="ptzStop" @mouseleave.native="ptzStop">左</el-button>
                <el-button type="primary" plain @mousedown.native="ptzRight" @mouseup.native="ptzStop" @mouseleave.native="ptzStop">右</el-button>
              </div>
            </el-col>
            <el-col :span=8>
              <el-button type="primary" plain @click="ptzReset">回中</el-button>
              <el-button type="primary" plain @click="ptzLock">锁头</el-button>
              <!--                <el-button type="primary" plain @click="ptzFollow">跟随</el-button>-->
              <!--                <el-button type="primary" plain @click="ptzSwitchLockAndFollow">跟随锁头切换</el-button>-->
            </el-col>
            <el-col :span=8>
              <el-button type="primary" plain @click="ptzCalculate">云台校准</el-button>
              <el-button type="primary" plain @click="ptzOneKeyDown">一键向下</el-button>
            </el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row>
            <el-col :span=6>
              <span style="margin-left: 10px">Yaw航向</span>
              <div style="margin-left: 10px">
                <el-input class="el-input" type="text" v-model="yaw" placeholder="输入航向值"></el-input>
              </div>
            </el-col>
            <el-col :span=6>
              <span style="margin-left: 10px">Pitch俯仰</span>
              <div style="margin-left: 10px">
                <el-input class="el-input" type="text" v-model="pitch" placeholder="输入俯仰值"></el-input>
              </div>
            </el-col>
            <el-col :span=6>
              <span style="margin-left: 10px">Roll横滚</span>
              <div style="margin-left: 10px">
                <el-input class="el-input" type="text" v-model="roll" placeholder="输入横滚值"></el-input>
              </div>
            </el-col>
            <el-col :span=6>
              <=这三个数据用于此区域所有云台请求
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span style="margin: 10px">云台速度模式控制</span>
              <div style="margin: 10px">
                <el-button type="primary" plain @click="gimbalSpeedControlYaw">Yaw航向</el-button>
                <el-button type="primary" plain @click="gimbalSpeedControlPitch">Pitch俯仰</el-button>
                <el-button type="primary" plain @click="gimbalSpeedControlRoll">Roll横滚</el-button>
                <el-button type="primary" plain @click="gimbalSpeedControlYawPitch">yaw & pitch</el-button>
                <el-button type="primary" plain @click="gimbalSpeedControlRollPitch">roll & pitch</el-button>
                <el-button type="primary" plain @click="gimbalSpeedControlYawRollPitch">yaw & roll & pitch</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span style="margin: 10px">云台角度模式控制：磁编码角度控制</span>
              <div style="margin: 10px">
                转动速度:
                <el-input class="el-input" type="text" v-model="speed" placeholder="只用于右侧三个请求"></el-input>
                <el-button type="primary" plain @click="gimbalAngleControlYaw">yaw控制</el-button>
                <el-button type="primary" plain @click="gimbalAngleControlPitch">pitch控制</el-button>
                <el-button type="primary" plain @click="gimbalAngleControlRoll">roll控制</el-button>
              </div>
              <div style="margin: 10px">
                yaw转动速度:
                <el-input class="el-input" type="text" v-model="yawSpeed" placeholder="只用于右侧一个请求"></el-input>
                pitch转动速度:
                <el-input class="el-input" type="text" v-model="pitchSpeed" placeholder="只用于右侧一个请求"></el-input>
                <el-button type="primary" plain @click="gimbalAngleControlYawPitch">yaw&pitch控制</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span style="margin-left: 10px">云台角度模式控制: 陀螺仪角度控制</span>
              <div style="margin: 10px">
                转动速度:
                <el-input class="el-input" type="text" v-model="speedGyro" placeholder="只用于右侧三个请求"></el-input>
                <el-button type="primary" plain @click="gimbalGyroAngleControlYaw">yaw控制</el-button>
                <el-button type="primary" plain @click="gimbalGyroAngleControlPitch">pitch控制</el-button>
                <el-button type="primary" plain @click="gimbalGyroAngleControlRoll">roll控制</el-button>
              </div>
              <div style="margin: 10px">
                yaw转动速度:
                <el-input class="el-input" type="text" v-model="yawSpeedGyro" placeholder="只用于右侧一个请求"></el-input>
                pitch转动速度:
                <el-input class="el-input" type="text" v-model="pitchSpeedGyro" placeholder="只用于右侧一个请求"></el-input>
                <el-button type="primary" plain @click="gimbalGyroAngleControlYawPitch">yaw&pitch控制</el-button>
              </div>
            </el-col>
          </el-row>

          <el-divider></el-divider>
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
      focus1: '',
      zoom1: 1,

      //设置zoom 和 focus
      zoom2: 2,
      focus2: 3,

      //云台控制
      yaw: 1,
      pitch: 2,
      roll: 3,

      //云台角度模式控制：磁编码控制
      speed: 1,
      yawSpeed: 2,
      pitchSpeed: 3,

      //云台角度模式：陀螺仪控制
      speedGyro: 4,
      yawSpeedGyro: 5,
      pitchSpeedGyro: 6,

      mouseState: false,
    }
  },
  methods: {
    zoomIn() {
      let that = this
      that.mouseState = true
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/zoom/in', qs.stringify(data)).then(
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
    zoomOut() {
      let that = this
      that.mouseState = true
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/zoom/out', qs.stringify(data)).then(
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
    zoomStop() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      if (that.mouseState === true) {
        that.mouseState = false
        axios.post('/api/test/camera/zoom/stop', qs.stringify(data)).then(
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
      }
    },
    focusIncrease() {
      let that = this
      that.mouseState = true
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/focus/increase', qs.stringify(data)).then(
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
    focusReduce() {
      let that = this
      that.mouseState = true
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/focus/reduce', qs.stringify(data)).then(
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
    focusAuto() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/focus/auto', qs.stringify(data)).then(
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
    focusManual() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/focus/manual', qs.stringify(data)).then(
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
    focusManualSave() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/focus/manual/save', qs.stringify(data)).then(
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
    focusAutoSave() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/focus/auto/save', qs.stringify(data)).then(
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
    readFocus() {
      let that = this
      axios.get('/api/test/camera/read/focus' + "?robotNum=" + that.robotNum).then(
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
          that.focus1 = response.data.result
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    setZoom() {
      let that = this
      let data = {}
      data.zoom = this.zoom1
      if (this.zoom1 === '' || this.zoom1 === null) {
        this.$message.error('请输入相关信息');
      }
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/set/zoom', qs.stringify(data)).then(
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
    setZoomAndFocus() {
      let that = this
      let data = {}
      data.zoom = this.zoom2
      data.focus = this.focus2
      data.robotNum = that.robotNum
      if (this.zoom2 === '' || this.zoom2 === null || this.focus2 === '' || this.focus2 === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/set/zoom/focus', qs.stringify(data)).then(
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
    icrDay() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/icr/day', qs.stringify(data)).then(
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
    icrNight() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/icr/night', qs.stringify(data)).then(
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
    icrFlip() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/icr/flip', qs.stringify(data)).then(
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
    ptzStop() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      if (that.mouseState === true){
        that.mouseState = false
        axios.post('/api/test/camera/ptz/stop', qs.stringify(data)).then(
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
      }
    },
    ptzUp() {
      let that = this
      that.mouseState = true
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/ptz/up', qs.stringify(data)).then(
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
    ptzDown() {
      let that = this
      that.mouseState = true
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/ptz/down', qs.stringify(data)).then(
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
    ptzLeft() {
      let that = this
      that.mouseState = true
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/ptz/left', qs.stringify(data)).then(
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
    ptzRight() {
      let that = this
      that.mouseState = true
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/ptz/right', qs.stringify(data)).then(
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
    ptzReset() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/ptz/reset', qs.stringify(data)).then(
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
    ptzLock() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/ptz/lock', qs.stringify(data)).then(
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
    ptzFollow() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/ptz/follow', qs.stringify(data)).then(
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
    ptzSwitchLockAndFollow() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/ptz/switch/lock/follow', qs.stringify(data)).then(
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
    ptzCalculate() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/ptz/calculate', qs.stringify(data)).then(
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
    ptzOneKeyDown() {
      let that = this
      let data = {}
      data.robotNum = that.robotNum
      axios.post('/api/test/camera/ptz/one/key/down', qs.stringify(data)).then(
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
    gimbalSpeedControlYaw() {
      let that = this
      let data = {}
      data.yaw = this.yaw
      data.robotNum = that.robotNum
      if (this.yaw === '' || this.yaw === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/speed/control/yaw', qs.stringify(data)).then(
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
    gimbalSpeedControlPitch() {
      let that = this
      let data = {}
      data.pitch = this.pitch
      data.robotNum = that.robotNum
      if (this.pitch === '' || this.pitch === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/speed/control/pitch', qs.stringify(data)).then(
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
    gimbalSpeedControlRoll() {
      let that = this
      let data = {}
      data.roll = this.roll
      data.robotNum = that.robotNum
      if (this.roll === '' || this.roll === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/speed/control/roll', qs.stringify(data)).then(
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
    gimbalSpeedControlYawPitch() {
      let that = this
      let data = {}
      data.yaw = this.yaw
      data.pitch = this.pitch
      data.robotNum = that.robotNum
      if (this.yaw === '' || this.yaw === null || this.pitch === '' || this.pitch === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/speed/control/yaw/pitch', qs.stringify(data)).then(
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
    gimbalSpeedControlRollPitch() {
      let that = this
      let data = {}
      data.roll = this.roll
      data.pitch = this.pitch
      data.robotNum = that.robotNum
      if (this.roll === '' || this.roll === null || this.pitch === '' || this.pitch === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/speed/control/roll/pitch', qs.stringify(data)).then(
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
    gimbalSpeedControlYawRollPitch() {
      let that = this
      let data = {}
      data.yaw = this.yaw
      data.roll = this.roll
      data.pitch = this.pitch
      data.robotNum = that.robotNum
      if (this.yaw === '' || this.yaw === null || this.roll === '' || this.roll === null || this.pitch === '' || this.pitch === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/speed/control/yaw/roll/pitch', qs.stringify(data)).then(
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
    gimbalAngleControlYaw() {
      let that = this
      let data = {}
      data.yaw = this.yaw
      data.speed = this.speed
      data.robotNum = that.robotNum
      if (this.yaw === '' || this.yaw === null || this.speed === '' || this.speed === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/angle/control/yaw', qs.stringify(data)).then(
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
    gimbalAngleControlPitch() {
      let that = this
      let data = {}
      data.pitch = this.pitch
      data.speed = this.speed
      data.robotNum = that.robotNum
      if (this.pitch === '' || this.pitch === null || this.speed === '' || this.speed === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/angle/control/pitch', qs.stringify(data)).then(
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
    gimbalAngleControlRoll() {
      let that = this
      let data = {}
      data.roll = this.roll
      data.speed = this.speed
      data.robotNum = that.robotNum
      if (this.roll === '' || this.roll === null || this.speed === '' || this.speed === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/angle/control/roll', qs.stringify(data)).then(
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
    gimbalAngleControlYawPitch() {
      let that = this
      let data = {}
      data.yaw = this.yaw
      data.yawSpeed = this.yawSpeed
      data.pitch = this.pitch
      data.pitchSpeed = this.pitchSpeed
      data.robotNum = that.robotNum
      if (this.yaw === '' || this.yaw === null || this.yawSpeed === '' || this.yawSpeed === null
        || this.pitch === '' || this.pitch === null || this.pitchSpeed === '' || this.pitchSpeed === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/angle/control/yaw/pitch', qs.stringify(data)).then(
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
    gimbalGyroAngleControlYaw() {
      let that = this
      let data = {}
      data.yaw = this.yaw
      data.speed = this.speedGyro
      data.robotNum = that.robotNum
      if (this.yaw === '' || this.yaw === null || this.speedGyro === '' || this.speedGyro === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/gyro/angle/control/yaw', qs.stringify(data)).then(
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
    gimbalGyroAngleControlPitch() {
      let that = this
      let data = {}
      data.pitch = this.pitch
      data.speed = this.speedGyro
      data.robotNum = that.robotNum
      if (this.pitch === '' || this.pitch === null || this.speedGyro === '' || this.speedGyro === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/gyro/angle/control/pitch', qs.stringify(data)).then(
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
    gimbalGyroAngleControlRoll() {
      let that = this
      let data = {}
      data.roll = this.roll
      data.speed = this.speedGyro
      data.robotNum = that.robotNum
      if (this.roll === '' || this.roll === null || this.speedGyro === '' || this.speedGyro === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/gyro/angle/control/roll', qs.stringify(data)).then(
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
    gimbalGyroAngleControlYawPitch() {
      let that = this
      let data = {}
      data.yaw = this.yaw
      data.yawSpeed = this.yawSpeedGyro
      data.pitch = this.pitch
      data.pitchSpeed = this.pitchSpeedGyro
      data.robotNum = that.robotNum
      if (this.yaw === '' || this.yaw === null || this.yawSpeedGyro === '' || this.yawSpeedGyro === null || this.pitch === '' || this.pitch === null || this.pitchSpeedGyro === '' || this.pitchSpeedGyro === null) {
        this.$message.error('请输入相关信息');
      }
      axios.post('/api/test/camera/gimbal/gyro/angle/control/yaw/pitch', qs.stringify(data)).then(
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
  }
}
</script>
<style>

</style>
