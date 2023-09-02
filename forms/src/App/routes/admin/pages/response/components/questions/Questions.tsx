import { HStack, Text, VStack, Link, Divider } from "@chakra-ui/layout";
import Icon from "@chakra-ui/icon";
import { FaLink } from "react-icons/fa";

export const Questions = ({ questions }: any) => {
  const renderQuestions = questions?.map((value: any, index: any) => {
    if (value.option === "file") {
      return (
        <VStack key={index}>
          <HStack
            spacing={3}
            w="full"
            display="flex"
            justifyContent="space-between"
          >
            <VStack spacing={3} w="full">
              <Text size="lg">{value?.question}</Text>
            </VStack>
            <VStack spacing={3} w="full">
              {value?.answer?.map((ans: any, ind: any) => (
                <Text key={ind} as={Link} size="sm" href={ans?.link}>
                  {ans?.name}
                  <Icon as={FaLink} />
                </Text>
              ))}
            </VStack>
          </HStack>
          <Divider />
        </VStack>
      );
    }
    if (value.option === "checkbox") {
      return (
        <VStack key={index}>
          <HStack
            spacing={3}
            w="full"
            display="flex"
            justifyContent="space-between"
          >
            <VStack spacing={3} w="full">
              <Text size="lg">{value?.question}</Text>
            </VStack>
            <VStack spacing={3} w="full">
              <Text size="sm">
                {value?.answer.join(",")}
              </Text>
            </VStack>
          </HStack>
          <Divider />
        </VStack>
      );
    }
    return (
      <VStack key={index}>
        <HStack spacing={3} w="full">
          <VStack spacing={3} w="full">
            <Text size="lg">{value?.question}</Text>
          </VStack>
          <VStack spacing={3} w="full">
            <Text size="sm">{value?.answer}</Text>
          </VStack>
        </HStack>
        <Divider />
      </VStack>
    );
  });
  return <>{renderQuestions}</>;
};
