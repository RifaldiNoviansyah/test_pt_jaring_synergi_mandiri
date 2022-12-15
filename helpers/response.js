module.exports = (res, code, message, data) => {
  try {
    if (!code || !message) {
      console.log("you should define code, message");
      return;
    }
    return res.status(code).json({
      message,
      data,
    });
  } catch (error) {
    console.log("##Error Response Helper", error);
  }
};
