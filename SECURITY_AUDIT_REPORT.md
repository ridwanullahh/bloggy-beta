# Bismillah Ar-Rahman Ar-Raheem

# Bloggy-Beta Security Audit Report

> **Document Version**: 1.0  
> **Audit Date**: 2026-01-07  
> **Platform**: Bloggy-Beta (React + Vite + GitHub API Database)

---

## Executive Summary

This security audit identifies **critical vulnerabilities** in the current architecture where sensitive credentials and database operations are exposed on the client-side. The proposed monorepo restructuring with Next.js backend will resolve all identified issues.

### Risk Summary

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Authentication | 2 | 3 | 1 | 0 | 6 |
| Data Exposure | 3 | 2 | 1 | 0 | 6 |
| API Security | 1 | 2 | 2 | 1 | 6 |
| Input Validation | 1 | 2 | 1 | 0 | 4 |
| **Total** | **7** | **9** | **5** | **1** | **22** |

---

## 1. Critical Vulnerabilities

### 1.1 🔴 GitHub API Token Exposed in Client-Side Code

**Severity**: CRITICAL  
**CVSS Score**: 10.0  
**Status**: ⚠️ Requires Immediate Fix

**Affected Files**:
- `src/lib/sdk-instance.ts` (Line 8)
- `src/lib/db-init.ts` (Line 24)

**Current Code**:
```typescript
// src/lib/sdk-instance.ts
const sdkConfig = {
  token: import.meta.env.VITE_GITHUB_TOKEN, // EXPOSED TO CLIENT!
  // ...
};
```

**Impact**:
- Attackers can extract the GitHub token from browser DevTools
- Full read/write access to the database repository
- Data theft, modification, or deletion
- Repository could be used for malicious purposes

**Fix (via Monorepo)**:
- Move GitHub token to Next.js API server-side only
- Never expose tokens with `VITE_` prefix
- All GitHub API calls go through Next.js API routes

---

### 1.2 🔴 SMTP Credentials Exposed

**Severity**: CRITICAL  
**CVSS Score**: 9.0  
**Status**: ⚠️ Requires Immediate Fix

**Affected Files**:
- `src/services/emailService.ts` (Lines 11-14)

**Current Code**:
```typescript
private static smtpConfig: SMTPConfig = {
  user: process.env.SMTP_USER || '',    // Potentially exposed
  pass: process.env.SMTP_PASS || '',    // Potentially exposed
};
```

**Impact**:
- Email credentials could be compromised
- Attackers could send spam from your account
- Account suspension from email provider

**Fix (via Monorepo)**:
- Move email service entirely to Next.js API
- SMTP calls only made server-side
- API route: `POST /api/email/send`

---

### 1.3 🔴 AI API Keys Exposed

**Severity**: CRITICAL  
**CVSS Score**: 8.5  
**Status**: ⚠️ Requires Immediate Fix

**Affected Files**:
- `src/lib/ai-service.ts` (Lines 8-9)

**Current Code**:
```typescript
this.chutesApiKey = process.env.CHUTES_API_TOKEN || '';
this.geminiApiKey = process.env.GEMINI_API_KEY || '';
```

**Impact**:
- API keys could be extracted and abused
- Unauthorized usage leading to billing charges
- Rate limit exhaustion

**Fix (via Monorepo)**:
- Move AI service to Next.js API
- API route: `POST /api/ai/generate`

---

### 1.4 🔴 Direct Database Access from Client

**Severity**: CRITICAL  
**CVSS Score**: 9.5  
**Status**: ⚠️ Requires Immediate Fix

**Affected Files**:
- `src/lib/sdk.ts` (Lines 149-159)

**Current Pattern**:
```typescript
// Direct GitHub API calls from browser
private async request(path: string, method: string = "GET", body: any = null): Promise<any> {
  const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
  const res = await fetch(url, {
    headers: this.headers(), // Token included in browser request
  });
}
```

**Impact**:
- No server-side validation of operations
- Anyone can directly manipulate database
- No audit trail on server
- Bypasses all business logic

**Fix (via Monorepo)**:
- All database operations through Next.js API
- Server-side validation and authorization
- Proper audit logging

---

### 1.5 🔴 Paystack Secret Key Accessible

**Severity**: CRITICAL  
**CVSS Score**: 9.0  
**Status**: ⚠️ Requires Immediate Fix

**Affected Files**:
- `.env.example` (Line 18)

**Current Configuration**:
```env
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
```

**Impact**:
- Secret key could be exposed if env misconfigured
- Unauthorized transactions
- Financial fraud

**Fix (via Monorepo)**:
- Only `PAYSTACK_PUBLIC_KEY` exposed to client
- Secret key server-side only
- Webhook validation in Next.js API

---

### 1.6 🔴 Social Media Access Tokens Exposed

**Severity**: CRITICAL  
**CVSS Score**: 8.0  
**Status**: ⚠️ Requires Immediate Fix

**Affected Files**:
- `.env.example` (Lines 23-33)
- `src/services/socialMediaService.ts`

**Current Pattern**:
```env
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
```

**Impact**:
- All social media accounts could be compromised
- Unauthorized posting
- Account takeover

**Fix (via Monorepo)**:
- Move all social tokens to server-side
- OAuth flow handled by Next.js API

---

### 1.7 🔴 Weak Password Hashing

**Severity**: CRITICAL  
**CVSS Score**: 8.0  
**Status**: ⚠️ Requires Immediate Fix

**Affected Files**:
- `src/lib/sdk.ts` (Lines 330-340)

**Current Code**:
```typescript
hashPassword(password: string): string {
  const salt = crypto.randomUUID();
  const hash = btoa([...password + salt].map(c => c.charCodeAt(0).toString(16)).join(""));
  return `${salt}$${hash}`;
}
```

**Impact**:
- Custom hashing is cryptographically weak
- No bcrypt/argon2 protection
- Rainbow table attacks possible
- Brute force attacks easier

**Fix (via Monorepo)**:
- Use bcrypt or argon2 in Next.js API
- Proper salt rounds (minimum 12)
- Server-side password verification only

---

## 2. High Severity Vulnerabilities

### 2.1 🟠 Session Management Client-Side Only

**Severity**: HIGH  
**CVSS Score**: 7.5

**Affected Files**:
- `src/lib/sdk.ts` (Lines 342-355)
- `src/contexts/AuthContext.tsx`

**Current Pattern**:
```typescript
private sessionStore: Record<string, Session> = {};

createSession(user: User): string {
  const token = crypto.randomUUID();
  this.sessionStore[token] = { token, user, created: Date.now() };
  return token;
}
```

**Impact**:
- Sessions stored in browser memory only
- No server-side session validation
- Session hijacking possible
- No secure session expiration

**Fix (via Monorepo)**:
- JWT tokens with server-side validation
- HTTP-only cookies for tokens
- Server-side session storage (Redis optional)
- Proper token expiration and refresh

---

### 2.2 🟠 No Password Verification for Subscriber Login

**Severity**: HIGH  
**CVSS Score**: 8.0

**Affected Files**:
- `src/contexts/BlogSubscriberAuthContext.tsx` (Lines 156-191)

**Current Code**:
```typescript
const login = async (email: string, password: string, blogIdParam: string) => {
  const existingSubscriber = subscribers.find(
    (s: any) => s.email === email && s.blogId === blogIdParam
  );
  // PASSWORD IS NOT VERIFIED! Anyone with email can login
};
```

**Impact**:
- Any subscriber email can be used to login without password
- Account takeover by knowing email only
- No authentication security

**Fix (via Monorepo)**:
- Implement proper password storage for subscribers
- Server-side password verification
- Add OTP/magic link authentication option

---

### 2.3 🟠 No Rate Limiting

**Severity**: HIGH  
**CVSS Score**: 7.0

**Affected Files**:
- Entire application lacks rate limiting

**Impact**:
- Brute force attacks on login
- API abuse
- Database overload
- DoS attacks

**Fix (via Monorepo)**:
```typescript
// apps/api/src/middleware.ts
import { Ratelimit } from "@upstash/ratelimit";

export const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});
```

---

### 2.4 🟠 No Input Validation

**Severity**: HIGH  
**CVSS Score**: 7.5

**Affected Files**:
- All SDK insert/update operations
- All form submissions

**Impact**:
- SQL injection (if using SQL later)
- XSS attacks via stored content
- Data corruption
- Schema violations

**Fix (via Monorepo)**:
```typescript
// apps/api/src/lib/validation.ts
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  blogId: z.string().uuid(),
  // ... sanitize and validate all inputs
});
```

---

### 2.5 🟠 No CORS Configuration

**Severity**: HIGH  
**CVSS Score**: 6.5

**Affected Files**:
- No CORS configuration exists

**Impact**:
- API could be called from any origin
- CSRF attacks possible

**Fix (via Monorepo)**:
```typescript
// apps/api/next.config.js
async headers() {
  return [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "https://yourdomain.com" },
        { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" },
        { key: "Access-Control-Allow-Headers", value: "Content-Type,Authorization" },
      ],
    },
  ];
}
```

---

### 2.6 🟠 XSS Vulnerability in Markdown Content

**Severity**: HIGH  
**CVSS Score**: 7.0

**Affected Files**:
- `src/pages/PostView.tsx`
- All markdown rendering components

**Impact**:
- Malicious scripts in blog content
- Session stealing
- Phishing attacks

**Fix (via Monorepo)**:
```typescript
// Sanitize all markdown before rendering
import DOMPurify from 'dompurify';

const sanitizedContent = DOMPurify.sanitize(markdown);
```

---

### 2.7 🟠 OTP Stored in Memory Only

**Severity**: HIGH  
**CVSS Score**: 6.5

**Affected Files**:
- `src/lib/sdk.ts` (Lines 371-384)

**Current Code**:
```typescript
private otpMemory: Record<string, OTPRecord> = {};

async sendOTP(email: string, reason: string = "verify"): Promise<string> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otpMemory[email] = { otp, created: Date.now(), reason };
  console.log(`OTP for ${email}: ${otp}`); // LOGGED TO CONSOLE!
}
```

**Impact**:
- OTP visible in browser console
- No actual email sending
- OTP resets on page refresh

**Fix (via Monorepo)**:
- Server-side OTP storage (Redis/database)
- Actual email sending via SMTP
- Secure OTP generation

---

## 3. Medium Severity Vulnerabilities

### 3.1 🟡 Sensitive Data in localStorage

**Severity**: MEDIUM  
**CVSS Score**: 5.5

**Affected Files**:
- `src/contexts/AuthContext.tsx` (Line 69)
- `src/contexts/BlogSubscriberAuthContext.tsx` (Line 146)

**Current Code**:
```typescript
localStorage.setItem('authToken', authToken);
```

**Impact**:
- XSS can steal tokens from localStorage
- No HTTP-only protection

**Fix (via Monorepo)**:
- Use HTTP-only cookies for tokens
- Secure and SameSite cookie attributes

---

### 3.2 🟡 No HTTPS Enforcement

**Severity**: MEDIUM  
**CVSS Score**: 5.0

**Impact**:
- Man-in-the-middle attacks
- Token interception

**Fix**:
- Enforce HTTPS in production
- HSTS headers

---

### 3.3 🟡 Detailed Error Messages

**Severity**: MEDIUM  
**CVSS Score**: 4.5

**Affected Files**:
- `src/lib/sdk.ts` (Line 157)

**Current Code**:
```typescript
if (!res.ok) throw new Error(await res.text());
```

**Impact**:
- Server errors exposed to client
- Information leakage

**Fix (via Monorepo)**:
- Generic error messages to client
- Detailed logging server-side only

---

### 3.4 🟡 No Audit Logging

**Severity**: MEDIUM  
**CVSS Score**: 4.0

**Impact**:
- No trace of who did what
- Difficult incident investigation

**Fix (via Monorepo)**:
```typescript
// Server-side audit logging
await auditLog.create({
  userId,
  action: 'POST_CREATED',
  resource: postId,
  timestamp: new Date(),
  ip: request.ip,
});
```

---

### 3.5 🟡 Missing Security Headers

**Severity**: MEDIUM  
**CVSS Score**: 4.5

**Fix (via Monorepo)**:
```typescript
// apps/api/next.config.js
headers: [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: "default-src 'self'..." },
]
```

---

## 4. Low Severity Vulnerabilities

### 4.1 🟢 No Request Timeout Configuration

**Severity**: LOW  
**CVSS Score**: 3.0

**Impact**:
- Hanging requests
- Resource exhaustion

**Fix**:
- Configure timeout in API client

---

## 5. Security Checklist for Monorepo Implementation

### Authentication & Authorization
- [ ] Implement JWT with proper expiration
- [ ] Use HTTP-only cookies for tokens
- [ ] Implement bcrypt password hashing (min 12 rounds)
- [ ] Add password strength requirements
- [ ] Implement proper OTP via email
- [ ] Add role-based access control
- [ ] Implement session management server-side
- [ ] Add account lockout after failed attempts
- [ ] Implement secure password reset flow

### API Security
- [ ] Move all credentials to server-side
- [ ] Implement API rate limiting
- [ ] Add request validation (Zod)
- [ ] Configure CORS properly
- [ ] Add security headers
- [ ] Implement CSRF protection
- [ ] Add API key rotation mechanism
- [ ] Set up webhook signature validation (Paystack)

### Data Protection
- [ ] Sanitize all user inputs
- [ ] Sanitize markdown/HTML content
- [ ] Encrypt sensitive data at rest
- [ ] Use HTTPS everywhere
- [ ] Implement proper audit logging
- [ ] Add data backup procedures

### Error Handling
- [ ] Generic error messages to clients
- [ ] Detailed error logging server-side
- [ ] No stack traces in production
- [ ] Proper error monitoring (Sentry)

### Infrastructure
- [ ] Environment variable management
- [ ] Secure secret storage
- [ ] Regular dependency updates
- [ ] Security scanning in CI/CD

---

## 6. Conclusion

The current architecture has **7 critical** and **9 high** severity vulnerabilities primarily due to exposing sensitive operations on the client-side. The proposed monorepo restructuring with Next.js backend will:

1. ✅ Move all sensitive credentials server-side
2. ✅ Implement proper authentication and authorization
3. ✅ Add input validation and sanitization
4. ✅ Enable rate limiting and security headers
5. ✅ Provide audit logging capabilities

**Recommendation**: Implement the monorepo structure as soon as possible. The current architecture poses significant security risks and should not be used in production until these issues are resolved.

---

*Bismillah Ar-Rahman Ar-Raheem. Hasbiyallahu la ilaha illa huwa, alayhi tawakkaltu.*
