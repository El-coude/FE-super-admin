import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import admin from "../assets/admin.json";
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
const Signin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (
        values?.email === admin?.email &&
        values?.password === admin?.password
      ) {
        localStorage.setItem("authenticated", "true");
        navigate("/dashboard");
      }
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            width: "60%",
            marginTop: "20vh",
            marginLeft: "auto",
            marginRight: "auto",
            height: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#e67e22",
            }}
          >
            Sign in
          </Typography>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              width: "350px",
            }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              width: "350px",
              marginTop: "20px",
            }}
          />
          <Button
            variant="contained"
            sx={{
              width: "350px",
              color: "#fff",
              background: "#e67e22",
              marginTop: "30px",
              fontWeight: "bold",
              borderRadius: "10px",
              height: "180px",
              "&:hover": {
                background: "#e67e22",
              },
            }}
            type="submit"
          >
            Signin
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Signin;
