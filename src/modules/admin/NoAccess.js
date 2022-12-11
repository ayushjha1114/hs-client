import React from 'react';

let NoAccess = () => {

	return (
		<div className="no-access-wrapper">
			<div className="no-access-block">
				<h3 className="no-access-text">
					You don't have access to admin dashboard
				</h3>
				<a className="back-to-login" href='/login'>Back to login</a>
			</div>
		</div>
	)
}

export default NoAccess;
