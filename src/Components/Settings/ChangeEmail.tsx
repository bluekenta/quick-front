import React from "react";
import styled from "styled-components";

// antd
import { Input, Button, Card, Form } from "antd";

// breakpoints
import { breakpoint } from "../../breakpoints";

const StyledTitle = styled.h1`
  text-align: center;
  font-weight: var(--font-weight-page-title);
  margin-bottom: var(--margin-bottom-page-title);
  font-size: var(--font-size-page-title);
  ${breakpoint.md} {
    text-align: left;
  }
`;

const ChangeEmail: React.FC = () => {
  const handleChangeEmail = (values) => {
    console.log(values);
    // Here you would typically make an API call to change the email
    // Example:
    // changeEmail({ currentPassword, newEmail })
    //   .then(response => { /* handle success */ })
    //   .catch(error => { setError(error.message); });
    // For this example, we'll just clear the fields and log a message
    // console.log("Email changed successfully");
  };

  return (
    <Card>
      <StyledTitle>Change Email</StyledTitle>
      <Form name="change_email_form" onFinish={handleChangeEmail}>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input current password!" },
          ]}
        >
          <Input
            placeholder="Current Password"
            type="password"
            name="password"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input new email!" }]}
        >
          <Input placeholder="New Email" type="email" name="email" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Change Email
        </Button>
      </Form>
    </Card>
  );
};

export default ChangeEmail;
