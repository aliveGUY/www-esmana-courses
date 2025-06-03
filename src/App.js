import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Hero from "./presentation/components/Hero";
import Image from "./presentation/components/Image";
import Conditions from "./presentation/components/Conditions";
import { getCourseById } from "./endpoints/courses";
import Lectures from "./presentation/components/Lectures";
import Lectors from "./presentation/components/Lectors";
import { flatMap } from "lodash";

export default function App() {
  const [course, setCourse] = useState(null);

  const init = async () => {
    const course = await getCourseById();
    setCourse(course);
  };

  useEffect(() => {
    init();
  }, []);

  const lectors = flatMap(course?.lectures, (lecture) =>
    lecture.users.map((entry) => entry.user)
  );

  return (
    <Stack>
      <Hero />
      <Image />
      <Lectures lectures={course?.lectures} />
      <Lectors lectors={lectors} />
      <Conditions />
    </Stack>
  );
}
