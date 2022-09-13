import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import CameraData from "src/pages/CameraData";
import CtrlMotor from 'src/pages/CtrlMotor.vue'
import RobotData from 'src/pages/RobotData.vue'
import Camera from 'src/pages/Camera.vue'
import TableList from 'src/pages/TableList.vue'
import Icons from 'src/pages/Icons.vue'
import Upgrade from 'src/pages/Upgrade.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/robotData'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/robotData',
    children: [
      {
        path: 'robotData',
        name: 'RobotData',
        component: RobotData
      },
      {
        path: 'ctrlMotor',
        name: 'CtrlMotor',
        component: CtrlMotor
      },
      {
        path: 'camera',
        name: 'Camera',
        component: Camera
      },
      {
        path: 'cameraData',
        name: 'CameraData',
        component: CameraData
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
