//Get and read cookie function (by Mac on "https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript")
export default function getCookie(name) {
  const cookieValue =
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
  return cookieValue;
}
