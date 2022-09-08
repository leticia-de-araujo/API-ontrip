import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { IAddressRequest } from "../../../interfaces/address";
import {
  mockedAddress,
  mockedAddressInvalidZipCode,
  mockedAdressPatch,
} from "../../mocks/addressMocks";
import { mockedUser } from "../../mocks/userMocks";
import { mockedAccommodation } from "../../mocks/accommodationMocks";

describe("Testing address routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((error) => {
        console.log(error);
      });
    await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app).post("/login").send(mockedUser);
    await request(app)
      .post("/accommodation")
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAccommodation);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /address - Should be able to create an address", async () => {
    const accommodation = await request(app).get("/accommodation");
    const userLogin = await request(app).post("/login").send(mockedUser);
    mockedAddress.accommodationId = accommodation.body[0].id;
    const response = await request(app)
      .post("/address")
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAddress);

    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("country");
    expect(response.body.data).toHaveProperty("state");
    expect(response.body.data).toHaveProperty("city");
    expect(response.body.data).toHaveProperty("postalCode");
    expect(response.body.data).toHaveProperty("street");
    expect(response.body.data).toHaveProperty("complement");
    expect(response.body.data).toHaveProperty("accommodation");
    expect(response.status).toBe(201);
  });

  test("POST /address - Should not be able to create an address without authentication", async () => {
    const accommodation = await request(app).get("/accommodation");
    mockedAddress.accommodationId = accommodation.body[0].id;
    const response = await request(app).post("/address").send(mockedAddress);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(response.body).toBe(401);
  });

  test("POST /address - Should not be able to create an address with invalid accommodationId", async () => {
    const userLogin = await request(app).post("/login").send(mockedUser);
    const response = await request(app)
      .post("/address")
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAddress);

    expect(response).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(response).toBe(404);
  });

  test("POST /address - Should not be able to create with invalid zipCode", async () => {
    const accommodation = await request(app).get("/accommodation");
    const userLogin = await request(app).post("/login").send(mockedUser);
    mockedAddress.accommodationId = accommodation.body[0].id;
    const response = await request(app)
      .post("/address")
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAddressInvalidZipCode);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(response.body).toBe(400);
  });

  test("GET /address - Should be able to list existing addresses", async () => {
    const userLogin = await request(app).post("/login").send(mockedUser);
    const response = await request(app)
      .get("/address")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /address - Should not be able to list existing addresses without authentication", async () => {
    const response = await request(app).get("/address");

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).toBe(401);
  });

  test("GET /address - Should be able to list a specific address", async () => {
    const userLogin = await request(app).post("/login").send(mockedUser);
    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    const response = await request(app)
      .get(`/address/${user.body[0].data.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("country");
    expect(response.body.data).toHaveProperty("state");
    expect(response.body.data).toHaveProperty("city");
    expect(response.body.data).toHaveProperty("postalCode");
    expect(response.body.data).toHaveProperty("street");
    expect(response.body.data).toHaveProperty("complement");
    expect(response.body.data).toHaveProperty("accommodation");
    expect(response.status).toBe(200);
  });

  test("GET /address - Should not be able to list a specific address without authentication", async () => {
    const user = await request(app).get("/users");
    const response = await request(app).get(`/address/${user.body[0].data.id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).toBe(401);
  });

  test("GET /address/:id - Should not be able to list nonexistent address", async () => {
    const userLogin = await request(app).post("/login").send(mockedUser);
    const response = await request(app)
      .get(`/address/1`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).toBe(404);
  });

  test("PATCH /address/:id - Should be able to update a address", async () => {
    const userLogin = await request(app).post("/login").send(mockedUser);
    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    const response = await request(app)
      .patch(`/address/${user.body[0].data.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAdressPatch);

    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("country");
    expect(response.body.data).toHaveProperty("state");
    expect(response.body.data).toHaveProperty("city");
    expect(response.body.data).toHaveProperty("postalCode");
    expect(response.body.data).toHaveProperty("street");
    expect(response.body.data).toHaveProperty("complement");
    expect(response.body.data).toHaveProperty("accommodation");
    expect(response.body.data.country).toEqual("Brasil");
    expect(response.status).toBe(200);
  });

  test("PATCH /address/:id - Should not be able to update a nonexistent address", async () => {
    const userLogin = await request(app).post("/login").send(mockedUser);
    const response = await request(app)
      .patch(`/address/1`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedAdressPatch);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).toBe(404);
  });

  test("PATCH /address/:id - Should not be able to update a address without authentication", async () => {
    const user = await request(app).get("/users");
    const response = await request(app)
      .patch(`/address/${user.body[0].data.id}`)
      .send(mockedAdressPatch);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).toBe(401);
  });

  test("DELETE /address/:id - Should be able to delete a address", async () => {
    const userLogin = await request(app).post("/login").send(mockedUser);
    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    const response = await request(app)
      .delete(`/address/${user.body[0].data.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(user.body[0].data).toHaveLength(0);
    expect(response.status).toBe(204);
  });

  test("DELETE /address/:id - Should be able to delete a address", async () => {
    const userLogin = await request(app).post("/login").send(mockedUser);
    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    const response = await request(app)
      .delete(`/address/${user.body[0].data.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body).not.toHaveProperty("data");
    expect(user.body[0].data).toHaveLength(0);
    expect(response.status).toBe(204);
  });

  test("DELETE /address/:id - Should not be able to delete a nonexistent address", async () => {
    const userLogin = await request(app).post("/login").send(mockedUser);
    const response = await request(app)
      .delete(`/address/1`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
