<template>
    <v-container>
       <v-row >
         <v-col class="pa-0 col-md-5 col-sm-12">
           <task-list title="Today" :listtype="typelocal" ></task-list>
         </v-col>
         <v-col class="pa-0 col-md-5 col-sm-12">
           <task-list title="Global" :listtype="typeglobal" ></task-list>
         </v-col>
       </v-row> 
    </v-container>

</template>

<script>
import TaskList from '../components/TaskList';
import Task from '@/Task';

export default {
  components: {
    TaskList,
  },

  data() {
    return {

    }
  },
  
  computed:{
    typelocal: () => Task.TASK_LOCAL,
    typeglobal: () => Task.TASK_GLOBAL,

  },

  methods:{

  }
};
</script>
