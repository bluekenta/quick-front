import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Field } from "formik";
import axios from "axios";

// antd
import { Form } from "antd";

// components
import { FloatingInput } from "./FloatingInput/FloatingInput";
import FloatingLabelInputPassword from "./FloatingInput/FloatingInputPassword";

// hooks
import useNavbarHeight from "../../Utils/Hooks/useNavbarHeight";

// redux
import { updateProfile } from "../../Redux/profileSlice";

// styled components
import * as Styled from "./SignIn.styled";

interface FormErrors {
  email?: string;
  password?: string;
}

interface SignInValues {
  email: string;
  password: string;
}

interface FormikBag {
  setSubmitting: (isSubmitting: boolean) => void;
}

const SignIn: React.FC = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navbarHeight = useNavbarHeight();

  const handleLearnMoreClick = () => {
    setShowMoreInfo(!showMoreInfo); // Toggle the state
  };

  const handleSignIn = async (
    values: SignInValues,
    { setSubmitting }: FormikBag
  ): Promise<void> => {
    const reqData = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axios.post("/api/v1/auth/signin", reqData);

      // Axios automatically parses JSON, so you don't need to call `.json()`
      const data = response.data;

      // Save user data in redux
      dispatch(updateProfile({ data: data.user }));

      // Save the token in a cookie
      localStorage.setItem("token", data.token);

      // Navigate to dashboard
      navigate("/dashboard");

      console.log("Sign-in successful");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error during sign-in:", error.response?.data);
      } else {
        console.error("Error during sign-in:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Styled.MainRow navbarHeight={navbarHeight}>
      <Styled.MainCard>
        <Styled.StyledH1>Sign In if you're a member</Styled.StyledH1>
        <Formik
          initialValues={{ email: "", password: "", remember: true }}
          validate={(values) => {
            const errors: FormErrors = {};

            if (!values.email) {
              errors.email = "Please input your email / username";
            }
            if (!values.password) {
              errors.password = "Please input your password";
            }
            return errors;
          }}
          onSubmit={handleSignIn}
        >
          {({ values, errors, touched, handleSubmit, isSubmitting }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label=""
                validateStatus={
                  touched.email || values.email.length !== 0
                    ? !errors.email
                      ? "success"
                      : "error"
                    : ""
                }
                help={touched.email && errors.email ? errors.email : null}
              >
                <Field name="email">
                  {({ field }) => (
                    <FloatingInput
                      label="Email / Username"
                      name="email"
                      field={field}
                    />
                  )}
                </Field>
              </Form.Item>

              <Form.Item
                label=""
                validateStatus={
                  touched.password || values.password.length !== 0
                    ? !errors.password
                      ? "success"
                      : "error"
                    : ""
                }
                style={{ marginTop: "30px" }}
                help={
                  touched.password && errors.password ? errors.password : null
                }
              >
                <Field name="password">
                  {({ field }) => (
                    <FloatingLabelInputPassword
                      label="Password"
                      name="password"
                      field={field}
                    />
                  )}
                </Field>
              </Form.Item>

              <Form.Item>
                <Styled.SignInButton
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                >
                  Sign In
                </Styled.SignInButton>
              </Form.Item>
              <span>
                <Styled.ForgetTxt>
                  <Styled.StyleLink to="/forgot-password">
                    Forget Password?
                  </Styled.StyleLink>
                </Styled.ForgetTxt>
              </span>
              <Form.Item name="remember" valuePropName="checked"></Form.Item>
            </Form>
          )}
        </Formik>

        <p>
          <Styled.SignUpBtn>
            <Styled.StyleLink to="/signup">Sign Up</Styled.StyleLink>
          </Styled.SignUpBtn>
          to join QUICKPAYUS.
        </p>
        <Styled.PrivacyTxt>
          This page is protected by Google reCAPTCHA to ensure you&apos;re not a
          bot.
          <Styled.LearnMoreButton href="#" onClick={handleLearnMoreClick}>
            Learn more.
          </Styled.LearnMoreButton>
        </Styled.PrivacyTxt>
        <Styled.PrivacyTxt2 className={showMoreInfo ? "privacy-visible" : ""}>
          The information collected by Google reCAPTCHA is subject to the Google
          <a
            href="https://policies.google.com/privacy"
            className="color-blue"
            target="_blank"
          >
            Privacy Policy
          </a>
          and
          <a
            href="https://policies.google.com/terms"
            className="color-blue"
            target="_blank"
          >
            Terms of Service,
          </a>
          and is used for providing, maintaining, and improving the reCAPTCHA
          service and for general security purposes (it is not used for
          personalized advertising by Google).
        </Styled.PrivacyTxt2>
      </Styled.MainCard>
    </Styled.MainRow>
  );
};

export default SignIn;
