<template>
    <div>
        <transition name="fade">
            <tooltip v-if="show_tooltip" @hide="show_tooltip = false" :position="tooltipPosition">
                {{hint}}
            </tooltip>
        </transition>
        <img @click="toggleTooltip" />
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Tooltip from '@/components/Tooltip.vue'

export default defineComponent({
    name:'CharacterHint',
    props:{
        hint:{type:String, required:false, default:''},
        tooltipPosition:{type:String, required:false, default:'top-left'},
    },
    components:{Tooltip},
    setup(){
        const show_tooltip = ref(true)
        let ignoreAutoHideTooltip = false
        const toggleTooltip = ()=>{
            ignoreAutoHideTooltip = true
            show_tooltip.value = !show_tooltip.value
        }

        onMounted(()=>{
            setTimeout(()=>{
                if(!ignoreAutoHideTooltip){
                    show_tooltip.value = false
                }
            },3000)
        })
        return { show_tooltip, toggleTooltip }
    }
})
</script>


<style scoped>
img{
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color:#9D3E0D;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>