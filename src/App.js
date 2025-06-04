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
  const [selectedLecture, setSelectedLectures] = useState([]);

  const lectors = flatMap(course?.lectures, (lecture) =>
    lecture.users.map((entry) => entry.user)
  );

  const uniqueLectors = Array.from(
    new Map(lectors.map((lector) => [lector.id, lector])).values()
  );

  const init = async () => {
    const course = await getCourseById();
    setCourse(course);
    setSelectedLectures(course?.lectures || []);
  };

  const addLecture = (lecture) => {
    setSelectedLectures([...selectedLecture, lecture]);
  };

  const removeLecture = (lecture) => {
    setSelectedLectures((prev) => prev.filter((lec) => lec.id !== lecture.id));
  };

  const resetSelection = () => {
    setSelectedLectures(course?.lectures);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Stack>
      <Hero />
      <Image />
      <Lectures
        lectures={course?.lectures}
        selectedLectures={selectedLecture}
        onSelectionReset={resetSelection}
        onRemove={removeLecture}
        onAdd={addLecture}
      />
      <Lectors lectors={uniqueLectors} />
      <Conditions />
    </Stack>
  );
}
