 
import { ref } from "vue";
import {handleErrorMessage} from "@/helpers/error-message"
import {  alertController,useIonRouter,loadingController } from '@ionic/vue';
import { setFrappeAppUrl } from '@/services/api-service';
import { useApp } from "./useApp";
import {logoutApi} from "@/services/api-service"
const isAuthenticated = ref(false);  
const currentUser = ref()
import { useI18n } from 'vue-i18n';
 
 

// { myT, myOther }: { myT?: (key: string) => string, myOther?: any }
export function  useAuth(router:any = null,t:any=null) {
 
   const appCtrl = useApp()
 
 async function login(data: any) {
    const postData = {
      property: data.property_name,
      usr: data.username,
      pwd: data.password,
    };
  
    try {
      const response = await fetch(data.api_url + "api/method/edoor.mobile_api.api.login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
        mode: 'cors',
      });
  
      if (!response.ok) {
        const errorResponse = await response.json(); // Parse the error response
      const errorMessage = errorResponse.message || 'An error occurred';
        handleErrorMessage(errorResponse)
      throw new Error(errorMessage);
      }
  
      const result = await response.json();
      
      
    //   set current login user
      currentUser.value = result.message;
      isAuthenticated.value = true;
      appCtrl.currentWorkingDate.value = result.message.working_day.date_working_day;
      appCtrl.currentWorkingDay.value = result.message.working_day;
      window.storageService.setItem("current_user",JSON.stringify(currentUser.value));

      
      return { data: result.message, error: null };
    } catch (error) {
      return { data: null, error:  error };
    }
  }


  async function logout() {
    const loading = await loadingController.create({
      message: 'Logout...',
  });
  await loading.present();
    await logoutApi();
    window.storageService.removeItem("current_user");
    isAuthenticated.value = false;
    currentUser.value = {}
    await loading.dismiss();
    
  }

  function setCurrentLoginUser(data:any){
    currentUser.value =data;
  }

  
 async function checkPropertyCode(api_url:string, property_code:string) {
 

    try {
      const response = await fetch(api_url + "api/method/edoor.mobile_api.api.check_api_url?property_code=" + property_code, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      
      
      if (!response.ok) {
        const errorResponse = await response.json(); // Parse the error response
      const errorMessage = errorResponse.message || 'An error occurred';
        handleErrorMessage(errorResponse)
      throw new Error(errorMessage);
      }
  
      const result = await response.json();
    //   set current login user
      currentUser.value = result.message;
      isAuthenticated.value = true;

      return { data: result.message, error: null };
    } catch (error) {

        if (error?.toString().includes("Failed to parse URL from")) {
            const alert = await alertController.create({
                header: 'Invalid Server',
                message: `This property code contains an invalid server URL. Please contact your system administrator for assistance.`,
                buttons: ['OK'],
            });
            await alert.present();
        } 
      return { data: null, error:  error };
    }
  }

  async function checkUserLogin(){
    const loading = await loadingController.create({
      message: 'Loading...',
  });
  await loading.present();
    const strCurrentProperty = window.storageService.getItem("current_property")
    if(strCurrentProperty){
      const property = JSON.parse(strCurrentProperty);
  
      const strCurrentUser = window.storageService.getItem("current_user");
      if(strCurrentUser){
        const user = JSON.parse(strCurrentUser);

        currentUser.value = user;
         
        const checkResponse = await checkUserSession(property.api_url, JSON.stringify(atob(user.token)), property.property_name);
       
        if(checkResponse.data =="Guest"){
         
            // have session but server session is expired then show select workspace screen
            isAuthenticated.value = false;
            // remove user from localstore age
            window.storageService.removeItem("current_user");
            router.push('/select-workspance')
        }else {
          
         if(checkResponse.data){
          isAuthenticated.value = true;
          appCtrl.currentWorkingDate.value = checkResponse.data.working_day.date_working_day;
          appCtrl.currentWorkingDay.value = checkResponse.data.working_day;
          appCtrl.currentProperty.value = property;
          setFrappeAppUrl(property.api_url);
          
         }else {
          // session is expored 
          window.storageService.removeItem("current_user");
          isAuthenticated.value = false;
          router.push('/select-workspace')
         }
          
        }
        
      }
      await loading.dismiss();
    }else {
      isAuthenticated.value = false;
      await loading.dismiss();
    }
      
  }

 

  async function checkUserSession(api_url:string,token:string,property_name:string){
    try {
     
      const response = await fetch(api_url + "api/method/edoor.mobile_api.api.check_user_login?property=" + property_name, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token ' + token.replaceAll('"',""),  
        },
        mode: 'cors',
      });
 
    
      
      if (!response.ok) {

        
        const errorResponse = await response.json(); // Parse the error response
        
      const errorMessage = errorResponse.message || 'An error occurred';
        handleErrorMessage(errorResponse)
      throw new Error(errorMessage);
      }
  
      const result = await response.json();
    //   set current login user
 

      
      return { data: result.message, error: null };
    } catch (error) {
        if (error?.toString().includes("Failed to parse URL from")) {
            const alert = await alertController.create({
                header: 'Invalid Server',
                message: `This property code contains an invalid server URL. Please contact your system administrator for assistance.`,
                buttons: ['OK'],
            });
            await alert.present();

        } 
      return { data: null, error:  error };
    }

  }

  return { 
    isAuthenticated,
    checkUserLogin, 
    logout,
    login,
    checkPropertyCode ,
    setCurrentLoginUser,
    currentUser
  };
}
