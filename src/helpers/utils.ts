import {  toastController } from '@ionic/vue';

export function imageUrl(imageUrl:string,baseUrl:string = ""){
    if (imageUrl.startsWith("https://") || imageUrl.startsWith("http://") ){
        return imageUrl;
    }
    if (baseUrl!=""){
        return baseUrl + imageUrl;
    }
    
    const strCurrentProperty = window.storageService.getItem("current_property")
    if(strCurrentProperty){
        const property = JSON.parse(strCurrentProperty)
        return property.api_url + imageUrl
    }
}

export async function showWarning(message:string){
    const toast = await toastController.create({
        message: message,
        duration: 5000,
        position: "top",
        swipeGesture:"vertical",
        color: "warning"
    });
    toast.present();
}