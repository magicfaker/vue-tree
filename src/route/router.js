import Vue from 'vue'
import Router from 'vue-router'

import Home from './../components/HelloWorld'
import Log from './../view/log.vue'
import Tabexcel from './../view/table.vue'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', component: Home },
        { path: '/log', component: Log },
        { path: '/table', component: Tabexcel },
    ]
}
)