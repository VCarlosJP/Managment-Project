<template>
    <div>
        <Navbar/>
        <!-- <HoursTable/> -->
        <Calendar/>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import HoursTable from './Views/HoursTable.vue';
import Calendar from './Views/Calendar.vue';

export default {
  components: {
    Navbar,
    HoursTable,
    Calendar
  }
};
</script>