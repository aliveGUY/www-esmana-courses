import axios from "axios";

export async function getCourseById() {
  try {
    const result = await axios.get("http://localhost:8080/courses/1");
    return result.data;
  } catch {
    return null;
  }
}
