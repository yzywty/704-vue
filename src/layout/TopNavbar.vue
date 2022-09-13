<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand">数据</a>

      <div class="collapse navbar-collapse justify-content-end">

        <ul class="navbar-nav ml-auto">
<!--          <li class="nav-item">-->
<!--            <a class="nav-link" href="#">-->
<!--              账户-->
<!--            </a>-->
<!--          </li>-->
<!--          <base-dropdown title="下拉">-->
<!--            <a class="dropdown-item" href="#">Action</a>-->
<!--            <a class="dropdown-item" href="#">Another action</a>-->
<!--            <a class="dropdown-item" href="#">Something</a>-->
<!--            <a class="dropdown-item" href="#">Another action</a>-->
<!--            <a class="dropdown-item" href="#">Something</a>-->
<!--            <div class="divider"></div>-->
<!--            <a class="dropdown-item" href="#">Separated link</a>-->
<!--          </base-dropdown>-->
          <li class="nav-item">
            <a href="#" class="nav-link">
              登出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      }
    }
  }

</script>
<style>

</style>
