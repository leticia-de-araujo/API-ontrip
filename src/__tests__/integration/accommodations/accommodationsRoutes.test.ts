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
import { mockedCategory, mockedType } from "../../mocks/otherMocks";
import { mockedCapacity } from "../../mocks/capacityMocks";
import { IAccommodationRequest } from "../../../interfaces/accommodations";
import {
  mockedAccomodation,
  mockedAccomodationInvalid,
  mockedAccomodationTooLarge,
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
      .send(mockedCategory)
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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /accommodations - Should be able to create an accommodation", async () => {
    const genericAccommodation: IAccommodationRequest = {
      name: mockedAccomodation.name,
      description: mockedAccomodation.description,
      dailyPrice: mockedAccomodation.dailyPrice,
      userId: genericId,
      categoryId,
      capacityId,
      typeId,
    };

    const response = await request(app)
      .post("/accommodations")
      .send(genericAccommodation)
      .set("Authorization", `Bearer ${genericToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
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
    const genericAccommodation: IAccommodationRequest = {
      name: mockedAccomodation.name,
      description: mockedAccomodation.description,
      dailyPrice: mockedAccomodation.dailyPrice,
      userId: genericId,
      categoryId,
      capacityId,
      typeId,
    };

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
    const genericAccommodation: IAccommodationRequest = {
      name: mockedAccomodation.name,
      description: mockedAccomodation.description,
      dailyPrice: mockedAccomodation.dailyPrice,
      userId: genericId,
      categoryId,
      capacityId,
      typeId,
    };

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
      name: mockedAccomodation.name,
      dailyPrice: mockedAccomodation.dailyPrice,
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
      name: mockedAccomodationInvalid.name,
      description: mockedAccomodationInvalid.description,
      dailyPrice: mockedAccomodationInvalid.dailyPrice,
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
      name: mockedAccomodationTooLarge.name,
      description: mockedAccomodationTooLarge.description,
      dailyPrice: mockedAccomodationTooLarge.dailyPrice,
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
    const genericAccommodation: IAccommodationRequest = {
      name: mockedAccomodation.name,
      description: mockedAccomodation.description,
      dailyPrice: mockedAccomodation.dailyPrice,
      userId: genericId,
      categoryId,
      capacityId,
      typeId,
    };

    const response = await request(app)
      .post("/accommodations")
      .send(genericAccommodation)
      .set("Authorization", `Bearer ${genericToken}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("status", "Error");
  });
});
