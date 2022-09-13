<template>
  <div class="content">
    <div class="col-12">
      <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
        <div style="margin-bottom: 10px">
          <el-row>
            <div style="margin-left: 10px">
              设备ID：
              <el-input class="el-input" type="text" v-model="robotNum"></el-input>
              <=此行数据配合以下所有行数据使用，下边每一行之间数据互不干扰
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div style="margin-left: 10px">
              控制电机动作：
              <el-radio v-model="ctlMotor" :label=0>停止</el-radio>
              <el-radio v-model="ctlMotor" :label=1>前进</el-radio>
              <el-radio v-model="ctlMotor" :label=2>后退</el-radio>
              <el-button type="primary" plain @click="ctrlMotorMove">发送请求</el-button>
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div style="margin-left: 10px">
              控制LED：
              <el-radio v-model="ctlLEDs" :label=1>红灯</el-radio>
              <el-radio v-model="ctlLEDs" :label=2>蓝灯</el-radio>
              <el-radio v-model="ctlLEDs" :label=3>绿灯</el-radio>
              <el-button type="primary" plain @click="ctrlLEDs">发送请求</el-button>
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div style="margin-left: 10px">
              配置电量预警阈值：
              <el-input class="el-input" type="text" v-model="threshold" placeholder="0~100整数"></el-input>
              <el-button type="primary" plain @click="cfgEtcThreshold">发送请求</el-button>
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div style="margin-left: 10px">
              配置电机速度：
              <el-radio v-model="motorSpeed" :label=10>10</el-radio>
              <el-radio v-model="motorSpeed" :label=20>20</el-radio>
              <el-radio v-model="motorSpeed" :label=30>30</el-radio>
              <el-radio v-model="motorSpeed" :label=40>40</el-radio>
              <el-radio v-model="motorSpeed" :label=50>50</el-radio>
              <el-button type="primary" plain @click="cfgMotorSpeed">发送请求</el-button>
              <=取值范围: 10/20/30/40/50 (10表示速度为0.1m/s，其它值类推)
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div style="margin-left: 10px">
              主控板开关机控制（断电）：
              <el-radio v-model="shutDown" :label=1>关机</el-radio>
              <el-radio v-model="shutDown" :label=2>开机</el-radio>
              <el-button type="primary" plain @click="ctrShutDown">发送请求</el-button>
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div style="margin-left: 10px">
              控制加热片启动：
              <el-radio v-model="startStopHeater" :label=0>停止</el-radio>
              <el-radio v-model="startStopHeater" :label=1>启动</el-radio>
              <el-button type="primary" plain @click="ctrHeater">发送请求</el-button>
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div style="margin-left: 10px">
              充电控制：
              <el-radio v-model="startStopCharge" :label=1>启动</el-radio>
              <el-button type="primary" plain @click="ctrCharge">发送请求</el-button>
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div style="margin-left: 10px">
              控制平衡模块：
              <el-radio v-model="startStopBalance" :label=0>停止</el-radio>
              <el-radio v-model="startStopBalance" :label=1>启动</el-radio>
              <el-button type="primary" plain @click="ctrBalance">发送请求</el-button>
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div style="margin-left: 10px">
              校正平衡模块MPU：
              <el-radio v-model="MPUAdj" :label=1>校正</el-radio>
              <el-button type="primary" plain @click="correctionBalanceMPU">发送请求</el-button>
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div style="margin-left: 10px">
              跳转至IAP：
              <el-radio v-model="gotoIAP" :label=1>跳转至IAP</el-radio>
              <el-button type="primary" plain @click="ctlGotoIAP">发送请求</el-button>
            </div>
          </el-row>

        </div>
      </card>
    </div>

  </div>
</template>
<script>
import axios from 'axios'
import qs from "querystring";

export default {
  name: 'CtrlMotor',
  data() {
    return {
      robotNum: 'robot001',
      // robotNum: '4435ee-YZY001',
      ctlMotor: 0,
      ctlLEDs: 1,
      threshold: 50,
      motorSpeed: 10,
      shutDown: 1,
      startStopHeater: 0,
      startStopCharge: 1,
      startStopBalance:0,
      MPUAdj: 1,
      gotoIAP: 1,
    }
  },
  methods: {
    ctrlMotorMove() {
      let that = this
      let data = {}
      data.ctlMotor = that.ctlMotor
      data.robotNum = that.robotNum
      if (that.ctlMotor !== 0 && that.ctlMotor !== 1 && that.ctlMotor !== 2) {
        this.$message.error('请选择要控制的电机动作');
      }
      axios.post('/api/test/robot/ctrl/motor/move/', qs.stringify(data)).then(
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
    ctrlLEDs() {
      let that = this
      let data = {}
      data.ctlLEDs = that.ctlLEDs
      data.robotNum = that.robotNum
      if (that.ctlLEDs !== 1 && that.ctlLEDs !== 2 && that.ctlLEDs !== 3) {
        this.$message.error('请选择要控制的LED颜色');
      }
      axios.post('/api/test/robot/ctrl/led/', qs.stringify(data)).then(
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
    cfgEtcThreshold() {
      let that = this
      let data = {}
      data.threshold = that.threshold
      data.robotNum = that.robotNum
      if (that.threshold > 100 || that.threshold < 0) {
        this.$message.error('电量预警值要取0~100之间');
      } else if (that.threshold === '') {
        this.$message.error('请输入要设置的电量预警值');
      }
      axios.post('/api/test/robot/ctrl/etc/threshold/', qs.stringify(data)).then(
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
    cfgMotorSpeed() {
      let that = this
      let data = {}
      data.motorSpeed = that.motorSpeed
      data.robotNum = that.robotNum
      if (that.motorSpeed === '') {
        this.$message.error('请选择要配置的电机速度');
      }
      axios.post('/api/test/robot/ctrl/motor/speed/', qs.stringify(data)).then(
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
    ctrShutDown() {
      let that = this
      let data = {}
      data.shutDown = that.shutDown
      data.robotNum = that.robotNum
      if (that.shutDown === '') {
        this.$message.error('请选择开/关机');
      }
      axios.post('/api/test/robot/ctrl/shutdown/', qs.stringify(data)).then(
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
    ctrHeater() {
      let that = this
      let data = {}
      if (that.startStopHeater === '') {
        this.$message.error('请选择是否启动加热片');
      }
      data.startStopHeater = that.startStopHeater
      data.robotNum = that.robotNum
      axios.post('/api/test/robot/ctrl/heater/', qs.stringify(data)).then(
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
    ctrCharge() {
      let that = this
      let data = {}
      if (that.startStopCharge === '') {
        this.$message.error('请选择是否启动充电');
      }
      data.startStopCharge = that.startStopCharge
      data.robotNum = that.robotNum
      axios.post('/api/test/robot/ctrl/charge/', qs.stringify(data)).then(
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
    ctrBalance() {
      let that = this
      let data = {}
      if (that.startStopBalance === '') {
        this.$message.error('请选择是否启动平衡模块');
      }
      data.startStopBalance = that.startStopBalance
      data.robotNum = that.robotNum
      axios.post('/api/test/robot/ctrl/balance/', qs.stringify(data)).then(
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
    correctionBalanceMPU() {
      let that = this
      let data = {}
      if (that.MPUAdj === '') {
        this.$message.error('请选择是否校正');
      }
      data.MPUAdj = that.MPUAdj
      data.robotNum = that.robotNum
      axios.post('/api/test/robot/ctrl/mpu/', qs.stringify(data)).then(
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
    ctlGotoIAP() {
      let that = this
      let data = {}
      if (that.gotoIAP === '') {
        this.$message.error('请选择是否跳转');
      }
      data.gotoIAP = that.gotoIAP
      data.robotNum = that.robotNum
      axios.post('/api/test/robot/ctrl/goto/iap/', qs.stringify(data)).then(
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
