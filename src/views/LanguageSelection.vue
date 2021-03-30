<template>
    <ion-page>
        <ion-content>
            {{language}}
            <ion-button @click="language = 2">click</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { IonContent, IonPage, IonButton } from '@ionic/vue'
import { defineComponent, computed, onMounted } from 'vue'
import persistent from '@/cache/persistent'

export default defineComponent({
    components:{IonContent, IonPage, IonButton},
    setup() {
        const store = useStore()

        onMounted(()=>{
            console.log('Language mounted')
            persistent.get('language')
        })
        return {
            language: computed({
                get:()=> store.getters['config/language'],
                set: val => store.commit('config/language', val)
            })
        }
    },
})
</script>
