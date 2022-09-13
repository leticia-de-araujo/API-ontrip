import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedUser,
  mockedUserLogin,
} from "../../mocks/userMocks";
import { mockedAccommodation } from "../../mocks/accommodationMocks";
import { MockedPhoto } from "../../mocks/photoMocks";

describe("Testing the type routes", () => {
  let connection: DataSource;
  let genericUser: any;
  let adminUser: any;
  let genericToken: any;
  let adminToken: any;
  let accommodation: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    genericUser = await request(app).post("/users").send(mockedUser);
    genericUser = genericUser.body.data;
    genericToken = await request(app).post("/login").send(mockedUserLogin);
    genericToken = genericToken.body.token;

    adminUser = await request(app).post("/users").send(mockedAdmin);
    adminToken = await request(app).post("/login").send(mockedAdminLogin);
    accommodation = await request(app)
      .post("/accommodations")
      .send(mockedAccommodation)
      .set("Authorization", `Bearer ${genericToken}`);
  });

  test("POST /photos/:accommodationId - Should be able to create a new photo for an acommodation", async () => {
    const genericPhoto = await request(app)
      .post(`/photos/${accommodation.body.accommodation.id}`)
      .send(MockedPhoto)
      .set("Authorization", `Bearer ${genericToken}`);

    expect(genericPhoto.status).toBe(201);
    expect(genericPhoto.body).toHaveProperty("message");
    expect(genericPhoto.body).toHaveProperty("photo");
    expect(genericPhoto.body.photo).toHaveProperty("id");
    expect(genericPhoto.body.photo).toHaveProperty("content");
    expect(genericPhoto.body.photo).toHaveProperty("accommodationId");
  });

  afterAll(async () => {
    await connection.destroy();
  });
});
