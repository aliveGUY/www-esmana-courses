import React, { useState } from "react";
import SectionWrapper from "../common/SectionWrapper";
import {
  Box,
  Button,
  Checkbox,
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

const LectureItem = ({
  lecture,
  isAllLectures,
  selectedLectures,
  onRemove,
  onAdd,
}) => {
  const { description, title, startTime, endTime, price, id } = lecture;

  const { date, hoursStart, hoursEnd } = useFormattedDates({
    startTime,
    endTime,
  });

  const isSelected = () => {
    return selectedLectures.some((obj) => obj.id === id);
  };

  const toggleSelection = () => {
    if (isSelected()) {
      onRemove(lecture);
      return;
    }
    onAdd(lecture);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alinjectArrayAsQueryParamsignItems="center"
      sx={{ px: 1 }}
    >
      {!isAllLectures && (
        <Checkbox checked={isSelected()} onClick={toggleSelection} />
      )}
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

const SummaryCard = ({ isAllLectures, onToggle, selectedLectures }) => {
  const totalPrice = selectedLectures.reduce(
    (sum, lecture) => sum + Number(lecture.price),
    0
  );

  const selectedIds = selectedLectures.map((lecture) => lecture.id);

  const redirect = injectArrayAsQueryParams(
    `${PORTAL_ORIGIN}/course-checkout`,
    selectedIds
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
            {totalPrice} UAH
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
          disabled={totalPrice === 0}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

const Lectures = ({
  lectures,
  selectedLectures,
  onRemove,
  onAdd,
  onSelectionReset,
}) => {
  const [isAllLectures, setIsAllLectures] = useState(true);

  const handleSelectionToggle = () => {
    if (isAllLectures) {
      setIsAllLectures(false);
      return
    }

    setIsAllLectures(true);
    onSelectionReset();
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
              selectedLectures={selectedLectures}
              onRemove={onRemove}
              onAdd={onAdd}
            />
          ))}
        </Stack>
        <SummaryCard
          onToggle={handleSelectionToggle}
          isAllLectures={isAllLectures}
          selectedLectures={selectedLectures}
        />
      </Stack>
    </SectionWrapper>
  );
};

export default Lectures;
