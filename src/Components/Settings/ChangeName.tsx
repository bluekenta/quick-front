import React, { useState } from "react";
import styled from "styled-components";

// antd
import { Button, Form, Input, Card, message, Modal } from "antd";

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

const ChangeNamePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("user@example.com"); // Assuming email is predefined
  const [password, setPassword] = useState("");

  const handleNameChangeSubmit = (values: any) => {
    const { name } = values;
    setName(name);
    setIsModalVisible(true);
  };

  const handlePasswordSubmit = (values: any) => {
    const { password } = values;
    setPassword(password);

    // Dummy login logic
    if (password === "password") {
      message.success("Name updated successfully");
      setIsModalVisible(false);
    } else {
      message.error("Invalid password");
    }
  };

  return (
    <>
      <Card>
        <StyledTitle>Change Name</StyledTitle>
        <Form
          name="change_name_form"
          initialValues={{ name }}
          onFinish={handleNameChangeSubmit}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="confirmName"
            dependencies={["name"]}
            rules={[
              { required: true, message: "Please confirm your Name!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("name") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two names do not match!")
                  );
                },
              }),
            ]}
          >
            <Input placeholder="Confirm Name" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Change Name
          </Button>
        </Form>
      </Card>

      <Modal
        title="Confirm Password"
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        centered
        getContainer={() => document.getElementById("app-modals")}
      >
        <Form name="password_form" onFinish={handlePasswordSubmit}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeNamePage;
