import { store } from './store'
import { key, useStore } from './compositionUtils'
import { useCollection } from './basic_collection'
import { useConfig } from './config/config'

const useActivities = ()=>useCollection('activities') 
export { key, useStore, useCollection, useConfig, useActivities }
export default store