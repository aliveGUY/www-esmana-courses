import axios from "axios";
import { SERVICE_ORIGIN } from "../contants";

export async function getCourseById() {
  try {
    const result = await axios.get(`${SERVICE_ORIGIN}/courses/stripped/1`);
    return result.data;
  } catch {
    return null;
  }
}
