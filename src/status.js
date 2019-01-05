////////////////////////////////////////////////////////////////////////////////
/// HTTP status codes
////////////////////////////////////////////////////////////////////////////////

// Success
export const OK = 200;
export const OK_NO_DATA = 204;

// Client errors
export const ERROR_UNAUTHORIZED = 401;

// Server errors
export const ERROR_SERVER = 500;

// My custom errors
export const ERROR_OTHER = 418; // I'm a teapot :-)
// Note: server responses with that status code are expected to have a
// human-readable { message } in their body
