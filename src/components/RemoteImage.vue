<template>
    <div class="img-container">
        <ion-img class="img" v-if="uri" :src="uri" @ion-img-did-load="onLoaded"/>
        <ion-spinner v-if="!ready"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, ref } from 'vue'
import { IonSpinner, IonImg } from '@ionic/vue'
import filesync from '@/filesync'

export default defineComponent({
    components:{ IonSpinner, IonImg },
    props:{
        src:{type:String, required:true}
    },
    emits:['ready'],
    setup(props, {emit}){
        const ready = ref(false)
        const uri = ref('')
        const onLoaded = ()=>{
            nextTick(()=>{
                ready.value = true
                emit('ready')
            })
        }

        onBeforeMount(()=>{
            filesync.syncRemoteFile(props.src)
                .then(_=>filesync.getFileUri(props.src))
                .then(result=>{uri.value = result})
                .catch(e=>{throw new Error(e)})
        })
        
        return {ready, uri, onLoaded}
    }
})
</script>

<style scoped>
.img-container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
}
</style>