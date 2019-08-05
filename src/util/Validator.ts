/**
 * checks if token is valid
 * @param token
 */
export const isValidToken = (token): boolean =>
  token.match(/^[0-9a-fA-F]{24}$/);
