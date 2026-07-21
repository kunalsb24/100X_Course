** Slides: https://petal-estimate-4e9.notion.site/Authentincation-a4b43c7cc1d14535a7b5b366080095fa

# Complete Guide to JWT (JSON Web Token)

JWT (JSON Web Token) is one of the most widely used authentication mechanisms in backend development. If you understand JWT thoroughly, you'll understand how authentication works in most modern web applications and APIs.

---

# 1. What is JWT?

JWT stands for **JSON Web Token**.

It is a **compact, URL-safe string** used to securely transmit information between two parties.

JWT is most commonly used for:

* Authentication
* Authorization
* Identity verification

Think of it as a **digitally signed identity card**.

Example:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VyTmFtZSI6ImpvaG4ifQ.
s8Qd8Ih4kR...
```

Although it looks like random text, it actually contains structured information.

---

# 2. Why Do We Need JWT?

Imagine logging into a website.

Without JWT:

```text
User
 ↓
Login
 ↓
Server stores session
 ↓
User gets session ID
 ↓
Every request:
Server checks session database
```

The server must store every user's session.

With JWT:

```text
User
 ↓
Login
 ↓
Server creates JWT
 ↓
Client stores JWT
 ↓
Every request:
Server verifies JWT
```

The server doesn't need to remember every access token.

---

# 3. JWT Structure

A JWT always has **three parts** separated by dots.

```text
HEADER.PAYLOAD.SIGNATURE
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

---

# 4. Header

The header tells us:

* Which algorithm signed the token
* Token type

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Encoded using Base64URL:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

---

# 5. Payload

The payload contains the data.

Example:

```json
{
   "userName": "john"
}
```

You can store:

```json
{
   "id": 25,
   "email": "john@gmail.com",
   "role": "admin"
}
```

This becomes the second part of the JWT.

---

## Important

The payload is **not encrypted**.

Anyone who has the token can decode it.

Never put:

* Passwords
* Credit card numbers
* API keys
* Secrets

inside a JWT.

---

# 6. Signature

The signature proves that the payload hasn't been modified.

Generated using:

```text
Header

+

Payload

+

Secret Key
```

Example:

```text
Header

↓

Payload

↓

JWT_SECRET

↓

Hash

↓

Signature
```

---

# 7. What is the Secret Key?

```javascript
const JWT_SECRET = "mySecret123";
```

Only the server knows this value.

It is never sent to clients.

Think of it as your server's private signing key.

---

# 8. Creating a JWT

Using the `jsonwebtoken` package:

```javascript
const jwt = require("jsonwebtoken");

const token = jwt.sign(
    {
        userName: "john"
    },
    "mySecret123"
);
```

The output is:

```text
eyJhbGc...
```

---

# 9. What Happens Internally?

When you write:

```javascript
jwt.sign(
    {
        userName: "john"
    },
    "secret"
)
```

Internally:

```text
Payload

↓

Convert to JSON

↓

Encode

↓

Add Header

↓

Generate Signature

↓

Join with dots

↓

JWT
```

---

# 10. Sending JWT to Client

Backend

```javascript
res.json({
    token
});
```

Client receives:

```json
{
   "token":"eyJhbGc..."
}
```

The frontend stores it.

Examples:

```javascript
localStorage.setItem("token", token);
```

or

```javascript
sessionStorage.setItem("token", token);
```

or preferably as a secure, `HttpOnly` cookie.

---

# 11. Sending JWT to Backend

Future requests

```http
GET /profile
```

Headers

```http
Authorization: Bearer eyJhbGc...
```

---

# 12. Verifying JWT

Backend

```javascript
const decoded = jwt.verify(
    token,
    JWT_SECRET
);
```

If valid

```javascript
{
   userName:"john"
}
```

If invalid

```text
Error
```

---

# 13. Why Can't Hackers Modify JWT?

Suppose payload

```json
{
   "role":"user"
}
```

Attacker changes

```json
{
   "role":"admin"
}
```

The signature no longer matches.

Server

```javascript
jwt.verify(token, secret)
```

↓

```text
Invalid Signature
```

Rejected.

---

# 14. JWT Authentication Flow

```text
            LOGIN

User
 │
 ▼
POST /login
 │
 ▼
Verify password
 │
 ▼
jwt.sign()
 │
 ▼
Return JWT
 │
 ▼
Store JWT
 │
 ▼
GET /profile
 │
 ▼
Authorization:
Bearer JWT
 │
 ▼
jwt.verify()
 │
 ▼
Extract payload
 │
 ▼
Return data
```

---

# 15. Access Token

Most JWTs are access tokens.

Example

```javascript
jwt.sign(
    payload,
    secret,
    {
       expiresIn:"15m"
    }
)
```

Valid

```text
15 minutes
```

---

# 16. Refresh Token

Instead of forcing login every 15 minutes

```text
Access Token expires

↓

Refresh Token

↓

New Access Token
```

Refresh tokens usually last:

* 7 days
* 30 days
* 90 days

---

# 17. JWT Claims

Claims are pieces of information stored in the payload.

Example

```json
{
   "id":10,
   "role":"admin"
}
```

Common registered claims:

| Claim | Meaning           |
| ----- | ----------------- |
| sub   | Subject (user ID) |
| exp   | Expiration time   |
| iat   | Issued at         |
| iss   | Issuer            |
| aud   | Audience          |
| nbf   | Not before        |

Example

```json
{
   "sub":"123",
   "exp":1720000000,
   "iat":1719000000
}
```

---

# 18. Token Expiration

```javascript
jwt.sign(
   payload,
   secret,
   {
      expiresIn:"1h"
   }
)
```

After one hour

```javascript
jwt.verify()
```

throws

```text
TokenExpiredError
```

---

# 19. Middleware

Most applications don't verify JWT inside every route.

Instead

```javascript
function auth(req,res,next){
    const token = req.headers.authorization?.split(" ")[1];

    try{
        req.user = jwt.verify(token,JWT_SECRET);
        next();
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
}
```

Protected route

```javascript
app.get("/profile",auth,(req,res)=>{
    res.json(req.user);
});
```

---

# 20. JWT vs Session Authentication

| Feature                   | JWT       | Session                         |
| ------------------------- | --------- | ------------------------------- |
| Server stores login state | No        | Yes                             |
| Stateless                 | Yes       | No                              |
| Scales easily             | Yes       | Requires shared session storage |
| Mobile-friendly           | Excellent | Good                            |
| Works well for APIs       | Excellent | Good                            |
| Easy logout               | Harder    | Easier                          |

---

# 21. Advantages

* Stateless
* Fast verification
* Easy horizontal scaling
* Great for REST APIs
* Works well with mobile apps
* Supports microservices
* Can include useful user information (claims)

---

# 22. Disadvantages

* Difficult to revoke immediately unless you maintain a blacklist or versioning system.
* Token size is larger than a simple session ID.
* Payload is readable (though protected against tampering).
* Stolen tokens remain usable until they expire unless additional protections are in place.

---

# 23. Common Mistakes

### Storing passwords

❌

```json
{
   "password":"123456"
}
```

Never do this.

---

### Long expiration

❌

```javascript
expiresIn:"365d"
```

Better

```javascript
expiresIn:"15m"
```

---

### Hardcoded secret

❌

```javascript
const secret="abc";
```

Better

```javascript
process.env.JWT_SECRET
```

---

### No HTTPS

Without HTTPS

```text
JWT

↓

Network

↓

Can be intercepted
```

Always use HTTPS in production.

---

### Ignoring verification errors

Always wrap verification:

```javascript
try{
    jwt.verify(token,secret);
}catch(err){
    return res.status(401).json({
        message:"Invalid Token"
    });
}
```

---

# 24. Best Practices

* Use strong, random secrets (or asymmetric keys like RS256 when appropriate).
* Store secrets in environment variables or a secrets manager.
* Use short-lived access tokens (10–30 minutes is common).
* Pair access tokens with refresh tokens for longer sessions.
* Send tokens in the `Authorization: Bearer <token>` header or secure `HttpOnly` cookies.
* Always use HTTPS.
* Never store sensitive information in the payload.
* Validate the signature and expiration on every protected request.
* Implement logout by revoking refresh tokens or using token versioning if immediate invalidation is required.

---

# 25. Complete JWT Lifecycle

```text
                User
                  │
                  ▼
         POST /login
                  │
                  ▼
       Verify username/password
                  │
                  ▼
           Create JWT
                  │
                  ▼
        Send JWT to client
                  │
                  ▼
       Client stores JWT
                  │
                  ▼
 Protected API Request
Authorization: Bearer JWT
                  │
                  ▼
     Backend verifies JWT
                  │
                  ▼
   Signature valid & not expired?
            │              │
          Yes              No
            │              │
            ▼              ▼
      Extract claims    Return 401
            │
            ▼
      Execute request
            │
            ▼
       Return response
```

## A key concept to remember

A JWT is **not encrypted identity**—it is **signed identity**.

* **Encoding** makes the payload easy to transmit.
* **Signing** ensures the payload hasn't been altered.
* **Verification** proves the token was created by a trusted server and hasn't been tampered with.

That's why JWTs are trusted for authentication: the server doesn't trust the client—it trusts the **cryptographic signature** that only it (or another trusted issuer) can produce.
