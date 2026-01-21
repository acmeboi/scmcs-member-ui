import MainLayout from '@/components/layout/MainLayout';
import { colors } from '@/config/theme';
import { formatNaira } from '@/utils/format';
import { useGetContributionsChartQuery, useGetContributionsQuery, useGetDeductionHistoryQuery, useGetOutstandingLoansQuery, useGetTotalContributionsChartQuery, useGetTotalContributionsQuery } from '@/viewmodels/dashboard.viewmodel';
import {
  BankOutlined,
  CreditCardOutlined,
  DollarOutlined,
  FallOutlined,
  FundOutlined,
  RiseOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { Card, Col, Row, Skeleton, Statistic, Typography } from 'antd';
import { Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const { Title, Text } = Typography;

// Custom tooltip for pie chart
const PieTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: colors.background,
          border: `1px solid ${colors.border}`,
          borderRadius: 4,
          padding: '8px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <p style={{ margin: 0, fontWeight: 500, color: colors.text }}>
          {payload[0].name}
        </p>
        <p style={{ margin: '4px 0 0 0', color: colors.textSecondary }}>
          {formatNaira(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

// Custom tooltip for line chart
const LineTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: colors.background,
          border: `1px solid ${colors.border}`,
          borderRadius: 4,
          padding: '8px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <p style={{ margin: 0, fontWeight: 500, color: colors.text }}>
          {label}
        </p>
        <p style={{ margin: '4px 0 0 0', color: colors.textSecondary }}>
          {formatNaira(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

// Skeleton Components
const MonthlyContributionCardSkeleton = () => (
  <Card
    style={{
      borderRadius: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      border: `1px solid ${colors.borderLight}`,
    }}
    bodyStyle={{ padding: 20 }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <Skeleton.Avatar
        active
        size={48}
        shape="square"
        style={{ borderRadius: 12, marginRight: 16 }}
      />
      <div style={{ flex: 1 }}>
        <Skeleton.Input active size="small" style={{ width: 100, marginBottom: 8 }} />
        <Skeleton.Input active size="large" style={{ width: 120, height: 28 }} />
      </div>
    </div>
  </Card>
);

const TotalContributionCardSkeleton = () => (
  <Card
    style={{
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: `1px solid ${colors.borderLight}`,
    }}
  >
    <Skeleton active paragraph={{ rows: 2, width: ['60%', '40%'] }} />
  </Card>
);

const SummaryCardSkeleton = () => (
  <Card
    style={{
      borderRadius: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      border: `1px solid ${colors.borderLight}`,
    }}
    bodyStyle={{ padding: 20 }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <Skeleton.Avatar
        active
        size={48}
        shape="square"
        style={{ borderRadius: 12, marginRight: 16 }}
      />
      <div style={{ flex: 1 }}>
        <Skeleton.Input active size="small" style={{ width: 120, marginBottom: 8 }} />
        <Skeleton.Input active size="large" style={{ width: 140, height: 28 }} />
      </div>
    </div>
  </Card>
);

const ChartCardSkeleton = () => (
  <Card
    style={{
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: `1px solid ${colors.borderLight}`,
    }}
  >
    <Skeleton active paragraph={{ rows: 0 }} />
    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Skeleton.Image
        active
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
        }}
      />
    </div>
  </Card>
);

const Dashboard: React.FC = () => {
  const { data: contributions, isLoading: contributionsLoading, isFetching: contributionsFetching } = useGetContributionsQuery();
  const { data: totalContributionsData, isLoading: totalContributionsLoading, isFetching: totalContributionsFetching } = useGetTotalContributionsQuery();
  const { data: loans, isLoading: loansLoading, isFetching: loansFetching } = useGetOutstandingLoansQuery();
  const { data: deductions, isLoading: deductionsLoading, isFetching: deductionsFetching } = useGetDeductionHistoryQuery({ months: 1 });
  const { data: contributionsChart, isLoading: contributionsChartLoading, isFetching: contributionsChartFetching, error: contributionsChartError } = useGetContributionsChartQuery();
  const { data: totalContributionsChart, isLoading: totalContributionsChartLoading, isFetching: totalContributionsChartFetching } = useGetTotalContributionsChartQuery();

  // Calculate total contributions from Total Contributions endpoint (Thrif + Savings + Share)
  const totalContributions = totalContributionsData?.cards
    .filter(card => card.type === 'thrif' || card.type === 'savings' || card.type === 'share')
    .reduce((sum, card) => sum + card.amount, 0) || 0;
  const totalLoans = loans?.cards.find(card => card.type === 'total')?.amount || 0;
  const recentDeductions = deductions?.summary.totalAmount || 0;

  // Pie chart data and colors for monthly contributions
  const pieChartData = contributionsChart?.data || [];
  const pieChartColors: Record<string, string> = {
    'Thrif': colors.primary,
    'Special Savings': colors.success,
    'Share': colors.info,
  };

  // Custom label for pie chart
  const renderPieLabel = (entry: { name?: string; value?: number; percent?: number }) => {
    if (!entry.name || entry.value === undefined) return '';
    const percent = entry.percent ? entry.percent.toFixed(1) : '0';
    return `${entry.name}\n${percent}%`;
  };

  // Bar chart data for total contributions
  const barChartData = totalContributionsChart?.data || [];

  // Card configuration with visual enhancements
  const getCardConfig = (type: string) => {
    const configs: Record<string, { 
      icon: React.ReactNode; 
      gradient: string; 
      borderColor: string;
      iconBg: string;
      valueColor: string;
    }> = {
      'thrif': {
        icon: <WalletOutlined />,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderColor: '#667eea',
        iconBg: 'rgba(102, 126, 234, 0.1)',
        valueColor: '#667eea',
      },
      'special_savings': {
        icon: <BankOutlined />,
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        borderColor: '#f5576c',
        iconBg: 'rgba(245, 87, 108, 0.1)',
        valueColor: '#f5576c',
      },
      'share': {
        icon: <FundOutlined />,
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        borderColor: '#4facfe',
        iconBg: 'rgba(79, 172, 254, 0.1)',
        valueColor: '#4facfe',
      },
      'savings': {
        icon: <BankOutlined />,
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        borderColor: '#43e97b',
        iconBg: 'rgba(67, 233, 123, 0.1)',
        valueColor: '#43e97b',
      },
      'total': {
        icon: <RiseOutlined />,
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        borderColor: '#fa709a',
        iconBg: 'rgba(250, 112, 154, 0.1)',
        valueColor: '#fa709a',
      },
    };

    return configs[type] || {
      icon: <DollarOutlined />,
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      borderColor: colors.primary,
      iconBg: 'rgba(124, 58, 237, 0.1)',
      valueColor: colors.primary,
    };
  };

  return (
    <MainLayout>
      <Title level={1} style={{ marginBottom: 24, color: colors.text, fontSize: 'clamp(24px, 5vw, 32px)' }}>
        Dashboard
      </Title>
      
      {/* Monthly Contributions Section */}
      <div style={{ marginTop: 32, marginBottom: 20 }}>
        <Text 
          style={{ 
            fontSize: 'clamp(14px, 2.5vw, 16px)', 
            color: colors.textSecondary,
            fontWeight: 400,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          Monthly Contributions
        </Text>
      </div>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {contributionsLoading || contributionsFetching ? (
          <>
            {[1, 2, 3].map((i) => (
              <Col xs={24} sm={24} md={12} lg={8} key={i}>
                <MonthlyContributionCardSkeleton />
              </Col>
            ))}
          </>
        ) : (
          contributions?.cards.map((card: { title: string; amount: number; type: string }) => {
              const config = getCardConfig(card.type);
              return (
                <Col xs={24} sm={24} md={12} lg={8} key={card.type}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: 12,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                      border: `1px solid ${config.borderColor}20`,
                      background: `linear-gradient(135deg, ${colors.background} 0%, ${config.iconBg} 100%)`,
                      transition: 'all 0.3s ease',
                    }}
                    bodyStyle={{ padding: 20 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: config.iconBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 20,
                          color: config.valueColor,
                          marginRight: 16,
                        }}
                      >
                        {config.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: colors.textSecondary,
                            fontWeight: 400,
                            display: 'block',
                            marginBottom: 8,
                            letterSpacing: '0.3px',
                          }}
                        >
                          {card.title}
                        </Text>
                        <Statistic
                          value={card.amount}
                          formatter={(value) => formatNaira(Number(value))}
                          valueStyle={{ 
                            color: config.valueColor, 
                            fontSize: 'clamp(20px, 3.5vw, 26px)',
                            fontWeight: 600,
                            margin: 0,
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })
        )}
      </Row>

      {/* Total Contributions Section */}
      <div style={{ marginTop: 32, marginBottom: 20 }}>
        <Text 
          style={{ 
            fontSize: 'clamp(14px, 2.5vw, 16px)', 
            color: colors.textSecondary,
            fontWeight: 400,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          Total Contributions
        </Text>
      </div>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {totalContributionsLoading || totalContributionsFetching ? (
          <>
            {[1, 2, 3].map((i) => (
              <Col xs={24} sm={24} md={12} lg={8} key={i}>
                <TotalContributionCardSkeleton />
              </Col>
            ))}
          </>
        ) : (
          totalContributionsData?.cards.map((card) => (
              <Col xs={24} sm={24} md={12} lg={8} key={card.type}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: `1px solid ${colors.borderLight}`,
                  }}
                >
                  <Statistic
                    title={card.title}
                    value={card.amount}
                    formatter={(value) => formatNaira(Number(value))}
                    valueStyle={{ color: colors.success, fontSize: 'clamp(18px, 3.5vw, 24px)' }}
                  />
                  {totalContributionsData.lastUpdated && (
                    <p style={{ marginTop: 8, fontSize: 12, color: colors.textTertiary }}>
                      Last updated: {totalContributionsData.lastUpdated}
                    </p>
                  )}
                </Card>
              </Col>
            ))
        )}
      </Row>

      {/* Summary Statistics */}
      <div style={{ marginTop: 32, marginBottom: 20 }}>
        <Text 
          style={{ 
            fontSize: 'clamp(14px, 2.5vw, 16px)', 
            color: colors.textSecondary,
            fontWeight: 400,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          Summary Overview
        </Text>
      </div>
      <Row gutter={[16, 16]}>
        {(loansLoading || loansFetching || deductionsLoading || deductionsFetching || totalContributionsLoading || totalContributionsFetching) ? (
          <>
            {[1, 2, 3].map((i) => (
              <Col xs={24} sm={24} md={12} lg={8} key={i}>
                <SummaryCardSkeleton />
              </Col>
            ))}
          </>
        ) : (
          <>
            <Col xs={24} sm={24} md={12} lg={8}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  border: `1px solid ${colors.success}20`,
                  background: `linear-gradient(135deg, ${colors.background} 0%, rgba(40, 167, 69, 0.08) 100%)`,
                  transition: 'all 0.3s ease',
                }}
                bodyStyle={{ padding: 20 }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'rgba(40, 167, 69, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      color: colors.success,
                      marginRight: 16,
                    }}
                  >
                    <RiseOutlined />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: colors.textSecondary,
                        fontWeight: 400,
                        display: 'block',
                        marginBottom: 8,
                        letterSpacing: '0.3px',
                      }}
                    >
                      Total Contributions
                    </Text>
                    <Statistic
                      value={totalContributions}
                      formatter={(value) => formatNaira(Number(value))}
                      valueStyle={{ 
                        color: colors.success, 
                        fontSize: 'clamp(20px, 3.5vw, 26px)',
                        fontWeight: 600,
                        margin: 0,
                      }}
                    />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  border: `1px solid ${colors.error}20`,
                  background: `linear-gradient(135deg, ${colors.background} 0%, rgba(220, 53, 69, 0.08) 100%)`,
                  transition: 'all 0.3s ease',
                }}
                bodyStyle={{ padding: 20 }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'rgba(220, 53, 69, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      color: colors.error,
                      marginRight: 16,
                    }}
                  >
                    <CreditCardOutlined />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: colors.textSecondary,
                        fontWeight: 400,
                        display: 'block',
                        marginBottom: 8,
                        letterSpacing: '0.3px',
                      }}
                    >
                      Outstanding Loans
                    </Text>
                    <Statistic
                      value={totalLoans}
                      formatter={(value) => formatNaira(Number(value))}
                      valueStyle={{ 
                        color: colors.error, 
                        fontSize: 'clamp(20px, 3.5vw, 26px)',
                        fontWeight: 600,
                        margin: 0,
                      }}
                    />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  border: `1px solid ${colors.info}20`,
                  background: `linear-gradient(135deg, ${colors.background} 0%, rgba(23, 162, 184, 0.08) 100%)`,
                  transition: 'all 0.3s ease',
                }}
                bodyStyle={{ padding: 20 }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'rgba(23, 162, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      color: colors.info,
                      marginRight: 16,
                    }}
                  >
                    <FallOutlined />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: colors.textSecondary,
                        fontWeight: 400,
                        display: 'block',
                        marginBottom: 8,
                        letterSpacing: '0.3px',
                      }}
                    >
                      Recent Deductions
                    </Text>
                    <Statistic
                      value={recentDeductions}
                      formatter={(value) => formatNaira(Number(value))}
                      valueStyle={{ 
                        color: colors.info, 
                        fontSize: 'clamp(20px, 3.5vw, 26px)',
                        fontWeight: 600,
                        margin: 0,
                      }}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          </>
        )}
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card
            title="Monthly Contributions Distribution"
            style={{
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: `1px solid ${colors.borderLight}`,
            }}
          >
            {contributionsChartLoading || contributionsChartFetching ? (
              <ChartCardSkeleton />
            ) : contributionsChartError ? (
              <div style={{ textAlign: 'center', padding: 40, color: colors.error }}>
                Error loading chart data. Please try again.
              </div>
            ) : pieChartData && pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderPieLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry: { name: string; value: number; type: string }, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieChartColors[entry.name] || colors.primary}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => value}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ textAlign: 'center', padding: 40, color: colors.textSecondary }}>
                No contribution data available
                {contributionsChart && (
                  <div style={{ marginTop: 8, fontSize: 12 }}>
                    Total: {formatNaira(contributionsChart.total || 0)}
                  </div>
                )}
              </div>
            )}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card
            title="Total Contributions"
            extra={totalContributionsChart?.lastUpdated && (
              <span style={{ fontSize: 12, color: colors.textTertiary }}>
                Updated: {totalContributionsChart.lastUpdated}
              </span>
            )}
            style={{
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: `1px solid ${colors.borderLight}`,
            }}
          >
            {totalContributionsChartLoading || totalContributionsChartFetching ? (
              <ChartCardSkeleton />
            ) : barChartData && barChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={barChartData}
                  margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 14, fill: colors.textSecondary }}
                    angle={0}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: colors.textSecondary }}
                    tickFormatter={(value) => formatNaira(value)}
                  />
                  <Tooltip content={<LineTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={colors.primary}
                    strokeWidth={3}
                    dot={{ fill: colors.primary, r: 5 }}
                    activeDot={{ r: 7 }}
                    // label={{ formatter: (value: unknown) => formatNaira(Number(value)), fill: colors.text, fontSize: 11 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ textAlign: 'center', padding: 40, color: colors.textSecondary }}>
                No total contribution data available
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Dashboard;

