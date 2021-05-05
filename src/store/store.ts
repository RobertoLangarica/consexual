import { createStore } from 'vuex'
import basicCollection, { IBasicCollection } from './basic_collection';
import config, { IConfigState } from "./config/config";
import activities from "./activities/activities";

export interface IGlobalState {
    config: IConfigState;
    activities: IBasicCollection;
}

const store = createStore<IGlobalState>({
    modules: {
        config, activities
    },
    actions:{
        init({ dispatch}){
            Object.keys((this as any)._modulesNamespaceMap).forEach(module=>{
                dispatch(`${module}init`)
            })
        }
    }
})

export {store}