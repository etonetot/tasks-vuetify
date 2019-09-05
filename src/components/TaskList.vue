<template>
    <div @drop.stop.prevent="onDropList" @dragover.prevent>
           <h2 class="text-center">{{title}}</h2> 
            <v-card class="ma-2" color="" flat >             
                <v-progress-linear :value="total" rounded color="blue-grey" height="35">
                    <template v-slot="{ value }">
                    <strong>Total Progress: {{ total }}% </strong>
                    </template>
                </v-progress-linear>             
            </v-card>

           <!-- <v-slide-y-transition group leave-absolute> -->
            <v-card v-for="(task, i) in tasks" :key="task.id" outlined color="" flat height="60"
                        class="d-flex flex-row pa-2 ma-2 align-center" draggable
                        @dragstart="onDragStart(task.id, $event)" 
                        @drop.stop.prevent="onDrop(task.id, $event)" @dragover.prevent
            >
              <span class="text-no-wrap mr-1">{{i+1}}.</span>

              <template v-if="editing != i">   

                <v-progress-linear :value="task.done" rounded color="blue-grey" height="30">
                    <template v-slot="{ value }">
                    <strong>{{ task.name }} </strong>
                    </template>
                </v-progress-linear> 

                <dial-menu-btn>
                    <v-btn fab small dark class="ml-2" @click="doTask(task.id)" color="green"><v-icon x-small>fas fa-play-circle</v-icon></v-btn>  
                    <v-btn fab small dark class="ml-2" @click="delTask(task.id)" color="red"><v-icon x-small>fas fa-trash</v-icon></v-btn>  
                    <v-btn fab small dark class="ml-2" @click="startEditTask(i, task)" color="" ><v-icon small>fas fa-edit</v-icon></v-btn>  
                </dial-menu-btn>
              
              </template>

              <template v-if="editing==i">   
                  <v-text-field v-model="task.name" validate-on-blur solo hide-details 
                      single-line  class="editTask"
                      @keyup.enter="endEditTask(task)" label="" color="green"></v-text-field>
                  <v-btn fab small dark class="ml-2" @click="endEditTask(i, task)" color=""><v-icon small>fas fa-check</v-icon></v-btn>  
              </template>

            </v-card>

            <v-card class="d-flex flex-row pa-2 ma-2 align-top" outlined color="grey lighten-2"  flat :key="-1">
                <v-text-field v-model="newTaskName" validate-on-blur :rules="[newTaskRules]" outlined 
                        @keyup.enter="addTask" label="New task" color="green"></v-text-field>
                <v-btn @click="addTask" fab small class="ma-2"><v-icon small>fas fa-plus</v-icon></v-btn>  
                <v-btn @click="addStdTasks" fab small class="ma-2"><v-icon >fas fa-folder-plus</v-icon></v-btn>  
            </v-card>  
           <!-- </v-slide-y-transition> -->

    </div>
</template>

<script>
import DialMenuBtn from '@/components/DialMenuBtn';

export default {
  components: {
    DialMenuBtn
  },

  props:{
    title: String,
    listtype: Number,
  },

  data() {
    return {
      newTaskName: '',
      editing: -1
    }
  },
  
  computed:{
    tasks() {
      return this.$store.getters.gettasks(this.listtype)
    },
    total() {
        if (!this.tasks.length)
            return 0;
        let sumTotal = this.tasks.reduce( (sum, task)=>{ return sum+task.done }, 0);
        sumTotal /= this.tasks.length;
        return sumTotal.toFixed(0);
    }, 
     
  },

  methods:{
    startEditTask(i, task) {
        this.editing = i;
    },
    endEditTask(i, task) {
        this.editing = -1;
    },

    newTaskRules(value) {
        if (value.length<2) 
          return 'Name must be longer than 1';
        if (this.tasks.find( item => item.name==value) )
          return `${value} already exists`
        return true;
    },

    addTask() {
      if (this.newTaskRules(this.newTaskName) !== true)
        return;
      this.$store.commit('addTask', {name: this.newTaskName, type: this.listtype} )
      this.newTaskName = ''
    },
    addStdTasks() {
      this.$store.commit('addStdTasks', {type: this.listtype} )
    },
    delTask(id) {
      this.$store.commit('delTask', {id} )
    },
    doTask(id) {
      this.$store.commit('doTask', {id} )
    },

    onDragStart(id, event) {
      event.dataTransfer.setData('text/plain', id);
        // event.target.style.opacity = .5;
    },

    onDropList(){
        let idFrom = event.dataTransfer.getData('text/plain');
        this.$store.commit('moveTask', {idFrom, typeTo: this.listtype} )
    },

    onDrop(idTo, event){
        let idFrom = event.dataTransfer.getData('text/plain');
        this.$store.commit('moveTask', {idFrom, idTo} )
    },

  }
};
</script>

<style>
</style>
