
export function stringToDate(str) {
  var tempStrs = str.split(" ");
  var dateStrs = tempStrs[0].split("-");
  var year = parseInt(dateStrs[0], 10);
  var month = parseInt(dateStrs[1], 10) - 1;
  var day = parseInt(dateStrs[2], 10);
  var timeStrs = tempStrs[1].split(":");
  var hour = parseInt(timeStrs[0], 10);
  var minute = parseInt(timeStrs[1], 10);
  var second = parseInt(timeStrs[2], 10);
  var date = new Date(year, month, day, hour, minute, second);
  return date;
}


export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

