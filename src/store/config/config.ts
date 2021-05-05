import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { IGlobalState } from '../store'
import persistent from '@/cache/persistent'
import { useStore } from '../compositionUtils'
import { computed } from '@vue/runtime-core'

export enum ELanguage{
    SPANISH = 'es',
    WIXARIKA = 'wx'
}

export interface IConfigState{
    language: ELanguage;
}

const state: IConfigState = {
    language: ELanguage.SPANISH
}

const get = (name: string)=>persistent.get(`config/${name}`)
const set = (name: string, value: any)=>persistent.set(`config/${name}`, value)

const mutations: MutationTree<IConfigState> = {
    language(state, value: ELanguage){
        state.language = value
        set('language',value)
    }
}

const getters: GetterTree<IConfigState, IGlobalState> = {
    language(state){
        return state.language
    }
}

const actions: ActionTree<IConfigState, IGlobalState> = {
    async init({commit}){
        // Reading from the persistent sotrage
        const language = await get('language')
        commit('language',language || ELanguage.SPANISH)
    }
}

const useConfig = ()=>{
    const store = useStore()
    return {
        language: computed({
            get:()=> store.getters['config/language'],
            set: val => store.commit('config/language', val)
        }),
    }
}

const useLanguage = ()=>{
    const store = useStore()
    return {
        language: computed({
            get:()=> store.getters['config/language'],
            set: val => {
                if(val !== 'es' && val !== 'wx'){
                    throw new Error('Unknown language')
                }
                store.commit('config/language', val)

            }
        }),
    }
}

export { useConfig, useLanguage }
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
  }