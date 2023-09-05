import { Box, useToast } from "@chakra-ui/react";
import { VStack, Heading } from "@chakra-ui/layout";
import { Sections } from "./components/sections/Sections";
import { submitState } from "../../../../state/submit-state";
import { useState } from "react";
import { Options } from "../form/components/options/Options";
import { Submitted } from "./components/submitted/Submitted";

export const Form = () => {
  const forms = submitState((state: any) => state);
  const toast = useToast();
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
    const form = {
      formID: forms.form._id,
      authorID: forms.form.authorID,
      sections: sections,
    };

    const res = await forms.saveForm(form);
    if (!res) {
      toast({
        title: "Failed to connect",
        description: "Couldn't connect to server.",
        status: "error",
      });
      return;
    }
    const statusCode = res?.statusCode;
    if (statusCode) {
      toast({
        title: "API Error",
        description: res?.message,
        status: "error",
      });
      return;
    }
    toast({
      title: "Success!",
      description: "Form saved successfully.",
      status: "success",
    });
  };

  const renderSections = forms?.form?.sections?.map(
    (value: any, index: any) => {
      return (
        <Sections
          key={index}
          index={index}
          data={value}
          updateData={updateData}
        />
      );
    }
  );

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
          {forms?.form?.name}
        </Heading>
        {forms?.submit ? <Submitted /> : renderSections}
        {!forms?.submit && <Options saveForm={saveForm}></Options>}
      </VStack>
    </Box>
  );
};
