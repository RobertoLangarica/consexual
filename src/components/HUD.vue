<template>
    <ion-button v-if="allowBack" class="middle-left" @click="prev()">Prev</ion-button>
    <ion-button class="middle-right" @click="next()">Next</ion-button>
    <div class="bottom-right">
        <div class="container ion-padding">
            <character-hint v-if="showHint" tooltip-position="top-left"/>
            <sound-control class="ion-padding-start"/>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { IonButton } from '@ionic/vue';
// @ts-ignore
import eventHub from '@/eventHub'
import CharacterHint from '@/components/CharacterHint.vue'
import SoundControl from '@/components/SoundControl.vue'

export default defineComponent({
    name:'HUD',
    components:{ IonButton, CharacterHint, SoundControl },
    setup(){
        const next=()=>eventHub.$emit(eventHub.events.NEXT)
        const prev=()=>eventHub.$emit(eventHub.events.PREV)
        const activity = inject<any>('activity')
        const allowBack = computed(()=>activity.value.controls.allowBack)
        const showHint = computed(()=>!!activity.value.controls.hint)
        
        return { next, prev, allowBack, showHint }
    },
})
</script>

<style scoped>
    .middle-right{
        position: fixed;
        top:50%;
        right: 0%;
    }
    .middle-left{
        position: fixed;
        top:50%;
        left: 0%;
    }
    .middle{
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .bottom-right{
        position: fixed;
        bottom:0%;
        right: 0%;
    }
    .container {
        display: flex;
        justify-content: flex-end;
    }
</style>