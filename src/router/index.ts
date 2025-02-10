import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import SelectWorkspace from '@/SelectWorkspace.vue'
import AddWorkspace from '@/AddWorkspace.vue';
import Home from '@/views/Home.vue';
import { useAuth } from '@/hooks/useAuth';
const ctrl = useAuth();
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/select-workspace/",
    component: SelectWorkspace
  },
  {
    path: "/add-workspace/:property_code",
    component: AddWorkspace
  },
  {
    path: "/add-workspace",
    component: AddWorkspace
  },
  {
    path: "/home",
    component: Home,
    meta: { requiresAuth: true }
  },

  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach(async (to, from, next) => {
  
  if (to.meta.requiresAuth && !ctrl.isAuthenticated.value) {
    next("/select-workspace");
  } else {
    
      next();
   
    
  }
});


export default router
