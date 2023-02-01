import { notification } from "antd";
const Helper = {
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  validatePassword(password) {
    var re = /^(?=.*[a-zA-Z])(?=.*[0-9])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{6,}$/;
    // /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return re.test(password);
  },
  errorHandler(message, description) {
    setTimeout(() => {
      notification.error({
        message,
        description,
        duration: 8,
        className: "notification-error",
      });
    }, 50);
  },
  transformUserName(data) {
    console.log(data);
    let userName = data.first_name;
    if (data.middle_name !== null) {
      userName = userName + ' ' + data.middle_name;
    }
    if (data.last_name !== null) {
      userName = userName + ' ' + data.last_name;
    }
    return userName;
  },
  removeCommaFromServiceProvide(data) {
    let label = '';
    data.map(type => {
      label += `${type.label}, `;
    })
    return label.substring(0, label.length - 2);
  },
  removeCommaFromServiceType(data) {
    let label = '';
    data.map(type => {
      label += `${type}, `;
    })
    return label.substring(0, label.length - 2);
  },
};
export default Helper;
