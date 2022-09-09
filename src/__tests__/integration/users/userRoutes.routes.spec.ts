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
  mockedUser3Login,
  mockedUserLogin,
  mockedUserWithoutAllFields,
  mockedUserWrongType,
} from "../../mocks/userMocks";

describe("/users", () => {
  let connection: DataSource;

  beforeEach(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test("POST /users -  Must be able to create a user", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("username");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("dateOfBirth");
    expect(response.body.data).toHaveProperty("isAdm");
    expect(response.body.data).toHaveProperty("isActive");
    expect(response.body.data).toHaveProperty("photo");
    expect(response.body.data).not.toHaveProperty("password");
    expect(response.body.data.username).toEqual("Hitalo");
    expect(response.body.data.email).toEqual("hitalo@mail.com");
    expect(response.body.data.dateOfBirth).toEqual("2000/02/11");
    expect(response.body.data.isAdm).toEqual(false);
    expect(response.status).toBe(201);
  });

  test("POST /users -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUser);
    const response2 = await request(app).post("/users").send(mockedUser);

    expect(response2.body).toHaveProperty("message");
    expect(response2.body.code).toBe(409);
  });

  test("POST /users -  should not be able to create a user with an email that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUser2);
    const response2 = await request(app).post("/users").send(mockedUser);

    expect(response2.body).toHaveProperty("message");
    expect(response2.body.code).toBe(409);
  });

  test("POST /users -  should not be able to create a user without all the information", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedUserWithoutAllFields);

    expect(response.body).toHaveProperty("message");
    expect(response.body.code).toBe(400);
  });

  test("GET /users -  Must be able to list users", async () => {
    await request(app).post("/users").send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.data.token}`);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: response.body.data[0].id,
          username: response.body.data[0].name,
          email: response.body.data[0].email,
          dateOfBirth: response.body.data[0].dateOfBirth,
          isAdm: response.body.data[0].isAdm,
          isActive: response.body.data[0].isActive,
          photo: response.body.data[0].photo,
        }),
      ])
    );
  });

  test("GET /users -  should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.body.code).toBe(401);
  });

  test("GET /users -  should not be able to list users not being admin", async () => {
    const userResponse = await request(app).post("/users").send(mockedUser);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.data.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.body.code).toBe(403);
  });

  test("GET /users/:id -  Must be able to list one user being the owner", async () => {
    const userResponse = await request(app).post("/users").send(mockedUser);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const responseOneUser = await request(app)
      .post(`/users/${userResponse.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.data.token}`);
    expect(responseOneUser.body).toHaveProperty("message");
    expect(responseOneUser.body).toHaveProperty("data");
    expect(responseOneUser.body.data).toEqual(
      expect.objectContaining({
        id: responseOneUser.body.data.id,
        username: responseOneUser.body.data.name,
        email: responseOneUser.body.data.email,
        dateOfBirth: responseOneUser.body.data.dateOfBirth,
        isAdm: responseOneUser.body.data.isAdm,
        isActive: responseOneUser.body.data.isActive,
        photo: responseOneUser.body.data.photo,
      })
    );
  });

  test("GET /users/:id -  Must be able to list one user being the admin", async () => {
    const userResponse = await request(app).post("/users").send(mockedAdmin);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const responseOneUser = await request(app)
      .post(`/users/${userResponse.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.data.token}`);
    expect(responseOneUser.body).toHaveProperty("message");
    expect(responseOneUser.body).toHaveProperty("data");
    expect(responseOneUser.body.data).toEqual(
      expect.objectContaining({
        id: responseOneUser.body.data.id,
        username: responseOneUser.body.data.name,
        email: responseOneUser.body.data.email,
        dateOfBirth: responseOneUser.body.data.dateOfBirth,
        isAdm: responseOneUser.body.data.isAdm,
        isActive: responseOneUser.body.data.isActive,
        photo: responseOneUser.body.data.photo,
      })
    );
  });

  test("GET /users/:id -  should not be able to list one without token", async () => {
    const userResponse = await request(app).post("/users").send(mockedAdmin);
    const responseOneUser = await request(app).post(
      `/users/${userResponse.body.data.id}`
    );
    expect(responseOneUser.body).toHaveProperty("message");
    expect(responseOneUser.body.code).toBe(401);
  });

  test("GET /users/:id -  should not be able to list one user not being admin or owner", async () => {
    const userResponse = await request(app).post("/users").send(mockedAdmin);
    await request(app).post("/users").send(mockedUser);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const responseOneUser = await request(app)
      .post(`/users/${userResponse.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.data.token}`);

    expect(responseOneUser.body).toHaveProperty("message");
    expect(responseOneUser.body.code).toBe(401);
  });

  test("PATCH /users/:id -  should be able to update user being owner", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUser3)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.body.code).toBe(200);
    expect(userUpdate.body.data).toEqual(
      expect.objectContaining({
        id: userUpdate.body.data.id,
        username: userUpdate.body.data.name,
        email: userUpdate.body.data.email,
        dateOfBirth: userUpdate.body.data.dateOfBirth,
        isAdm: userUpdate.body.data.isAdm,
        isActive: userUpdate.body.data.isActive,
        photo: userUpdate.body.data.photo,
      })
    );
  });

  test("PATCH /users/:id -  should be able to update user being admin", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedAdmin);
    const userLogin = await request(app).post("/login").send(mockedAdminLogin);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUser3)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.body.code).toBe(200);
    expect(userUpdate.body.data).toEqual(
      expect.objectContaining({
        id: userUpdate.body.data.id,
        username: userUpdate.body.data.name,
        email: userUpdate.body.data.email,
        dateOfBirth: userUpdate.body.data.dateOfBirth,
        isAdm: userUpdate.body.data.isAdm,
        isActive: userUpdate.body.data.isActive,
        photo: userUpdate.body.data.photo,
      })
    );
  });

  test("PATCH /users/:id -  should not be able to update user without being owner or admin", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedUser3);
    const userLogin = await request(app).post("/login").send(mockedUser3Login);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUser2)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.body.code).toBe(401);
  });

  test("PATCH /users/:id -  should not be able to update user with existing email", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedUser3);
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUser3)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.body.code).toBe(403);
  });

  test("PATCH /users/:id -  should not be able to update inexistent user", async () => {
    await request(app).post("/users").send(mockedAdmin);
    const userLogin = await request(app).post("/login").send(mockedAdminLogin);
    const userUpdate = await request(app)
      .patch(`/users/100`)
      .send(mockedUser3)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.body.code).toBe(404);
  });

  test("PATCH /users/:id -  should not be able to update user without authentication", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUser3);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.body.code).toBe(401);
  });

  test("PATCH /users/:id -  should not be able to update with incorrect type", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedAdmin);
    const userLogin = await request(app).post("/login").send(mockedAdminLogin);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUserWrongType)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.body.code).toBe(400);
  });

  test("DELETE /users/:id -  should be able to soft-delete user as owner", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    const loginUser = await request(app).post("/login").send(mockedUserLogin);
    const UserTobeDeleted = await request(app)
      .delete(`/users/${createUser.body.data.id}`)
      .set("Authorization", `Bearer ${loginUser.body.data.token}`);
    expect(UserTobeDeleted.body).toHaveProperty("message");
    expect(UserTobeDeleted.body.code).toBe(200);
    const UserDeleted = await request(app)
      .get(`/users/${createUser.body.data.id}`)
      .set("Authorization", `Bearer ${loginUser.body.data.token}`);
    expect(UserDeleted.body.data.isActive).toBe(false);
  });

  test("DELETE /users/:id -  should be able to soft-delete user as admin", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedAdmin);
    const loginUser = await request(app).post("/login").send(mockedAdminLogin);
    const UserTobeDeleted = await request(app)
      .delete(`/users/${createUser.body.data.id}`)
      .set("Authorization", `Bearer ${loginUser.body.data.token}`);
    expect(UserTobeDeleted.body).toHaveProperty("message");
    expect(UserTobeDeleted.body.code).toBe(200);
    const UserDeleted = await request(app)
      .get(`/users/${createUser.body.data.id}`)
      .set("Authorization", `Bearer ${loginUser.body.data.token}`);
    expect(UserDeleted.body.data.isActive).toBe(false);
  });

  test("DELETE /users/:id -  should not be able to delete user without authentication", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    const UserTobeDeleted = await request(app).delete(
      `/users/${createUser.body.data.id}`
    );
    expect(UserTobeDeleted.body).toHaveProperty("message");
    expect(UserTobeDeleted.body.code).toBe(401);
  });

  test("DELETE /users/:id -  should not be able to delete inexistent user", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    const loginUser = await request(app).post("/login").send(mockedUserLogin);
    const UserTobeDeleted = await request(app)
      .delete(`/users/300`)
      .set("Authorization", `Bearer ${loginUser.body.data.token}`);
    expect(UserTobeDeleted.body).toHaveProperty("message");
    expect(UserTobeDeleted.body.code).toBe(404);
  });
});
