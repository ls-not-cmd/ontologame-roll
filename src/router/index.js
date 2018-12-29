import Vue from 'vue'
import Router from 'vue-router'
import {gRouters} from "../js/routers";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes:gRouters
})