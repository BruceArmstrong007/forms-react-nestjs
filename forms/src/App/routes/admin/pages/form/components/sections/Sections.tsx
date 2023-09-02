import { useState, useEffect } from "react";
import {
  DescriptionData,
  FieldsData,
  SectionData,
} from "../../../../../../../shared/utils/interface";
import { HStack, VStack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Section } from "../fields/section/Section";
import { Description } from "../fields/description/description";
import { TitleDescription } from "../title-description/TitleDescription";
import { Questions } from "../questions/Questions";
import { TitleImage } from "../title-image/TitleImage";
import { TitleVideo } from "../title-video/TitleVideo";
import { MdAdd, MdDelete } from "react-icons/md";
import {
  Card,
  CardBody,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";

export const Sections = ({ section, updateSection, deleteSection }: any) => {
  const [sectionData, setSectionData] = useState<SectionData>(section?.section);
  const [description, setDescription] = useState<DescriptionData>(
    section?.description
  );
  const [fields, setFields] = useState<FieldsData[]>(section?.fields);

  useEffect(() => {
    updateSection(sectionData, description, fields);
  }, [sectionData, description, fields]);

  const updateData = (index: number, type: string, data: any[]) => {
    setFields((prev: any) => {
      let updatedFields = prev;
      updatedFields[index] = {
        index,
        type,
        data,
      };
      return updatedFields;
    });
  };

  const deleteData = async (index: number) => {
    await setFields((prev: any) => {
      let updatedFields = prev.filter((field: any) => field.index !== index);
      return [...updatedFields];
    });
  };

  const addData = (data: FieldsData) => {
    setFields((prev: any) => [...prev, data]);
  };

  const renderFields = fields.map((value, index) => {
    if (value.type === "title-description")
      return (
        <TitleDescription
          key={index}
          value={value}
          getData={updateData}
          deleteData={deleteData}
        />
      );
    else if (value.type === "questions")
      return (
        <Questions
          key={index}
          value={value}
          getData={updateData}
          deleteData={deleteData}
        />
      );
    else if (value.type === "title-image")
      return (
        <TitleImage
          key={index}
          value={value}
          getData={updateData}
          deleteData={deleteData}
        />
      );
    else if (value.type === "title-video")
      return (
        <TitleVideo
          key={index}
          value={value}
          getData={updateData}
          deleteData={deleteData}
        />
      );
    else return null;
  });

  return (
    <Card w="60%" p="10px" color="white" bg="teal.500" rounded="md">
      <CardBody>
        <VStack
          w="full"
          display="flex"
          alignItems="start"
          justifyContent="start"
          spacing={4}
        >
          <HStack w="full">
            <Section section={sectionData} setSection={setSectionData} />
            {section.index > 0 && (
              <Tooltip
                label="Delete Section"
                placement="left"
                closeOnClick={false}
              >
                <IconButton
                  onClick={() => deleteSection(section?.index)}
                  aria-label="Delete Section"
                  variant="outline"
                  colorScheme="white"
                  _hover={{ backgroundColor: "red", border: "teal" }}
                  isRound={true}
                >
                  <Icon as={MdDelete}></Icon>
                </IconButton>
              </Tooltip>
            )}
            <Menu isLazy>
              <Tooltip label="Add Field" placement="left" closeOnClick={false}>
                <MenuButton
                  as={IconButton}
                  aria-label="Add Fields"
                  variant="outline"
                  colorScheme="white"
                  _hover={{ backgroundColor: "green", border: "teal" }}
                  isRound={true}
                >
                  <Icon as={MdAdd}></Icon>
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    addData({
                      index: fields.length,
                      type: "title-description",
                      data: [
                        {
                          name: "Enter Title",
                          type: "title",
                          options: {
                            bold: false,
                            italic: false,
                            underline: false,
                          },
                        },
                        {
                          name: "Enter Description",
                          type: "description",
                          options: {
                            bold: false,
                            italic: false,
                            underline: false,
                          },
                        },
                      ],
                    })
                  }
                >
                  Title Description
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    addData({
                      index: fields.length,
                      type: "questions",
                      data: [
                        {
                          name: "Enter Question",
                          type: "question",
                          options: {
                            bold: false,
                            italic: false,
                            underline: false,
                          },
                        },
                        {
                          type: "answer",
                          option: "text",
                          entries: [],
                        },
                      ],
                    })
                  }
                >
                  Questions
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    addData({
                      index: fields.length,
                      type: "title-image",
                      data: [
                        {
                          name: "Enter Image Title",
                          type: "title",
                          options: {
                            bold: false,
                            italic: false,
                            underline: false,
                          },
                        },
                        {
                          url: "",
                          type: "image",
                        },
                      ],
                    })
                  }
                >
                  Image
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    addData({
                      index: fields.length,
                      type: "title-video",
                      data: [
                        {
                          type: "title",
                          name: "Enter Video Title",
                          options: {
                            bold: false,
                            italic: false,
                            underline: false,
                          },
                        },
                        {
                          type: "video",
                          url: "",
                        },
                      ],
                    })
                  }
                >
                  Video
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Description
            description={description}
            setDescription={setDescription}
          ></Description>
          {renderFields}
        </VStack>
      </CardBody>
    </Card>
  );
};
