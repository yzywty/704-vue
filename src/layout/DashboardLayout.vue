<template>
  <div class="wrapper">
    <side-bar>
      <sidebar-link to="/admin/robotData">
        <i class="nc-icon nc-android"></i>
        <p>设备信息</p>
      </sidebar-link>
      <sidebar-link to="/admin/ctrlMotor">
        <i class="nc-icon nc-controller-modern"></i>
        <p>设备控制</p>
      </sidebar-link>
      <sidebar-link to="/admin/camera">
        <i class="nc-icon nc-cctv"></i>
        <p>摄像头控制</p>
      </sidebar-link>
      <sidebar-link to="/admin/cameraData">
        <i class="nc-icon nc-preferences-circle-rotate"></i>
        <p>摄像头数据设置查询</p>
      </sidebar-link>
<!--      <sidebar-link to="/admin/table-list">-->
<!--        <i class="nc-icon nc-notes"></i>-->
<!--        <p>Table list</p>-->
<!--      </sidebar-link>-->
<!--      <sidebar-link to="/admin/icons">-->
<!--        <i class="nc-icon nc-atom"></i>-->
<!--        <p>Icons</p>-->
<!--      </sidebar-link>-->

<!--      <template slot="bottom-links">-->
<!--        <sidebar-link class="active"-->
<!--                      to="/admin/upgrade">-->
<!--          <i class="nc-icon nc-alien-33"></i>-->
<!--          <p>Upgrade to PRO</p>-->
<!--        </sidebar-link>-->
<!--      </template>-->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
