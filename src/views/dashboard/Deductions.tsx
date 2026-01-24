import { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Spin,
  Empty,
  Typography,
  DatePicker,
  Button,
  Space,
  Row,
  Col,
  Collapse,
  Pagination,
  Select,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { RangePickerProps } from 'antd/es/date-picker';
import { ReloadOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import { useGetDeductionHistoryQuery } from '@/viewmodels/dashboard.viewmodel';
import type { DeductionHistoryItem, DeductionField } from '@/models/member.model';
import { colors } from '@/config/theme';
import { formatNaira } from '@/utils/format';
import dayjs, { type Dayjs } from 'dayjs';
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// Helper function to format amount with status
const formatAmountWithStatus = (field: DeductionField): string => {
  if (field.amount === 0) {
    return formatNaira(0);
  }
  const sign = field.status === 'CREDIT' ? '+' : '-';
  return `${sign}${formatNaira(field.amount)}`;
};

// Helper function to get color based on status
const getStatusColor = (status: 'CREDIT' | 'DEBIT'): string => {
  return status === 'CREDIT' ? colors.success : colors.error;
};

// Helper function to get field display name
const getFieldDisplayName = (fieldName: string): string => {
  const names: Record<string, string> = {
    share: 'Share',
    thrif: 'Thrif',
    savings: 'Savings',
    softloan: 'Soft Loan',
    fixedAsset: 'Fixed Asset',
    essential: 'Essential',
    layya: 'Layya',
    watanda: 'Watanda',
    refund: 'Refund',
    other: 'Other',
    formFee: 'Form Fee',
  };
  return names[fieldName] || fieldName;
};

const Deductions: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update mobile state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prepare query parameters
  const queryParams: {
    page: number;
    limit: number;
    startDate?: string;
    endDate?: string;
  } = {
    page,
    limit,
  };

  if (dateRange && dateRange[0] && dateRange[1]) {
    queryParams.startDate = dateRange[0].format('YYYY-MM-DD');
    queryParams.endDate = dateRange[1].format('YYYY-MM-DD');
  }

  const { data: deductions, isLoading, refetch } = useGetDeductionHistoryQuery(queryParams);

  // Handle date range change
  const handleDateRangeChange = (dates: RangePickerProps['value']) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
      setPage(1); // Reset to first page when filter changes
    } else {
      setDateRange(null);
      setPage(1);
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setDateRange(null);
    setPage(1);
  };

  // Table columns for desktop view
  const columns: ColumnsType<DeductionHistoryItem> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD MMM YYYY'),
      width: 120,
      fixed: 'left' as const,
    },
    {
      title: 'Fields',
      key: 'fields',
      render: (_: unknown, record: DeductionHistoryItem) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          {record.fields.map((field) => (
            <div key={field.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                {getFieldDisplayName(field.name)}:
              </Text>
              <Text
                style={{
                  color: getStatusColor(field.status),
                  fontWeight: 500,
                  fontSize: 12,
                }}
              >
                {formatAmountWithStatus(field)}
              </Text>
            </div>
          ))}
        </Space>
      ),
      width: 300,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (value: number) => (
        <strong style={{ color: colors.primary }}>{formatNaira(value)}</strong>
      ),
      sorter: (a, b) => a.total - b.total,
      fixed: 'right' as const,
      width: 120,
    },
  ];

  if (isLoading) {
    return (
      <MainLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (!deductions || deductions.items.length === 0) {
    return (
      <MainLayout>
        <Title level={1} style={{ marginBottom: 24, color: colors.text, fontSize: 'clamp(24px, 5vw, 32px)' }}>
          Deduction History
        </Title>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <Empty description="No deduction history available" />
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Title level={1} style={{ marginBottom: 24, color: colors.text, fontSize: 'clamp(24px, 5vw, 32px)' }}>
        Deduction History
      </Title>

      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: `1px solid ${colors.borderLight}`,
          marginBottom: 24,
        }}
      >
        {/* Filters */}
        <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Text strong style={{ fontSize: 12, color: colors.textSecondary }}>
                Date Range
              </Text>
              <RangePicker
                style={{ width: '100%' }}
                value={dateRange}
                onChange={handleDateRangeChange}
                format="YYYY-MM-DD"
                allowClear
              />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Text strong style={{ fontSize: 12, color: colors.textSecondary }}>
                Items Per Page
              </Text>
              <Select
                style={{ width: '100%' }}
                value={limit}
                onChange={(value) => {
                  setLimit(value);
                  setPage(1);
                }}
                options={[
                  { label: '10', value: 10 },
                  { label: '20', value: 20 },
                  { label: '50', value: 50 },
                  { label: '100', value: 100 },
                ]}
              />
            </Space>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
                Refresh
              </Button>
              {(dateRange?.[0] || dateRange?.[1]) && (
                <Button onClick={handleClearFilters}>Clear Filters</Button>
              )}
            </Space>
          </Col>
        </Row>

        {/* Summary */}
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            background: colors.backgroundLight,
            borderRadius: 8,
            fontSize: 'clamp(14px, 2.5vw, 16px)',
          }}
        >
          <strong style={{ color: colors.text }}>Summary:</strong>{' '}
          <span style={{ color: colors.textSecondary }}>
            {deductions.summary.totalItems} items, Total:{' '}
            <strong style={{ color: colors.primary }}>
              {formatNaira(deductions.summary.totalAmount)}
            </strong>
          </span>
        </div>
      </Card>

      {/* Desktop Table View */}
      {!isMobile && (
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <Table
              columns={columns}
              dataSource={deductions.items}
              rowKey="id"
              pagination={false}
              scroll={{ x: 600 }}
              size="middle"
            />
          </div>

          {/* Pagination */}
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <Text style={{ color: colors.textSecondary }}>
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, deductions.pagination.totalItems)} of {deductions.pagination.totalItems} items
            </Text>
            <Pagination
              current={page}
              pageSize={limit}
              total={deductions.pagination.totalItems}
              onChange={(newPage) => setPage(newPage)}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            />
          </div>
        </Card>
      )}

      {/* Mobile Collapsible View */}
      {isMobile && (
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <Collapse
            accordion
            items={deductions.groupedByMonth.map((monthGroup) => {
              // Calculate total for this month group
              const monthTotal = monthGroup.items.reduce((sum, item) => sum + item.total, 0);
              
              return {
                key: monthGroup.month,
                label: (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        {dayjs(monthGroup.month).format('MMMM YYYY')}
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {monthGroup.items.length} {monthGroup.items.length === 1 ? 'record' : 'records'}
                      </Text>
                    </div>
                    <Text strong style={{ fontSize: 16, color: colors.primary, marginLeft: 16 }}>
                      {formatNaira(monthTotal)}
                    </Text>
                  </div>
                ),
              children: (
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {monthGroup.items.map((item) => (
                    <Card
                      key={item.id}
                      size="small"
                      style={{
                        background: colors.backgroundLight,
                        border: `1px solid ${colors.borderLight}`,
                      }}
                    >
                      <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong style={{ fontSize: 14 }}>
                          {dayjs(item.date).format('DD MMM YYYY')}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {dayjs(monthGroup.month).format('MMMM YYYY')}
                        </Text>
                      </div>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        {item.fields.map((field) => (
                          <div
                            key={field.name}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '8px 0',
                              borderBottom: `1px solid ${colors.borderLight}`,
                            }}
                          >
                            <Text style={{ fontSize: 13, color: colors.textSecondary }}>
                              {getFieldDisplayName(field.name)}
                            </Text>
                            <Text
                              style={{
                                color: getStatusColor(field.status),
                                fontWeight: 500,
                                fontSize: 13,
                              }}
                            >
                              {formatAmountWithStatus(field)}
                            </Text>
                          </div>
                        ))}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: 8,
                            marginTop: 8,
                            borderTop: `2px solid ${colors.border}`,
                          }}
                        >
                          <Text strong style={{ fontSize: 14 }}>
                            Total
                          </Text>
                          <Text strong style={{ color: colors.primary, fontSize: 14 }}>
                            {formatNaira(item.total)}
                          </Text>
                        </div>
                      </Space>
                    </Card>
                  ))}
                </Space>
              ),
            };
            })}
          />

          {/* Pagination */}
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              current={page}
              pageSize={limit}
              total={deductions.pagination.totalItems}
              onChange={(newPage) => setPage(newPage)}
              showSizeChanger={false}
              simple
            />
          </div>
        </Card>
      )}
    </MainLayout>
  );
};

export default Deductions;
