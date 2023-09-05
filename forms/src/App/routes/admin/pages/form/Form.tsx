import { Box, VStack } from "@chakra-ui/layout";
import { Sections } from "./components/sections/Sections";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { formState } from "../../../../state/form-state";
import { Options } from "./components/options/Options";
import { useParams } from "react-router-dom";
import {
  DescriptionData,
  FieldsData,
  FormData,
  SectionData,
} from "../../../../../shared/utils/interface";

const initialSectionState = {
  name: "Enter Section",
  type: "section",
  options: {
    bold: false,
    italic: false,
    underline: false,
  },
};

const initialDescriptionState = {
  name: "Enter Description",
  type: "description",
  options: {
    bold: false,
    italic: false,
    underline: false,
  },
};

const initialFormData = {
  sections: [
    {
      section: initialSectionState,
      description: initialDescriptionState,
      index: 0,
      fields: [],
    },
  ],
  name: "",
  _id: "",
};

export const Form = () => {
  const toast = useToast();
  const forms: any = formState((state) => state);
  const params = useParams();
  const [form, setForm] = useState<FormData>(
    forms.forms.find((form: any) => params?.id === form._id)
  );

  const deleteSection = (index: any) => {
    setForm((prev: any) => {
      let updatedFields = prev.sections.filter((field: any) => field.index !== index);
      console.log(prev.sections, updatedFields, index);
      return { ...prev, sections: [...updatedFields] };
    });
  };

  const addSection = () => {
    setForm((prev: any) => {
      let updatedFields = prev.sections;
      updatedFields.push({
        ...initialFormData.sections[0],
        index: prev.sections.length,
      });
      return { ...prev, sections: [...updatedFields] };
    });
  };

  const updateSection = (
    index: number,
    sectionData: SectionData,
    description: DescriptionData,
    fields: FieldsData[]
  ) => {
    setForm((prev: any) => {
      let updatedFields = prev.sections;
      updatedFields[index] = {
        index,
        section: sectionData,
        description,
        fields,
      };
      return { ...prev, sections: [...updatedFields] };
    });
  };

  const saveForm = async () => {
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
      description: "Form successfully updated.",
      status: "success",
    });
    await forms.getForms();
  };

  const renderSections = form.sections.map((value, index) => {
    return (
      <Sections
        key={index}
        index={index}
        section={value}
        updateSection={updateSection}
        deleteSection={deleteSection}
      />
    );
  });

  return (
    <Box>
      <Box w="full">
        <VStack
          w="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack w="full" spacing={4}>
            {renderSections}
          </VStack>
        </VStack>
      </Box>
      <Options
        addSection={addSection}
        form={form}
        setForm={setForm}
        saveForm={saveForm}
      ></Options>
    </Box>
  );
};
