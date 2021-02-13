const isDevelopment: boolean = process.env.NODE_ENV === "development";

// Backend API Endpoint
const APIEndpoint: string = isDevelopment ? "http://localhost:8081" : "";

export {APIEndpoint}
