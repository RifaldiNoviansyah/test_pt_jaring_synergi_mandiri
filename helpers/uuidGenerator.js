exports.uuid = (length) => {
    const result = [];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charLength = chars.length;
  
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    for (let i = 0; i < length; ++i) {
      result.push(chars[getRandomInt(0, charLength - 1)]);
    }
    return result.join("");
  };
  