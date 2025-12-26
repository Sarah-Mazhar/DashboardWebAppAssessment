import axios from "axios";

/*
Centralized API layer.
Simulates a backend using localStorage and timeouts.
*/

export const api = axios.create({
  baseURL: "/api",
});

/*
Simulated delay to mimic real network behavior
*/
export const fakeDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));
