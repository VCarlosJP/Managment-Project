<template>
<div>
                   
                <div class="row pt-2">
                    <div class="col"></div>
                    <div class="col-8">
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
                    <!-- <tr v-for="row in 4">
                    <td v-for="column in 7">
                        <div style="height: 90px;">{{ column }}</div>
                    </td>
                    </tr> -->
                </tbody> 
                </table>
        </div>
        <div class="col"></div>
        
    </div>

</div>
</template>

<script>
export default {
    name: 'Calendar',
    data(){
        return{
            Days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            Months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            Years: ['2017', '2018', '2019', '2020', '2021', '2022'],
            selectedYear: '',
            selectedMonth: '',
            numberMonth: ''

        }
    },
    created(){

        let currentMonth = this.getCurrentDate()[0];
        let currentYear = this.getCurrentDate()[1];
        this.numberMonth = currentMonth;
        this.selectedMonth = this.Months[currentMonth];
        this.selectedYear = currentYear;

    },
    mounted(){
        this.showCalendar(this.numberMonth, this.selectedYear);
    },
    methods: {
        changeCalendar(){
            this.showCalendar(this.Months.indexOf(this.selectedMonth), this.selectedYear);
        },
        getCurrentDate(){
            let today = new Date();
            return [today.getMonth(), today.getFullYear(), today.getDate()];
        },
        showCalendar(Month, Year){

            let firstDay = (new Date(Year, Month)).getDay();
            
            let daysInMonth = 32 - new Date(Year, Month, 32).getDate();

            let tbl = document.getElementById("calendar-body");
            
            let currentMonth = this.getCurrentDate()[0];
            let currentYear = this.getCurrentDate()[1];
            let currentDate = this.getCurrentDate()[2];

            // clearing all previous cells
            tbl.innerHTML = "";

            //Creating cells for the calendar
            let date = 1;
                for (let i = 0; i < 6; i++) {
                    // creates a table row
                    let row = document.createElement("tr");

                    //creating individual cells, filing them up with data.
                    for (let j = 0; j < 7; j++) {
                        if (i === 0 && j < firstDay) {
                            let cell = document.createElement("td");
                            let cellText = document.createTextNode("");
                            cell.appendChild(cellText);
                            row.appendChild(cell);
                        }
                        else if (date > daysInMonth) {
                            break;
                        }

                        else {
                            let cell = document.createElement("td");
                            let cellText = document.createTextNode(date);
                            // if (date === currentDate && Year === currentYear && Month === currentMonth) {
                            //     cell.classList.add("bg-info");
                            // }
                            cell.appendChild(cellText);
                            row.appendChild(cell);
                            date++;
                            
                        }


                    }

                    tbl.appendChild(row); // appending each row into calendar body.
                }


            
        }
    }
}
</script>

<style>
td{
    height: 90px;
}

</style>
