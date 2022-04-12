//Send an error to the client as response
const sendError = (res, code, errno) => {
  if(res.headersSent) return;
  res.send({ isError: true, errorCode: code, errno: errno });
}

module.exports = sendError;
