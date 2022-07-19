const env = process.env.REACT_APP_STAGE || "dev";
let ga_id = process.env.REACT_APP_GA_ID || '';
let cache_version = process.env.REACT_APP_CACHE_VERSION || Math.random().toString();

const baseUrl = process.env.REACT_APP_BASE_URL;
const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY;

const envBased = {
	serviceServerName: {
		auth: "auth_api_server",
		order: "order_api_server",
		sap: "sap_api_server"
	}
	, auth_api_server: {
		path: '/auth',
		version: '/api/v1/',
		url: baseUrl,
		register: 'register',
		login: 'login',
		validate_auth: 'validate',
		reset_password: 'reset-password',
		refresh_token: 'refresh-token',
		generate_otp: 'generate-otp',
		verify_otp: 'verify-otp',
	},
	google_analytics_id: ga_id,
	cache_version,
	app_environment: env,
	recaptchaKey: recaptchaKey
};


const config = {
	// Add common config values here
	DUMMY_VALUE: 5000000,

	// Default to dev if not set
	...(envBased),
};
export default config;
