<template>
    <ion-page>
        <ion-content>
            <div>
            <ion-nav ref="nav" :swipe-gesture="allowBack"/>
            </div>
            <hud v-if="allowControls"/>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { useActivities, useConfig } from '@/store'
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, provide, ref, watch, watchEffect } from 'vue'
import { IonPage, IonContent, IonNav } from '@ionic/vue'
import getComponent from '@/components/getComponent'
// @ts-ignore
import eventHub from '@/eventHub'
import HUD from '@/components/HUD.vue'
import { setTextsByLanguage, sortActivities } from '@/store/activities/activities'

export default defineComponent({
    name:"Excercises",
    components:{ IonPage, IonContent, IonNav, hud:HUD },
    setup() {
        const nav = ref<any|null>(null)
        const activities = ref<any[]>([])
        let currentIndex = -1; 
        const currentActivity = ref<any|null>(null)
        const ready = computed(()=>!!currentActivity.value)
        const {language} = useConfig()
        const {activities:raw_activities} = useActivities()
        const allowControls = ref(false)
        const allowBack = ref(false)

        const refrehsActivityValues=(activity: any)=>{
            allowControls.value = activity.allowControls
            allowBack.value = activity.controls.allowBack
        }

        const next = async ()=>{
            if(currentIndex + 1 >= activities.value.length){
                // Final reached
                console.log('FINAL')
            } else {
                // TODO: Expose the result from the currentActivity before changing
                allowControls.value = false
                await nextTick()
                currentActivity.value = activities.value[++currentIndex];
                refrehsActivityValues(currentActivity.value)
                nav.value!.$el.push(getComponent(currentActivity.value.type),Object.assign({activity:currentActivity.value},currentActivity.value.params))
            }
        }

        const prev = async ()=>{
            if(currentIndex - 1 < 0){
                // Start reached
                console.log('START')
            } else {
                // TODO: Expose the result from the currentActivity before changing
                allowControls.value = false
                await nextTick()
                currentActivity.value = activities.value[--currentIndex];
                await nextTick()
                refrehsActivityValues(currentActivity.value)
                nav.value!.$el.pop()
            }
        }
        const stop = watch([raw_activities.value,nav], ([list,value]: any[])=>{
            if(list.length && value.$el){
                activities.value = setTextsByLanguage(sortActivities(list), language.value)
                next()
                stop()
            }
        })

        onMounted(()=>{eventHub.$on(eventHub.events.NEXT, next)})
        onMounted(()=>eventHub.$on(eventHub.events.PREV, prev))
        onBeforeUnmount(()=>{
            eventHub.$off(eventHub.events.NEXT, next)
            eventHub.$off(eventHub.events.PREV, prev)
            })

        provide('activity', currentActivity)
        return {activities, ready, currentActivity, nav, allowControls, allowBack}
    },
})
</script>
