import React, { useState } from "react";
import { Formik, Field, FormikHelpers } from "formik";

// antd
import {
  Form,
  Col,
  Modal,
  Input,
  Button,
  message,
  Card,
  Typography,
} from "antd";

// styles
import * as Styled from "./Changepassword.style";

interface FormErrors {
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
}

const ChangePassword: React.FC = () => {
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpError, setOtpError] = useState("");

  const handleChangePassword = (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => {
    setIsSubmitting(true);
    const errors = validateForm(values);

    if (Object.keys(errors).length > 0) {
      formikHelpers.setErrors(errors);
      setIsSubmitting(false);
    } else {
      console.log("Change Password Values:", values);
      setIsOtpModalVisible(true);
      setIsSubmitting(false); // Stop submitting after opening the OTP modal
    }
  };

  const handleOtpSubmit = () => {
    if (otp === "123456") {
      // Dummy OTP validation logic
      message.success("Password changed successfully!");
      setIsOtpModalVisible(false);
      setIsSubmitting(false);
    } else {
      setOtpError("Invalid OTP");
    }
  };

  const validateForm = (values: any): FormErrors => {
    const errors: FormErrors = {};
    if (!values.currentPassword) {
      errors.currentPassword = "Please input current password!";
    }
    if (!values.password) {
      errors.password = "Please input new password!";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please input confirm password!";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <>
      <Card>
        <Styled.Title level={3}>Change Password</Styled.Title>
        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            confirmPassword: "",
          }}
          validate={validateForm}
          onSubmit={handleChangePassword}
        >
          {({ errors, handleSubmit, touched, values }) => (
            <Form style={{ width: "100%" }} onFinish={handleSubmit}>
              <Form.Item
                validateStatus={
                  touched.currentPassword || values.currentPassword.length !== 0
                    ? !errors.currentPassword
                      ? "success"
                      : "error"
                    : ""
                }
                help={
                  touched.currentPassword && errors.currentPassword
                    ? errors.currentPassword
                    : null
                }
              >
                <Field name="currentPassword">
                  {({ field }) => (
                    <Input
                      type="password"
                      name="currentPassword"
                      placeholder="Current Password"
                    />
                  )}
                </Field>
              </Form.Item>
              <Form.Item
                validateStatus={
                  touched.password || values.password.length !== 0
                    ? !errors.password
                      ? "success"
                      : "error"
                    : ""
                }
                help={
                  touched.password && errors.password ? errors.password : null
                }
                style={{ marginTop: "24px" }}
              >
                <Field name="password">
                  {({ field }) => (
                    <Input
                      type="password"
                      name="password"
                      placeholder="New Password"
                    />
                  )}
                </Field>
              </Form.Item>
              <Form.Item
                validateStatus={
                  touched.confirmPassword || values.confirmPassword.length !== 0
                    ? !errors.confirmPassword
                      ? "success"
                      : "error"
                    : ""
                }
                help={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : null
                }
                style={{ marginTop: "24px" }}
              >
                <Field name="confirmPassword">
                  {({ field }) => (
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                  )}
                </Field>
              </Form.Item>
              <Col span={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                  block
                >
                  Change Password
                </Button>
              </Col>
            </Form>
          )}
        </Formik>
      </Card>

      <Modal
        title="Enter OTP"
        open={isOtpModalVisible}
        onCancel={() => setIsOtpModalVisible(false)}
        footer={null}
        centered
        getContainer={() => document.getElementById("app-modals")}
      >
        <Form onFinish={handleOtpSubmit}>
          <Form.Item
            label="OTP"
            validateStatus={otpError ? "error" : ""}
            help={otpError || ""}
          >
            <Input
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setOtpError("");
              }}
              placeholder="Enter OTP"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePassword;
