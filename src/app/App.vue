<template>
    <div>
        <Navbar/>
        <HoursTable/>
        <addActiviesModal/>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import HoursTable from './Views/HoursTable.vue';
import addActiviesModal from './components/addActiviesModal.vue';

export default {
  components: {
    Navbar,
    HoursTable,
    addActiviesModal
  }
};
</script>