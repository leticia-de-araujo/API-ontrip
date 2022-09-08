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
import { mockedType, mockedType2, mockedType3 } from "../../mocks/otherMocks";

describe("Testing the type routes", () => {
  let connection: DataSource;
  let genericUser: any;
  let adminUser: any;
  let genericToken: any;
  let adminToken: any;
  let genericType: any;

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

  //se os testes falharem, pode haver a necessidade de alterar a referenciacao de response.body.data... para response.body.data.data...

  test("POST /types - Should be able to create a new type", async () => {
    genericType = await request(app)
      .post("/types")
      .send(mockedType)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericType.status).toBe(201);
    expect(genericType.body.data).toHaveProperty("id");
    expect(genericType.body.data).toHaveProperty("name");
    expect(genericType.body.data).toHaveProperty("message");
  });

  test("POST /types - Should not be able to create a type that already exists (same name)", async () => {
    genericType = await request(app)
      .post("/types")
      .send(mockedType)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericType.status).toBe(403);
    expect(genericType.body.data).toHaveProperty("message");
  });

  test("POST /types - Should not be able to create a type without being an Admin", async () => {
    genericType = await request(app)
      .post("/types")
      .send(mockedType2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(genericType.status).toBe(401);
    expect(genericType.body.data).toHaveProperty("message");
  });

  test("GET /types - Should be able to list types", async () => {
    genericType = await request(app).get("/types");

    expect(genericType.status).toBe(200);
    expect(genericType.body.data).toHaveProperty("message");
    expect(genericType.body.data).toHaveProperty("data");
    expect(genericType.body.data.length).toBeGreaterThanOrEqual(1);
    expect(genericType.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: genericType.body.data[0].id,
          name: mockedType.name,
        }),
      ])
    );
  });

  test("GET /types/:id -  Must be able to list one Type", async () => {
    genericType = await request(app).post("/types").send(mockedType2);
    const listOne = await request(app).get(
      `/types/${genericType.body.data[genericType.body.data.length - 1].id}`
    );

    expect(listOne.status).toBe(200);
    expect(listOne.body.data).toHaveProperty("message");
    expect(listOne.body.data).toHaveProperty("data");
    expect(listOne.body.data).toEqual(
      expect.objectContaining({
        id: genericType.body.data.id,
        name: mockedType2.name,
      })
    );
  });

  test("GET /types/:id -  Must not be able to list a type that doesn't exist", async () => {
    const listOne = await request(app).get("/types/this7is7an7invalid7id");

    expect(listOne.status).toBe(400);
    expect(listOne.body.data).toHaveProperty("message");
    expect(listOne.body.data).toMatchObject({
      message: "There's no type associated with this ID",
    });
  });

  test("PATCH /types/:id - Must be able to update a type", async () => {
    const patchOne = await request(app)
      .post(`/types/${genericType.body.data.id}`)
      .send(mockedType3)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(200);
    expect(patchOne.body.data).toHaveProperty("message");
    expect(patchOne.body.data).toHaveProperty("data");
    expect(patchOne.body.data).toEqual(
      expect.objectContaining({
        id: genericType.body.data.id,
        name: mockedType3.name,
      })
    );
  });

  test("PATCH /types/:id - Must not be able to update a type without being and admin", async () => {
    const patchOne = await request(app)
      .post(`/types/${genericType.body.data.id}`)
      .send(mockedType2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body.data).toHaveProperty("message");
    expect(patchOne.body.data).toStrictEqual({
      message: "Not authorized to update a type not being admin",
    });
  });

  test("PATCH /types/:id - Must not be able to update a type that doesn't exist", async () => {
    const patchOne = await request(app)
      .post(`/types/this7is7an7invalid7token`)
      .send(mockedType)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body.data).toHaveProperty("message");
    expect(patchOne.body.data).toStrictEqual({
      message: "There's no type associated with this ID",
    });
  });
});
