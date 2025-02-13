import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import SelectWorkspace from '@/SelectWorkspace.vue'
import AddWorkspace from '@/AddWorkspace.vue';
import Home from '@/views/Home.vue';
import Room from '@/views/rooms/Room.vue';
import RoomDetail from '@/views/rooms/RoomDetail.vue';
import MyProfile from '@/views/pages/MyProfile.vue';
import Task from '@/views/task/Task.vue';
import Help from '@/views/pages/Help.vue';
import { useAuth } from '@/hooks/useAuth';

const ctrl = useAuth();
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/select-workspace/",
    component: SelectWorkspace,
    meta: { hideTab:true }
  },
  {
    path: "/add-workspace/:property_code",
    component: AddWorkspace,
    meta: { hideTab:true }
  },
  {
    path: "/add-workspace",
    component: AddWorkspace,
    meta: { hideTab:true }
  },
  {
    path: "/home",
    component: Home,
    meta: { requiresAuth: true }
  },
  
  {
    path: "/room",
    component: Room,
    meta: { requiresAuth: true,title:"Room" }
  },
  {
    path: "/room-detail",
    component: RoomDetail,
    meta: { hideTab:true, requiresAuth: true }
  },
  {
    path: "/my-profile",
    component: MyProfile,
    meta: { requiresAuth: true,title:"My Profile" }
  },
  {
    path: "/task",
    component: Task,
    meta: { requiresAuth: true,title:"Task" }
  },
  
  {
    path: "/task-detail/:name",
    component: () => import('@/views/task/TaskDetail.vue'),

    meta: { requiresAuth: true,hideTab:true}
  },
  {
    path: "/stay",
    component: () => import('@/views/reservations/Reservation.vue'),
    meta: { requiresAuth: true}
  },
  {
  path: "/occupy",
    component: () => import('@/views/reservations/Occupy.vue'),
    meta: { requiresAuth: true,hideTab:true}
  },{
  path: "/reservation-dtail/:name",
    component: () => import('@/views/reservations/ReservationDetail.vue'),
    meta: { requiresAuth: true,hideTab:true}
  },
  
  {
    path: "/help",
    component: Help,
    meta: { requiresAuth: true,title:"Help" }
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
