import React, { useState } from "react";
import styled from "styled-components";

// antd
import { Form, Input, Button, Upload, Modal, Card } from "antd";
import { InboxOutlined } from "@ant-design/icons";

// breakpoints
import { breakpoint } from "../../breakpoints";

const { TextArea } = Input;

export const Title = styled.h2`
  font-weight: var(--font-weight-page-title);
  margin-bottom: var(--margin-bottom-page-title);
  text-align: center;
  ${breakpoint.md} {
    text-align: left;
  }
`;

export const StyledCard = styled(Card)`
  margin-bottom: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

const FeedbackForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = (values: any) => {
    console.log("Received values:", values);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
  };

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <>
      <Title>Send Feedback</Title>

      <Form
        form={form}
        name="feedback_form"
        onFinish={onFinish}
        layout="vertical"
      >
        <StyledCard>
          <Form.Item
            name="feedback"
            label="Feedback"
            rules={[{ required: true, message: "Please input feedback!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Attach Screenshot">
            <Upload.Dragger
              name="files"
              multiple={false}
              fileList={fileList}
              onChange={handleUploadChange}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
        </StyledCard>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit">
            Submit Feedback
          </Button>
        </ButtonWrapper>
      </Form>

      <Modal
        title="Feedback Submitted"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleCancel}>
            OK
          </Button>,
        ]}
        centered
        getContainer={() => document.getElementById("app-modals")}
      >
        <p>Thank you for your feedback!</p>
        <p>We'll review it and get back to you if necessary.</p>
      </Modal>
    </>
  );
};

export default FeedbackForm;
