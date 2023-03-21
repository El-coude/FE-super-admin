import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import admin from "../assets/admin.json";
import { useState } from "react";
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
    const [state, setState] = useState({
        loading: false,
        error: "",
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setState({
                loading: true,
                error: "",
            });
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/auth/admins/signin`,
                    {
                        method: "post",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(values),
                    }
                );
                const admin = await res.json();
                localStorage.setItem("authenticated", "true");
                localStorage.setItem("admin", JSON.stringify(admin));
                navigate("/dashboard");
            } catch (error) {
                console.log(error);
                setState({
                    loading: false,
                    error: (error as Error).message,
                });
            }
        },
    });

    return (
        <Box
            sx={{
                width: "100%",
            }}>
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
                    }}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "#f76b04",
                        }}>
                        Sign in
                    </Typography>
                    {state.error && (
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontWeight: "bold",
                                color: "#FA2309",
                                textAlign: "left",
                            }}>
                            {state.error}
                        </Typography>
                    )}
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
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
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
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
                            background: "#f76b04",
                            marginTop: "30px",
                            fontWeight: "bold",
                            borderRadius: "10px",
                            height: "180px",
                            "&:hover": {
                                background: "#f76b04",
                            },
                        }}
                        type="submit">
                        {state.loading ? "Signing ..." : "Sign in"}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default Signin;
