import React, { useCallback } from "react";
import styled from "styled-components";

// antd
import { AutoComplete, Avatar } from "antd";

const StyledAutoComplete = styled(AutoComplete)`
  width: 100%;
  height: 40px;
`;

const collaborators = [
  { label: "hamada", value: "hamada", avatar: "http://localhost/1.png" },
  { label: "kono", value: "kono", avatar: "http://localhost/1.png" },
  // Add more collaborators as needed
];

interface ReferralInputProps {
  field: any;
  onChange: (value: string) => void;
}

export const ReferralInput: React.FC<ReferralInputProps> = ({
  field,
  onChange,
}) => {
  const handleChange = useCallback((value) => {
    onChange(value);
  }, []);

  return (
    <StyledAutoComplete
      value={field.value}
      onBlur={field.onBlur}
      onChange={handleChange}
      options={collaborators.map((collaborator) => ({
        value: collaborator.value,
        label: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={collaborator.avatar} style={{ marginRight: 8 }} />
            {collaborator.label}
          </div>
        ),
      }))}
      placeholder="Select a referral"
    />
  );
};
