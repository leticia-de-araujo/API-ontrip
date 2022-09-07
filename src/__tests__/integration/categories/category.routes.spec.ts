import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";

import {
  mockedUser,
  mockedAdmin,
  mockedUserLogin,
  mockedAdminLogin,
} from "../../mocks/userMocks/index";
import { mockedCategory, mockedCategory2 } from "../../mocks/otherMocks";

describe("Testing the category routes", () => {
  let connection: DataSource;
  let genericUser: any;
  let adminUser: any;
  let genericToken: any;
  let adminToken: any;
  let genericCategory: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    genericUser = await request(app).post("/users").send(mockedUser);
    genericToken = await request(app).post("/login").send(mockedUserLogin);

    adminUser = await request(app).post("/users").send(mockedAdmin);
    adminToken = await request(app).post("/login").send(mockedAdminLogin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /category - Should be able to create a new category", async () => {
    genericCategory = await request(app)
      .post("/category")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCategory.status).toBe(201);
    expect(genericCategory.body.data).toHaveProperty("id");
    expect(genericCategory.body.data).toHaveProperty("name");
    expect(genericCategory.body.data).toHaveProperty("message");
  });

  test("POST /category - Should not be able to create a category that already exists (same name)", async () => {
    genericCategory = await request(app)
      .post("/category")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCategory.status).toBe(403);
    expect(genericCategory.body.data).toHaveProperty("message");
  });

  test("POST /category - Should not be able to create a category without being an Admin", async () => {
    genericCategory = await request(app)
      .post("/category")
      .send(mockedCategory2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(genericCategory.status).toBe(401);
    expect(genericCategory.body.data).toHaveProperty("message");
  });
});
