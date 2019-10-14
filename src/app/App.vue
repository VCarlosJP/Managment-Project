<template>
    <div>
        <Navbar/>
        <!-- <HoursTable/> -->
        <!-- <ActivitiesCalendar/> -->
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import HoursTable from './Views/HoursTable.vue';
import Calendar from './Views/Calendar.vue';
import ActivitiesCalendar from './Views/ActivitiesCalendar.vue';

export default {
  components: {
    Navbar,
    HoursTable,
    ActivitiesCalendar
  }
};
</script>