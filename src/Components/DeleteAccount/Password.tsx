import React, { useState } from "react";
import { Col, Form, Modal, Input, Button } from "antd";
import { Formik, Field } from "formik";
import * as Styled from "./accountdelete.styled";
import FloatingLabelInputPassword from "../Auth/FloatingInput/FloatingInputPassword";

interface FormErrors {
  password?: string;
}

interface DeleteAccountValues {
  password: string;
}

const AccountDelete: React.FC = () => {
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [otp, setOtp] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  const handlePasswordSubmit = async (
    values: DeleteAccountValues
  ): Promise<void> => {
    setDeletePassword(values.password);
    setOtpModalVisible(true);
  };

  const handleOtpSubmit = async () => {
    // Simulate OTP verification process
    if (otp === "123456") {
      // Assuming 123456 as the correct OTP for demonstration
      setOtpModalVisible(false);
      setConfirmationModalVisible(true);
    } else {
      console.error("Invalid OTP");
    }
  };

  const handleFinalDeleteAccount = async () => {
    // Simulate account deletion process
    if (deletePassword) {
      console.log("Account deletion successful");
      setConfirmationModalVisible(false);
    } else {
      console.error("Error during account deletion");
    }
  };

  return (
    <Styled.MainRow className="account-delete">
      <Col xs={24} sm={14} md={12} lg={10} xl={9}>
        <Styled.MainCard>
          <Styled.StyledH1>Delete Your Account</Styled.StyledH1>
          <Formik
            initialValues={{ password: "" }}
            validate={(values) => {
              const errors: FormErrors = {};
              if (!values.password) {
                errors.password = "Please input your password";
              }
              return errors;
            }}
            onSubmit={handlePasswordSubmit}
          >
            {({ errors, handleSubmit, isSubmitting }) => (
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label=""
                  validateStatus={errors.password && "error"}
                  style={{ marginTop: "30px" }}
                  help={errors.password}
                >
                  <Field name="password">
                    {({ field }) => (
                      <FloatingLabelInputPassword
                        label="Password"
                        field={field}
                        name="password"
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
                    Delete My Account
                  </Styled.SignInButton>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </Styled.MainCard>
      </Col>

      <Modal
        title="Enter OTP"
        open={otpModalVisible}
        onOk={handleOtpSubmit}
        onCancel={() => setOtpModalVisible(false)}
        centered
        getContainer={() => document.getElementById("app-modals")}
      >
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Modal>

      <Modal
        title="Confirm Account Deletion"
        open={confirmationModalVisible}
        onOk={handleFinalDeleteAccount}
        onCancel={() => setConfirmationModalVisible(false)}
        centered
        getContainer={() => document.getElementById("app-modals")}
      >
        <p>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
      </Modal>
    </Styled.MainRow>
  );
};

export default AccountDelete;
