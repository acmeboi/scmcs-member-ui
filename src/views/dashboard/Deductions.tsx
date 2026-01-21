import { Table, Card, Spin, Empty, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import MainLayout from '@/components/layout/MainLayout';
import { useGetDeductionHistoryQuery } from '@/viewmodels/dashboard.viewmodel';
import type { DeductionHistoryItem } from '@/models/member.model';
import { colors } from '@/config/theme';
import { formatNaira } from '@/utils/format';
import dayjs from 'dayjs';

const { Title } = Typography;

const Deductions: React.FC = () => {
  const { data: deductions, isLoading } = useGetDeductionHistoryQuery({ months: 12 });

  const columns: ColumnsType<DeductionHistoryItem> = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      sorter: (a, b) => a.month.localeCompare(b.month),
      fixed: 'left' as const,
      width: 100,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD MMM YYYY'),
      width: 120,
    },
    {
      title: 'Share',
      dataIndex: ['modules', 'share'],
      key: 'share',
      render: (value: number) => formatNaira(value),
      width: 120,
    },
    {
      title: 'Thrif',
      dataIndex: ['modules', 'thrif'],
      key: 'thrif',
      render: (value: number) => formatNaira(value),
      width: 120,
    },
    {
      title: 'Savings',
      dataIndex: ['modules', 'savings'],
      key: 'savings',
      render: (value: number) => formatNaira(value),
      width: 120,
    },
    {
      title: 'Soft Loan',
      dataIndex: ['modules', 'softloan'],
      key: 'softloan',
      render: (value: number) => formatNaira(value),
      width: 130,
    },
    {
      title: 'Fixed Asset',
      dataIndex: ['modules', 'fixedAsset'],
      key: 'fixedAsset',
      render: (value: number) => formatNaira(value),
      width: 140,
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
      width: 140,
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

  if (!deductions || deductions.history.length === 0) {
    return (
      <MainLayout>
        <Title level={1} style={{ marginBottom: 24, color: colors.text, fontSize: 'clamp(24px, 5vw, 32px)' }}>
          Deduction History
        </Title>
        <Empty description="No deduction history available" />
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
        }}
      >
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
            {deductions.summary.totalMonths} months, Total:{' '}
            <strong style={{ color: colors.primary }}>
              {formatNaira(deductions.summary.totalAmount)}
            </strong>
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <Table
            columns={columns}
            dataSource={deductions.history}
            rowKey="month"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} records`,
              responsive: true,
            }}
            scroll={{ x: 800 }}
            size="middle"
          />
        </div>
      </Card>
    </MainLayout>
  );
};

export default Deductions;

