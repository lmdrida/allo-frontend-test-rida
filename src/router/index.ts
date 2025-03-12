/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
// import { routes } from "vue-router/auto-routes";
import ListRocket from "@/pages/ListRocket.vue";
import DetailRocket from "@/pages/DetailRocket.vue";
import PageNotFound from "@/pages/PageNotFound.vue";

const routes = [
  {
    path: "/",
    component: ListRocket,
    name: "List Rocket",
    meta: {
      breadcrumb: [
        { title: "Rocket", href: "" },
      ],
    },
  },
  {
    path: "/rocket/:id",
    component: DetailRocket,
    name: "Detail Rocket",
    meta: {
      breadcrumb: [
        { title: "Rocket", href: "/" },
        { title: "Detail Rocket", href: "" },
      ],
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound,
    name: 'Page Not Found'
  } 
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
