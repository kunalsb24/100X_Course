# CORS (Cross-Origin Resource Sharing) - Complete Guide

CORS is one of the most important concepts in web development, especially when building frontend applications (React, Angular, Vue) that communicate with backend APIs (Express, Spring Boot, Django, etc.).

---

# What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism that determines whether a webpage from one origin is allowed to request resources from another origin.

Without CORS, browsers block many cross-origin requests to protect users from malicious websites.

---

# What is an Origin?

An **origin** is defined by the combination of:

```
Protocol + Domain + Port
```

Example:

```
https://example.com:443
│        │          │
│        │          └── Port
│        └───────────── Domain
└────────────────────── Protocol
```

All three must match for two URLs to have the same origin.

---

# Examples

## Same Origin

```
Frontend:
http://localhost:3000

Backend:
http://localhost:3000
```

Everything matches.

✅ Allowed

---

## Different Port

```
Frontend:
http://localhost:3000

Backend:
http://localhost:5000
```

Ports differ.

❌ Different Origin

---

## Different Protocol

```
http://example.com

https://example.com
```

Protocols differ.

❌ Different Origin

---

## Different Domain

```
https://google.com

https://facebook.com
```

Domains differ.

❌ Different Origin

---

# Why Does CORS Exist?

Imagine you're logged into your bank.

```
https://mybank.com
```

Now you accidentally visit:

```
https://evil.com
```

Without CORS, JavaScript on `evil.com` could silently make requests to:

```
https://mybank.com
```

using your browser and cookies, potentially exposing sensitive information.

CORS helps prevent this by allowing the server to decide which origins may access its resources.

---

# Same-Origin Policy (SOP)

Before understanding CORS, understand the Same-Origin Policy.

The browser allows:

```
Page
 ↓
Own Server
```

Example:

```
Frontend:
http://localhost:3000

API:
http://localhost:3000/api/users
```

Allowed.

---

Browser blocks:

```
Frontend:
http://localhost:3000

API:
http://localhost:5000
```

Blocked unless the server explicitly allows it with CORS.

---

# Example Without CORS

Suppose:

Frontend:

```
http://localhost:3000
```

Backend:

```
http://localhost:5000
```

React code:

```javascript
fetch("http://localhost:5000/users");
```

Browser says:

```
Access to fetch has been blocked by CORS policy.
```

The request may still reach the server, but the browser refuses to expose the response to your JavaScript because the required CORS headers are missing.

---

# How CORS Works

```
Browser
    │
    ▼
Request
    │
    ▼
Server
    │
    ▼
Response + CORS Headers
    │
    ▼
Browser checks headers
    │
    ▼
Allow or Block
```

The browser checks headers such as:

```
Access-Control-Allow-Origin
```

---

# Access-Control-Allow-Origin

Server returns:

```
Access-Control-Allow-Origin: http://localhost:3000
```

Browser compares:

```
Request Origin
↓

http://localhost:3000
```

Matches.

Browser allows JavaScript to read the response.

---

# If It Doesn't Match

Browser:

```
Origin:
http://localhost:3000
```

Server:

```
Access-Control-Allow-Origin:
http://example.com
```

Browser blocks the response.

---

# Simple Requests

These don't require a preflight request.

Examples:

```
GET

POST

HEAD
```

with only "simple" headers (such as `Accept` or `Content-Type: text/plain`, `application/x-www-form-urlencoded`, or `multipart/form-data`).

Example:

```javascript
fetch("/users");
```

Browser sends:

```
GET /users
Origin: http://localhost:3000
```

Server replies:

```
Access-Control-Allow-Origin:
http://localhost:3000
```

Done.

---

# Preflight Requests

Some requests are considered potentially more risky.

Examples:

```
PUT

PATCH

DELETE
```

or requests with custom headers like:

```
Authorization
```

or a JSON body (`Content-Type: application/json`).

Before sending the real request, the browser first sends an `OPTIONS` request.

---

# Example

JavaScript:

```javascript
fetch("/users", {
    method: "PUT",
    headers: {
        "Authorization": "Bearer TOKEN",
        "Content-Type": "application/json"
    }
});
```

Browser first sends:

```
OPTIONS /users
```

Server replies:

```
Access-Control-Allow-Origin:
http://localhost:3000

Access-Control-Allow-Methods:
PUT

Access-Control-Allow-Headers:
Authorization, Content-Type
```

If allowed:

Browser sends:

```
PUT /users
```

---

# Preflight Flow

```
Browser
    │
OPTIONS
    │
    ▼
Server
    │
Allowed?
    │
    ▼
200 OK
    │
    ▼
Actual Request
```

---

# Common CORS Headers

## Allow Origin

```
Access-Control-Allow-Origin
```

Example:

```
Access-Control-Allow-Origin:
http://localhost:3000
```

---

## Allow Methods

```
Access-Control-Allow-Methods:
GET, POST, PUT, DELETE
```

---

## Allow Headers

```
Access-Control-Allow-Headers:
Authorization, Content-Type
```

---

## Allow Credentials

```
Access-Control-Allow-Credentials:
true
```

Required if cookies or HTTP authentication are sent.

---

# Enabling CORS in Express

Install:

```bash
npm install cors
```

Import:

```javascript
const cors = require("cors");
```

Allow all origins:

```javascript
app.use(cors());
```

This is convenient for development but is often too permissive for production.

---

# Allow Specific Origin

```javascript
app.use(cors({
    origin: "http://localhost:3000"
}));
```

Only that frontend can access the API.

---

# Multiple Origins

```javascript
const allowedOrigins = [
    "http://localhost:3000",
    "https://myapp.com"
];

app.use(cors({
    origin: allowedOrigins
}));
```

---

# Allow Methods

```javascript
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
```

---

# Allow Headers

```javascript
app.use(cors({
    allowedHeaders: [
        "Authorization",
        "Content-Type"
    ]
}));
```

---

# Allow Cookies

Frontend:

```javascript
fetch(url, {
    credentials: "include"
});
```

Backend:

```javascript
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
```

Important: when `credentials: true` is used, `Access-Control-Allow-Origin` **cannot** be `*`; it must be a specific origin.

---

# Manual CORS Headers

Instead of the `cors` package:

```javascript
app.use((req, res, next) => {

    res.header(
        "Access-Control-Allow-Origin",
        "http://localhost:3000"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE"
    );

    next();

});
```

The `cors` middleware is generally preferred because it handles many edge cases, including preflight requests.

---

# Common CORS Error

```
Access to fetch has been blocked by CORS policy
```

Possible reasons:

* Server doesn't send CORS headers.
* Origin isn't allowed.
* Missing `OPTIONS` handling for preflight.
* Credentials are used with `Access-Control-Allow-Origin: *`.
* Requested method or headers aren't allowed.

---

# CORS vs Postman

Many beginners ask:

> "It works in Postman but not in my browser."

Reason:

```
Browser
    │
    ▼
CORS enforced
```

```
Postman
    │
    ▼
No browser security policy
```

Postman isn't a web browser, so it doesn't enforce the Same-Origin Policy or CORS.

---

# CORS vs CSRF

Many people confuse these concepts.

| CORS                                      | CSRF                                                   |
| ----------------------------------------- | ------------------------------------------------------ |
| Browser security feature                  | Attack technique                                       |
| Controls which origins can read responses | Tricks a user's browser into sending unwanted requests |
| Server responds with CORS headers         | Prevented with CSRF tokens, SameSite cookies, etc.     |

---

# Complete Express Example

```javascript
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ]);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
```

A React app running on `http://localhost:3000` can now access `http://localhost:5000/users`, while requests from other origins will be rejected unless you explicitly allow them.

---

# Complete CORS Request Lifecycle

```text
React App (localhost:3000)
          │
          ▼
fetch("/users")
          │
          ▼
Browser adds:
Origin: http://localhost:3000
          │
          ▼
Express Server
          │
          ▼
CORS Middleware
          │
Checks origin
          │
          ▼
Adds:
Access-Control-Allow-Origin: http://localhost:3000
          │
          ▼
Response
          │
          ▼
Browser verifies the header
          │
          ▼
JavaScript receives the response
```

## Best Practices

* Allow only the origins your application needs instead of using `*` in production.
* Restrict allowed methods and headers to the minimum required.
* Use `credentials: true` only when cookies or authenticated cross-origin requests are necessary.
* Let the `cors` middleware handle preflight requests instead of manually implementing them unless you have a specific need.
* Remember that **CORS is enforced by browsers**—it is not a server-side authentication or authorization mechanism.
