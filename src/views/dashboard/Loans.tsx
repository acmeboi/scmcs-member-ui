import { Row, Col, Card, Statistic, Progress, Spin, Empty, Typography, Divider } from 'antd';
import { CreditCardOutlined, CheckCircleOutlined, DollarOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import { useGetOutstandingLoansQuery } from '@/viewmodels/dashboard.viewmodel';
import { colors } from '@/config/theme';
import { formatNaira } from '@/utils/format';

const { Title, Text } = Typography;

// Helper function to get progress color based on percentage
const getProgressColor = (percentage: number): string => {
  if (percentage >= 75) {
    return colors.success; // Green
  } else if (percentage >= 50) {
    return colors.info; // Blue
  } else if (percentage >= 25) {
    return '#FF9800'; // Orange
  } else {
    return colors.error; // Red
  }
};

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
                title={card.type === 'total' ? 'Overall Total (Balance Remaining)' : card.title}
                value={card.balance ?? card.amount}
                prefix={<CreditCardOutlined style={{ color: card.type === 'total' ? colors.primary : colors.error }} />}
                formatter={(value) => formatNaira(Number(value))}
                valueStyle={{
                  color: card.type === 'total' ? colors.primary : colors.error,
                  fontSize: card.type === 'total' ? 'clamp(24px, 4.5vw, 32px)' : 'clamp(18px, 3.5vw, 24px)',
                  fontWeight: card.type === 'total' ? 600 : 500,
                }}
              />
              
              {(card.paidAmount !== undefined || card.balance !== undefined) && (
                <>
                  <Divider style={{ margin: '12px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <DollarOutlined style={{ color: colors.textSecondary, fontSize: 14 }} />
                      <Text style={{ fontSize: 13, color: colors.textSecondary }}>Loan Amount:</Text>
                    </div>
                    <Text strong style={{ fontSize: 14, color: colors.text }}>
                      {formatNaira(card.amount)}
                    </Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircleOutlined style={{ color: colors.success, fontSize: 14 }} />
                      <Text style={{ fontSize: 13, color: colors.textSecondary }}>Paid:</Text>
                    </div>
                    <Text strong style={{ fontSize: 14, color: colors.success }}>
                      {formatNaira(card.paidAmount ?? 0)}
                    </Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: `1px solid ${colors.borderLight}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CreditCardOutlined style={{ color: colors.error, fontSize: 14 }} />
                      <Text strong style={{ fontSize: 13, color: colors.text }}>Balance:</Text>
                    </div>
                    <Text strong style={{ fontSize: 15, color: colors.error }}>
                      {formatNaira(card.balance ?? card.amount)}
                    </Text>
                  </div>
                </>
              )}

              {card.progress && (
                <div style={{ marginTop: 16 }}>
                  <Progress
                    percent={card.progress.percentage}
                    status={card.progress.percentage >= 100 ? 'success' : 'active'}
                    strokeColor={getProgressColor(card.progress.percentage)}
                    style={{ marginBottom: 8 }}
                  />
                  <div style={{ fontSize: 12, color: colors.textTertiary, lineHeight: 1.6 }}>
                    {card.type !== 'total' && (
                      <>
                        <div>Time Progress: {card.progress.timeProgress.toFixed(1)}%</div>
                        <div>Months Remaining: {card.progress.monthsRemaining}</div>
                        {card.progress.startDate && card.progress.endDate && (
                          <div style={{ marginTop: 4 }}>
                            {card.progress.startDate} - {card.progress.endDate}
                          </div>
                        )}
                      </>
                    )}
                    {card.type === 'total' && (
                      <div>Overall Progress: {card.progress.percentage.toFixed(1)}%</div>
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

