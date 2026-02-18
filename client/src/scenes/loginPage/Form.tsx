import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useFormik, FormikTouched, FormikErrors } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "@state/auth.js";
import Dropzone from "react-dropzone";
import FlexBetween from "@components/FlexBetween.js";
import { RegisterFormValues, LoginFormValues } from "../../types/formValues.js";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};
const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState<"login" | "register">("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (
    values: RegisterFormValues,
    resetForm: () => void
  ) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "picture" && value instanceof File) {
        formData.append("picture", value);
        formData.append("picturePath", value.name);
      } else {
        formData.append(key, value as string);
      }
    });
    const savedUserResponse = await fetch(
      `${import.meta.env.API_ORIGIN}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    resetForm();
    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (
    values: LoginFormValues,
    resetForm: () => void
  ) => {
    const loggedInResponse = await fetch(
      `${import.meta.env.API_ORIGIN}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json();
    resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const formik = useFormik({
    initialValues: isLogin ? initialValuesLogin : initialValuesRegister,
    validationSchema: isLogin ? loginSchema : registerSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (isLogin) {
        await login(values as LoginFormValues, resetForm);
      }
      if (isRegister) {
        await register(values as RegisterFormValues, resetForm);
      }
    },
  });

  const picture =
    isRegister && (formik.values as RegisterFormValues).picture;
  const touchedField = formik.touched as FormikTouched<RegisterFormValues>;
  const errorField = formik.errors as FormikErrors<RegisterFormValues>;
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {isRegister && (
          <>
            <TextField
              label="First Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={(formik.values as RegisterFormValues).firstName}
              name="firstName"
              error={
                Boolean(touchedField.firstName) &&
                Boolean(errorField.firstName)
              }
              helperText={
                touchedField.firstName && errorField.firstName
              }
              sx={{
                gridColumn: "span 2",
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a0a0a0",
                },
              }}
            />
            <TextField
              label="Last Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={(formik.values as RegisterFormValues).lastName}
              name="lastName"
              error={
                Boolean(touchedField.lastName) &&
                Boolean(errorField.lastName)
              }
              helperText={
                touchedField.lastName && errorField.lastName
              }
              sx={{
                gridColumn: "span 2",
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a0a0a0",
                },
              }}
            />
            <TextField
              label="Location"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={(formik.values as RegisterFormValues).location}
              name="location"
              error={
                Boolean(touchedField.location) &&
                Boolean(errorField.location)
              }
              helperText={
                touchedField.location && errorField.location
              }
              sx={{
                gridColumn: "span 4",
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a0a0a0",
                },
              }}
            />
            <TextField
              label="Occupation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={(formik.values as RegisterFormValues).occupation}
              name="occupation"
              error={
                Boolean(touchedField.occupation) &&
                Boolean(errorField.occupation)
              }
              helperText={
                touchedField.occupation && errorField.occupation
              }
              sx={{
                gridColumn: "span 4",
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a0a0a0",
                },
              }}
            />
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                accept={{
                  "image/jpeg": [".jpeg", ".jpg"],
                  "image/png": [".png"],
                  "application/pdf": [".pdf"],
                }}
                multiple={false}
                onDrop={(acceptedFiles: File[]) =>
                  formik.setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!(formik.values as RegisterFormValues).picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        {picture instanceof File ? picture.name : picture}
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
          </>
        )}

        <TextField
          label="Email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          name="email"
          error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            gridColumn: "span 4",
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#a0a0a0",
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          error={
            Boolean(formik.touched.password) && Boolean(formik.errors.password)
          }
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            gridColumn: "span 4",
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#a0a0a0",
            },
          }}
        />
      </Box>

      {/* BUTTONS */}
      <Box>
        <Button
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
          }}
        >
          {isLogin ? "LOGIN" : "REGISTER"}
        </Button>
        <Typography
          onClick={() => {
            setPageType(isLogin ? "register" : "login");
            formik.resetForm();
          }}
          sx={{
            textDecoration: "underline",
            color: palette.primary.main,
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up here."
            : "Already have an account? Login here."}
        </Typography>
      </Box>
    </form>
  );
};

export default Form;

