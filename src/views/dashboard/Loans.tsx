import { Row, Col, Card, Statistic, Progress, Spin, Empty, Typography } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import { useGetOutstandingLoansQuery } from '@/viewmodels/dashboard.viewmodel';
import { colors } from '@/config/theme';
import { formatNaira } from '@/utils/format';

const { Title } = Typography;

const Loans: React.FC = () => {
  const { data: loans, isLoading } = useGetOutstandingLoansQuery();

  if (isLoading) {
    return (
      <MainLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (!loans || loans.cards.length === 0) {
    return (
      <MainLayout>
        <Title level={1} style={{ marginBottom: 24, color: colors.text, fontSize: 'clamp(24px, 5vw, 32px)' }}>
          Outstanding Loans
        </Title>
        <Empty description="No outstanding loans" />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Title level={1} style={{ marginBottom: 24, color: colors.text, fontSize: 'clamp(24px, 5vw, 32px)' }}>
        Outstanding Loans
      </Title>
      <Row gutter={[16, 16]}>
        {loans.cards.map((card) => (
          <Col
            xs={24}
            sm={24}
            md={card.type === 'total' ? 24 : 12}
            lg={card.type === 'total' ? 24 : 8}
            key={card.type}
          >
            <Card
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: card.type === 'total' ? `2px solid ${colors.primary}` : `1px solid ${colors.borderLight}`,
                background: card.type === 'total' ? colors.backgroundLight : colors.background,
              }}
            >
              <Statistic
                title={card.title}
                value={card.amount}
                prefix={<CreditCardOutlined style={{ color: card.type === 'total' ? colors.primary : colors.error }} />}
                formatter={(value) => formatNaira(Number(value))}
                valueStyle={{
                  color: card.type === 'total' ? colors.primary : colors.error,
                  fontSize: card.type === 'total' ? 'clamp(24px, 4.5vw, 32px)' : 'clamp(18px, 3.5vw, 24px)',
                  fontWeight: card.type === 'total' ? 600 : 500,
                }}
              />
              {card.progress && (
                <div style={{ marginTop: 16 }}>
                  <Progress
                    percent={card.progress.percentage}
                    status={card.progress.percentage >= 100 ? 'success' : 'active'}
                    strokeColor={card.progress.percentage >= 100 ? colors.success : colors.primary}
                    style={{ marginBottom: 8 }}
                  />
                  <div style={{ fontSize: 12, color: colors.textTertiary, lineHeight: 1.6 }}>
                    <div>Time Progress: {card.progress.timeProgress.toFixed(1)}%</div>
                    <div>Months Remaining: {card.progress.monthsRemaining}</div>
                    {card.progress.startDate && card.progress.endDate && (
                      <div style={{ marginTop: 4 }}>
                        {card.progress.startDate} - {card.progress.endDate}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
};

export default Loans;

