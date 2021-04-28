<template>
    <div class="tooltip" :style="`background-color:${color};`" :position="position">
        <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { close } from 'ionicons/icons';

export default defineComponent({
    name:'Tooltip',
    props:{
        color:{type:String, required:false, default:'#C2395D'},
        position:{type:String, required:false, default:'top-left'},
    },
    emits:['hide'],
    setup(props, { emit }){
        const hide = ()=>emit('hide')

        return {close, hide}
    }
})
</script>

<style scoped>
    .tooltip{
        border-radius: .25rem;
        padding: 1rem;
        text-align: center;
        position: fixed;
        width: auto;
        min-width: 50px;
        max-width: 120px;
    }

    .tooltip[position="top-left"]{
        transform: translate(-75%,-100%);
    }

    .tooltip[position="top-right"]{
        transform: translate(75%,-100%);
    }

    .round{
        border-radius: 50%;
    }
</style>
