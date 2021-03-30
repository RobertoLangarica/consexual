import { createStore } from 'vuex'
import config, { IConfigState } from "./config/config";

export interface IGlobalState {
    config: IConfigState;
}

const store = createStore<IGlobalState>({
    modules: {
        config
    },
    actions:{
        initFromPersistentData({ dispatch}){
            Object.keys((this as any)._modulesNamespaceMap).forEach(module=>{
                dispatch(`${module}initFromPersistentData`)
            })
        }
    }
})

export {store}