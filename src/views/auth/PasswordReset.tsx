import { AuthIllustration } from '@/components/auth/AuthIllustration';
import { ROUTES } from '@/config/routes';
import { useToken } from '@/hooks/useToken';
import { validators } from '@/utils/validators';
import { useAuthViewModel } from '@/viewmodels/auth.viewmodel';
import { CheckCircleOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const { Title, Text } = Typography;

const PasswordReset: React.FC = () => {
  const [form] = Form.useForm();
  const { updatePassword, loading } = useAuthViewModel();
  const tokenHook = useToken();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  // Automatically set token in form if present in URL
  useEffect(() => {
    if (token) {
      form.setFieldsValue({ token });
    }
  }, [token, form]);

  const onFinish = async (values: { newPassword: string; confirmPassword: string; token?: string }) => {
    try {
      // Automatically use token from URL if available, otherwise use form input
      const resetToken = token || values.token;
      
      if (!resetToken) {
        form.setFields([
          {
            name: 'token',
            errors: ['Reset token is required'],
          },
        ]);
        return;
      }

      await updatePassword({
        token: resetToken,
        newPassword: values.newPassword,
        // confirmPassword is only for UI validation, not sent to API
      });
    } catch {
      // Error handled in viewmodel
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
            Reset your password
          </Title>
          <Text
            type="secondary"
            style={{
              fontSize: tokenHook.fontSize,
              color: tokenHook.colorTextSecondary,
            }}
          >
            Enter your new password below
          </Text>
        </div>
        
        {!token ? (
          <>
            <Alert
              message="No reset token found"
              description="Please check your email for the password reset link, or request a new one."
              type="info"
              showIcon
              style={{ marginBottom: tokenHook.sizeLG }}
            />
            <div style={{ textAlign: 'center', marginBottom: tokenHook.sizeLG }}>
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                style={{
                  fontSize: tokenHook.fontSize,
                  color: tokenHook.colorPrimary,
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
                Request password reset link
              </Link>
            </div>
          </>
        ) : (
          <Alert
            message="Reset token detected"
            description="Your password reset link has been automatically recognized. Please enter your new password below."
            type="success"
            icon={<CheckCircleOutlined />}
            showIcon
            style={{ marginBottom: tokenHook.sizeLG }}
          />
        )}
        
        {token && (
          <Form
          form={form}
          name="passwordReset"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          {!token && (
            <Form.Item
              name="token"
              rules={[{ required: true, message: 'Please enter the reset token' }]}
              style={{ marginBottom: tokenHook.sizeLG }}
            >
              <Input
                placeholder="Reset token"
                style={{
                  height: tokenHook.controlHeightLG,
                  fontSize: tokenHook.fontSize,
                }}
              />
            </Form.Item>
          )}

          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter your new password' },
              {
                validator: (_, value) =>
                  !value || validators.password(value)
                    ? Promise.resolve()
                    : Promise.reject(new Error('Password must be at least 8 characters')),
              },
            ]}
            style={{ marginBottom: tokenHook.sizeLG }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: tokenHook.colorTextTertiary }} />}
              placeholder="New password"
              style={{
                height: tokenHook.controlHeightLG,
                fontSize: tokenHook.fontSize,
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
            style={{ marginBottom: tokenHook.sizeLG }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: tokenHook.colorTextTertiary }} />}
              placeholder="Confirm password"
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
              Update password
            </Button>
          </Form.Item>
        </Form>
        )}

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
      </div>
    </div>
  );
};

export default PasswordReset;

