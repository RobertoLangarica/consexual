import firebase from '@/firebase'
import { Plugins, FilesystemDirectory, ReaddirResult, Capacitor, FileWriteOptions, FileReadOptions } from '@capacitor/core'
const { Filesystem } = Plugins

const fileWrite = async  (path: string, dataToWrite: string, encoding?: string)=>{
    try {
        const options: FileWriteOptions = Object.assign({
            path: path,
            data:dataToWrite,
            directory: FilesystemDirectory.Data
        }, (encoding ? { encoding }:{}) as any)

        const result = await Filesystem.writeFile(options)
        return result
    } catch(e) {
        throw new Error(`Unable to write file ${e}`)
    }
}
  
const fileRead = async  (path: string,  encoding?: string)=>{
    const options: FileReadOptions = Object.assign({
        path: path,
        directory: FilesystemDirectory.Data
    }, (encoding ? { encoding }:{}) as any)

    return Filesystem.readFile(options);
}
  
const fileDelete = async  (path: string)=>{
    return Filesystem.deleteFile({
        path: path,
        directory: FilesystemDirectory.Data
    });
}

const mkdir = async(name: string)=>{
    try {
        return await Filesystem.mkdir({
          path: name,
          directory: FilesystemDirectory.Data,
          recursive: false // like mkdir -p
        });
      } catch(e) {
        throw new Error(`Unable to make directory e`)
      }
}

const rmdir = async(name: string)=>{
    try {
      return await Filesystem.rmdir({
        path: name,
        directory: FilesystemDirectory.Data,
        recursive: false,
      });
    } catch(e) {
      console.error('Unable to remove directory', e);
    }
  }

  
const getFileUri = async (path: string)=>{
    if(Capacitor.getPlatform() === 'web'){
        // Web uses download url's
        return firebase.storage().child(path).getDownloadURL()
    }

    return Filesystem.getUri({
        directory:FilesystemDirectory.Data,
        path
    })
}
const existsFile = async (path: string): Promise<boolean> => {
    const result = await Filesystem.stat({path:path,directory: FilesystemDirectory.Data})
    return !!result
}

const syncRemoteFile= async (path: string)=>{
    if(Capacitor.getPlatform() === 'web'){
        //Web doesn't sync anything
        return 
    }

    if((await existsFile(path))){
        // Existing file
        return 
    }

    const url = await firebase.storage().child(path).getDownloadURL()

    return new Promise<void>((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = async (event)=>{
            const blob = xhr.response;
            // save on local file system
            try{
                await fileWrite(path, blob)
                resolve()
            }catch(e){
                reject(e)
            }
        };
        xhr.onerror = reject
        xhr.open('GET', url);
        xhr.send();
    })

}

const initFolders = (...foldersNames: string[])=>{
    if(Capacitor.getPlatform() === 'web'){
        // Web has no filesystem implementation
        return Promise.resolve()
    }

    return new Promise<void>((resolve, reject)=>{
        Promise.all(foldersNames.map(folder=>{
            return Filesystem.readdir({path:folder, directory:FilesystemDirectory.Data})
        }))
        .then((results: ReaddirResult[])=>{
            const creating: Promise<any>[] = []
            results.forEach((result: ReaddirResult, index: number)=>{
                if(!result){
                    creating.push(mkdir(foldersNames[index]))
                }
            })

            return Promise.all(creating)
        })
        .then(_=>resolve())
        .catch(e=>{
            console.log(e)
            reject(e)
        }
        )
    })
}

export default { initFolders, fileRead, fileWrite, fileDelete, mkdir, rmdir, getFileUri, syncRemoteFile }
