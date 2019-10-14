<template>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-4 filesContainer">
            <div class="file" v-for="uploadedFile in uploadedFiles" @click="selectDocument(uploadedFile.name)">
                <h4 class="ml-5" style="padding-top: 28px;">{{ uploadedFile.name }}</h4>
                <p class="ml-5"><b>Created: </b>{{ uploadedFile.dateCreated }}</p>
            </div>
        </div>

        <div class="col">

            <div v-if="selectedFile">
                <embed v-bind:src="pdfURL" type="application/pdf" width="100%" height="600px" />
            </div>
            
            <div v-else>
                <form @submit.prevent="sendFile" enctype="multipart/form-data">  
                              
                        <input type="file" ref="file" @change="selectFile">
                        <button>Upload</button>

                </form>
            </div>




        </div>
    </div>
</div>

</template>

<script>

import axios from 'axios';

export default {
    name: 'FileReader',
    data(){
        return{
            file: "",
            url: 'http://localhost:3000/postMinuta/'+this.$route.params.camp+'/'+this.$route.params.well,
            uploadedFiles: [],
            selectedFile: false,
            pdfURL:''
        }
    },
    methods:{
        selectFile(){
            this.file = this.$refs.file.files[0];
        },
        sendFile(){
            const formData = new FormData();
            formData.append('file', this.file);
            axios.post(this.url, formData);
        },
        selectDocument(name){
            this.pdfURL = 'http://localhost:3000/Minuta/'+name;
            this.selectedFile = true;
        },
        getFiles(){
            var camp = this.$route.params.camp;
            var well = this.$route.params.well;

            axios.get('http://localhost:3000/Minutas/'+camp+'/'+well)
                .then(response => {
                this.uploadedFiles = response.data;
                console.log(this.uploadedFiles);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    created(){
        this.getFiles();
    }
}

</script>

<style>

.filesContainer{
    padding-right: 0px;
    padding-left: 0px;
    background:white;
    border-right: 1px solid rgb(231, 234, 237);
    height: calc(100vh - 56px);
    max-height: calc(100vh - 56px);
    overflow-y: auto;
}

.file{
    height: 100px;
    border-bottom: 1px solid rgb(231, 234, 237);
    width:100%;
}

</style>