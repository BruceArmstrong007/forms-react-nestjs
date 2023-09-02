import { useState, useEffect } from "react";
import { HStack, VStack } from "@chakra-ui/layout";
import { Section } from "../fields/section/Section";
import { Description } from "../fields/description/description";
import { TitleDescription } from "../title-description/TitleDescription";
import { TitleImage } from "../title-image/TitleImage";
import { TitleVideo } from "../title-video/TitleVideo";
import { Card, CardBody } from "@chakra-ui/react";
import { Questions } from "../questions/Questions";

export const Sections = ({ data, index, updateData }: any) => {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    updateData({ index, questions });
  }, [index, questions, updateData]);

  const getData = (value: any) => {
    setQuestions((prev) => [
      ...prev.filter((question) => question.index !== value.index),
      value,
    ]);
  };

  const renderFields = data?.fields.map((value: any, index: any) => {
    if (value.type === "title-description")
      return <TitleDescription key={index} value={value} />;
    else if (value.type === "questions")
      return (
        <Questions
          key={index}
          index={value.index}
          value={value}
          getData={getData}
        />
      );
    else if (value.type === "title-image")
      return <TitleImage key={index} value={value} />;
    else if (value.type === "title-video")
      return <TitleVideo key={index} value={value} />;
    else return null;
  });

  return (
    <Card w="full" padding="10px" color="white" bg="teal.500" rounded="md">
      <CardBody w="full">
        <VStack
          w="full"
          display="flex"
          alignItems="start"
          justifyContent="start"
          spacing={4}
        >
          <HStack w="full">
            <Section section={data?.section} />
          </HStack>
          <Description description={data?.description}></Description>
          {renderFields}
        </VStack>
      </CardBody>
    </Card>
  );
};
