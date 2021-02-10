const isDevelopment = process.env.NODE_ENV === "development";

const APIEndpoint: string = isDevelopment ? "http://localhost:8081" : "";

export {APIEndpoint}
