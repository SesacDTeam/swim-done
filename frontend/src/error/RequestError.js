class RequestError extends Error {
  constructor(message, code, errorDisplayMode, config) {
    super(message);
    this.name = 'RequestError';
    this.code = code;
    this.errorDisplayMode = errorDisplayMode;
    this.config = config;
  }
}

export default RequestError