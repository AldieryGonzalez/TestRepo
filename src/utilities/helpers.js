export function objectToArray(obj) {
    const result = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result.push(obj[key]);
      }
    }
    return result;
  }