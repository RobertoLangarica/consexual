<template>
    <ion-page>
        <ion-content>
            <p>
                Texto de instrucciones
            </p>
            <ion-button router-link="/excercises">Next</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage, IonContent, IonButton } from '@ionic/vue';

export default defineComponent({
    components:{ IonPage, IonContent, IonButton },
    setup() {
        return {}
    },
})
</script>
