import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";

// antd
import { Badge, Menu, QRCode, Popover, Radio, MenuProps } from "antd";
import Icon, {
  CheckCircleOutlined,
  CopyOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

// hooks
import { useDevice } from "../../Utils/Hooks/useDevice";
import useNavbarHeight from "../../Utils/Hooks/useNavbarHeight";
import useThemeMode from "../../Utils/Hooks/useThemeMode";
import useIsSignin from "../../Utils/Hooks/useIsSignin";

// assets
import logoLight from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.svg";

// redux
import { useGetUnreadNotificationsCountQuery } from "../../Redux/slice";
import { updateSettingField } from "../../Redux/settingSlice";
import { selectSetting, selectProfile } from "../../Redux/selectors";
import { updateProfileField } from "../../Redux/profileSlice";

// styles
import * as Styled from "./Banner.styled";

const AnnouncementIcon = () => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="1 1 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5,7.087a3,3,0,0,0-3,3v3.826a3,3,0,0,0,2,2.816V21a1,1,0,0,0,1,1H9a1,1,0,0,0,1-1V17.423l10.609,4.5A1,1,0,0,0,22,21V3a1,1,0,0,0-1.391-.921L8.8,7.087ZM8,20H6V16.913H8Zm0-5.087H5a1,1,0,0,1-1-1V10.087a1,1,0,0,1,1-1H8Zm2-6.164L20,4.51V19.49L10,15.251Z" />
  </svg>
);

function getItem(label: any, key: any, icon: any, children: any, type: any) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const Banner = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const [avatarColor, setAvatarColor] = useState(getRandomColor()); // Set random color
  const [sMenuOpenKeys, setMenuOpenKeys] = useState<Array<string>>([]);

  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const setting = useSelector(selectSetting);
  const profile = useSelector(selectProfile);

  const navbarHeight = useNavbarHeight();
  const { themeMode } = useThemeMode();
  const isSignin = useIsSignin();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      if (event.target.parentNode.className.includes("avatarMenu0")) {
        return;
      }
      if (
        event.target.parentNode.id === "avatarMenu0" ||
        event.target.parentNode.id === "avatarMenu1"
      ) {
        return;
      }
      setCollapsed(false);
    }

    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      if (event.target.parentNode.parentNode.id === "mobileAvatarMenu") {
        return;
      }
      setCollapsed(false);
    }
  };

  const signout = useCallback(() => {
    localStorage.setItem("token", "");
    dispatch(updateProfileField({ field: "username", value: null }));
  }, []);

  useEffect(() => {
    setSelectedKey(themeMode);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedKey(setting.themeMode);
  }, [setting.themeMode]);

  useEffect(() => {
    if (!collapsed) {
      setMenuOpenKeys([]);
    }
  }, [collapsed]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleToggle = (e) => {
    e.preventDefault();
    toggleCollapsed();
  };

  const handleClick = (key) => {
    if (key === "dark" || key === "light" || key === "auto") {
      setSelectedKey(key);
      dispatch(updateSettingField({ field: "themeMode", value: key }));
      localStorage.setItem("themeMode", key);
    } else {
      setCollapsed(false);
    }
  };

  const handleShare = async () => {
    if (navigator && navigator.share) {
      navigator
        .share({
          title: "Awesome Content",
          text: "Check out this awesome content!",
          url: "https://example.com",
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Sharing failed:", error));
    } else {
      alert("Please use Share API support web browser");
    }
  };

  const menuItems: MenuProps["items"] = [
    getItem(<Link to="/profile">Profile</Link>, "1", null, null, null),
    getItem(<Link to="/settings">Settings</Link>, "2", null, null, null),
    getItem(<Link to="/support">Support</Link>, "3", null, null, null),
    getItem(
      "Mode",
      "sub2",
      null,
      [
        getItem(
          <Radio checked={selectedKey === "dark"}>Dark</Radio>,
          "dark",
          null,
          null,
          null
        ),
        getItem(
          <Radio checked={selectedKey === "light"}>Light</Radio>,
          "light",
          null,
          null,
          null
        ),
        getItem(
          <Radio checked={selectedKey === "auto"}>Auto</Radio>,
          "auto",
          null,
          null,
          null
        ),
      ],
      null
    ),
    {
      type: "divider",
      key: "10",
    },
    getItem(<a onClick={signout}>Sign Out</a>, "4", null, null, null),
  ];

  const userMenu = (
    <Menu
      onClick={(e) => handleClick(e.key)}
      selectedKeys={[selectedKey]}
      style={{
        borderInlineEnd: 0,
        width: 120,
      }}
      openKeys={sMenuOpenKeys}
      onOpenChange={setMenuOpenKeys}
      mode="inline"
      items={menuItems}
    />
  );

  const device = useDevice();
  const [openCloseNav, setOpenCloseNav] = useState(false);
  const handleNavigation = () => {
    setOpenCloseNav(!openCloseNav);
  };

  const [counter, setCounter] = useState(0);
  const {
    data: notifications,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetUnreadNotificationsCountQuery(null);

  useEffect(() => {
    if (isFetching || isLoading) {
      return;
    }
    if (isError) {
      return;
    }

    if (isSuccess) {
      setCounter(notifications?.total);
    }
  }, [isError, isFetching, isLoading, isSuccess, notifications]);

  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Styled.StyledHeader className="header" height={navbarHeight}>
      {device?.isBreakpoint("MD") && (
        <Styled.HeaderContainer>
          <Styled.PcLogoWrapper>
            <Link to="/dashboard">
              <Styled.PcLogo
                src={themeMode === "dark" ? logoDark : logoLight}
                alt="QUICKPAYUS"
              />
            </Link>
          </Styled.PcLogoWrapper>
          {isSignin && (
            <Styled.CtaContainer>
              <Popover
                trigger="click"
                overlayClassName="popover-qrcode"
                overlayStyle={{
                  padding: 9,
                }}
                overlayInnerStyle={{
                  padding: 10,
                  background: "var(--color-bg-container)",
                }}
                content={
                  <div>
                    <Styled.ReferralTitle>Referral code</Styled.ReferralTitle>
                    <QRCode value="https://quickpayus.com/username" />
                    <div className="d-flex">
                      <CopyToClipboard
                        text="https://quickpayus.com/username"
                        onCopy={onCopy}
                      >
                        <Styled.CopyToClipboardContent>
                          {copied ? "Copied!" : "Copy"} <CopyOutlined />{" "}
                        </Styled.CopyToClipboardContent>
                      </CopyToClipboard>
                      <Styled.ShareBtn onClick={handleShare}>
                        Share <ShareAltOutlined />
                      </Styled.ShareBtn>
                    </div>
                  </div>
                }
                style={{ background: "red" }}
              >
                <Styled.CustomQrCodeIcon />
              </Popover>
              <Link to="/announcements">
                <Icon
                  component={AnnouncementIcon}
                  style={{ fontSize: "14px", cursor: "pointer" }}
                />
              </Link>
              <Link to="/notifications">
                <Badge count={counter}>
                  <Styled.BellOutlinedNew />
                </Badge>
              </Link>
              <div>
                <Popover
                  trigger="click"
                  open={collapsed}
                  onOpenChange={setCollapsed}
                  overlayClassName="popover-menu"
                  overlayInnerStyle={{
                    padding: 0,
                    background: "var(--color-bg-container)",
                  }}
                  content={<>{userMenu}</>}
                >
                  <Styled.AvatarWrapper>
                    <Styled.StyledAvatar
                      className="avatarMenu0"
                      style={{ background: avatarColor }}
                    >
                      U
                    </Styled.StyledAvatar>
                    <Styled.AvatarInfo id="avatarMenu1">
                      <Styled.AvatarInfoP1>
                        {profile.username}
                      </Styled.AvatarInfoP1>
                      <Styled.AvatarInfoP2>Level 1</Styled.AvatarInfoP2>
                    </Styled.AvatarInfo>
                  </Styled.AvatarWrapper>
                </Popover>
              </div>
            </Styled.CtaContainer>
          )}
        </Styled.HeaderContainer>
      )}
      {!device?.isBreakpoint("MD") && (
        <div
          className={`nav-container container-xxl ${
            openCloseNav ? "active menu-opened" : ""
          }`}
        >
          <nav>
            <ul className="mobile-nav ps-0 ">
              <li>
                <div
                  className="menu-icon-container"
                  onClick={() => handleNavigation()}
                >
                  <div className="menu-icon">
                    <span className="line-1"></span>
                    <span className="line-2"></span>
                  </div>
                </div>
              </li>
              <li>
                <ul
                  style={{
                    display: "flex",
                    alignItems: "center",
                    listStyle: "none",
                    paddingLeft: "0px",
                    gap: "10px",
                  }}
                >
                  <li>
                    <Popover
                      trigger="click"
                      overlayClassName="popover-qrcode"
                      overlayStyle={{
                        padding: 9,
                      }}
                      overlayInnerStyle={{
                        padding: 10,
                        background: "var(--color-bg-container)",
                      }}
                      content={
                        <>
                          <div>
                            <p
                              style={{
                                paddingBottom: "10px",
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                            >
                              Referral code
                            </p>
                            <QRCode
                              value="https://quickpayus.com/username"
                              style={{
                                marginTop: "0px",
                              }}
                            />
                            <div className="d-flex">
                              <CopyToClipboard
                                text="https://quickpayus.com/username"
                                onCopy={onCopy}
                              >
                                <Styled.CopyToClipboardContent>
                                  {copied ? "Copied!" : "Copy"} <CopyOutlined />{" "}
                                </Styled.CopyToClipboardContent>
                              </CopyToClipboard>
                              <Styled.ShareBtn onClick={handleShare}>
                                Share <ShareAltOutlined />
                              </Styled.ShareBtn>
                            </div>
                          </div>
                        </>
                      }
                    >
                      <Styled.CustomQrCodeIcon />
                    </Popover>
                  </li>

                  <li>
                    <Link to="/announcements">
                      <Icon
                        component={AnnouncementIcon}
                        style={{ fontSize: "14px", cursor: "pointer" }}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="/notifications">
                      <Badge count={counter}>
                        <Styled.BellOutlinedNew />
                      </Badge>
                    </Link>
                  </li>
                  <li>
                    <Popover
                      trigger="click"
                      open={collapsed}
                      onOpenChange={setCollapsed}
                      overlayClassName="popover-menu"
                      overlayStyle={{
                        padding: "3px 5px",
                      }}
                      overlayInnerStyle={{
                        padding: 0,
                        background: "var(--color-bg-container)",
                      }}
                      content={<>{userMenu}</>}
                    >
                      <Styled.AvatarWrapper id="mobileAvatarMenu">
                        <Styled.StyledAvatar>U</Styled.StyledAvatar>
                      </Styled.AvatarWrapper>
                    </Popover>
                  </li>
                </ul>
              </li>
            </ul>

            <ul className="desktop-nav ps-0">
              <li>
                <Link
                  to="/#"
                  className="link-logo"
                  onClick={() => setOpenCloseNav(false)}
                ></Link>
              </li>
              <li>
                <Link to="/dashboard" onClick={() => setOpenCloseNav(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/transaction" onClick={() => setOpenCloseNav(false)}>
                  Transactions
                </Link>
              </li>
              <li>
                <Link to="/deposit" onClick={() => setOpenCloseNav(false)}>
                  Deposit
                </Link>
              </li>
              <li>
                <Link to="/withdrawal" onClick={() => setOpenCloseNav(false)}>
                  Withdraw
                </Link>
              </li>
              <li>
                <Link to="/referrals" onClick={() => setOpenCloseNav(false)}>
                  Referrals
                </Link>
              </li>
              <li>
                <Link
                  to="/rank"
                  className="nav-link me-0"
                  onClick={() => setOpenCloseNav(false)}
                >
                  Rank
                </Link>
              </li>
            </ul>

            <Styled.MobileLogoWrapper>
              <Styled.MobileLogoLink to="/dashboard">
                <Styled.MobileLogo
                  src={themeMode === "dark" ? logoDark : logoLight}
                  alt="QUICKPAYUS"
                />
              </Styled.MobileLogoLink>
            </Styled.MobileLogoWrapper>
          </nav>
        </div>
      )}
    </Styled.StyledHeader>
  );
};

export default Banner;
