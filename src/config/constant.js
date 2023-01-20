export const DEFAULT_MESSAGES = {
  RESET_PASSWORD: {
    SUCCESS: "Password changed successfully",
    MATCH_ERROR: "Set password and confirm password do not match",
    ERROR: "Technical issue", //todo
  },
  CHANGE_PASSWORD: {
    SUCCESS: "Password changed successfully!",
    MATCH_ERROR: "New password and confirm password do not match",
    ERROR: "Error occurred",
    INVALID: "Invalid Password",
    SAME_PASSWORD:
      "You have entered the same current and new password. Please enter a different password",
    ALPHANUMERIC_ERROR: "Password must be atleast 6 alphanumeric characters",
    ENTER_CUR_PASSWORD: "Please enter current password.",
    ENTER_NEW_PASSWORD: "Please enter new password.",
  },
};

export const devices = [
  "AMC - Desktop ",
  "AMC - Laptop",
  "AMC - Printer",
  "AMC - Server",
  "AMC - Think Client",
  "AMC - Xerox Machine",
  "AMC - Scanner",
];
