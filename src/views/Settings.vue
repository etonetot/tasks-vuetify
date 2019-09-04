<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="8" md="6" lg="4" @drop.stop.prevent="onDropList" @dragover.prevent>
           <h2 class="text-center">Set standard tasks</h2> 
           <v-slide-y-transition group leave-absolute>
            <v-card v-for="(task, i) in tasks" :key="task" outlined color="" flat
                        class="d-flex flex-row pa-2 ma-2 align-center" draggable
                        @dragstart="onDragStart(i, $event)" 
                        @drop.stop.prevent="onDrop(i, $event)" @dragover.prevent
            >
                    <span class="text-no-wrap mr-1">{{i+1}}.</span>
                    <v-progress-linear :value="0" rounded color="blue-grey" height="25">
                        <template v-slot="{ value }">
                        <strong>{{ task }} </strong>
                        </template>
                    </v-progress-linear>             

                    <v-btn fab small dark class="ml-2" @click="delTask(i)" color="red"><v-icon small>fas fa-trash</v-icon></v-btn>  

            </v-card>

            <v-card class="d-flex flex-row pa-2 ma-2 align-top" outlined color="grey lighten-2"  flat :key="-1">
                <v-text-field id="editorNewTask" v-model="newTaskName" validate-on-blur :rules="[newTaskRules]" outlined 
                        @keyup.enter="addTask" label="New task" color="green"></v-text-field>

                <v-btn  @click="addTask" fab small class="ma-2"><v-icon small>fas fa-plus</v-icon></v-btn>  

            </v-card>  
           </v-slide-y-transition>

      </v-col>
    </v-row>
   </v-container> 
</template>


<script>
export default {
  components: {
  },

  data() {
    return {
      newTaskName: '',
    }
  },
  
  computed:{
    tasks() {
      return this.$store.getters.getStdTasks
    },

  },

  methods:{
    newTaskRules(value) {
        if (value.length<2) 
          return 'Name must be longer than 1';
        if (this.tasks.find( item => item==value) )
          return `${value} already exists`
        return true;
    },

    addTask() {
      if (this.newTaskRules(this.newTaskName) !== true)
        return;
      this.$store.commit('addStdTask', this.newTaskName )
      this.newTaskName = ''
    },
    delTask(i) {
      this.$store.commit('delStdTask', i )
    },
    onDragStart(i, event) {
        event.dataTransfer.setData('text/plain', i);
    },
    onDropList(){
        let iFrom = event.dataTransfer.getData('text/plain');
        this.$store.commit('moveStdTask', {iFrom} )
    },

    onDrop(iTo, event){
        let iFrom = event.dataTransfer.getData('text/plain');
        this.$store.commit('moveStdTask', {iFrom, iTo} )
    },


  }
}
</script>