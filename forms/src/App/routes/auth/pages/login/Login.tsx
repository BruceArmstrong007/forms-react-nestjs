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
import { alertState } from "../../../../state/alert-state";
import { useNavigate } from "react-router";
import { authState } from "../../../../state/auth-state";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .max(25, "Should not exceed 25 characters!")
    .required("Username is required!"),
  password: Yup.string()
    .max(50, "TShould not exceed 50 characters!")
    .required("Password is required!"),
});

export const Login = () => {
  const navigate = useNavigate();
  const login = authState((state: any) => state.login);  
  const alertSuccess = alertState((state: any) => state.success);
  const alertError = alertState((state: any) => state.error);
  const handleResponse = (res: any) => {
    if(res?.statusCode) {
      alertError("Error!",res?.message);
      return;
    }
    alertSuccess("Success!","Successfully logged in.");
    navigate('/admin/dashboard');
  }
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {login(values).then(handleResponse)}}
    >
      {({ handleSubmit, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Heading as="h3" size="md" noOfLines={1}>
              Login
            </Heading>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Field
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
  );
};
