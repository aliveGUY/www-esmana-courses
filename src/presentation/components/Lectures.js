import React, { useState } from "react";
import SectionWrapper from "../common/SectionWrapper";
import {
  Box,
  Button,
  Divider,
  Link,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { map } from "lodash";
import { useFormattedDates } from "../../hooks/useFormattedDates";
import { PORTAL_ORIGIN } from "../../contants";

const injectArrayAsQueryParams = (baseUrl, array) => {
  const searchParams = new URLSearchParams();
  array.forEach((value) => searchParams.append("lids", value.toString()));

  return `${baseUrl}?${searchParams}`;
};

const LectureItem = ({ lecture, isAllLectures }) => {
  const { description, title, startTime, endTime, price } = lecture;

  const { date, hoursStart, hoursEnd } = useFormattedDates({
    startTime,
    endTime,
  });

  return (
    <Stack
      direction="row"
      spacing={2}
      alinjectArrayAsQueryParamsignItems="center"
      sx={{ px: 1 }}
    >
      {!isAllLectures && <Checkbox checked={true} />}
      <Stack
        direction={{ md: "row" }}
        width="100%"
        justifyContent={{ md: "space-between" }}
      >
        <Stack
          direction={{ md: "row-reverse" }}
          spacing={2}
          alignItems={{ md: "center" }}
        >
          <Stack>
            <Typography fontWeight="bold">{title}</Typography>
            <Typography display={{ xs: "none", md: "block" }}>
              {description}
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "row", md: "column" }}
            alignItems={{ md: "end" }}
            spacing={{ xs: 2, md: 0 }}
          >
            <Typography whiteSpace="nowrap">
              {hoursStart} - {hoursEnd}
            </Typography>
            <Typography whiteSpace="nowrap" color="stormWave.main">
              {date}
            </Typography>
          </Stack>
        </Stack>
        <Box display={isAllLectures ? "none" : "block"}>
          <Typography whiteSpace="nowrap" fontWeight="bold">
            {price} UAH
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

const SummaryCard = ({ isAllLectures, onToggle }) => {
  const redirect = injectArrayAsQueryParams(
    `${PORTAL_ORIGIN}/course-checkout`,
    [1, 2, 3, 4]
  );

  return (
    <Box
      sx={{
        position: { xs: "sticky", md: "relative" },
        bottom: 0,
        backgroundColor: "white",
      }}
      width="100%"
      flex={1}
    >
      <Box sx={{ position: { md: "sticky" }, top: 64 }} p={1}>
        <Stack
          direction={{ xs: "row", md: "column-reverse" }}
          sx={{ mb: 2 }}
          justifyContent="space-between"
        >
          <Typography variant="title" fontWeight={700}>
            6k UAH
          </Typography>
          <Divider />
          <Stack>
            <Typography display={{ xs: "none", md: "block" }} fontWeight="bold">
              Summary
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography display={{ xs: "none", md: "block" }}>
                Join to all lectures
              </Typography>
              <Typography display={{ md: "none" }} mr={1}>
                All Lectures
              </Typography>
              <Switch checked={isAllLectures} onClick={onToggle} />
            </Stack>
            <Typography
              display={{ xs: "none", md: "block" }}
              color="stormWave.main"
            >
              -10% discount for members only
            </Typography>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          component={Link}
          href={redirect}
          target="_blank"
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

const Lectures = ({ lectures }) => {
  const [isAllLectures, setIsAllLectures] = useState(true);

  const handleSelectionToggle = () => {
    setIsAllLectures((prev) => !prev);
  };

  return (
    <SectionWrapper>
      <Typography
        textAlign="center"
        fontSize={24}
        fontWeight="bold"
        pt={5}
        pb={2}
      >
        Course Program
      </Typography>
      <Stack direction={{ md: "row" }} spacing={4}>
        <Stack spacing={2} width="100%" flex={2}>
          {map(lectures, (lecture, index) => (
            <LectureItem
              lecture={lecture}
              key={index}
              isAllLectures={isAllLectures}
            />
          ))}
        </Stack>
        <SummaryCard
          onToggle={handleSelectionToggle}
          isAllLectures={isAllLectures}
        />
      </Stack>
    </SectionWrapper>
  );
};

export default Lectures;
