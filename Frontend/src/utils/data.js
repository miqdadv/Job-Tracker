export const BACKEND_URI = import.meta.env.VITE_BACKEND_URI || "http://localhost:5001";

export const USER_API_ENDPOINT = `${BACKEND_URI}/api/user`;
export const JOB_API_ENDPOINT = `${BACKEND_URI}/api/job`;
export const TRACKER_API_ENDPOINT = `${BACKEND_URI}/api/tracker`;
export const COMPANY_API_ENDPOINT = `${BACKEND_URI}/api/company`;
export const APPLICATION_API_ENDPOINT = `${BACKEND_URI}/api/application`;
