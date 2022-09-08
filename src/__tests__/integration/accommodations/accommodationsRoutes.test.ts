import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import request from "supertest";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedUser,
  mockedUserLogin,
} from "../../mocks/userMocks";
import {
  mockedCategory,
  mockedCategory2,
  mockedType,
} from "../../mocks/otherMocks";
import { mockedCapacity } from "../../mocks/capacityMocks";
import { IAccommodationRequest } from "../../../interfaces/accommodations";
import {
  mockedAccommodation,
  mockedAccommodation2,
  mockedAccommodationInvalid,
  mockedAccommodationTooLarge,
} from "../../mocks/accommodationMocks";

describe("/accommodations", () => {
  let connection: DataSource;
  let genericToken: string;
  let adminToken: any;
  let genericId: string;
  let adminId: string;
  let categoryId: string;
  let capacityId: string;
  let typeId: string;
  let genericAccommodation: IAccommodationRequest;
  let genericAccommodation2: IAccommodationRequest;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    const createGenericUserRes = await request(app)
      .post("/users")
      .send(mockedUser);

    genericId = createGenericUserRes.body.data.id;

    const genericUserLoginRes = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    genericToken = genericUserLoginRes.body.data.token;

    const createAdminUserRes = await request(app)
      .post("/users")
      .send(mockedAdmin);

    adminId = createAdminUserRes.body.data.id;

    const adminUserLoginRes = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    adminToken = adminUserLoginRes.body.data.token;

    const createCategoryRes = await request(app)
      .post("/categories")
      .send(mockedCategory2)
      .set("Authorization", `Bearer ${adminToken}`);

    categoryId = createCategoryRes.body.data.id;

    const createCapacityRes = await request(app)
      .post("/capacities")
      .send(mockedCapacity)
      .set("Authorization", `Bearer ${adminToken}`);

    capacityId = createCapacityRes.body.data.id;

    const createTypeRes = await request(app)
      .post("/types")
      .send(mockedType)
      .set("Authorization", `Bearer ${adminToken}`);

    typeId = createTypeRes.body.data.id;

    genericAccommodation = {
      name: mockedAccommodation.name,
      description: mockedAccommodation.description,
      dailyPrice: mockedAccommodation.dailyPrice,
      userId: genericId,
      categoryId,
      capacityId,
      typeId,
    };

    genericAccommodation2 = {
      name: mockedAccommodation2.name,
      description: mockedAccommodation2.description,
      dailyPrice: mockedAccommodation2.dailyPrice,
      userId: genericId,
      categoryId,
      capacityId,
      typeId,
    };
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /accommodations - Should be able to create an accommodation", async () => {
    const response = await request(app)
      .post("/accommodations")
      .send(genericAccommodation)
      .set("Authorization", `Bearer ${genericToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty(
      "name",
      genericAccommodation.name
    );
    expect(response.body.data).toHaveProperty(
      "description",
      genericAccommodation.description
    );
    expect(response.body.data).toHaveProperty(
      "dailyPrice",
      genericAccommodation.dailyPrice
    );
    expect(response.body.data).toHaveProperty("isActive", true);
    expect(response.body.data).toHaveProperty("verifiedByAdm", false);
    expect(response.body.data).toHaveProperty("specialOffer", false);
    expect(response.body.data).toHaveProperty("type");
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data).toHaveProperty("capacity");
    expect(response.body.data).toHaveProperty("category");
  });

  test("POST /accommodations - Should not be able to create an accommodation without authentication", async () => {
    const response = await request(app)
      .post("/accommodations")
      .send(genericAccommodation);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("status", "Error");
    expect(response.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("POST /accommodations - Should not be able to create an accommodation with invalid token", async () => {
    const response = await request(app)
      .post("/accommodations")
      .send(genericAccommodation)
      .set("Authorization", `Bearer ${genericToken}7627636745`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("status", "Error");
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  test("POST /accommodations - Should not be able to create an accommodation without all required fields", async () => {
    const invalidAccommodation = {
      name: mockedAccommodation.name,
      dailyPrice: mockedAccommodation.dailyPrice,
      userId: genericId,
      capacityId,
      typeId,
    };

    const response = await request(app)
      .post("/accommodations")
      .send(invalidAccommodation)
      .set("Authorization", `Bearer ${genericToken}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "Error");
  });

  test("POST /accommodations - Should not be able to create an accommodation with a required field with invalid type", async () => {
    const invalidAccommodation = {
      name: mockedAccommodationInvalid.name,
      description: mockedAccommodationInvalid.description,
      dailyPrice: mockedAccommodationInvalid.dailyPrice,
      userId: genericId,
      categoryId,
      capacityId,
      typeId,
    };

    const response = await request(app)
      .post("/accommodations")
      .send(invalidAccommodation)
      .set("Authorization", `Bearer ${genericToken}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "Error");
  });

  test("POST /accommodations - Should not be able to create an accommodation without a required field too large", async () => {
    const invalidAccommodation = {
      name: mockedAccommodationTooLarge.name,
      description: mockedAccommodationTooLarge.description,
      dailyPrice: mockedAccommodationTooLarge.dailyPrice,
      userId: genericId,
      categoryId,
      capacityId,
      typeId,
    };

    const response = await request(app)
      .post("/accommodations")
      .send(invalidAccommodation)
      .set("Authorization", `Bearer ${genericToken}`);

    expect(response.status).toBe(413);
    expect(response.body).toHaveProperty("status", "Error");
  });

  test("POST /accommodations - Should not be able to create an accommodation that already exists", async () => {
    const response = await request(app)
      .post("/accommodations")
      .send(genericAccommodation)
      .set("Authorization", `Bearer ${genericToken}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("status", "Error");
  });

  test("GET /accommodations - Should be able to list all accommodations", async () => {
    await request(app)
      .post("/accommodations")
      .send(genericAccommodation2)
      .set("Authorization", `Bearer ${genericToken}`);

    const response = await request(app).get("/accommodations");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /accommodations/:id - Should be able to list one accommodation", async () => {
    const accommodations = await request(app).get("/accommodations");

    const response = await request(app)
      .get(`/accommodations/${accommodations.body[0].data.id}`)
      .set("Authorization", `Bearer ${genericToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty(
      "id",
      accommodations.body[0].data.id
    );
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("description");
    expect(response.body.data).toHaveProperty("dailyPrice");
    expect(response.body.data).toHaveProperty("isActive");
    expect(response.body.data).toHaveProperty("verifiedByAdm");
    expect(response.body.data).toHaveProperty("specialOffer");
    expect(response.body.data).toHaveProperty("type");
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data).toHaveProperty("capacity");
    expect(response.body.data).toHaveProperty("category");
  });

  test("GET /accommodations/:id - Should not be able to list one accommodation without authentication", async () => {
    const accommodations = await request(app).get("/accommodations");

    const response = await request(app).get(
      `/accommodations/${accommodations.body[0].data.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("status", "Error");
    expect(response.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("GET /accommodations/:id - Should not be able to list one accommodation with invalid token", async () => {
    const accommodations = await request(app).get("/accommodations");

    const response = await request(app)
      .get(`/accommodations/${accommodations.body[0].data.id}`)
      .set("Authorization", `Bearer ${genericToken}32733986`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("status", "Error");
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  test("GET /accommodations/:id - Should not be able to list one accommodation that is not registered", async () => {
    const accommodations = await request(app).get("/accommodations");

    const response = await request(app)
      .get(`/accommodations/${accommodations.body[0].data.id}2367235`)
      .set("Authorization", `Bearer ${genericToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("status", "Error");
    expect(response.body).toHaveProperty("message", "Accommodation not found");
  });
});
