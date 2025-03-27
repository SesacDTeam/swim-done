class RequestError extends Error {
  constructor(message, displayMode, config) {
    super(message);
    this.name = 'RequestError';
    this.displayMode = displayMode;
    this.config = config
  }
}
