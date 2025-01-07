---

# **Backend APIs**

This project provides a robust API module with authentication features and follows a factory-based code model for enhanced scalability and maintainability.

---

## **Getting Started**

Follow these steps to set up and run the project on your local machine:

### **1. Install Dependencies**
Before running the project, make sure to install the required npm packages. Run the following command:

```bash
npm install
```

### **2. Start the Server**
Start the server by running:

```bash
npm run dev
```

### **3. Access the API**
Once the server is running, you can access the API at:

```
http://localhost:4000/
```

---

## **How to Use**

1. **Authentication**  
   - Register a new user by sending a POST request to the `/auth/register` endpoint with the required details.
   - Log in by sending a POST request to the `/auth/login` endpoint. On successful login, you'll receive a JWT token to authorize further requests.

2. **Accessing Protected APIs**  
   - Include the JWT token in the `Authorization` header for any request to protected endpoints.
   - Example:

     ```json
     {
       "Authorization": "Bearer <your-token>"
     }
     ```

3. **Factory-Based Code Structure**  
   - The project uses a factory pattern for modular and reusable code. Each module is isolated and can be extended or replaced without impacting other parts of the system.

---

## **Features**

- Secure user authentication using JWT.
- Factory-based code structure for better scalability and maintainability.
- Modular design for adding and managing APIs efficiently.
- Detailed error handling and validation.

---

## **Endpoints Overview**

### **Authentication**

- **POST /auth/register**
  - Registers a new user.
  - Required fields: `name`, `email`, `password`.

- **POST /auth/login**
  - Authenticates a user and provides a JWT token.
  - Required fields: `email`, `password`.

### **Example API**

- **GET /api/example**
  - Protected route that demonstrates how to use the JWT token for accessing APIs.
  - Requires a valid token in the `Authorization` header.

---

## **Requirements**

- **Node.js** (v18 recommended)
- **MongoDB** for database storage.

---

## **Contributing**

Feel free to contribute to this project. For major changes, please open an issue first to discuss what you'd like to change.

---

## **License**

This project is licensed under the MIT License.

---