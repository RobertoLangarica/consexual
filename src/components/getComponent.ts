import Welcome from '@/views/Welcome.vue'
import Instructions from '@/components/Instructions.vue'
import AvatarHair from '@/components/AvatarHair.vue'

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