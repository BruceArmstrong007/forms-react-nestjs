import { adminState } from "../../../../state/admin-state";
import { VStack, Grid, Box, Heading, Text } from "@chakra-ui/layout";
import { FormHelperText, Icon } from "@chakra-ui/react";
import * as Yup from "yup";
import { alertState } from "../../../../state/alert-state";
import { Form } from "react-router-dom";
import { Field, Formik } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { FiFile } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useRef, useState } from "react";

const ProfileSchema = Yup.object().shape({
  username: Yup.string()
    .max(25, "Should not exceed 25 characters!")
    .required("Username is required!"),
  name: Yup.string()
    .max(50, "Should not exceed 50 characters!")
    .required("Name is required!"),
  profile: Yup.string(),
});

export const EditProfile = () => {
  const [file, setFile] = useState<any>({ name: "" });
  const admin: any = adminState((state: any) => state);
  const alertSuccess = alertState((state: any) => state.success);
  const alertError = alertState((state: any) => state.error);
  const inputRef: any = useRef();
  const fileRef: any = useRef();
  const addFile = (file: any) => {
    setFile(file);
    const result = new FormData();
    result.append("profile", file);
    admin.uploadProfile(result).then((res: any) => {
      if (res?.statusCode) {
        alertError("Error!", res?.message);
        return;
      }
      admin.getProfile();
      alertSuccess("Success!", "Successfully Updated.");
    });
  };
  const removeFile = () => {
    setFile({ name: "" });
    fileRef.current.value = "";
  };
  const submitForm = async (values: any) => {
    admin.update(values).then(handleResponse);
  };
  const handleResponse = (res: any) => {
    if (res?.statusCode) {
      alertError("Error!", res?.message);
      return;
    }
    alertSuccess("Success!", "Successfully Updated.");
  };
  return (
    <Box w="full">
      <VStack
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          w="400px"
          p="20px"
          color="white"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          {admin?.username && (
            <Formik
              initialValues={{
                username: admin?.username as string,
                name: admin?.name as string,
                profile: admin?.profile as string,
              }}
              validationSchema={ProfileSchema}
              onSubmit={submitForm}
            >
              {({ handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                  <VStack spacing={4}>
                    <Heading as="h3" size="md" noOfLines={1}>
                      Update Profile
                    </Heading>
                    <FormControl>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Field
                        disabled
                        isInvalid={!!errors.username && touched.username}
                        as={Input}
                        name="username"
                        id="username"
                        type="text"
                        varient="filled"
                      />
                      {touched.username && errors.username && (
                        <Text as="b" color="tomato">
                          {errors.username}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field
                        isInvalid={!!errors.name && touched.name}
                        as={Input}
                        name="name"
                        id="name"
                        type="text"
                        varient="filled"
                      />
                      {touched.name && errors.name && (
                        <Text as="b" color="tomato">
                          {errors.name}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="profile">Profile</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<Icon as={FiFile} />}
                        />
                        <input
                          type="file"
                          onChange={(e: any) => addFile(e.target.files[0])}
                          accept="image/png, image/jpeg"
                          ref={fileRef}
                          style={{ display: "none" }}
                        ></input>
                        <Input
                          cursor="pointer"
                          placeholder="Upload Your Picture"
                          readOnly={true}
                          ref={inputRef}
                          value={file?.name}
                          onClick={() => {
                            fileRef.current.click();
                          }}
                        />

                        {file?.name && (
                          <InputRightElement
                            onClick={() => removeFile()}
                            children={<Icon as={MdClose} />}
                          />
                        )}
                      </InputGroup>
                      <FormHelperText>
                          Upload a image within 5MB (Supported Format: JPEG)
                        </FormHelperText>
                    </FormControl>
                    <Button
                      bg={"dark"}
                      color={"white"}
                      _hover={{ bg: "teal.400" }}
                      type="submit"
                      w="full"
                    >
                      Submit
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>
          )}
        </Grid>
      </VStack>
    </Box>
  );
};
