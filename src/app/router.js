import Vue from 'vue';
import Router from 'vue-router';

import ActivitiesCalendar from './Views/ActivitiesCalendar.vue'
import HoursTable from './Views/HoursTable.vue'
import Home from './Views/Home.vue'
import FileReaderx from './Views/FileReader.vue'

Vue.use(Router);

const routes = [
    {path: '/', component: Home},
    {path: '/activities/:day/:month/:year', name: 'Actividades', component: HoursTable},
    //{path: '/fileReader', component: FileReaderx},
    {path: '/Minuta/:camp/:well', name: 'Minutas', component: FileReaderx},
];

const router = new Router({
    routes: routes
});


export default router;