import { AuthIllustration } from '@/components/auth/AuthIllustration';
import { ROUTES } from '@/config/routes';
import { useToken } from '@/hooks/useToken';
import { validators } from '@/utils/validators';
import { useAuthViewModel } from '@/viewmodels/auth.viewmodel';
import { CheckCircleOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const { requestPasswordReset, loading } = useAuthViewModel();
  const tokenHook = useToken();
  const [success, setSuccess] = useState(false);

  const onFinish = async (values: { email: string }) => {
    try {
      await requestPasswordReset({
        email: values.email,
      });
      setSuccess(true);
    } catch {
      // Error handled in viewmodel, but we still show success for security
      setSuccess(true);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: tokenHook.sizeLG,
        background: tokenHook.colorBgLayout,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AuthIllustration variant="reset" />
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          padding: tokenHook.sizeXXL,
          background: tokenHook.colorBgContainer,
          borderRadius: tokenHook.borderRadiusLG,
          boxShadow: tokenHook.boxShadowSecondary,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {success ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: tokenHook.sizeXXL * 1.5 }}>
              <CheckCircleOutlined
                style={{
                  fontSize: 64,
                  color: tokenHook.colorSuccess,
                  marginBottom: tokenHook.sizeLG,
                }}
              />
              <Title
                level={2}
                style={{
                  margin: 0,
                  marginBottom: tokenHook.sizeXS,
                  color: tokenHook.colorText,
                  fontWeight: tokenHook.fontWeightStrong,
                  fontSize: tokenHook.fontSizeHeading2,
                }}
              >
                Check your email
              </Title>
              <Text
                type="secondary"
                style={{
                  fontSize: tokenHook.fontSize,
                  color: tokenHook.colorTextSecondary,
                }}
              >
                We've sent password reset instructions to your email address
              </Text>
            </div>

            <Alert
              message="Email sent"
              description="If an account exists with this email, a password reset link has been sent. Please check your inbox and follow the instructions to reset your password."
              type="success"
              showIcon
              style={{ marginBottom: tokenHook.sizeLG }}
            />

            <div
              style={{
                textAlign: 'center',
                paddingTop: tokenHook.sizeLG,
                borderTop: `1px solid ${tokenHook.colorBorderSecondary}`,
              }}
            >
              <Link
                to={ROUTES.LOGIN}
                style={{
                  fontSize: tokenHook.fontSizeSM,
                  color: tokenHook.colorPrimary,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Back to sign in
              </Link>
            </div>
          </>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: tokenHook.sizeXXL * 1.5 }}>
              <Title
                level={2}
                style={{
                  margin: 0,
                  marginBottom: tokenHook.sizeXS,
                  color: tokenHook.colorText,
                  fontWeight: tokenHook.fontWeightStrong,
                  fontSize: tokenHook.fontSizeHeading2,
                }}
              >
                Forgot password?
              </Title>
              <Text
                type="secondary"
                style={{
                  fontSize: tokenHook.fontSize,
                  color: tokenHook.colorTextSecondary,
                }}
              >
                Enter your email address and we'll send you a link to reset your password
              </Text>
            </div>

            <Form
              form={form}
              name="forgotPassword"
              onFinish={onFinish}
              layout="vertical"
              size="large"
              requiredMark={false}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email address' },
                  {
                    validator: (_, value) =>
                      !value || validators.email(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error('Please enter a valid email address')),
                  },
                ]}
                style={{ marginBottom: tokenHook.sizeLG }}
              >
                <Input
                  prefix={<MailOutlined style={{ color: tokenHook.colorTextTertiary }} />}
                  placeholder="Email address"
                  type="email"
                  style={{
                    height: tokenHook.controlHeightLG,
                    fontSize: tokenHook.fontSize,
                  }}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: tokenHook.sizeLG }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  style={{
                    height: tokenHook.controlHeightLG,
                    fontSize: tokenHook.fontSize,
                    fontWeight: tokenHook.fontWeightStrong,
                  }}
                >
                  Send reset link
                </Button>
              </Form.Item>
            </Form>

            <div
              style={{
                textAlign: 'center',
                paddingTop: tokenHook.sizeLG,
                borderTop: `1px solid ${tokenHook.colorBorderSecondary}`,
              }}
            >
              <Link
                to={ROUTES.LOGIN}
                style={{
                  fontSize: tokenHook.fontSizeSM,
                  color: tokenHook.colorPrimary,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Back to sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

