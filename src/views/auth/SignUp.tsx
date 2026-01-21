import { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthViewModel } from '@/viewmodels/auth.viewmodel';
import { ROUTES } from '@/config/routes';
import { validators } from '@/utils/validators';
import { useToken } from '@/hooks/useToken';
import { AuthIllustration } from '@/components/auth/AuthIllustration';

const { Title, Text } = Typography;

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const { signUp, loading } = useAuthViewModel();
  const navigate = useNavigate();
  const token = useToken();
  const [credentials, setCredentials] = useState<any>(null);

  const onFinish = async (values: { email: string }) => {
    try {
      const response = await signUp({ email: values.email });
      if (response.credentials) {
        setCredentials(response.credentials);
      } else {
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      // Error handled in viewmodel
    }
  };

  if (credentials) {
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
        <AuthIllustration variant="signup" />
        <div
          style={{
            width: '100%',
            maxWidth: 500,
            padding: token.sizeXXL,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            boxShadow: token.boxShadowSecondary,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Title
            level={2}
            style={{
              textAlign: 'center',
              marginBottom: token.sizeLG,
              color: token.colorText,
              fontWeight: token.fontWeightStrong,
            }}
          >
            Account Created Successfully
          </Title>
          <Alert
            message="Please save these credentials"
            description={
              <div>
                <p><strong>Default Password:</strong> {credentials.defaultPassword}</p>
                <p><strong>Reset Token:</strong> {credentials.passwordResetToken}</p>
                <p><strong>Expires At:</strong> {credentials.expiresAt}</p>
                <p style={{ marginTop: 16 }}>
                  <a href={credentials.passwordResetUrl} target="_blank" rel="noopener noreferrer">
                    Click here to update your password
                  </a>
                </p>
              </div>
            }
            type="warning"
            showIcon
            style={{ marginBottom: 24 }}
          />
          <Button
            type="primary"
            block
            onClick={() => navigate(ROUTES.LOGIN)}
            style={{
              height: token.controlHeightLG,
              fontSize: token.fontSize,
              fontWeight: token.fontWeightStrong,
            }}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

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
      <AuthIllustration variant="signup" />
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
            Create your account
          </Title>
          <Text
            type="secondary"
            style={{
              fontSize: token.fontSize,
              color: token.colorTextSecondary,
            }}
          >
            Sign up to get started with SCMCS
          </Text>
        </div>
        <Form
          form={form}
          name="signup"
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
              Create account
            </Button>
          </Form.Item>
        </Form>

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
            Already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
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
              Sign in
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

