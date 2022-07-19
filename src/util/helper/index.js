
export default class Util {
  static validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  static validatePassword(password) {
    var re = /^(?=.*[a-zA-Z])(?=.*[0-9])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{6,}$/;
    // /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return re.test(password);
  }
  static getFileName(url) {
    return url ? url.split('/').pop() : null;
  }
  static uid() {
    return Math.random().toString(34).slice(2);
  }
  static filterArrayOfObjects(arr, searchKey, searchVal) {
    let filteredArray = arr.filter(itm => itm[searchKey] === searchVal);
    return filteredArray;
  }
  static formatErrorMessages(arr) {
    arr.map(error => error.message)
  }

  static convertDataTimeToIST(arr) {
    return ({
      "from": `${arr[0]}+05:30`,
      "to": `${arr[1]}+05:30`,
    })
  }

  /* Function to validate the order items list */
  static checkItemList = (orderItemList) => {
    let itmFlag = true;
    let errormessage = [];
    orderItemList.map((item, index) => {
      const { code, description = '', quantity = '' } = item;
      if (code === "") {
        itmFlag = false;
        errormessage.push(`Item ${index + 1}: Item should not be blank`);
      } else if (quantity === "" || quantity <= 0) {
        itmFlag = false;
        errormessage.push(`${description}: Quantity should not be blank or zero and no decimal allowed`);
      } else if (quantity % 1 !== 0) {
        itmFlag = false;
        errormessage.push(`${description}: No decimal allowed in item quantity`);
      }
    })
    return {
      itmFlag,
      errormessage: errormessage.join(" | ")
    }
  }

  static formatDate = (date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('/');
  }

  static createUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  }
}
