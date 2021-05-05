<template>
    <div class="selector">
        <div class="item" v-for="(item,index) in items" :key="item.key || index">
            <component :is="item_component" class="contain" v-bind="item" @click="onItemClick(item)"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        items:{type:Array, required:false, default:()=>[]},
        item_component:{required:false, default:'div'}
    },
    emits:['select'],
    setup(props, {emit}) {
        const onItemClick = (item)=>{
            emit('select', item)
        }

        return {onItemClick}
    },
})
</script>


<style scoped>
    .selector{
        display: flex;
        height:100%;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: center;
        overflow-y: auto;
        padding-bottom: 116px;
    }

    .item{
        width:50%; 
        min-height:78px; 
        padding: 10px; 
        box-sizing: border-box;
    }
    .item:hover{
        transform: scale(1.2);
    }
    .item:active{
        transform: scale(.8);
    }

    .contain{
        width:100%;
        height:100%;
    }
</style>