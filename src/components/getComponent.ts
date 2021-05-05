import Welcome from '@/views/Welcome.vue'
import Instructions from '@/components/Instructions.vue'
import AvatarHair from '@/components/Avatar/AvatarHair.vue'
import RemoteImage from '@/components/RemoteImage.vue'

export const registerComponents = (app: any)=>{
    return new Promise<void>(resolve=>{
        // Components available without import
        app.component('remote-image',RemoteImage)
        resolve()
    })
}

export default (name: string)=>{
    switch(name){
        case 'instructions':
            return Instructions
        case 'welcome':
            return Welcome
        case 'avatar_hair':
        case 'avatar_face':
            return AvatarHair
    }

    throw new Error(`Unrecognized component: ${name}`)
}