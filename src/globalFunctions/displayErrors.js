//Function to display the div error with the specified erros passed through params
export default function displayError(errorCode, errno, customError) {
  let errorDiv = document.querySelector(".error-popup");
  let errorDivP = document.querySelector("#error-text");
  errorDiv.classList.add("error-active");

  if (customError) {
    errorDivP.innerText = `Erro: ${customError}`;
    setTimeout(function () {
      errorDiv.classList.remove("error-active");
    }, 4000);
    return;
  }

  const displayErrorCode = () => {
    if (errorCode && errorCode !== "") {
      return `(${errorCode})`;
    }
    return "";
  };

  errorDivP.innerText = `Erro: Ocorreu um erro interno do servidor. Código: ${errno} ${displayErrorCode()}`;
}
