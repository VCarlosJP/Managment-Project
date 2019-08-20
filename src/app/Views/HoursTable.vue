<template>

<div class="row pt-5 ">
    <div class="col"></div>
    <div class="col-8">
         <div class="d-flex justify-content-between">
             <h3>Martes 6 de Agosto 2019</h3>
             <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">+ Nueva Actividad</button>
         </div>
         <hr/>
            <table id="hoursTable">
                <thead>
                    <tr>
                    <th scope="col">Inicio</th>
                    <th scope="col">Final</th>
                    <th scope="col">Actividad</th>
                    <th scope="col">Horas</th>
                    <th scope="col">Categoria</th>
                    <th scope="col" style="width:16%;">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="innerCells" v-for="(activity, index) in Activities" :key="activity.id">
                    <td>{{activity.InitialHour}}:{{activity.InitialMin}} {{activity.InitialTime}}</td>
                    <td>{{activity.FinalHour}}:{{activity.FinalMin}} {{activity.FinalTime}}</td>
                    <td>{{activity.Activity}}</td>
                    <td>{{activity.Hours}} horas</td>
                    <td>{{activity.Category}}</td>
                    <td>          
                        <button type="button" class="">Edit</button>
                        <button type="button" class="" @click="deleteActivity(activity._id, index)">Delete</button>
                    </td>
                    </tr>
                </tbody>
            </table>
    </div>
    <div class="col"></div>



<!-- Modal for adding new activities into table -->

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
                            <input v-model="Activity.InitialHour" type="number" class="form-control" placeholder="">
                        </div>
                        <div class="col-2 modalInput">
                            <input v-model="Activity.InitialMin" type="number" class="form-control" placeholder="">
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
                    <h6>Hora Final</h6>
                    <div class="row">
                        <div class="col-2 modalInput">
                            <input v-model="Activity.FinalHour" type="number" class="form-control" placeholder="">
                        </div>
                        <div class="col-2 modalInput">
                            <input v-model="Activity.FinalMin" type="number" class="form-control" placeholder="">
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
            <h1>{{ Activity.InitialTime }}</h1>
<h1>{{ Activity.FinalTime }}</h1>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-success" data-dismiss="modal" @click="addActivity">Guardar Actividad</button>
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
  name: 'HoursTable',
//   components: {
//       addActiviesModal
//   },
  data() {
    return {
        Activities: [],
        Activity: new Activity()
    };
  },
  mounted(){
      this.getActivities();
      //(24 + InitialHour)-(FinalHour+10);
      //alert((14);
  },
  methods: {
      getActivities() {
          axios.get('http://192.168.0.16:3000/Activities')
            .then(response => {
               this.Activities = response.data;
            })
            .catch(error => {
                console.log(error);
            })
      },
      addActivity() {
          
            const Activity = this.Activity;

            let hourDifference = this.calculateHours(Activity.InitialTime, Activity.FinalTime, Number(Activity.InitialHour), Number(Activity.FinalHour));
            let minDifference = this.calculateMinutes(Number(Activity.FinalMin), Number(Activity.InitialMin));

            if(Activity.InitialMin>Activity.FinalMin)
                hourDifference = hourDifference-1;

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
                this.getActivities();
            })
            .catch(function (error) {
                console.log(error);
            });

            $('#exampleModal').on('hidden.bs.modal', function (e) {
                $(this).find("input,textarea,select").val('').end()
            })

        },
        deleteActivity(activityID, activityIndex){
            axios.get('http://192.168.0.16:3000/delete/'+activityID)
            .then( response => {
                //this.Activities.splice(activityIndex, 1);
                console.log(response);
            })

        },
        calculateHours(InitialTime, FinalTime, InitialHour, FinalHour){
            if(InitialTime == 'AM' && FinalTime == 'AM'){
                if(FinalHour>InitialHour)
                    return FinalHour - InitialHour;
                else
                    return (24 + FinalHour) - InitialHour;
            }
             
            if(InitialTime == 'PM' && FinalTime == 'PM'){
                if(FinalHour<InitialHour)
                    return FinalHour;
                else
                    return 24 - InitialHour;
            }

            if(InitialTime == 'AM' && FinalTime == 'PM')
                return FinalHour - InitialHour;
            
           if(InitialTime == 'PM' && FinalTime == 'AM')
                return (24 - InitialHour) + FinalHour; 
        },
        calculateMinutes(FinalMin, InitialMin){
            
            if(InitialMin>FinalMin){
                return (60+FinalMin)-InitialMin;
            } 
            else
                return FinalMin-InitialMin;
        },
  }
}
</script>

<style>
table {
    text-align: center;
}

#hoursTable{
    width: 100%;
}

#hoursTable td{
border: 1px solid #ddd;
padding: 8px;
}

#hoursTable th{
border: 1px solid #ddd;
padding: 8px;
}
#hoursTable tr:nth-child(even){background-color: #f2f2f2;}
#hoursTable .innerCells:hover {background-color: #ddd;}

.modalInput {
    padding-right: 0px;
}
</style>