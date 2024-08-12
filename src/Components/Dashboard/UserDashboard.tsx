import { useState, useEffect } from "react";

// antd
import { Row, Col, Skeleton, theme } from "antd";

// components
import EChart from "./Charts";

// styles
import * as Styled from "./Style/Dashboard.styled";
import { selectProfile } from "../../Redux/selectors";
import { useSelector } from "react-redux";


const UserDashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const profile = useSelector(selectProfile);
  // console.log(profile); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Styled.StyledHeading>Account Overview</Styled.StyledHeading>
      <Row>
        <Col md={24} xl={24} xs={24}>
          {/* Account Balance */}
          <Styled.OverviewCardWrapper gutter={[16, 16]}>
            <Col span={24}>
              <Styled.OverviewCard
                className="dashboard-card"
                style={{ padding: "0" }}
              >
                <Row gutter={[16, 16]}>
                  <Col sm={8} xs={8} md={8} xl={8} style={{ padding: 0 }}>
                    <Styled.CardCol className={loading ? "" : "br-1"}>
                      {loading ? (
                        <Styled.SkeletonInputCustom active size="small" />
                      ) : (
                        <>
                          <Styled.CardH3>Account Balance</Styled.CardH3>
                          <Styled.CardP>${profile.profitBalance}</Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                  <Col sm={8} xs={8} md={8} xl={8} style={{ padding: 0 }}>
                    <Styled.CardCol className={loading ? "" : "br-1"}>
                      {loading ? (
                        <Styled.SkeletonInputCustom active size="small" />
                      ) : (
                        <>
                          <Styled.CardH3>Principle Balance</Styled.CardH3>
                          <Styled.CardP>${profile.depositBalance}</Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                  <Col sm={8} xs={8} md={8} xl={8} style={{ padding: 0 }}>
                    <Styled.CardCol>
                      {loading ? (
                        <Styled.SkeletonInputCustom active size="small" />
                      ) : (
                        <>
                          <Styled.CardH3>Profit Balance</Styled.CardH3>
                          <Styled.CardP>${profile.profitBalance}</Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                </Row>
              </Styled.OverviewCard>
            </Col>
          </Styled.OverviewCardWrapper>
          <Styled.OverviewCardWrapper gutter={[16, 16]}>
            <Col span={24}>
              <Styled.OverviewCard
                className="dashboard-card"
                style={{ padding: "0" }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={8} sm={8} md={8} xl={8} style={{ padding: 0 }}>
                    <Styled.CardCol className={loading ? "" : "br-1"}>
                      {loading ? (
                        <Styled.SkeletonInputCustom
                          className="w-100"
                          active
                          size="small"
                        />
                      ) : (
                        <>
                          <Styled.CardH3>Equity Balance</Styled.CardH3>
                          <Styled.CardP>${profile.depositBalance}</Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                  <Col xs={8} sm={8} md={8} xl={8} style={{ padding: 0 }}>
                    <Styled.CardCol className={loading ? "" : "br-1"}>
                      {loading ? (
                        <Styled.SkeletonInputCustom
                          className="w-100"
                          active
                          size="small"
                        />
                      ) : (
                        <>
                          <Styled.CardH3>Principle Balance</Styled.CardH3>
                          <Styled.CardP>${profile.depositBalance}</Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                  <Col xs={8} sm={8} md={8} xl={8} style={{ padding: 0 }}>
                    <Styled.CardCol>
                      {loading ? (
                        <Styled.SkeletonInputCustom
                          className="w-100"
                          active
                          size="small"
                        />
                      ) : (
                        <>
                          <Styled.CardH3>Referral Credits</Styled.CardH3>
                          <Styled.CardP>${profile.referralCreditBalance}</Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                </Row>
              </Styled.OverviewCard>
            </Col>
          </Styled.OverviewCardWrapper>
          <Styled.OverviewCardWrapper gutter={[16, 16]}>
            <Col span={24}>
              <Styled.OverviewCard
                className="dashboard-card"
                style={{ padding: "0" }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={8} sm={8} md={8} xl={8}>
                    <Styled.CardCol>
                      {loading ? (
                        <Styled.SkeletonInputCustom
                          className="w-100"
                          active
                          size="small"
                        />
                      ) : (
                        <>
                          <Styled.CardH3>Rank Reward Balance</Styled.CardH3>
                          <Styled.CardP>${profile.rewardBalance}</Styled.CardP>
                        </>
                      )}
                    </Styled.CardCol>
                  </Col>
                </Row>
              </Styled.OverviewCard>
            </Col>
          </Styled.OverviewCardWrapper>
          <Styled.ChartRow gutter={[16, 16]}>
            <Col span={24}>
              <Styled.ChartCard className="dashboard-card">
                {loading ? (
                  <>
                    <Skeleton active paragraph={{ rows: 15 }} />
                  </>
                ) : (
                  <EChart/>
                )}
              </Styled.ChartCard>
            </Col>
          </Styled.ChartRow>
        </Col>
      </Row>
    </>
  );
};

export default UserDashboard;
