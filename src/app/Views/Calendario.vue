<template>
<div>
    <div class="row pt-2">
        <div class="col"></div>
        <div class="col">
            <table class="table table-striped">
                <thead>
                    <th>Lunes</th>
                    <th>Martes</th>
                    <th>Miercoles</th>
                    <th>Jueves</th>
                    <th>Viernes</th>
                    <th>Sabado</th>
                    <th>Domingo</th>
                </thead>
                <tbody v-on:click="clickList()">
                    <tr>
                        <td id="1">1</td>
                        <td id="2">2</td>
                        <td id="3">3</td>
                        <td id="4">4</td>
                        <td id="5">5</td>
                        <td id="6">6</td>
                        <td id="7">7</td>
                    </tr>
                    <tr>
                        <td id="8">8</td>
                        <td id="9">9</td>
                        <td id="10">10</td>
                        <td id="11">11</td>
                        <td id="12">12</td>
                        <td id="13">13</td>
                        <td id="14">14</td>
                    </tr>
                    <tr>
                        <td id="15">15</td>
                        <td id="16">16</td>
                        <td id="17">17</td>
                        <td id="18">18</td>
                        <td id="19">19</td>
                        <td id="20">20</td>
                        <td id="21">21</td>
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
    name: 'Calendario',
    data(){
        return{

        }
    },
    created(){



    },
    mounted(){
        //this.showCalendar(this.numberMonth, this.selectedYear);
    },
    methods: {
        clickList(){
            var day = Math.floor(Math.random() * 30) + 1;
            this.$router.push({ name: 'Activities', params: { day: day } });
        }

            
        
    }
}
</script>

<style>


</style>
