//import images
export const HOME_PATH_SVG = "../assets/images/home-path.svg";

// constant
export const INITIALMINUTES = 2;
export const INITIALSECONDS = 45;
export const SYNC_PROGRESS_TEXT = `Sync is in progress, it may take some time. Please don't click back or refresh button`;

export const DEFAULT_MESSAGES = {
    LOGIN: {
        ERROR: 'Technical issue' 
    },
    VERIFY_OTP: {
        ERROR: 'Technical issue'
    },
    SEND_OTP: {
        SUCCESS: 'OTP successfully sent',
        ERROR: 'Technical issue' //todo  
    },
    RESET_PASSWORD: {
        SUCCESS: 'Password changed successfully',
        MATCH_ERROR: 'Set password and confirm password do not match',
        ERROR: 'Technical issue' //todo
    },
    CHANGE_PASSWORD: {
        SUCCESS: 'Password changed successfully!',
        MATCH_ERROR: 'New password and confirm password do not match',
        ERROR: 'Error occurred',
        INVALID: 'Invalid Password',
        SAME_PASSWORD: 'You have entered the same current and new password. Please enter a different password',
        ALPHANUMERIC_ERROR: 'Password must be atleast 6 alphanumeric characters',
        ENTER_CUR_PASSWORD: 'Please enter current password.',
        ENTER_NEW_PASSWORD: 'Please enter new password.'
    }
};


export default WAVE_IMAGE;
