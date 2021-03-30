import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { IGlobalState } from '../store'
import persistent from '@/cache/persistent'

export enum ELanguage{
    NONE = 0,
    SPANISH,
    WIXARIKA
}

export interface IConfigState{
    language: ELanguage;
}

const state: IConfigState = {
    language: ELanguage.NONE
}

const get = (name: string)=>persistent.get(`config/${name}`)
const set = (name: string, value: any)=>persistent.set(`config/${name}`, value)

const mutations: MutationTree<IConfigState> = {
    language(state, value: ELanguage|number){
        state.language = value
        set('language',value)
    }
}

const getters: GetterTree<IConfigState, IGlobalState> = {
    language(state){
        if(state.language === ELanguage.NONE){
            return ELanguage.SPANISH
        }

        return state.language
    }
}

const actions: ActionTree<IConfigState, IGlobalState> = {
    async initFromPersistentData({commit}){
        const language = await get('language')
        commit('language',language || ELanguage.NONE)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
  }