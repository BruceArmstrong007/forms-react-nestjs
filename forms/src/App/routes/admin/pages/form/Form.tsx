import { Box, VStack } from "@chakra-ui/layout";
import {
  DescriptionData,
  FieldsData,
  SectionData,
  Sections,
} from "./components/sections/Sections";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { formState } from "../../../../state/form-state";
import { Options } from "./components/options/Options";
import { useParams } from "react-router-dom";

interface Section {
  section: SectionData;
  description: DescriptionData;
  index: number;
  fields: FieldsData[];
}

export interface FormData {
  sections: Section[];
  name: string;
  _id: string;
}

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
    forms.forms.find((form: any) => params?.id === form._id )
  );

  const deleteSection = (index: any) => {
    let updatedFields = form.sections;
    updatedFields.splice(index, 1);
    setForm({ ...form, sections: [...updatedFields] });
  };

  const addSection = () => {
    let updatedFields = form.sections;
    updatedFields.push({
      ...initialFormData.sections[0],
      index: form.sections.length,
    });
    setForm({ ...form, sections: [...updatedFields] });
  };

  const updateSection = (
    index: number,
    sectionData: SectionData,
    description: DescriptionData,
    fields: FieldsData[]
  ) => {
    let updatedFields = form.sections;

    updatedFields[index] = {
      index,
      section: sectionData,
      description,
      fields,
    };
    setForm({ ...form, sections: updatedFields });
  };

  const saveForm = async () => {
    const res = await forms.saveForm(form);
    if (res?.statusCode) {
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
