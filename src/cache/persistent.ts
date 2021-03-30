import { Storage, StorageConfig } from '@ionic/storage'

export class LocalStorage {
    ready = false;
    storage: Storage;

    constructor(config?: StorageConfig){
        this.storage = new Storage(config)
    }

    isReady(){
        return new Promise(resolve=>{
            if(this.ready){
                resolve(true)
            }

            this.storage.create()
            .then(_=>{
                this.ready = true;
                resolve(true)
            })
        })
    }

    async init(){
        await this.storage.create()
    }

    get(key: string){
        return this.storage.get(key)
    }

    set(key: string, value: any){
        return this.storage.set(key, value)
    }

    async clear(){
        await this.storage.clear()
    }
}

export default new LocalStorage({name:'LocalData'})

