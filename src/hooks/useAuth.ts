 
import { ref } from "vue";
import {handleErrorMessage} from "@/helpers/error-message"
import {  alertController } from '@ionic/vue';

const isAuthenticated = ref(false);  
const currentUser = ref()

export function useAuth() {
  async function verifySession() {
    const token = localStorage.getItem("auth_token");
    isAuthenticated.value = true;

  }

  
 async function login(data: any) {
    const postData = {
      property: data.property_code,
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
      return { data: null, error:  error };
    }
  }


  function logout() {
    localStorage.removeItem("auth_token");
    isAuthenticated.value = false;
  }

  function setCurrentLoginUser(data:any){
    currentUser.value =data;
  }

  
 async function checkPropertyCode(api_url, property_code:string) {
    
    try {
      const response = await fetch(api_url + "api/method/edoor.mobile_api.api.check_api_url?property_code=" + property_code, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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


  return { isAuthenticated, verifySession, logout,login,checkPropertyCode ,setCurrentLoginUser};
}
