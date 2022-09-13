import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";

import {
  mockedAddress,
  mockedAddressInvalidAccommodationId,
  mockedAddressInvalidZipCode,
  mockedAddressPatch,
} from "../../mocks/addressMocks";

import {
  mockedAdmin,
  mockedAdminLogin,
  mockedUser,
} from "../../mocks/userMocks";

import { mockedAccommodation } from "../../mocks/accommodationMocks";
import { mockedCategory, mockedType } from "../../mocks/otherMocks";
import { mockedCapacity } from "../../mocks/capacityMocks";

describe("Testing addresses routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((error) => {
        console.log(error);
      });
    const commonUser = await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app).post("/login").send(mockedUser);
    await request(app).post("/users").send(mockedAdmin);
    const adminLogin = await request(app).post("/login").send(mockedAdminLogin);

    const category = await request(app)
      .post("/categories")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${adminLogin.body.token}`);

    const capacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity)
      .set("Authorization", `Bearer ${adminLogin.body.token}`);

    const type = await request(app)
      .post("/types")
      .send(mockedType)
      .set("Authorization", `Bearer ${adminLogin.body.token}`);

    mockedAccommodation.categoryId = category.body.category.id;
    mockedAccommodation.capacityId = capacity.body.capacity.id;
    mockedAccommodation.typeId = type.body.type.id;
    mockedAccommodation.userId = commonUser.body.user.id;

    const accommodation = await request(app)
      .post("/accommodations")
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAccommodation);

    console.log(accommodation.body);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /addresses - Should be able to create an address", async () => {
    const userAdmin = await request(app).post("/login").send(mockedAdmin);
    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdmin.body.token}`);

    const accommodation = await request(app).get("/accommodations");

    const userLogin = await request(app).post("/login").send(mockedUser);

    mockedAddress.accommodationId = accommodation.body.accommodations[0].id;
    mockedAddress.userId = userId.body.users[1].id;

    const response = await request(app)
      .post("/addresses")
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAddress);

    expect(response.body.address).toHaveProperty("id");
    expect(response.body.address).toHaveProperty("country");
    expect(response.body.address).toHaveProperty("state");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("postalCode");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("complement");
    expect(response.body.address).toHaveProperty("accommodationId");
    expect(response.status).toBe(201);
  });

  test("POST /addresses - Should not be able to create an address without authentication", async () => {
    const userAdmin = await request(app).post("/login").send(mockedAdmin);

    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdmin.body.token}`);

    const accommodation = await request(app).get("/accommodations");

    mockedAddress.accommodationId = accommodation.body.accommodations[0].id;
    mockedAddress.userId = userId.body.users[1].id;

    const response = await request(app).post("/addresses").send(mockedAddress);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("address");
    expect(response.body).toBe(401);
  });

  test("POST /addresses - Should not be able to create an address with invalid authentication", async () => {
    const userAdmin = await request(app).post("/login").send(mockedAdmin);

    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdmin.body.token}`);

    const accommodation = await request(app).get("/accommodations");

    mockedAddress.accommodationId = accommodation.body.accommodations[0].id;
    mockedAddress.userId = userId.body.users[1].id;

    const response = await request(app)
      .post("/addresses")
      .set("Authorization", `Bearer 123!Aa`)
      .send(mockedAddress);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("address");
    expect(response.body).toBe(401);
  });

  test("POST /addresses - Should not be able to create an address with invalid accommodationId", async () => {
    const userAdmin = await request(app).post("/login").send(mockedAdmin);

    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdmin.body.token}`);

    const userLogin = await request(app).post("/login").send(mockedUser);

    mockedAddressInvalidAccommodationId.userId = userId.body.users[1].id;

    const response = await request(app)
      .post("/addresses")
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAddressInvalidAccommodationId);

    expect(response).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("address");
    expect(response).toBe(404);
  });

  test("POST /addresses - Should not be able to create with invalid zipCode", async () => {
    const userAdmin = await request(app).post("/login").send(mockedAdmin);

    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdmin.body.token}`);

    const accommodation = await request(app).get("/accommodations");

    const userLogin = await request(app).post("/login").send(mockedUser);

    mockedAddressInvalidZipCode.accommodationId =
      accommodation.body.accommodations[0].id;
    mockedAddressInvalidZipCode.userId = userId.body.users[1].id;

    const response = await request(app)
      .post("/addresses")
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAddressInvalidZipCode);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("address");
    expect(response.body).toBe(400);
  });

  test("PATCH /addresses/:id - Should be able to update a address", async () => {
    const userAdmin = await request(app).post("/login").send(mockedAdmin);

    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdmin.body.token}`);

    const accommodation = await request(app).get("/accommodations");

    const userLogin = await request(app).post("/login").send(mockedUser);

    mockedAddressPatch.accommodationId =
      accommodation.body.accommodations[0].id;

    const response = await request(app)
      .patch(`/addresses/${userId.body.users[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAddress);

    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toHaveProperty("id");
    expect(response.body.address).toHaveProperty("country");
    expect(response.body.address).toHaveProperty("state");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("postalCode");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("complement");
    expect(response.body.address).toHaveProperty("accommodation");
    expect(response.body.address.country).toEqual("Brasil");
    expect(response.status).toBe(200);
  });

  test("PATCH /addresses/:id - Should not be able to update a nonexistent address", async () => {
    const userAdmin = await request(app).post("/login").send(mockedAdmin);

    const accommodation = await request(app).get("/accommodations");

    const userLogin = await request(app).post("/login").send(mockedUser);

    mockedAddressPatch.accommodationId =
      accommodation.body.accommodations[0].id;

    const response = await request(app)
      .patch(`/addresses/1`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAddress);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("address");
    expect(response.status).toBe(404);
  });

  test("PATCH /addresses/:id - Should not be able to update a address without authentication", async () => {
    const userAdmin = await request(app).post("/login").send(mockedAdmin);

    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdmin.body.token}`);

    const accommodation = await request(app).get("/accommodations");

    mockedAddressPatch.accommodationId =
      accommodation.body.accommodations[0].id;

    const response = await request(app)
      .patch(`/addresses/${userId.body.users[0].id}`)
      .send(mockedAddress);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("address");
    expect(response.status).toBe(401);
  });

  test("PATCH /addresses/:id - Should not be able to update a address with invalid authentication", async () => {
    const userAdmin = await request(app).post("/login").send(mockedAdmin);

    const userId = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdmin.body.token}`);

    const accommodation = await request(app).get("/accommodations");

    mockedAddressPatch.accommodationId =
      accommodation.body.accommodations[0].id;

    const response = await request(app)
      .patch(`/addresses/${userId.body.users[0].id}`)
      .set("Authorization", `Bearer 123!Aa`)
      .send(mockedAddress);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("address");
    expect(response.status).toBe(401);
  });
});
