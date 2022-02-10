import getCookie from "./getCookie";

//Function to delete cookies (By: ACP on 'https://stackoverflow.com/questions/2144386/how-to-delete-a-cookie')
export default function deleteCookie(name) {
  if (getCookie(name)) {
    document.cookie = name + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}
