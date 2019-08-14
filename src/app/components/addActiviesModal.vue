<template>

    <div>



        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document" >
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Agregar Actividad</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        


                        <form>

                            <h6>Hora Inicial</h6>
                            <div class="row">
                                <div class="col-2 modalInput">
                                    <input v-model="Activity.InitialHour" type="text" class="form-control" placeholder="">
                                </div>
                                <div class="col-2 modalInput">
                                    <input v-model="Activity.InitialMin" type="text" class="form-control" placeholder="">
                                </div>
                                <div class="col-3">
                                    <select v-model="Activity.InitialTime" class="custom-select mr-sm-2">
                                        <option selected disabled>Tiempo</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                </div>
                                <div class="col-5">
                                    <select v-model="Activity.Category" class="custom-select mr-sm-2">
                                        <option selected disabled>Categoria</option>
                                        <option>Categoria1</option>
                                    </select>
                                </div>      
                            </div>
                            
                            <br>

                            <h6>Hora Inicial</h6>
                            <div class="row">
                                <div class="col-2 modalInput">
                                    <input v-model="Activity.FinalHour" type="text" class="form-control" placeholder="">
                                </div>
                                <div class="col-2 modalInput">
                                    <input v-model="Activity.FinalMin" type="text" class="form-control" placeholder="">
                                </div>
                                <div class="col-3">
                                    <select v-model="Activity.FinalTime" class="custom-select mr-sm-2">
                                        <option selected disabled>Tiempo</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                </div>
                            </div>

                            <hr/>

                            <h6>Actividad</h6>
                            <div class="row">
                                <div class="col"><input v-model="Activity.Act" type="text" class="form-control" placeholder=""></div>
                            </div>

                        </form>




                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal" @click="helloThere">Guardar Actividad</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import axios from 'axios';


class Activity {
    constructor(InitialHour, InitialMin, InitialTime, Category, FinalHour, FinalMin, FinalTime, Act){
        this.InitialHour = InitialHour,
        this.InitialMin  = InitialMin,
        this.InitialTime = InitialTime,
        this.Category    = Category,
        this.FinalHour   = FinalHour,
        this.FinalMin    = FinalMin,
        this.FinalTime   = FinalTime,
        this.Act         = Act
    }
}


export default {
    data(){
        return {
            Activity: new Activity(),
            
            
        }
    },
    

    methods: {
        addActivity() {
            
            const Activity = this.Activity;

            let minDifference = this.calculateMinutes(Activity.FinalMin, Activity.InitialMin);
            let hourDifference = this.calculateHours(Activity.InitialTime, Activity.FinalTime, Activity.InitialHour, Activity.FinalHour);

            if(Activity.InitialMin > Activity.FinalMin)
                hourDifference-1;

            axios.post('http://192.168.0.16:3000/Activity', {
                InitialHour: Activity.InitialHour,
                InitialMin: Activity.InitialMin,
                InitialTime: Activity.InitialTime,
                Category: Activity.Category,
                FinalHour: Activity.FinalHour,
                FinalMin: Activity.FinalMin,
                FinalTime: Activity.FinalTime,
                Activity: Activity.Act,
                Hours: hourDifference+':'+minDifference
            })
            .then( response => {
                this.Activities.push(response.data);
                
            })
            .catch(function (error) {
                console.log(error);
            });

            

            //this.Activity = new Activity()

            $('#exampleModal').on('hidden.bs.modal', function (e) {
                $(this).find("input,textarea,select").val('').end()
            })

        },
        calculateHours(InitialTime, FinalTime, InitialHour, FinalHour){
            if((InitialTime && FinalTime) == 'AM' || (InitialTime && FinalTime) == 'PM')
                return FinalHour - InitialHour;
            
            if(InitialTime == 'AM' && FinalTime == 'PM')
                return FinalHour - InitialHour;
            
            else if(InitialTime == 'PM' && FinalTime == 'AM')
                return (24 - InitialTime) + FinalTime; 
        },
        calculateMinutes(FinalMin, InitialMin){
            console.log(Math.abs(FinalMin - InitialMin));
            return Math.abs(FinalMin - InitialMin);
            
        },
              getActivities() {
          axios.get('http://192.168.0.16:3000/Activities')
            .then(response => {
               this.Activities = response.data;
            })
            .catch(error => {
                console.log(error);
            })
      }
    }
}
</script>



<style>

.modalInput {
    padding-right: 0px;
}

</style>