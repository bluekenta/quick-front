import { Col, Row, Avatar, Skeleton } from "antd";
import { useState, useEffect } from "react";
import * as Styled from "./Profile.styled.js";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ProfileAbout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [avatarColor, setAvatarColor] = useState(getRandomColor()); // Set random color

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Styled.AboutMainRow gutter={[72, 72]}>
      <Col span={24}>
        <Styled.StyledUserInfo>
          <Styled.StyledProfileAvatar style={{ backgroundColor: avatarColor }}>
            U
          </Styled.StyledProfileAvatar>
          <Styled.StyledNameLabel>User Name</Styled.StyledNameLabel>
          <Styled.StyledLevelLabel>Level: 1</Styled.StyledLevelLabel>
        </Styled.StyledUserInfo>
        <Styled.AboutBoxRow>
          <Styled.AboutBoxCol span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>First Name :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>User</Styled.AboutBoxP>
              </>
            )}
          </Styled.AboutBoxCol>
          <Styled.AboutBoxCol2 span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>Last Name :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>Name</Styled.AboutBoxP>
              </>
            )}
          </Styled.AboutBoxCol2>
        </Styled.AboutBoxRow>
        <Styled.AboutBoxRow>
          <Styled.AboutBoxCol span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>Country :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>Bangladesh</Styled.AboutBoxP>
              </>
            )}
          </Styled.AboutBoxCol>
          <Styled.AboutBoxCol2 span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>Number :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>+88045465464</Styled.AboutBoxP>{" "}
              </>
            )}
          </Styled.AboutBoxCol2>
        </Styled.AboutBoxRow>
        <Styled.AboutBoxRow>
          <Styled.AboutBoxCol span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>Email :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>email@gmail.com</Styled.AboutBoxP>{" "}
              </>
            )}
          </Styled.AboutBoxCol>
          <Styled.AboutBoxCol2 span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>Username :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>username</Styled.AboutBoxP>{" "}
              </>
            )}
          </Styled.AboutBoxCol2>
        </Styled.AboutBoxRow>
      </Col>
    </Styled.AboutMainRow>
  );
};

export default ProfileAbout;
