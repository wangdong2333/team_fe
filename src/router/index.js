import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/personal',
    component: () => import('@/views/mine/personal'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/main/index',
  },

  {
    path: '/main',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Main',
        component: () => import('@/views/main/index'),
        meta: { title: 'Main', icon: 'form' }
      }
    ]
  },
  {
    path: '/teamDate',
    component: Layout,
    meta: { title: '数据分析', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'Date',
        component: () => import('@/views/teamDate/index'),
        meta: { title: '成员数据', icon: 'form' }
      },
      {
        path: 'test',
        name: 'Date',
        component: () => import('@/views/teamDate/test'),
        meta: { title: '比赛数据', icon: 'form' }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    meta: { title: '团队成员', icon: 'form' },
    children: [
      {
        path: 'list',

        name: 'MessageList',
        component: () => import('@/views/member/list'),
        meta: { title: '成员列表', icon: 'form' }
      },
      {
        path: 'add',
        name: 'MessageAdd',
        component: () => import('@/views/member/add'),
        meta: { title: '添加成员', icon: 'form' }
      },
      // {
      //   path: 'demo',

      //   name: 'MessageDemo',
      //   component: () => import('@/views/member/demo'),
      //   meta: { title: 'demo', icon: 'form' }
      // },
    ]
  },
  {
    path: '/game',
    component: Layout,
    meta: { title: '团队比赛', icon: 'form' },
    children: [
      {
        path: 'list',

        name: 'MessageList',
        component: () => import('@/views/game/list'),
        meta: { title: '比赛信息', icon: 'form' }
      },
      {
        path: 'add',
        name: 'MessageAdd',
        component: () => import('@/views/game/add'),
        meta: { title: '添加比赛', icon: 'form' }
      }
    ]
  },
  {
    path: '/transfer',
    component: Layout,
    meta: { title: '团队转会', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'TransferList',
        component: () => import('@/views/transfer/list'),
        meta: { title: '转会信息', icon: 'form' }
      },
      {
        path: 'add',
        name: 'TransferAdd',
        component: () => import('@/views/transfer/add'),
        meta: { title: '添加转会', icon: 'form' }
      }
    ]
  },
  {
    path: '/mine',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Mine',
        component: () => import('@/views/mine/index'),
        meta: { title: '个人信息', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
