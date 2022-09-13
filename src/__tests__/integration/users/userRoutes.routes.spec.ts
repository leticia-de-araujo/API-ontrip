import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedUser,
  mockedUser2,
  mockedUser3,
  mockedUserAlternative,
  mockedUserAlternativeLogin,
  mockedUser3Login,
  mockedUserLogin,
  mockedUserTooLong,
  mockedUserWithoutAllFields,
  mockedUserWrongType,
  mockedUserPatch,
  mockedUserPatch2,
  mockedUser4,
  mockedUser4Login,
} from "../../mocks/userMocks";

describe("/users", () => {
  let connection: DataSource;
  let adminUser: any;
  let adminToken: any;
  let genericUser: any;
  let genericToken: any;
  let genericUser3: any;
  let genericUser4: any;
  let genericUserToken4: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    adminUser = await request(app).post("/users").send(mockedAdmin);

    adminToken = await request(app).post("/login").send(mockedAdminLogin);

    genericUser3 = await request(app).post("/users").send(mockedUser3);

    genericUser4 = await request(app).post("/users").send(mockedUser4);

    genericUserToken4 = await request(app)
      .post("/login")
      .send(mockedUser4Login);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users - Should be able to create a user", async () => {
    genericUser = await request(app).post("/users").send(mockedUser);
    genericToken = await request(app).post("/login").send(mockedUserLogin);

    expect(genericUser.status).toBe(201);
    expect(genericUser.body).toHaveProperty(
      "message",
      "User created with success"
    );
    expect(genericUser.body.user).toHaveProperty("id");
    expect(genericUser.body.user).toHaveProperty(
      "username",
      mockedUser.username
    );
    expect(genericUser.body.user).toHaveProperty("email", mockedUser.email);
    expect(genericUser.body.user).toHaveProperty(
      "dateOfBirth",
      mockedUser.dateOfBirth
    );
    expect(genericUser.body.user).toHaveProperty("isAdm", mockedUser.isAdm);
    expect(genericUser.body.user).toHaveProperty("isActive", true);
    expect(genericUser.body.user).toHaveProperty("photo", "Imagem padrão");
    expect(genericUser.body.user).not.toHaveProperty("password");
  });

  test("POST /users - Should not be able to create a user without all the information", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedUserWithoutAllFields);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("Error");
    expect(response.body.code).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /users - Should not be able to create a user with invalid data", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedUserWrongType);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("Error");
    expect(response.body.code).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /users - Should not be able to create a user with too large data length ", async () => {
    const response = await request(app).post("/users").send(mockedUserTooLong);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("Error");
    expect(response.body.code).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /users - Should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.status).toBe(409);
    expect(response.body.status).toBe("Error");
    expect(response.body.code).toBe(409);
    expect(response.body).toHaveProperty(
      "message",
      "This email already exists"
    );
  });

  test("GET /users - Should be able to list users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Successful request");
    expect(response.body.users).toBeInstanceOf(Array);
    expect(response.body.users.length).toBeGreaterThan(0);
  });

  test("GET /users - Should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(401);
    expect(response.body.status).toBe("Error");
    expect(response.body.code).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("GET /users - Should not be able to list users with invalid token", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer 1234567890987654321`);

    expect(response.status).toBe(401);
    expect(response.body.status).toBe("Error");
    expect(response.body.code).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  test("GET /users - Should not be able to list users without being an admin", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body.status).toBe("Error");
    expect(response.body.code).toBe(401);
    expect(response.body).toHaveProperty("message", "User is not an admin");
  });

  test("GET /users/:userId - Should be able to list one user being the account owner", async () => {
    const responseOneUser = await request(app)
      .get(`/users/${genericUser.body.user.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(responseOneUser.status).toBe(200);
    expect(responseOneUser.body).toHaveProperty(
      "message",
      "Successful request"
    );
    expect(responseOneUser.body.user).toEqual({
      id: genericUser.body.user.id,
      username: mockedUser.username,
      email: mockedUser.email,
      dateOfBirth: mockedUser.dateOfBirth,
      isAdm: mockedUser.isAdm,
      isActive: genericUser.body.user.isActive,
      photo: genericUser.body.user.photo,
    });
  });

  test("GET /users/:userId - Should be able to list one user being an admin", async () => {
    const responseOneUser = await request(app)
      .get(`/users/${genericUser.body.user.id}`)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(responseOneUser.status).toBe(200);
    expect(responseOneUser.body).toHaveProperty(
      "message",
      "Successful request"
    );
    expect(responseOneUser.body.user).toEqual({
      id: genericUser.body.user.id,
      username: mockedUser.username,
      email: mockedUser.email,
      dateOfBirth: mockedUser.dateOfBirth,
      isAdm: mockedUser.isAdm,
      isActive: genericUser.body.user.isActive,
      photo: genericUser.body.user.photo,
    });
  });

  test("GET /users/:userId - Should not be able to list one user without authorization token", async () => {
    const responseOneUser = await request(app).get(
      `/users/${genericUser.body.user.id}`
    );
    expect(responseOneUser.status).toBe(401);
    expect(responseOneUser.body.status).toBe("Error");
    expect(responseOneUser.body.code).toBe(401);
    expect(responseOneUser.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("GET /users/:userId - Should not be able to list one user with invalid token", async () => {
    const responseOneUser = await request(app)
      .get(`/users/${genericUser.body.user.id}`)
      .set("Authorization", `Bearer 12345677909876543`);

    expect(responseOneUser.status).toBe(401);
    expect(responseOneUser.body.status).toBe("Error");
    expect(responseOneUser.body.code).toBe(401);
    expect(responseOneUser.body).toHaveProperty("message", "Invalid token");
  });

  test("GET /users/:userId - Should not be able to list one user without being an admin or account owner", async () => {
    const responseOneUser = await request(app)
      .get(`/users/${adminUser.body.user.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(responseOneUser.status).toBe(401);
    expect(responseOneUser.body.status).toBe("Error");
    expect(responseOneUser.body.code).toBe(401);
    expect(responseOneUser.body).toHaveProperty(
      "message",
      "User must be an admin or the owner of the account"
    );
  });

  test("GET /users/:userId - Should not be able to list one user that doesn't exist", async () => {
    const responseOneUser = await request(app)
      .get(`/users/ajs7d86sgvdfasgf4r6546653487ysdgv`)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(responseOneUser.status).toBe(404);
    expect(responseOneUser.body.status).toBe("Error");
    expect(responseOneUser.body.code).toBe(404);
    expect(responseOneUser.body).toHaveProperty("message", "User not found");
  });

  test("PATCH /users/:userId - Should be able to update a user being the account owner", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser.body.user.id}`)
      .send(mockedUserPatch)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(userUpdate.status).toBe(200);
    expect(userUpdate.body).toHaveProperty(
      "message",
      "User updated with success"
    );
    expect(userUpdate.body.user).toEqual({
      id: genericUser.body.user.id,
      username: genericUser.body.user.username,
      email: mockedUserPatch.email,
      dateOfBirth: genericUser.body.user.dateOfBirth,
      isAdm: genericUser.body.user.isAdm,
      isActive: true,
      photo: genericUser.body.user.photo,
    });
  });

  test("PATCH /users/:userId - Should be able to update a user being an admin", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser.body.user.id}`)
      .send(mockedUserPatch2)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(userUpdate.status).toBe(200);
    expect(userUpdate.body).toHaveProperty(
      "message",
      "User updated with success"
    );
    expect(userUpdate.body.user).toEqual({
      id: genericUser.body.user.id,
      username: genericUser.body.user.username,
      email: mockedUserPatch2.email,
      dateOfBirth: genericUser.body.user.dateOfBirth,
      isAdm: genericUser.body.user.isAdm,
      isActive: true,
      photo: genericUser.body.user.photo,
    });
  });

  test("PATCH /users/:userId - Should not be able to update a user without an authorization token", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser.body.user.id}`)
      .send(mockedUserPatch);

    expect(userUpdate.status).toBe(401);
    expect(userUpdate.body.status).toBe("Error");
    expect(userUpdate.body.code).toBe(401);
    expect(userUpdate.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("PATCH /users/:userId - Should not be able to update a user with an invalid token", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser.body.user.id}`)
      .send(mockedUserPatch)
      .set("Authorization", `Bearer 123456789876544`);

    expect(userUpdate.status).toBe(401);
    expect(userUpdate.body.status).toBe("Error");
    expect(userUpdate.body.code).toBe(401);
    expect(userUpdate.body).toHaveProperty("message", "Invalid token");
  });

  test("PATCH /users/:userId - Should not be able to update a user without being an admin or account owner", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser.body.user.id}`)
      .send(mockedUserPatch)
      .set("Authorization", `Bearer ${genericUserToken4.body.token}`);

    expect(userUpdate.status).toBe(401);
    expect(userUpdate.body.status).toBe("Error");
    expect(userUpdate.body.code).toBe(401);
    expect(userUpdate.body).toHaveProperty(
      "message",
      "User must be an admin or the owner of the account"
    );
  });

  test("PATCH /users/:userId - Should not be able to update a user with existing email", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser4.body.user.id}`)
      .send({ email: genericUser3.body.user.email })
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(userUpdate.status).toBe(409);
    expect(userUpdate.body.status).toBe("Error");
    expect(userUpdate.body.code).toBe(409);
    expect(userUpdate.body).toHaveProperty("message", "Email already exists");
  });

  test("PATCH /users/:userId - Should not be able to update a user with invalid data", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser4.body.user.id}`)
      .send({ email: 123 })
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(userUpdate.status).toBe(400);
    expect(userUpdate.body.status).toBe("Error");
    expect(userUpdate.body.code).toBe(400);
    expect(userUpdate.body).toHaveProperty("message");
  });

  test("PATCH /users/:userId - Should not be able to update a user with data that is too large", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser4.body.user.id}`)
      .send(mockedUserTooLong)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(userUpdate.status).toBe(400);
    expect(userUpdate.body.status).toBe("Error");
    expect(userUpdate.body.code).toBe(400);
    expect(userUpdate.body).toHaveProperty("message");
  });

  test("PATCH /users/:userId - Should not be able to update a user that does not exist", async () => {
    const userUpdate = await request(app)
      .patch(`/users/42235353csgfd0`)
      .send(mockedUser3)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(userUpdate.status).toBe(404);
    expect(userUpdate.body.status).toBe("Error");
    expect(userUpdate.body.code).toBe(404);
    expect(userUpdate.body).toHaveProperty("message", "User not found");
  });

  test("DELETE /users/:userId - Should not be able to soft-delete a user without authorization token", async () => {
    const UserTobeDeleted = await request(app).delete(
      `/users/${genericUser4.body.user.id}`
    );

    expect(UserTobeDeleted.status).toBe(401);
    expect(UserTobeDeleted.body.status).toBe("Error");
    expect(UserTobeDeleted.body.code).toBe(401);
    expect(UserTobeDeleted.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("DELETE /users/:userId - Should not be able to soft-delete a user with invalid token", async () => {
    const UserTobeDeleted = await request(app)
      .delete(`/users/${genericUser4.body.user.id}`)
      .set("Authorization", `Bearer 12345678909876554`);

    expect(UserTobeDeleted.status).toBe(401);
    expect(UserTobeDeleted.body.status).toBe("Error");
    expect(UserTobeDeleted.body.code).toBe(401);
    expect(UserTobeDeleted.body).toHaveProperty("message", "Invalid token");
  });

  test("DELETE /users/:userId - Should not be able to soft-delete a user without being an admin or account owner", async () => {
    const UserTobeDeleted = await request(app)
      .delete(`/users/${genericUser4.body.user.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(UserTobeDeleted.status).toBe(401);
    expect(UserTobeDeleted.body.status).toBe("Error");
    expect(UserTobeDeleted.body.code).toBe(401);
    expect(UserTobeDeleted.body).toHaveProperty(
      "message",
      "User must be an admin or the owner of the account"
    );
  });

  test("DELETE /users/:userId - Should not be able to soft-delete a user that does not exist", async () => {
    const UserTobeDeleted = await request(app)
      .delete(`/users/ah76as7sgafsgy56r8vgi`)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(UserTobeDeleted.status).toBe(404);
    expect(UserTobeDeleted.body.status).toBe("Error");
    expect(UserTobeDeleted.body.code).toBe(404);
    expect(UserTobeDeleted.body).toHaveProperty("message", "User not found");
  });

  test("DELETE /users/:userId - Should be able to soft-delete a user as the account owner", async () => {
    const UserTobeDeleted = await request(app)
      .delete(`/users/${genericUser.body.user.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(UserTobeDeleted.status).toBe(200);
    expect(UserTobeDeleted.body).toHaveProperty(
      "message",
      "User deleted with success"
    );
  });

  test("DELETE /users/:userId - Should be able to soft-delete a user as an admin", async () => {
    const UserTobeDeleted = await request(app)
      .delete(`/users/${genericUser4.body.user.id}`)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(UserTobeDeleted.status).toBe(200);
    expect(UserTobeDeleted.body).toHaveProperty(
      "message",
      "User deleted with success"
    );
  });

  test("DELETE /users/:userId - Should not be able to soft-delete a user that is already deleted", async () => {
    const UserTobeDeleted = await request(app)
      .delete(`/users/${genericUser.body.user.id}`)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(UserTobeDeleted.status).toBe(400);
    expect(UserTobeDeleted.body.status).toBe("Error");
    expect(UserTobeDeleted.body.code).toBe(400);
    expect(UserTobeDeleted.body).toHaveProperty(
      "message",
      "User already deleted"
    );
  });
});
