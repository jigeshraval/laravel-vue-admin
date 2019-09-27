import Vue from 'vue'
import VueRouter from 'vue-router'

// Components
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import Form from './pages/Form'
import Table from './pages/Table'
import ComponentList from './pages/components/list.vue'
import ComponentAdd from './pages/components/add.vue'
import ManufacturerList from './pages/manufacturer/list.vue'
import ManufacturerAdd from './pages/manufacturer/add.vue'
import ManufacturerEdit from './pages/manufacturer/add.vue'

import DealerAdd from './pages/dealers/add.vue'
import DealerEdit from './pages/dealers/add.vue'
import DealerList from './pages/dealers/list.vue'

import CustomerAdd from './pages/customers/add.vue'
import CustomerEdit from './pages/customers/add.vue'
import CustomerList from './pages/customers/index.vue'

import PreferredDealerAdd from './pages/preferredDealers/add.vue'
import PreferredDealerEdit from './pages/preferredDealers/add.vue'
import PreferredDealerList from './pages/preferredDealers/list.vue'

import CompletedProjectsAdd from './pages/completedProjects/add.vue'
import CompletedProjectsEdit from './pages/completedProjects/add.vue'
import CompletedProjectsList from './pages/completedProjects/list.vue'

import TrustedCustomerAdd from './pages/trustedCustomers/add.vue'
import TrustedCustomerEdit from './pages/trustedCustomers/add.vue'
import TrustedCustomerList from './pages/trustedCustomers/list.vue'

import partnersAdd from './pages/partners/add.vue'
import partnersEdit from './pages/partners/add.vue'
import partnersList from './pages/partners/list.vue'

import PostCategoryAdd from './pages/postCategory/add.vue'
import PostCategoryEdit from './pages/postCategory/add.vue'
import PostCategoryList from './pages/postCategory/list.vue'

import PostAdd from './pages/post/add.vue'
import PostEdit from './pages/post/add.vue'
import PostList from './pages/post/list.vue'

import PageAdd from './pages/page/add.vue'
import PageEdit from './pages/page/add.vue'
import PageList from './pages/page/list.vue'

import BlockAdd from './pages/block/add.vue'
import BlockEdit from './pages/block/add.vue'
import BlockList from './pages/block/list.vue'

import PlansAdd from './pages/plan/add.vue'
import PlansEdit from './pages/plan/add.vue'
import PlansList from './pages/plan/list.vue'

import EquipmentTypeAdd from './pages/equipmentType/add.vue'
import EquipmentTypeEdit from './pages/equipmentType/add.vue'
import EquipmentTypeList from './pages/equipmentType/list.vue'

import EquipmentCategoryAdd from './pages/equipmentCategory/add.vue'
import EquipmentCategoryEdit from './pages/equipmentCategory/add.vue'
import EquipmentCategoryList from './pages/equipmentCategory/list.vue'

import EquipmentOptionsAdd from './pages/equipmentOptions/add.vue'
import EquipmentOptionsEdit from './pages/equipmentOptions/add.vue'
import EquipmentOptionsList from './pages/equipmentOptions/list.vue'

import AdvertisementAdd from './pages/advertisement/add.vue'
import AdvertisementEdit from './pages/advertisement/add.vue'
import AdvertisementList from './pages/advertisement/list.vue'

import PushNotificationAdd from './pages/pushNotification/add.vue'
import PushNotificationEdit from './pages/pushNotification/add.vue'
import PushNotificationList from './pages/pushNotification/list.vue'

import EmailAdd from './pages/emails/add.vue'
import EmailEdit from './pages/emails/add.vue'
import EmailList from './pages/emails/list.vue'

import EmployeeAdd from './pages/employee/add.vue'
import EmployeeEdit from './pages/employee/add.vue'
import EmployeeList from './pages/employee/index.vue'

import MenuHeadingsAdd from './pages/adminMenuHeadings/add.vue'
import MenuHeadingsEdit from './pages/adminMenuHeadings/add.vue'
import MenuHeadingsList from './pages/adminMenuHeadings/index.vue'

import MenuAdd from './pages/adminMenu/add.vue'
import MenuEdit from './pages/adminMenu/add.vue'
import MenuList from './pages/adminMenu/index.vue'

import MenuChildAdd from './pages/adminMenuChild/add.vue'
import MenuChildEdit from './pages/adminMenuChild/add.vue'
import MenuChildList from './pages/adminMenuChild/index.vue'

Vue.use(VueRouter)

const routes = [
    {
      path: '/admin/menu/child/edit/:id',
      component: MenuChildEdit
    },
    {
        path: '/admin/menu/child',
        component: MenuChildList
    },
    {
      path: '/admin/menu/child/add',
      component: MenuChildAdd
    },
    {
      path: '/admin/menu/child/edit/:id',
      component: MenuChildEdit
    },
    {
        path: '/admin/menu',
        component: MenuList
    },
    {
      path: '/admin/menu/add',
      component: MenuAdd
    },
    {
      path: '/admin/menu/headings/edit/:id',
      component: MenuHeadingsEdit
    },
    {
        path: '/admin/menu/headings',
        component: MenuHeadingsList
    },
    {
      path: '/admin/menu/headings/add',
      component: MenuHeadingsAdd
    },
    {
      path: '/employee/edit/:id',
      component: EmployeeEdit
    },
    {
        path: '/employee',
        component: EmployeeList
    },
    {
      path: '/employee/add',
      component: EmployeeAdd
    },
    {
      path: '/email/edit/:id',
      component: EmailEdit
    },
    {
        path: '/email/list',
        component: EmailList
    },
    {
      path: '/email/add',
      component: EmailAdd
    },
    {
      path: '/push/notification/edit/:id',
      component: PushNotificationEdit
    },
    {
        path: '/push/notification/list',
        component: PushNotificationList
    },
    {
      path: '/push/notification/add',
      component: PushNotificationAdd
    },
    {
      path: '/advertisement/edit/:id',
      component: AdvertisementEdit
    },
    {
        path: '/advertisement/list',
        component: AdvertisementList
    },
    {
      path: '/advertisement/add',
      component: AdvertisementAdd
    },
    {
      path: '/equipment/options/edit/:id',
      component: EquipmentOptionsEdit
    },
    {
        path: '/equipment/options/list',
        component: EquipmentOptionsList
    },
    {
      path: '/equipment/options/add',
      component: EquipmentOptionsAdd
    },
    {
      path: '/equipment/category/edit/:id',
      component: EquipmentCategoryEdit
    },
    {
        path: '/equipment/category/list',
        component: EquipmentCategoryList
    },
    {
      path: '/equipment/category/add',
      component: EquipmentCategoryAdd
    },
    {
      path: '/equipment/type/edit/:id',
      component: EquipmentTypeEdit
    },
    {
        path: '/equipment/type/list',
        component: EquipmentTypeList
    },
    {
      path: '/equipment/type/add',
      component: EquipmentTypeAdd
    },
    {
      path: '/plans/edit/:id',
      component: PlansEdit
    },
    {
        path: '/plans/list',
        component: PlansList
    },
    {
      path: '/plans/add',
      component: PlansAdd
    },
    {
      path: '/block/edit/:id',
      component: BlockEdit
    },
    {
        path: '/block/list',
        component: BlockList
    },
    {
      path: '/block/add',
      component: BlockAdd
    },
    {
      path: '/page/edit/:id',
      component: PageEdit
    },
    {
        path: '/page/list',
        component: PageList
    },
    {
      path: '/page/add',
      component: PageAdd
    },
    {
      path: '/post/edit/:id',
      component: PostEdit
    },
    {
        path: '/post/list',
        component: PostList
    },
    {
      path: '/post/add',
      component: PostAdd
    },
    {
      path: '/post/category/edit/:id',
      component: PostCategoryEdit
    },
    {
        path: '/post/category/list',
        component: PostCategoryList
    },
    {
      path: '/post/category/add',
      component: PostCategoryAdd
    },
    {
      path: '/partners/edit/:id',
      component: partnersEdit
    },
    {
        path: '/partners/list',
        component: partnersList
    },
    {
      path: '/partners/add',
      component: partnersAdd
    },
    {
      path: '/trusted/customers/edit/:id',
      component: TrustedCustomerEdit
    },
    {
        path: '/trusted/customers/list',
        component: TrustedCustomerList
    },
    {
      path: '/trusted/customers/add',
      component: TrustedCustomerAdd
    },
    {
      path: '/completed/projects/edit/:id',
      component: CompletedProjectsEdit
    },
    {
        path: '/completed/projects/list',
        component: CompletedProjectsList
    },
    {
      path: '/completed/projects/add',
      component: CompletedProjectsAdd
    },
    {
      path: '/preferred/dealer/edit/:id',
      component: PreferredDealerEdit
    },
    {
        path: '/preferred/dealer/list',
        component: PreferredDealerList
    },
    {
      path: '/preferred/dealer/add',
      component: PreferredDealerAdd
    },
    {
      path: '/dealer/edit/:id',
      component: DealerEdit
    },
    {
        path: '/dealer/list',
        component: DealerList
    },
    {
      path: '/dealer/add',
      component: DealerAdd
    },
    {
      path: '/customer/edit/:id',
      component: CustomerEdit
    },
    {
        path: '/customer/list',
        component: CustomerList
    },
    {
      path: '/customer/add',
      component: CustomerAdd
    },
    {
      path: '/manufacturer/edit/:id',
      component: ManufacturerEdit
    },
    {
      path: '/manufacturer/add',
      component: ManufacturerAdd
    },
    {
        path: '/manufacturer/list',
        component: ManufacturerList
    },
    {
        path: '/component/list',
        component: ComponentList
    },
    {
        path: '/component/add',
        component: ComponentAdd
    },
    {
        path: '/admin',
        component: Index
    },
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/form',
        component: Form
    },
    {
        path: '/table',
        component: Table
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes,
    base: ADMIN_APP_ROUTE
})

export default router
