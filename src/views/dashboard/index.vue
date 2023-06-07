<template>
  <div class="dashboard-container">
    <div class="dashboard-text">总览</div>
    <el-card shadow="never">
      <div slot="header">资源概览</div>
      <el-row :gutter="12">
        <el-col v-for="item in itemList" :key="item.id" :span="4">
          <el-card shadow="never">
            <div>
              {{ item.name }}
              <span>
                <el-tooltip class="item" effect="light" :content="item.label" placement="top-start">
                  <i class="el-icon-question" />
                </el-tooltip>
              </span>
            </div>
            <span>{{ item.num }}</span>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <span>在线设备数</span>
      <el-date-picker
        v-model="selectData"
        type="daterange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        :clearable="false"
        @change="getLine"
      />
      <LineCharts
        id="dashLine"
        ref="bar"
        height="450px"
        :charts-data="chartsData"
      />
    </el-card>

  </div>
</template>

<script>
import { formateDate } from '@/filters/index';
import { iotDashboardInfoGet, iotDashboardOnlineDeviceList } from './api'
import LineCharts from './components/line'
export default {
  name: 'Dashboard',
  components: {
    LineCharts
  },
  data() {
    return {
      // 默认最近一个月
      selectData: [
        new Date().getTime() - 3600 * 1000 * 24 * 30,
        new Date().getTime()
      ],
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.selectData = minDate.getTime();
          if (maxDate) {
            this.selectData = '';
          }
        },
        disabledDate: (time) => {
          if (this.selectData) {
            return (
              time.getTime() > new Date() ||
              time.getTime() > this.selectData + 30 * 24 * 3600 * 1000 ||
              time.getTime() < this.selectData - 30 * 24 * 3600 * 1000
            );
          } else {
            return time.getTime() > new Date();
          }
        }
      },
      dashboardInfo: {
        productTotal: 0,
        deviceTotal: 0,
        onlineDeviceNum: 0,
        activeDeviceNum: 0
      },
      chartsData: {
        data: [],
        axis: []
      }
    }
  },
  computed: {
    itemList() {
      return [
        {
          label: '当前的产品总数',
          name: '产品总数',
          num: this.dashboardInfo.productTotal || 0,
          color: ''
        },
        {
          label: '当前的设备总数',
          name: '设备总数',
          num: this.dashboardInfo.deviceTotal || 0,
          color: ''
        },
        {
          label: '当前在线的设备总数',
          name: '在线设备',
          num: this.dashboardInfo.onlineDeviceNum || 0,
          color: 'rgb(0, 112, 204)'
        },
        {
          label: '当前已激活的设备总数',
          name: '激活设备',
          num: this.dashboardInfo.activeDeviceNum || 0,
          color: 'rgb(30, 142, 62)'
        }
      ];
    }
  },
  created() {
    this.getInfo();
    this.getLine()
  },
  methods: {
    async getInfo() {
      const data = await iotDashboardInfoGet()
      console.log(data);
      this.dashboardInfo = data.dashboardInfo || {}
    },
    async getLine() {
      const res = {
        beginTime: formateDate(this.selectData[0]),
        endTime: formateDate(this.selectData[1])
      }
      const data = await iotDashboardOnlineDeviceList(res);
      const onlineDeviceList = data.onlineDeviceList || [];
      const value = onlineDeviceList.map((item) => item.value) || [];
      const axis = onlineDeviceList.map((item) => item.date) || [];
      this.chartsData = {
        data: value,
        axis
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 24px;
    line-height: 36px;
  }
}
</style>
