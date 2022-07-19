import Auth from './auth';
function authenticatedUsersOnly(nextState, replace) {
	// debugger
	if (!Auth.loggedIn()) {
		replace({
			pathname: '/',
			state: { nextPathname: nextState.location.pathname }
		});
	}
}

function notLoggedIn(nextState, replace) {
	if (Auth.loggedIn()) {
		replace({
			pathname: '/user/dashboard',
			state: { nextPathname: nextState.location.pathname }
		});
	} else if (Auth.adminLoggedIn()) {
		replace({
			pathname: '/admin/dashboard',
			state: { nextPathname: nextState.location.pathname }
		});
	}
}

function logoutUser(nextState, replace) {
	Auth.logout();
	replace({
		pathname: '/',
		state: { nextPathname: nextState.location.pathname }
	});

}


export { authenticatedUsersOnly };
export { notLoggedIn };
export { logoutUser };
