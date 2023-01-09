import { TextField, Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser } from "src/redux/slicers/userSlice";
import { AppDispatch } from "src/redux/store";
import api from "src/utils/api";
import * as Yup from "yup";

function Login() {
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: () =>
      Yup.object({
        email: Yup.string().email("Invalid Email").required("Required*"),
        password: Yup.string().min(5).required("Required*"),
      }),
    onSubmit: async (values) => {
      try {
        const {
          data: { user, token },
        } = await api.post("/user/login", values);

        dispatch(loadUser({ user, token }));
        navigator("/", { replace: true });
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box className="min-h-screen flex items-center justify-center">
      <Box className="w-full max-w-[475px] mx-4 bg-white p-8 shadow-2xl">
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              ".MuiFormHelperText-root": {
                position: "absolute",
                right: 0,
              },
            }}
            className="flex flex-col gap-8"
          >
            <TextField
              fullWidth
              type="email"
              variant="standard"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              type="password"
              variant="standard"
              id="password"
              name="password"
              label="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
        </form>
        <Box sx={{ pt: "1rem" }} className="flex gap-1">
          <Typography>Don't have an account? Resgiter</Typography>
          <Typography
            className="cursor-pointer hover:underline"
            onClick={() => navigator("/register")}
          >
            here
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
