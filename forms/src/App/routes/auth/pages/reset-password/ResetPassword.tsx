import * as React from "react";
import { Form, Field, Formik } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
  username: Yup.string()
    .max(25, "Should not exceed 25 characters!")
    .required("Username is required!"),
  password: Yup.string()
    .max(50, "TShould not exceed 50 characters!")
    .required("Password is required!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Passwords must match"
  ),
});

export const ResetPassword = () => (
  <Formik
    initialValues={{
      username: "",
      password: "",
      confirmPassword: "",
    }}
    validationSchema={ResetPasswordSchema}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);
    }}
  >
    {({ handleSubmit, errors, touched }) => (
      <Form onSubmit={handleSubmit}>
        <VStack spacing={2}>
          <Heading as="h3" size="md" noOfLines={1}>
            Reset Password
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
            <FormLabel htmlFor="password">Password</FormLabel>
            <Field
              isInvalid={!!errors.password && touched.password}
              as={Input}
              name="password"
              id="password"
              type="password"
              varient="filled"
            />
            {touched.password && errors.password && (
              <Text as="b" color="tomato">
                {errors.password}
              </Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Field
              isInvalid={!!errors.password && touched.password}
              as={Input}
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              varient="filled"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text as="b" color="tomato">
                {errors.confirmPassword}
              </Text>
            )}
          </FormControl>
          <Button type="submit" w="full">
            Submit
          </Button>
        </VStack>
      </Form>
    )}
  </Formik>
);
