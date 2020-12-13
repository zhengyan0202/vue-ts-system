/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */
export default [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    component: () => import('@/views/home.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          icon: '',
          keepAlive: true,
          title: '首页'
        }
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('@/views/base-table.vue'),
        meta: {
          icon: '',
          keepAlive: true,
          title: '基础表格'
        }
      }
    ]

  }
]