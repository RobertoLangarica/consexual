<template>
    <div>
        <span>imagen</span>
        <h3>
            {{instruction}}
        </h3>
       <ion-button @click="next">next</ion-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonButton } from '@ionic/vue';
// @ts-ignore
import eventHub from '@/eventHub'

export default defineComponent({
    components:{IonButton},
    props:{
        instruction:{type:String, required:false, default:'Excercise instructions'}
    },
    methods:{
        next(){
            eventHub.$emit(eventHub.events.NEXT)
        }
    }
})
</script>
