import * as API from '../../api'
import jwt from "jsonwebtoken";

export default {

	loggedIn: () => {
		// return !! localStorage.token
		return !!window.localStorage.getItem("token");
	},

	adminLoggedIn: () => {
		return !!window.localStorage.getItem("ccc_SSO_token");
	},

	setAccessToken: (token) => {
		window.localStorage.setItem('token', token);
		// localStorage.token = token;
	},

	getAccessToken: (token) => {
		return window.localStorage.getItem("token");
		//return localStorage.token;
	},

	getAdminAccessToken: () => {
		return window.localStorage.getItem("ccc_SSO_token");
	},

	getAdminAccessDetails: () => {
		return window.localStorage.getItem("cccSSOUserDetail");
	},

	deleteAccessToken: () => {
		localStorage.removeItem('token');
		localStorage.removeItem('correlation_id');
		// delete localStorage.token  
	},

	logout: () => {
		localStorage.removeItem('token');
		localStorage.removeItem('correlation_id');
		localStorage.removeItem('_SSO_token');
		// delete localStorage.token;
	},

	decodeToken: (token) => {
		return jwt.decode(token);

	},
	getLoginId: (token) => {
		return jwt.decode(window.localStorage.getItem("token")).login_id;
	},
	setRole: (role) => {
		window.localStorage.setItem('role', role);
		// localStorage.token = token;
	},
	getRole: () => {
		return !!window.localStorage.getItem('role');
		// localStorage.token = token;
	},
	checkAdminLogin: () => {
		return !!window.localStorage.getItem('amplify-redirected-from-hosted-ui')
	},
	removeSSOCreds: () => {
		window.localStorage.removeItem("amplify-redirected-from-hosted-ui");
		window.localStorage.removeItem("SSOUserName");
	}
}