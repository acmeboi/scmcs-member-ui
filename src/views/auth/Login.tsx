import { AuthIllustration } from '@/components/auth/AuthIllustration';
import { ROUTES } from '@/config/routes';
import { useToken } from '@/hooks/useToken';
import { validators } from '@/utils/validators';
import { useAuthViewModel } from '@/viewmodels/auth.viewmodel';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { login, loading } = useAuthViewModel();
  const token = useToken();

  const onFinish = async (values: { email: string; password: string }) => {
    await login({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: token.sizeLG,
        background: token.colorBgLayout,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AuthIllustration variant="login" />
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          padding: token.sizeXXL,
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowSecondary,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo/Brand Section */}
        <div style={{ textAlign: 'center', marginBottom: token.sizeXXL * 1.5 }}>
          <Title
            level={2}
            style={{
              margin: 0,
              marginBottom: token.sizeXS,
              color: token.colorText,
              fontWeight: token.fontWeightStrong,
              fontSize: token.fontSizeHeading2,
            }}
          >
            Welcome back
          </Title>
          <Text
            type="secondary"
            style={{
              fontSize: token.fontSize,
              color: token.colorTextSecondary,
            }}
          >
            Sign in to your SCMCS account
          </Text>
        </div>

        {/* Form */}
        <Form
          form={form}
          name="login"
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
            style={{ marginBottom: token.sizeLG }}
          >
            <Input
              prefix={<UserOutlined style={{ color: token.colorTextTertiary }} />}
              placeholder="Email address"
              type="email"
              style={{
                height: token.controlHeightLG,
                fontSize: token.fontSize,
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
            style={{ marginBottom: token.sizeMD }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: token.colorTextTertiary }} />}
              placeholder="Password"
              style={{
                height: token.controlHeightLG,
                fontSize: token.fontSize,
              }}
            />
          </Form.Item>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: token.sizeLG,
            }}
          >
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              style={{
                fontSize: token.fontSizeSM,
                color: token.colorPrimary,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Forgot password?
            </Link>
          </div>

          <Form.Item style={{ marginBottom: token.sizeLG }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                height: token.controlHeightLG,
                fontSize: token.fontSize,
                fontWeight: token.fontWeightStrong,
              }}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        {/* Footer Links */}
        <div
          style={{
            textAlign: 'center',
            paddingTop: token.sizeLG,
            borderTop: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Text
            type="secondary"
            style={{
              fontSize: token.fontSizeSM,
              color: token.colorTextSecondary,
            }}
          >
            Don't have an account?{' '}
            <Link
              to={ROUTES.SIGNUP}
              style={{
                color: token.colorPrimary,
                textDecoration: 'none',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Sign up
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;

