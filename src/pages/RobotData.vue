<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div style="margin-bottom: 10px">
            <el-row>
              <el-button type="primary" plain style="float: right" @click="getRobotData">查询</el-button>
              <el-input class="el-input" type="text" v-model="robotNum" style="float: right"
                        placeholder="输入设备id查询信息"></el-input>
              <el-checkbox style="float: right;margin-top: 10px;margin-right: 10px" v-model="mark"
                           @change="searchTimer">自动查询
              </el-checkbox>
            </el-row>
          </div>
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive">
            <form>
              <el-descriptions style="margin: 10px" direction='vertical' title="设备信息表" :column="5" border>
                <el-descriptions-item class="margin-top">
                  <template slot="label">
                    设备ID
                  </template>
                  {{ robotData.robotNum }}
                </el-descriptions-item>
                <el-descriptions-item class="margin-top">
                  <template slot="label">
                    充电输入形式
                  </template>
                  {{ robotData.chargeInput }}
                </el-descriptions-item>
                <el-descriptions-item class="margin-top">
                  <template slot="label">电量</template>
                  {{ robotData.electric }}
                </el-descriptions-item>
                <el-descriptions-item class="margin-top">
                  <template slot="label">
                    按键状态
                  </template>
                  {{ robotData.keyState }}
                </el-descriptions-item>
                <el-descriptions-item class="margin-top">
                  <template slot="label">
                    指示灯状态
                  </template>
                  {{ robotData.ledsState }}
                </el-descriptions-item>
              </el-descriptions>

              <el-descriptions style="margin: 10px" class="margin-top" :column="2" border>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-office-building"></i>
                    平衡模块数据
                  </template>
                  <el-row>
                    平衡MPU状态:{{ balanceData.balanceMPUState }}
                  </el-row>
                  <el-row>
                    平衡电机状态:{{ balanceData.balanceMotorState }}
                  </el-row>
                  <el-row>
                    停止/启动：{{ balanceData.startStopBalance }}
                  </el-row>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    平衡模块MPU数据
                  </template>
                  <el-row>
                    转动速度pitch:{{ balanceMPUData.pitch }}
                  </el-row>
                  <el-row>
                    转动速度roll:{{ balanceMPUData.roll }}
                  </el-row>
                  <el-row>
                    转动速度yaw：{{ balanceMPUData.yaw }}
                  </el-row>
                </el-descriptions-item>
              </el-descriptions>

              <el-descriptions style="margin: 10px" class="margin-top" :column="2" border>
                <el-descriptions-item>
                  <template slot="label">
                    温  度
                  </template>
                  <el-row>
                    TA:{{ batteryTemp.ta }}
                  </el-row>
                  <el-row>
                    TB:{{ batteryTemp.tb }}
                  </el-row>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    充电数据
                  </template>
                  <el-row>
                    充电模式:{{ chargeData.chargeMode }}
                  </el-row>
                  <el-row>
                    充电状态:{{ chargeData.chargeState }}
                  </el-row>
                </el-descriptions-item>
              </el-descriptions>

              <el-descriptions style="margin: 10px" class="margin-top" :column="2" border>
                <el-descriptions-item>
                  <template slot="label">
                    陀螺仪数据
                  </template>
                  <el-row>
                    <pre class="inner-pre" style="font-size: 15px">accelX:{{ gyroscopeData.accelX }}     gyroX:{{gyroscopeData.gyroX}}</pre>
                  </el-row>
                  <el-row>
                    <pre class="inner-pre" style="font-size: 15px">accelY:{{ gyroscopeData.accelY }}     gyroY:{{gyroscopeData.gyroY}}</pre>
                  </el-row>
                  <el-row>
                    <pre class="inner-pre" style="font-size: 15px">accelZ:{{ gyroscopeData.accelZ }}     gyroZ:{{gyroscopeData.gyroZ}}</pre>
                  </el-row>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    固件版本
                  </template>
                  <el-row>
                    主要版本:{{ firmwareVersion.majorVersion }}
                  </el-row>
                  <el-row>
                    次要版本:{{ firmwareVersion.minorVersion }}
                  </el-row>
                  <el-row>
                    修订版本:{{ firmwareVersion.revision }}
                  </el-row>
                </el-descriptions-item>
              </el-descriptions>

              <el-descriptions style="margin: 10px" class="margin-top" :column="2" border>
                <el-descriptions-item>
                  <template slot="label">
                    充电数据
                  </template>
                  <el-row>
                    N极:{{ magneticData.n }}
                  </el-row>
                  <el-row>
                    S极:{{ magneticData.s }}
                  </el-row>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    电机数据
                  </template>
                  <el-row>
                    电机状态:{{ motorData.motorState }}
                  </el-row>
                  <el-row>
                    电机速度:{{ motorData.motorSpeed }}
                  </el-row>
                </el-descriptions-item>
              </el-descriptions>
            </form>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import Card from 'src/components/Cards/Card.vue'
import axios from 'axios'

export default {
  name: 'RobotData',
  components: {
    Card
  },
  data() {
    return {
      robotNum: 'robot001',
      // robotNum: '4435ee-YZY001',
      mark: false,
      robotData: {},
      balanceData: {},
      balanceMPUData: {},
      batteryTemp: {},
      chargeData: {},
      gyroscopeData: {},
      magneticData: {},
      motorData: {},
      firmwareVersion: {},
      timer: null,
      size: ''
    }
  },
  created () {
    let self = this
    self.getRobotData()
  },
  methods: {
    searchTimer() {
      if (this.mark === true) {
        this.timer = setInterval(() => {
          this.getRobotData()
        }, 1000)
      }
      if (this.mark === false) {
        clearInterval(this.timer)
      }
    },
    getRobotData() {
      let that = this
      axios.get('/api/test/robot/data/?robotNum=' + that.robotNum).then(
        response => {
          console.log('请求成功了', response)
          that.robotData = response.data.result
          that.balanceData = response.data.result.balanceData
          that.balanceMPUData = response.data.result.balanceMPUData
          that.batteryTemp = response.data.result.batteryTemp
          that.chargeData = response.data.result.chargeData
          that.gyroscopeData = response.data.result.gyroscopeData
          that.magneticData = response.data.result.magneticData
          that.motorData = response.data.result.motorData
          that.firmwareVersion = response.data.result.firmwareVersion
          // that.robotData = JSON.stringify(response.data.result, null, 4)
          console.log(response.data.result)
          this.$notify({
            title: '成功',
            message: '查询成功',
            type: 'success',
            duration: '2000'
          });
        },
        error => {
          console.log('请求失败了', error.message)
          this.$notify.error({
            title: '错误',
            message: '查询失败',
            duration: '2000'
          });
        }
      )
    },

  }
}
</script>

<style>
.el-input {
  width: 250px;
}

.col-md-5 {
  width: 100px;
}

.header {
  width: 300px;
}
</style>
