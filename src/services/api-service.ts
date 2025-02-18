import { handleErrorMessage } from '@/helpers/error-message';
import { FrappeApp } from 'frappe-js-sdk';

let frappe: FrappeApp | null = null;

export function setFrappeAppUrl(url:string){
    
    frappe = new FrappeApp(url,{
        useToken: true,
        token: getToken,
        type: "token"
    });
 
}

function getToken(){
    const strCurrentUser = window.storageService.getItem("current_user");
    if(strCurrentUser){
        const userObject = JSON.parse(strCurrentUser);
        const token = JSON.stringify(atob(userObject.token))
       
        return token.replaceAll('"',"") 

        
    }
    return "" ;
   
}
export function logoutApi() {
    if (!frappe) {
        return { data: null, error: "Frappe is not defined" };
    }
    const auth = frappe.auth()
    return auth
  .logout()
  .then(() => (true))
  .catch(() => (false));
}

export function getDocList(DocType: string, param: any = null) {
    if (!frappe) {
        return { data: null, error: "Frappe is not defined" };
    }
    const db = frappe.db();
    return db.getDocList(DocType, param)
        .then((r: any) => ({ data: r, error: null }))
        .catch((error) => {
            handleErrorMessage(error);
            return { data: null, error }
        });
}




export function getApi(api_url: string, param: any = null) {
    if (!frappe) {
        return { data: null, error: "Frappe is not defined" };
    }
    const call = frappe.call();
      return call.get(api_url,param)
      .then((r: any) => ({ data: r.message, error: null }))
      .catch((error) => {
        handleErrorMessage(error);
        return { data: null, error }
    });
}

export function postApi(api_url: string, param: any = null) {
    if (!frappe) {
        return { data: null, error: "Frappe is not defined" };
    }
    const call = frappe.call();
      return call.post(api_url,param)
      .then((r: any) => ({ data: r.message, error: null }))
      .catch((error) => {
        handleErrorMessage(error);
        return { data: null, error }
    });
}

export function getDoc(DocType: string,DocName:string) {
    if (!frappe) {
        return { data: null, error: "Frappe is not defined" };
    }
    const db = frappe.db()

    return db.getDoc(DocType, DocName)
  .then((doc) =>({ data: doc, error: null }))
  .catch((error) => {
    handleErrorMessage(error);
    return { data: null, error }
  });
}

export async function uploadFile(
    docType:string, 
    docname:string,
    fieldname:string, 
    fileData:any,otherOption:any
) {
    if (!frappe) {
        return { data: null, error: "Frappe is not defined" };
    }

    const file = frappe.file();

    try {
        // Upload file to Frappe
        let formData = new FormData();

        const fileArgs = {
            "isPrivate": false,
            "folder":"home",
            /** File URL (optional) */
            "file_url": otherOption.file_url??"",
            "doctype": docType,
            "docname": docname,
            /** Field in the document **/
            "fieldname": fieldname
          }
        file.uploadFile(
            fileData,
            fileArgs,
            /** Progress Indicator callback function **/
            
            (completedBytes, totalBytes) => {
                if(totalBytes){
                    console.log(Math.round((completedBytes / totalBytes) * 100), " completed")
                }
                
            },
            "edoor.api.upload.upload_file"
        )
        .then(() => console.log("File Upload complete"))
        .catch(e => console.error(e))
         
       
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image.");
      }
}




