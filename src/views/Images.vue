<template>
    <ion-page>
        <ion-content>
            <remote-image src="Screen Shot 2021-04-28 at 22.18.30.png" style="width:78px; height:78px;"/>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import RemoteImage from '@/components/RemoteImage.vue'

export default defineComponent({
    components: { IonContent, IonPage, RemoteImage },
})
</script>
