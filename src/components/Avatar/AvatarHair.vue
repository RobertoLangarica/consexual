<template>
    <ion-content>
        <ion-grid class="ion-padding-vertical">
            <background :vertical="vertical" :color="color"/>
            <ion-row class="ion-justify-content-between">
                    <ion-col size="7" class="ion-justify-content-center">
                        <div class="main-content">
                            <h1 >{{title}}</h1>
                            <div class="big">
                                <remote-image src="Screen Shot 2021-05-01 at 20.55.47.png"/>
                            </div>
                            <h4>Cada parte de tu cuerpo te pertenece</h4>
                        </div>
                    </ion-col>
                    <ion-col size="4.2">
                        <body-part-selector :items="items" item_component="remote-image" @select="onSelected"/>
                    </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Background, { useBackground } from '@/components/Background.vue'
import RemoteImage from '@/components/RemoteImage.vue'
import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/vue'
import BodyPartSelector from './BodyPartSelector.vue'

export default defineComponent({
    name:'AvatarHair',
    components:{ Background, IonGrid, IonRow, IonCol, IonContent, RemoteImage, BodyPartSelector },
    props:{
        title:{type:String, required:false, default:'Cabello'},
        activity:{type:Object, required:false, default:()=>({})}
    },
    setup(props){
        const onSelected = (item: any)=>{
            console.log('Selected',item)
        }
        const items = []
        let i = 50
        while(i > 0){
            items.push({src:'Screen Shot 2021-04-28 at 22.18.30.png', id:i--})
        }

       return {...useBackground(props.activity.params), items, onSelected}
    }
})
</script>

<style scoped>
    ion-grid{
        height:100%;
    }
    ion-row{
        height:100%;
    }
    ion-col{
        max-height:100%;
    }
    
    .main-content{
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .main-content > .big{
        flex-grow: 7;
        margin-top: 3rem;
        margin-bottom: 3rem;
        display: flex;
        align-items: stretch;
    }
</style>


