import { Switch } from "antd";
import logoutIcon from "../../assets/images/logout-icon.svg";
import deleteicon from "../../assets/images/delete.svg";
import rightArrow from "../../assets/images/red-right-arrow.svg";
import * as Styled from "./settings.styled.js";
import { LogoutOutlined } from "@ant-design/icons";
import { RightOutlined } from "@ant-design/icons";

const AccountDeactivation = () => {
  return (
    <Styled.SettingsBox>
      <Styled.SettingsBoxH2>Account</Styled.SettingsBoxH2>
      <div>
        <Styled.CustomLink to="/settings/deactivate-account">
          <Styled.SettingsBoxP>Deactivate Account</Styled.SettingsBoxP>
          <RightOutlined />
          {/* <Switch checked /> */}
        </Styled.CustomLink>
        <Styled.CustomLink to="/settings/account-deletion">
          <Styled.deletebtn>Delete Account </Styled.deletebtn>
          <img
            src={deleteicon}
            alt="."
            style={{ display: "block", width: "14px", opacity: "0.7" }}
          />
        </Styled.CustomLink>
        <Styled.CustomLink to="/signin">
          <Styled.SettingsBoxP>Sign Out </Styled.SettingsBoxP>
          <LogoutOutlined />
        </Styled.CustomLink>
      </div>
    </Styled.SettingsBox>
  );
};

export default AccountDeactivation;
