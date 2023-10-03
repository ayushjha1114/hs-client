import moment from "moment";

const Helper = {
	validateEmail(email) {
		var re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	validatePassword(password) {
		var re = /^(?=.*[a-zA-Z])(?=.*[0-9])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{6,}$/;
		// /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
		return re.test(password);
	},
	transformUserName(data) {
		let userName = data.first_name;
		if (data.middle_name !== null) {
			userName = userName + " " + data.middle_name;
		}
		if (data.last_name !== null) {
			userName = userName + " " + data.last_name;
		}
		return userName.trim();
	},
	removeCommaFromServiceProvide(data) {
		let label = "";
		data.map((type) => {
			label += `${type.name}, `;
		});
		return label.substring(0, label.length - 2);
	},
	removeCommaFromServiceType(data) {
		let label = "";
		data.map((type) => {
			label += `${type}, `;
		});
		return label.substring(0, label.length - 2);
	},
	getNewestData(ticket, payment) {
		let result = "";
		if (!payment) {
			return ticket;
		}
		const ticketDate = moment(ticket).format();
		const paymentDate = moment(payment).format();
		if (ticketDate > paymentDate) {
			result = ticket;
		} else {
			result = payment;
		}
		return result;
	},
	isJson(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	},
	transformUserType(role) {
		let finalRole = role;
		if (role === "AMC") {
			finalRole = finalRole + " " + "Customer";
		} else if (role === "USER") {
			finalRole = "Customer";
		}
		return finalRole;
	},
};
export default Helper;
