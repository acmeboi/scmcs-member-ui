# Password Update Flow - End-to-End Verification

## Request Format (from curl)
```bash
curl -X 'POST' \
  'https://app.api.scmcs.org/api/password/update' \
  -H 'accept: application/ld+json' \
  -H 'Content-Type: application/ld+json' \
  -d '{
  "token": "41ab8bf97bd63bbd1da64b650695869799ed28a5b552e690d6ea53cf75056076",
  "newPassword": "12345678"
}'
```

## Implementation Flow

### 1. UI Component: `src/views/auth/PasswordReset.tsx`
- ✅ Collects token from URL query param or form input
- ✅ Validates token is present before submission
- ✅ Collects newPassword and confirmPassword (for UI validation only)
- ✅ Calls `updatePassword({ token, newPassword })` - confirmPassword NOT sent

### 2. ViewModel: `src/viewmodels/auth.viewmodel.ts`
- ✅ Receives `PasswordUpdateRequest` with token and newPassword
- ✅ Calls `authService.updatePassword(data)`
- ✅ Handles success/error notifications
- ✅ Navigates to login on success

### 3. Auth Service: `src/services/auth.service.ts`
- ✅ Receives `PasswordUpdateRequest`
- ✅ Filters payload to only send `{ token, newPassword }`
- ✅ Sets headers: `Content-Type: application/ld+json` and `accept: application/ld+json`
- ✅ Makes POST request to `/password/update`

### 4. RTK Query: `src/stores/api.ts`
- ✅ Alternative implementation using RTK Query
- ✅ Receives `PasswordUpdateRequest`
- ✅ Filters payload to only send `{ token, newPassword }`
- ✅ Sets headers: `Content-Type: application/ld+json` and `accept: application/ld+json`
- ✅ Headers override default `application/json` from baseQuery

## Payload Verification
✅ Request body contains ONLY:
- `token`: string (from URL or form)
- `newPassword`: string

✅ Request body does NOT contain:
- `confirmPassword` (only used for UI validation)

## Headers Verification
✅ Request headers:
- `Content-Type: application/ld+json`
- `accept: application/ld+json`
- `Authorization: Bearer <token>` (if user is authenticated, not required for password reset)

## API Endpoint
✅ URL: `https://app.api.scmcs.org/api/password/update`
✅ Method: POST

## Status
✅ All components updated and verified
✅ Build successful
✅ No linter errors
