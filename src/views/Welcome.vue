<template>
    <ion-page>
        <ion-content>
            <h1>Hola</h1>
            <h5>Elige un lenguaje</h5>
            <label for="wx">
                <input type="checkbox" name="wx"/>
                Wixarika
            </label>
            <label for="sp">
                <input type="checkbox" name="sp"/>
                Español
            </label>
            <ion-button router-link="/instructions">Next</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage, IonContent, IonButton } from '@ionic/vue';

export default defineComponent({
    name:"welcome",
    components:{ IonPage, IonContent, IonButton },
    setup() {
        return {}
    },
})
</script>
