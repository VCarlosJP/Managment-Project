<template>
<div>
                   
                <div class="row pt-2">
                    <div class="col"></div>
                    <div class="col-8">
                        <router-link :to="{ name: 'activities', params: { day: 22, month:8, year:19  } }">Navigate to Page2</router-link>
                        <div class="d-flex flex-row-reverse bd-highlight">
                            <div class="form-group">
                                <select v-model="selectedYear" class="form-control" @change="changeCalendar()">
                                <option v-for="year in Years" :key="year.id">{{ year }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select v-model="selectedMonth" class="form-control" @change="changeCalendar()">
                                <option v-for="month in Months" :key="month.id">{{ month }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col"></div>
                </div>
            

    <div class="row">

        <div class="col"></div>
        <div class="col-8">

            <!--Table for Calendar -->
            <table class="table table-bordered">
                <thead>
                    <tr>
                    <th v-for="(day, index) in Days" :key="day.id">{{ day }}</th>
                    </tr>
                </thead>
                <tbody id="calendar-body">
                    <tr v-for="row in 4">
                    <td v-for="column in 7" @click="getDayActivities()">
                        <div style="height: 90px;">{{ column }}</div>
                    </td>
                    </tr>
                </tbody> 
                </table>
        </div>
        <div class="col"></div>
        
    </div>

</div>
</template>

<script>
export default {
    name: 'ActivitiesCalendar',
    data(){
        return{
            Days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            Months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            Years: ['2017', '2018', '2019', '2020', '2021', '2022'],
            selectedYear: '',
            selectedMonth: '',
            numberMonth: '',
            id: ''

        }
    },
    methods: {
        getDayActivities(){
            console.log("Hello There");
        }
    }
}
</script>

<style>
td{
    height: 90px;
}

</style>