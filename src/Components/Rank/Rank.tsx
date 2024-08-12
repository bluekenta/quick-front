import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Skeleton } from "antd";
import * as Styled from "./Rank.styled";

import RankChart from "./Charts";

const { Meta } = Card;

const MyComponent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isClaimed, setisClaimed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Styled.RankTitle>Rank</Styled.RankTitle>
      <Styled.RankDataWrapper>
        <Styled.RankSubtitleWrapper>
          <Styled.RankSubtitle>Statistics</Styled.RankSubtitle>
        </Styled.RankSubtitleWrapper>
        <Row>
          <Col span={24} md={12}>
            <Styled.RankCol1>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3>Current Rank</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? <Skeleton.Input size="small" active /> : "N/A"}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3>Starts On</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? (
                      <Skeleton.Input size="small" active />
                    ) : (
                      "20/03/2024"
                    )}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3>Ends On</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? (
                      <Skeleton.Input size="small" active />
                    ) : (
                      "20/03/2024"
                    )}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
            </Styled.RankCol1>
          </Col>
          <Col span={24} md={12}>
            <Styled.RankCol2>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3 className="text-left">Current Sales Revenue</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? (
                      <Skeleton.Input size="small" active />
                    ) : (
                      "$ 100000"
                    )}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3 className="text-left">Direct Referrals</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? <Skeleton.Input size="small" active /> : "200"}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3 className="text-left">Meeting compliance</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? <Skeleton.Input size="small" active /> : "200"}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
            </Styled.RankCol2>
          </Col>
        </Row>
        {isClaimed ? (
          <>
            <Styled.RankDataDescription>
              <b>Congratulations!</b> You have achieved your milestone. You can
              claim your rewards.
            </Styled.RankDataDescription>
            <Styled.RankResultWrapper>
              <Styled.RankResultTitle>Rank:</Styled.RankResultTitle>
              <Styled.RankResultContent>
                {loading ? <Skeleton.Input size="small" active /> : "Leader 1"}
              </Styled.RankResultContent>
              <Styled.RankResultTitle>Reward Range:</Styled.RankResultTitle>
              <Styled.RankResultContent>
                {loading ? (
                  <Skeleton.Input size="small" active />
                ) : (
                  "300 - 500$"
                )}
              </Styled.RankResultContent>
            </Styled.RankResultWrapper>
          </>
        ) : null}
        <Styled.ClaimRewardBtnWrapper>
          <Styled.ClaimRewardBtn
            type="primary"
            size="large"
            onClick={() => {
              setisClaimed(true);
            }}
          >
            Claim
          </Styled.ClaimRewardBtn>
        </Styled.ClaimRewardBtnWrapper>
      </Styled.RankDataWrapper>
      <Styled.RankChartWrapper>
        <RankChart />
      </Styled.RankChartWrapper>
    </>
  );
};

export default MyComponent;
