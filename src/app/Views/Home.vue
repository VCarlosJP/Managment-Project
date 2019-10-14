<template>

<div class="container-fluid">
    <div class="row">

        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Existing Camps</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item" v-for="(existingCamp, index) in existingCamps">
                <a class="nav-link" href="#" @click="selectCamp(existingCamp.campName, index)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  {{ existingCamp.campName }}
                </a>
              </li>

            </ul>
          </div>
        </nav>

        <div v-if="displayWellsList" class="col-md-2" style="background: #f3f3f3;">
            <div class="wellsContainer">
                <div class="row" style="margin: 10px;">
                    <input class="form-control" type="text" placeholder="Type for Searching...">
                </div>
                <div class="row">
                    <ul style="list-style: none;">
                        <li class="marginList" v-for="well in wells">
                            <a class="wellsList" @click="selectWell(well)">
                                <i class="fas fa-box-open marginIcons"></i>
                                {{ well }}
                            </a>
                        </li>                        
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="displayActionsList" class="col" style="background: #f3f3f3;">

            <h2 style="margin-top:20px;">{{ selectedCamp }} > {{ selectedWell }}</h2>

            <div class="activitiesContainer">

                <ul class="nav navTab" style="justify-content: center; font-color:red;">
                    <li class="nav-item navTabActive">
                        <a class="nav-link" style="color:black;" href="#">Drill</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="color:black;" href="#">Intervention</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <div class="item" v-for="action in actions1">
                        <div class="icon-box-secondary mr-3 ml-5">
                            <i class="fas fa-file-pdf" style="color:white; padding-top: 16px;"></i>
                        </div>
                        <h5 @click="goToAction(action)">{{ action }}</h5>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="item" v-for="action in actions2">
                        <div class="icon-box-secondary mr-3 ml-5">
                            <i class="fas fa-file-pdf" style="color:white; padding-top: 16px;"></i>
                        </div>
                        <h5 @click="goToAction(action)">{{ action }}</h5>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="item" v-for="action in actions3">
                        <div class="icon-box-secondary mr-3 ml-5">
                            <i class="fas fa-file-pdf" style="color:white; padding-top: 16px;"></i>
                        </div>
                        <h5 @click="goToAction(action)">{{ action }}</h5>
                    </div>
                </div>

            </div>

        </div>

    
    </div> 
    
</div>


</template>

<script>
import axios from 'axios';

export default {
    name: 'Home',
    data(){
        return{
            existingCamps: [],
            wells:[],
            actions: [],
            displayWellsList: false,
            displayActionsList: false,
            //Variables for send and display data
            selectedCamp: '',
            selectedWell:'',
            actions1: ['Actividades', 'Plan de Pozo', 'Materiales'],
            actions2: ['Perfil de Pozo', 'Minutas', 'Herramientas',],
            actions3: ['Hoja de Vida', 'Personal', 'Litologia']
        }
    },
    created(){
        this.getCamps();
    },
    methods: {
        selectCamp(camp, index){
            this.selectedCamp = camp;
            this.displayWellsList = true;
            this.selectedWell = '';

            this.wells = this.existingCamps[index].wells;
            console.log(this.wells);
        },
        selectWell(well){
            this.selectedWell = well;
            this.displayActionsList = true;
        },
        getCamps(){
             axios.get('http://localhost:3000/camps/')
            .then(response => {
               this.existingCamps = response.data;
            })
            .catch(error => {
                console.log(error);
            })
        },
        goToAction(action){
            this.$router.push({ name: action, params: { camp: this.selectedCamp, well: this.selectedWell} });
        }
    }
}
</script>

<style>

.wellsContainer {
    background: rgb(247, 247, 247);
    height: 200px;
    margin-top: 20px;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.219);
    height: 500px;
    max-height: 500px;
    overflow-y:scroll;
    overflow:hidden;
}

.item {
  flex: 0 100%;
  height: 100px;
  border-right: 1px solid rgb(231, 234, 237);
  border-bottom: 1px solid rgb(231, 234, 237);

    display: flex;
  align-items: center;
  
  
}

.icon-box-secondary {
    width: 2.812rem;
    height: 2.812rem;
    border-radius: 5px;
    line-height: 2.812rem;
    text-align: center;
    background: #686868;
}

.activitiesContainer {
    background: white;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(231, 234, 237);
    height: 341px;
}

.navTab {
    border-bottom: 1px solid rgb(231, 234, 237);
}

.navTabActive {
    border-bottom: 3px solid #5646ff;
}
/*
.action{
    background-color: rgb(156, 156, 156);
    border-style: solid;
    border-width: 1px;
    border-color: rgba(46, 46, 46, 0.219);
    width: 200px;
    height: 300px; 
} */

.wellsList {
    font-weight: 500;
    color: #333;
    cursor: pointer;
}

.marginList{
    margin: 8px 0;
}

.marginIcons{
    margin-right: 8px;
    color: #999;
}


.sidebar {
    position: inherit;
    top: 0;
    bottom: 0;
    left: 0;
    /* z-index: 100; */
    padding: 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
    position: sticky;
    top: 48px;
    height: calc(100vh - 80px);


}

.sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
}

.nav-link {
    display: block;
    padding: .5rem 1rem;
}

.sidebar .nav-link {
    font-weight: 500;
    color: #333;
}

body {
    font-size: .875rem;
    background: #f3f3f3;;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",
}

.sidebar .nav-link .feather {
    margin-right: 4px;
    color: #999;
}

.sidebar .nav-link:hover .feather, .sidebar .nav-link.active .feather {
    color: inherit;
}

.feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
}


</style>