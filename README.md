# Skillit

![FORKS](https://img.shields.io/github/forks/DenylsonMiguel/Skillit?style=for-the-badge)
![ISSUES](https://img.shields.io/github/issues/DenylsonMiguel/Skillit?style=for-the-badge)
![STARS](https://img.shields.io/github/stars/DenylsonMiguel/Skillit?style=for-the-badge)
![Version](https://img.shields.io/github/v/tag/DenylsonMiguel/Skillit?style=for-the-badge)
![License](https://img.shields.io/github/license/DenylsonMiguel/Skillit?style=for-the-badge)
![Top Language](https://img.shields.io/github/languages/top/DenylsonMiguel/Skillit?style=for-the-badge)

**Reddit backend for posting your skills.**

## Technologies used

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" height="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" height="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" height="50"/>
</p> 

## Necessary dependencies

- Node.js >= 20.x
- npm or yarn
- MongoDB

## How to run the application

1. First, clone the GitHub repository using:

```
git clone https://github.com/DenylsonMiguel/Skillit.git
cd Skillit
```

3. Now create a **.env** file in the project root with the following content, just change it to your own.

```
PORT=<your-port>
DB_URI=<your-MONGO-DB-URI>
JWT_SECRET=<your-jwt-secret>
FRONT=<your-front-host>
HOST=<your-host>
```

3. Now run these commands and your application will be running.

```
npm install
npm run build
npm start
```

## Endpoints

### **Auth**
| Method | Route | Description | JWT Required |
|--------|-------|------------|--------------|
| <span style="color: #007bff;">POST</span> | `/auth/register` | Creates a pending user and returns a confirmation token | ❌ |
| <span style="color: #007bff;">POST</span> | `/auth/login` | Logs in a user and returns a JWT token | ❌ |
| <span style="color: #28a745;">GET</span> | `/confirm/:token` | Confirms a pending user using the email token | ❌ |

### **Users**
| Method | Route | Description | JWT Required |
|--------|-------|------------|--------------|
| <span style="color: #28a745;">GET</span> | `/users` | Returns all users | ❌ |
| <span style="color: #28a745;">GET</span> | `/user/:id` | Returns user information by ID | ❌ |
| <span style="color: #ffc107;">PUT</span> | `/user/:id` | Updates user data (name or password) | ✅ |
| <span style="color: #28a745;">GET</span> | `/me` | Returns authenticated user data | ✅ |

### **Skills** *(to be implemented)*
| Method | Route | Description | JWT Required |
|--------|-------|------------|--------------|
| <span style="color: #007bff;">POST</span> | `/skill` | Creates a skill for a user | ✅ |
| <span style="color: #28a745;">GET</span> | `/skills` | Returns all skills | ❌ |
| <span style="color: #28a745;">GET</span> | `/skill/:id` | Returns a skill by ID | ❌ |
| <span style="color: #28a745;">GET</span> | `/skills/:id` | Returns all skills of a user | ❌ |
| <span style="color: #ffc107;">PUT</span> | `/skill/:id` | Updates a skill by ID | ✅ |
| <span style="color: #dc3545;">DELETE</span> | `/skill/:id` | Deletes a skill by ID | ✅ |

**Notes:**  
- Endpoints using `verifyJWT` require the header:  
```http
Authorization: Bearer <token>
```
Error responses follow the format { error: string }.

For /auth/register, password must be at least 8 characters and name between 3 and 20 characters.

/confirm/:token is used after registration to activate the user.

## Final considerations

**Skillit was undoubtedly a great way to learn, as I had to work with many different things. I had some problems during that time, but in the end I managed to build this application.**
