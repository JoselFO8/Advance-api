const handleHttpError = (res, message = "El servidor ha podido ser contactado", code = 403) => {
    res.status(code);
    res.send({
      error: true,
      msg: message
    });
  };
  
  module.exports = { handleHttpError };