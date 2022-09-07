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


  //se os testes falharem, pode have a necessidade de alterar a referenciacao de response.body.data... para response.body.data.data...

  test("POST /categories - Should be able to create a new category", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCategory.status).toBe(201);
    expect(genericCategory.body.data).toHaveProperty("id");
    expect(genericCategory.body.data).toHaveProperty("name");
    expect(genericCategory.body.data).toHaveProperty("message");
  });


  test("POST /categories - Should not be able to create a category that already exists (same name)", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCategory.status).toBe(403);
    expect(genericCategory.body.data).toHaveProperty("message");
  });


  test("POST /categories - Should not be able to create a category without being an Admin", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send(mockedCategory2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(genericCategory.status).toBe(401);
    expect(genericCategory.body.data).toHaveProperty("message");
  });

  test("GET /categories - Should be able to list categories", async () => {
    genericCategory = await request(app).get("/categories");

    expect(genericCategory.status).toBe(200);
    expect(genericCategory.body.data).toHaveProperty("message");
    expect(genericCategory.body.data).toHaveProperty("data");
    expect(genericCategory.body.data.length).toBeGreaterThanOrEqual(1);
    expect(genericCategory.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: genericCategory.body.data[0].id,
          name: mockedCategory.name,
        }),
      ])
    );
  });

  test("GET /categories/:id -  Must be able to list one category", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send(mockedCategory2);
    const listOne = await request(app).get(
      `/categories/${
        genericCategory.body.data[genericCategory.body.data.length - 1].id
      }`
    );

    expect(listOne.status).toBe(200);
    expect(listOne.body.data).toHaveProperty("message");
    expect(listOne.body.data).toHaveProperty("data");
    expect(listOne.body.data).toEqual(
      expect.objectContaining({
        id: genericCategory.body.data.id,
        name: mockedCategory2.name,
      })
    );
  });

  test("GET /categories/:id -  Must not be able to list a category that doesn't exist", async () => {
    const listOne = await request(app).get("/categories/this7is7an7invalid7id");

    expect(listOne.status).toBe(400);
    expect(listOne.body.data).toHaveProperty("message");
    //se o teste der erro pode ser a logica do not.toHaveProperty abaixo, seria so apagar a linha
    expect(listOne.body.data).not.toHaveProperty("data");
  });

});