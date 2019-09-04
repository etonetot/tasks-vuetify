import Vue from 'vue'
import Vuex from 'vuex'
import Task from '@/Task'
import {defaultTasks} from '@/utils'

Vue.use(Vuex)


const savePlugin = store => {
  // вызывается после инициализации хранилища

  store.state.tasks = JSON.parse( localStorage.getItem('TASKS_VUETIFY') ) || [];
  store.state.stdTasks = JSON.parse( localStorage.getItem('STDTASKS_VUETIFY') ) || defaultTasks;

  store.subscribe((mutation, state) => {
    // вызывается после каждой мутации
    // мутация передаётся в формате `{ type, payload }`.
    if ( ['addTask','delTask', 'moveTask', 'doTask', 'addStdTasks' ].includes(mutation.type) )
      localStorage.setItem('TASKS_VUETIFY', JSON.stringify ( state.tasks ));

    if ( ['addStdTask','delStdTask', 'moveStdTask' ].includes(mutation.type) )
      localStorage.setItem('STDTASKS_VUETIFY', JSON.stringify ( state.stdTasks ));

  });
};



export default new Vuex.Store({
  plugins: [ savePlugin ],
  state: {
    tasks: [],
    stdTasks: [],
  },
  getters: {
    gettasks: state => listtype => state.tasks.filter(item => item.type==listtype),
    getStdTasks: state => state.stdTasks,
  },
  mutations: {
    addTask(state, {name, type}){
      state.tasks.push( new Task(name, type) )
    },

    delTask(state, {id}) {
      const ind = state.tasks.findIndex( item => item.id===id )
      if (ind>=0)
        state.tasks.splice(ind, 1);
    },

    doTask(state, {id}) {
      const task = state.tasks.find( item => item.id===id )
      if (!task) 
        return;
      task.done += 50;
      if (task.done>100)
        task.done = 0;
    },

    addStdTasks(state, {type}) {
      state.stdTasks.forEach(item => {
        if ( !state.tasks.find(task => task.type==type && task.name==item) )
          state.tasks.push( new Task(item, type) )
      })  
    },

    moveTask(state, {idFrom, idTo, typeTo}) {
      const taskFrom = state.tasks.find( item => item.id===idFrom )
      const indFrom = state.tasks.findIndex( item => item.id===idFrom )
      if (!taskFrom || indFrom < 0)
        return;

      const taskTo = idTo? state.tasks.find( item => item.id===idTo ) : null;
      const indTo = idTo? state.tasks.findIndex( item => item.id===idTo ) : null;
      
      taskFrom.type = taskTo ? taskTo.type : typeTo;  
      state.tasks.splice(indFrom, 1);  

      if (taskTo)
        state.tasks.splice(indTo, 0, taskFrom);  
      else
        state.tasks.push(taskFrom)

    },  

    


    // STD TASKS
    addStdTask(state, name){
      state.stdTasks.push( name )
    },

    delStdTask(state, i) {
        state.stdTasks.splice(i, 1);
    },

    moveStdTask(state, {iFrom, iTo}) {
      const taskFrom = state.stdTasks.splice(iFrom, 1);  

      if (iTo>=0)
        state.stdTasks.splice(iTo, 0, ...taskFrom);  
      else
        state.stdTasks.push(...taskFrom)

    },  

    
  },
  actions: {
    //addTask({commit}, name, type){

    
   

  }
})
