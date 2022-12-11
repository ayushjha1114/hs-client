import jwt from "jsonwebtoken";

export default {

	loggedIn: () => {
		return !!window.localStorage.getItem("token");
	},

	adminLoggedIn: () => {
		return !!window.localStorage.getItem("admin_token");
	},

	setAccessToken: (token) => {
		window.localStorage.setItem('token', token);
	},

	setAdminAccessToken: (token) => {
		window.localStorage.setItem('admin_token', token);
	},

	getAccessToken: (token) => {
		return window.localStorage.getItem("token");
	},

	getAdminAccessToken: () => {
		return window.localStorage.getItem("admin_token");
	},

	deleteAccessToken: () => {
		localStorage.removeItem('token');
	},

	logout: () => {
		localStorage.removeItem('token');
		window.localStorage.removeItem("role");
		window.localStorage.removeItem("admin_token");
		window.localStorage.removeItem("user_name");
	},

	decodeToken: (token) => {
		return jwt.decode(token);

	},
	getLoginId: (token) => {
		return jwt.decode(window.localStorage.getItem("token")).login_id;
	},
	setRole: (role) => {
		window.localStorage.setItem('role', role);
	},

	getRole: () => {
		return !!window.localStorage.getItem('role');
	},

	setUserName: (name) => {
		window.localStorage.setItem('user_name', name);
	},
}