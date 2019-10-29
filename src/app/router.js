import Vue from 'vue';
import Router from 'vue-router';

import ActivitiesCalendar from './Views/ActivitiesCalendar.vue'
import HoursTable from './Views/HoursTable.vue'
import Home from './Views/Home.vue'
import FileReaderx from './Views/FileReader.vue'
import Calendar from './Views/Calendario.vue'

Vue.use(Router);

const routes = [
    {path: '/', component: Home},
    //{path: '/activities/:day/:month/:year', name: 'Actividades', component: HoursTable},
    {path: '/calendario', name: 'Actividades', component: Calendar},
    {path: '/activities/:day/10/2019', name: 'Activities', component: HoursTable},
    //{path: '/calendar', name: 'Calendario', component: Calendar},
    //{path: '/fileReader', component: FileReaderx},
    {path: '/Minuta/:camp/:well', name: 'Minutas', component: FileReaderx},
];

const router = new Router({
    routes: routes
});


export default router;