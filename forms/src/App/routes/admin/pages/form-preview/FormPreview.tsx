import { Box, useToast } from "@chakra-ui/react";
import { VStack, Heading } from "@chakra-ui/layout";
import { Sections } from "./components/sections/Sections";
import { useState } from "react";
import { Options } from "./components/options/Options";
import { Submitted } from "./components/submitted/Submitted";
import { formState } from "../../../../state/form-state";
import { useParams } from "react-router-dom";

export const FormPreview = () => {
  const params = useParams();
  const toast = useToast();
  const [submit, setSubmit] = useState(false);
  const form = formState((state: any) =>
    state.forms.find((form: any) => form._id === params?.id)
  );
  const admin = formState((state: any) => state._id);

  const [sections, setSections] = useState<any[]>([]);

  const updateData = (state: any) => {
    setSections((prev) => [
      ...prev.filter((section: any) => section.index !== state.index),
      state,
    ]);
  };

  const saveForm = async () => {
    for (let i = 0; i < sections.length; i++) {
      const exist = sections[i]?.questions?.find(
        (question: any) => question.required === true && !question.answer
      );
      if (exist) {
        toast({
          title: "Fields Required.",
          description: "Please fill the required form fields before submission",
          status: "error",
        });
        return;
      }
    }
    const formData = {
      formID: form._id,
      authorID: admin,
      sections: sections,
    };
    console.log("Submitted Data", formData);
    setSubmit(true);
    toast({
      title: "Success!",
      description: "Form saved successfully.",
      status: "success",
    });
  };

  const renderSections = form?.sections?.map((value: any, index: any) => {
    return (
      <Sections
        key={index}
        index={index}
        data={value}
        updateData={updateData}
      />
    );
  });

  return (
    <Box
      w="full"
      display="flex"
      padding="40px"
      alignItems="center"
      justifyContent="center"
    >
      <VStack color="white" w="70%" spacing={4}>
        <Heading
          w="full"
          bg="teal.500"
          rounded="md"
          padding="20px"
          as="h2"
          size="lg"
          textAlign="center"
        >
          {form?.name}
        </Heading>
        {submit ? <Submitted /> : renderSections}
        {!submit && <Options saveForm={saveForm}></Options>}
      </VStack>
    </Box>
  );
};
