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
} from "../../mocks/userMocks";

describe("/users", () => {
  let connection: DataSource;
  let adminUser: any;
  let adminToken: any;
  let genericUser: any;
  let backupGenericUser: any;
  let backupGenericToken: any;
  let genericToken: any;

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

    backupGenericUser = await request(app)
      .post("/users")
      .send(mockedUserAlternative);
    backupGenericToken = await request(app)
      .post("/login")
      .send(mockedUserAlternativeLogin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users -  Must be able to create a user", async () => {
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
    expect(genericUser.body.user).toHaveProperty("isAdm", false);
    expect(genericUser.body.user).toHaveProperty("isActive", mockedUser);
    expect(genericUser.body.user).toHaveProperty("photo", "Imagem padrão");
    expect(genericUser.body.user).not.toHaveProperty("password");
  });

  test("POST /users -  should not be able to create a user without all the information", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedUserWithoutAllFields);

    expect(response.body.status).toBe(400);
    expect(response.body.code).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "dateOfBirth is a required field"
    );
  });

  test("POST /users -  should not be able to create a user with invalid data", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedUserWrongType);

    expect(response.body.status).toBe(400);
    expect(response.body.code).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "email has an invalid type"
    );
  });

  test("POST /users -  should not be able to create a user with invalid data", async () => {
    const response = await request(app).post("/users").send(mockedUserTooLong);

    expect(response.body.status).toBe(413);
    expect(response.body.code).toBe(413);
    expect(response.body).toHaveProperty("message", "username too large");
  });

  test("POST /users -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body.status).toBe(409);
    expect(response.body.code).toBe(409);
    expect(response.body).toHaveProperty(
      "message",
      "This email already exists"
    );
  });

  test("GET /users -  Must be able to list users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Successful request");
    expect(response.body.users[0]).toEqual({
      id: genericUser.id,
      username: genericUser.name,
      email: genericUser.email,
      dateOfBirth: genericUser.dateOfBirth,
      isAdm: genericUser.isAdm,
      isActive: genericUser.isActive,
      photo: genericUser.photo,
    });
  });

  test("GET /users -  should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("GET /users -  should not be able to list users without authentication", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer 1234567890987654321`);

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("GET /users -  should not be able to list users not being admin", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(401);
    expect(response.body).toHaveProperty("message", "User not admin");
  });

  test("GET /users/:id -  Must be able to list one user being the owner", async () => {
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
      isActive: false,
      photo: genericUser.photo,
    });
  });

  test("GET /users/:id -  Must be able to list one user being the admin", async () => {
    const responseOneUser = await request(app)
      .get(`/users/${genericUser.body.user.id}`)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(responseOneUser.status).toBe(200);
    expect(responseOneUser.body).toHaveProperty(
      "message",
      "Successful request"
    );
    expect(responseOneUser.body.user).toEqual({
      id: responseOneUser.body.data.id,
      username: responseOneUser.body.data.name,
      email: responseOneUser.body.data.email,
      dateOfBirth: responseOneUser.body.data.dateOfBirth,
      isAdm: responseOneUser.body.data.isAdm,
      isActive: responseOneUser.body.data.isActive,
      photo: responseOneUser.body.data.photo,
    });
  });

  test("GET /users/:id -  should not be able to list one without token", async () => {
    const responseOneUser = await request(app).get(
      `/users/${genericUser.body.user.id}`
    );
    expect(responseOneUser.status).toBe(401);
    expect(responseOneUser.body.code).toBe(401);
    expect(responseOneUser.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("GET /users/:id -  should not be able to list one with invalid token", async () => {
    const responseOneUser = await request(app)
      .get(`/users/${genericUser.body.user.id}`)
      .set("Authorization", `Bearer 12345677909876543`);

    expect(responseOneUser.status).toBe(401);
    expect(responseOneUser.body.code).toBe(401);
    expect(responseOneUser.body).toHaveProperty("message", "Invalid Token");
  });

  test("GET /users/:id -  should not be able to list one user not being admin or owner", async () => {
    const responseOneUser = await request(app)
      .get(`/users/${adminUser.body.data.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(responseOneUser.status).toBe(401);
    expect(responseOneUser.body.code).toBe(401);
    expect(responseOneUser.body).toHaveProperty(
      "message",
      "User must be an admin or the owner of the account"
    );
  });

  test("PATCH /users/:id -  should be able to update user being owner", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser.body.user.id}`)
      .send(mockedUser3)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(userUpdate.status).toBe(200);
    expect(userUpdate.body).toHaveProperty(
      "message",
      "User updated with success"
    );
    expect(userUpdate.body.code).toBe(200);
    expect(userUpdate.body.user).toEqual({
      id: genericUser.body.user.id,
      username: mockedUser3.username,
      email: mockedUser3.email,
      dateOfBirth: mockedUser3.dateOfBirth,
      isAdm: genericUser.isAdm,
      isActive: true,
      photo: genericUser.body.user.photo,
    });
  });

  test("PATCH /users/:id -  should be able to update user being admin", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser.body.user.id}`)
      .send(mockedUser2)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(userUpdate.body).toHaveProperty(
      "message",
      "User updated with success"
    );
    expect(userUpdate.body.code).toBe(200);
    expect(userUpdate.body.user).toEqual({
      id: genericUser.body.data.id,
      username: mockedUser2.username,
      email: mockedUser2.email,
      dateOfBirth: mockedUser2.dateOfBirth,
      isAdm: genericUser.body.user.isAdm,
      isActive: genericUser.body.user.isActive,
      photo: genericUser.body.user.photo,
    });
  });

  test("PATCH /users/:id -  should not be able to update user without a token", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser.body.user.id}`)
      .send(mockedUser3);

    expect(userUpdate.status).toBe(401);
    expect(userUpdate.body.code).toBe(401);
    expect(userUpdate.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("PATCH /users/:id -  should not be able to update user with an invalid token", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser.body.user.id}`)
      .send(mockedUser3)
      .set("Authorization", `Bearer 123456789876544`);

    expect(userUpdate.status).toBe(401);
    expect(userUpdate.body.code).toBe(401);
    expect(userUpdate.body).toHaveProperty("message", "Invalid token");
  });

  test("PATCH /users/:id -  should not be able to update user without being owner or admin", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${genericUser.body.data.id}`)
      .send(mockedUser2)
      .set("Authorization", `Bearer ${backupGenericToken.body.token}`);

    expect(userUpdate.status).toBe(401);
    expect(userUpdate.body.code).toBe(401);
    expect(userUpdate.body).toHaveProperty(
      "message",
      "User must be an admin or the owner of the account"
    );
  });

  test("PATCH /users/:id -  should not be able to update user with existing email", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${backupGenericUser.body.user.id}`)
      .send({ email: "hitalo@mail.com" })
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(userUpdate.status).toBe(409);
    expect(userUpdate.body.code).toBe(409);
    expect(userUpdate.body).toHaveProperty("message", "Email already exists");
  });

  test("PATCH /users/:id -  should not be able to update user with invalid data", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${backupGenericUser.body.user.id}`)
      .send({ email: 123 })
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(userUpdate.status).toBe(400);
    expect(userUpdate.body.code).toBe(400);
    expect(userUpdate.body).toHaveProperty(
      "message",
      "name has an invalid data type"
    );
  });

  test("PATCH /users/:id -  should not be able to update user with data that is too large", async () => {
    const userUpdate = await request(app)
      .patch(`/users/${backupGenericUser.body.user.id}`)
      .send(mockedUserTooLong)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(userUpdate.status).toBe(413);
    expect(userUpdate.body.code).toBe(413);
    expect(userUpdate.body).toHaveProperty("message", "name length too large");
  });

  test("PATCH /users/:id -  should not be able to update inexistent user", async () => {
    const userUpdate = await request(app)
      .patch(`/users/420`)
      .send(mockedUser3)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(userUpdate.status).toBe(404);
    expect(userUpdate.body.code).toBe(404);
    expect(userUpdate.body).toHaveProperty("message", "User not found");
  });

  test("DELETE /users/:id -  should be able to soft-delete user as owner", async () => {
    const UserTobeDeleted = await request(app)
      .delete(`/users/${genericUser.body.user.id}`)
      .set("Authorization", `Bearer ${genericUser.body.token}`);

    expect(UserTobeDeleted.status).toBe(200);
    expect(UserTobeDeleted.body.code).toBe(200);
    expect(UserTobeDeleted.body).toHaveProperty(
      "message",
      "User deleted with success"
    );
  });

  test("DELETE /users/:id -  should not be able to soft-delete user without token", async () => {
    const UserTobeDeleted = await request(app).delete(
      `/users/${backupGenericUser.body.user.id}`
    );

    expect(UserTobeDeleted.status).toBe(401);
    expect(UserTobeDeleted.body.code).toBe(401);
    expect(UserTobeDeleted.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("DELETE /users/:id -  should not be able to soft-delete user with invalid token", async () => {
    const UserTobeDeleted = await request(app)
      .delete(`/users/${backupGenericUser.body.user.id}`)
      .set("Authorization", `Bearer 12345678909876554`);

    expect(UserTobeDeleted.status).toBe(401);
    expect(UserTobeDeleted.body.code).toBe(401);
    expect(UserTobeDeleted.body).toHaveProperty("message", "Invalid token");
  });

  test("DELETE /users/:id -  should not be able to soft-delete user if not owner or admin", async () => {
    const UserTobeDeleted = await request(app)
      .delete(`/users/${backupGenericUser.body.user.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(UserTobeDeleted.status).toBe(401);
    expect(UserTobeDeleted.body.code).toBe(401);
    expect(UserTobeDeleted.body).toHaveProperty(
      "message",
      "User must be an admin or the owner of the account"
    );
  });

  test("DELETE /users/:id -  should not be able to soft-delete user if it doesn't exist", async () => {
    const UserTobeDeleted = await request(app)
      .delete(`/users/churrosforever`)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(UserTobeDeleted.status).toBe(404);
    expect(UserTobeDeleted.body.code).toBe(404);
    expect(UserTobeDeleted.body).toHaveProperty("message", "User not found");
  });

  test("DELETE /users/:id -  should be able to soft-delete user as owner", async () => {
    const UserTobeDeleted = await request(app)
      .delete(`/users/${genericUser.body.user.id}`)
      .set("Authorization", `Bearer ${adminUser.body.token}`);

    expect(UserTobeDeleted.status).toBe(400);
    expect(UserTobeDeleted.body.code).toBe(400);
    expect(UserTobeDeleted.body).toHaveProperty(
      "message",
      "User already deleted"
    );
  });

  /////////
});
