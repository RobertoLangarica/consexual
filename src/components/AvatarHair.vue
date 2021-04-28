<template>
    <div>
        <background :vertical="vertical" :color="color"/>
        <h1>{{title}}</h1>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Background, { useBackground } from '@/components/Background.vue'

export default defineComponent({
    name:'AvatarHair',
    components:{ Background},
    props:{
        title:{type:String, required:false, default:'Cabello'},
        activity:{type:Object, required:false, default:()=>({})}
    },
    setup(props){
        const vertical = computed(()=>props.activity.params.background_vertical)
        const color = computed(()=>props.activity.params.background_color)
       return {...useBackground(props), vertical, color}
    }
})
</script>


