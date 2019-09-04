import {uuid} from './utils'

export default class Task {

    static get TASK_LOCAL (){
         return 1   
    }
    static get TASK_GLOBAL (){
        return 2   
    }

    constructor(name, type) {
        this.id = uuid()
        this.name = name
        this.type = type
        this.done = 0;
    }


}