import {  toastController } from '@ionic/vue';

export function imageUrl(imageUrl:string,baseUrl:string = ""){
    if (imageUrl?.startsWith("https://") || imageUrl?.startsWith("http://") ){
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

export function getAvatarLetter(name: string): string {
    if (!name) return '?'; // Default placeholder
  
    const words = name.trim().split(' ');
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return words[0][0].toUpperCase();
  }

  export function getGreetingMessage() {
    const hours = new Date().getHours();
    if (hours < 12) {
        return "Good Morning!";
    } else if (hours < 18) {
        return "Good Afternoon!";
    } else {
        return "Good Evening!";
    }
}

export function stripHtmlTags(text:string) {
    return text.replace(/<[^>]*>/g, '');
}


 