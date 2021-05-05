<template>
    <div>
        {{language}}
        {{name2}}
        <ul>
            <li v-for="item in tests" :key="item.id">
                {{item}}
            </li>
        </ul>
        <ul>
            <li v-for="item in examples" :key="item.id">
                {{item}}
            </li>
        </ul>
        <ion-grid>
            <ion-row class="ion-margin-top">
                <label class="ion-margin-end">ID</label>
                <input v-model="id"/>
            </ion-row>
            <ion-row class="ion-margin-top">
                <label class="ion-margin-end">Name</label>
                <input v-model="name"/>
            </ion-row>
            <ion-row class="ion-margin-top">
                <label class="ion-margin-end">Prop</label>
                <input v-model="prop_name"/>
                <span class="ion-margin-horizontal">-</span>
                <input v-model="prop_value"/>
            </ion-row>
            <ion-row class="ion-padding ion-justify-content-center">
                <ion-button color="primary" @click="add(getEdition())">New</ion-button>
                <ion-button color="secondary" @click="edit(getEdition())">Edit</ion-button>
                <ion-button color="warning" @click="replace(getEdition())">Replace</ion-button>
                <ion-button color="danger" @click="remove(id)">Delete</ion-button>
                <ion-button color="danger" @click="language='regterg'">Delete</ion-button>
            </ion-row>
        </ion-grid>
    </div>
</template>

<script lang="ts">
import { useCollection, useConfig, useStore } from '@/store'
import { defineComponent, inject, provide, ref, watch, watchEffect } from 'vue'
import { IonGrid, IonRow, IonButton } from '@ionic/vue'
import { useLanguage } from '@/store/config/config'

export default defineComponent({
    components:{IonGrid, IonRow, IonButton},
    setup() {
        const name = ref('')
        const id = ref('')
        const prop_name = ref('')
        const prop_value = ref('')
        const getEdition = ()=>Object.assign({id:id.value},name.value ? {name:name.value}:{} ,prop_name.value ? {[prop_name.value]:prop_value.value}:{})
         
        return {name, id, prop_name, prop_value, getEdition, ...useCollection('tests'), ...useLanguage()}
    },
    computed:{
        examples(){
            return this.$store.state.examples.list
        }
    }
})


// export default defineComponent({
//    components:{IonGrid, IonRow, IonButton},
//    data(){
//        return {
//            name: '',
//            id: '',
//            prop_name: '',
//            prop_value: '',
//        }
//    },
//    computed:{
//        tests(): any[]{
//            return this.$store.state.tests.list
//        },
//        language(){
//            return this.$store.state.config.language
//        }
//    },
//    methods:{
//        getEdition(){
//            return Object.assign({id:this.id},this.name ? {name:this.name}:{} ,this.prop_name ? {[this.prop_name]:this.prop_value}:{})
//        },
//        add(document: any){
//            this.$store.dispatch('tests/add', document)
//        },
//        edit(partial: any){
//            this.$store.dispatch('tests/edit', partial)
//        },
//        replace(document: any){
//            this.$store.dispatch('tests/replace', document)
//        },
//        remove(id: string){
//            this.$store.dispatch('tests/remove', id)
//        },
//    }
// })
</script>

