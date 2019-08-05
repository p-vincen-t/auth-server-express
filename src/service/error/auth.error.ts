class AuthError  {
    public message;
    constructor(public code: number) {
        // super('');
    }
}
export const TOKEN_INVALID = 100;
export const PASSWORD_ERROR = 101;
export const EMAIL_NOT_FOUND_ERROR = 102;
export const USER_NOT_FOUND_ERROR = 103;
export const EMAIL_EXISTS_ERROR = 104;
export const BASIC_ROLE_NOT_FOUND_ERROR = 105;
export const TOKEN_NOT_FOUND_ERROR = 106;
export const RESET_TOKEN_NOT_FOUND = 107;
export const PERMISSION_DENIED = 110;

export default AuthError;
