<template>
    <div class="background" >
        <div :vertical="vertical">
            <div class="color-big" :style="`background-color:${color}`" :vertical="vertical"/>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name:'Background',
    props:{
        vertical:{type:Boolean, required:false, default: false},
        color:{type:String, required:false, default: 'black'}
    }
})

export const useBackground = (props: any)=>{
    const color = computed(()=>props.background_color || 'black')
    const vertical = computed(()=>!!props.background_vertical)

    return {color, vertical}
}

</script>

<style scoped>
.background{
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    z-index: -1;
    background-color: white;
}

.background > div:first-of-type {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.background div:first-of-type[vertical="true"] {
    flex-direction: column;
}

.color-big{
    border-style: solid;
    border-color: grey;
}

.color-big[vertical="false"]{
    height: 200%;
    width: 65%;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    border-width: 20px 20px 20px 0px;
    transform: translate(0,-25%);
}

.color-big[vertical="true"]{
    width: 200%;
    height: 75%;
    border-width: 0px 20px 20px 20px;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    transform: translate(-25%,0);
}

</style>