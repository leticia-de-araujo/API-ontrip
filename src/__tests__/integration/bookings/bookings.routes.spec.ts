import { mockedCategory, mockedType } from "../../mocks/otherMocks/index";
import {
  mockedBooking,
  mockedBooking10,
  mockedBooking2,
  mockedBooking3,
  mockedBooking7,
  mockedBooking8,
  mockedBooking9,
  mockedBookingWithoutAllFields,
} from "../../mocks/bookingMocks/index";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUser,
  mockedUserLogin,
  mockedAdminLogin,
  mockedAdmin,
} from "../../mocks/userMocks/index";
import { mockedAccommodation, mockedAccommodation2 } from "../../mocks/accommodationMocks";
import { mockedCapacity } from "../../mocks/capacityMocks";
import { Accommodation } from "../../../entities/accommodation.entity";
import { User } from "../../../entities/users.entity";

describe("Testing the booking routes", () => {
  let connection: DataSource;
  let genericUser: any;
  let genericToken: any;
  let genericBooking: any;
  let genericAccommodation: any;
  let genericType: any;
  let genericAdimUser: any;
  let genericAdminToken: any;
  let genericCategory: any;
  let genericCapacity: any;
  let mockBooking: any;
  let mockBookingAdm: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    genericUser = await request(app).post("/users").send(mockedUser);

    genericToken = await request(app).post("/login").send(mockedUserLogin);

    genericAdimUser = await request(app).post("/users").send(mockedAdmin);
    genericAdminToken = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    genericType = await request(app)
      .post("/types")
      .set("Authorization", `Bearer ${genericAdminToken.body.token}`)
      .send(mockedType);

    genericCategory = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${genericAdminToken.body.token}`)
      .send(mockedCategory);

    genericCapacity = await request(app)
      .post("/capacities")
      .set("Authorization", `Bearer ${genericAdminToken.body.token}`)
      .send(mockedCapacity);

    mockedAccommodation.typeId = genericType.body.type.id;
    mockedAccommodation.categoryId = genericCategory.body.category.id;
    mockedAccommodation.capacityId = genericCapacity.body.capacity.id;
    mockedAccommodation.userId = genericUser.body.user.id;

    genericAccommodation = await request(app)
      .post("/accommodations")
      .set("Authorization", `Bearer ${genericToken.body.token}`)
      .send(mockedAccommodation);

    
    mockBooking = {
      checkIn: "2023/01/01",
      checkOut: "2023/02/02",
      userId: genericUser.body.user.id,
      accommodationId: genericAccommodation.body.data.id,
    };

    mockBookingAdm = {
      checkIn: "2023/01/01",
      checkOut: "2023/02/02",
      userId: genericUser.body.user.id,
      accommodationId: genericAccommodation.body.data.id,
    };
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /bookings - Should be able to create a new booking", async () => {
    genericBooking = await request(app)
      .post("/bookings")
      .send(mockBooking)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(genericBooking.status).toBe(201);
    expect(genericBooking.body.booking).toHaveProperty("id");
    expect(genericBooking.body.booking).toHaveProperty("user");
    expect(genericBooking.body.booking).toHaveProperty("accommodation");
    expect(genericBooking.body.booking).toHaveProperty("checkIn");
    expect(genericBooking.body.booking).toHaveProperty("checkOut");
    expect(genericBooking.body.booking).toHaveProperty("status");
    expect(genericBooking.body).toHaveProperty("message");
  });

  test("POST /bookings - Should not be able to create a booking that already exists", async () => {
    const response = await request(app)
      .post("/bookings")
      .send(mockBooking)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /bookings - should not be able to create a booking without all the information", async () => {
    const response = await request(app)
      .post("/bookings")
      .send(mockedBookingWithoutAllFields)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /bookings - should not be able to create a booking without a token", async () => {
    const response = await request(app).post("/bookings").send(mockBooking);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("/GET /bookings - Should be able to list all bookings", async () => {
    await request(app).post("/bookings").send(mockedBooking7).set("Authorization", `Bearer ${genericToken.body.token}`);

    const response = await request(app)
      .get("/bookings")
      .set("Authorization", `Bearer ${genericAdminToken.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.bookings.length).toBeGreaterThan(0);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("bookings");
  });

  test("GET /bookings - Should not be able to list bookings without authentication", async () => {
    const response = await request(app).get("/bookings");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /bookings/:bookingId - Should be able to list one booking", async () => {

    // const response = await request(app)
    //   .get(`/bookings/${newBooking.body.booking.id}`)
    //   .set("Authorization", `Bearer ${genericToken.body.token}`);


    // expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty("message");
  });

  test("GET /bookings/:bookingId - Should not be able to list one booking without token", async () => {
    const response = await request(app)
      .get(`/bookings/${genericBooking.body.booking.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /bookings/:bookingId- Must not be able to list a non-existent booking", async () => {
    const response = await request(app)
      .get("/bookings/this7is7an7invalid7id")
      .set("Authorization", `Bearer ${genericAdminToken.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /bookings/:bookingId - Should be able to soft-delete booking as owner", async () => {
    
    const response = await request(app)
      .delete(`/bookings/${genericBooking.body.booking.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);
    
    console.log(response.body);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(204);
  });

  test("DELETE /bookings/:bookingId - Should not be able to delete a booking without authentication", async () => {
    
    const mock = {
      checkIn: "2022/09/12",
      checkOut: "2022/10/12",
      accommodation: genericAccommodation.body.data.id,
      user: genericUser.body.user.id
    }
    
    const bookinResponse = await request(app)
      .post("/bookings")
      .send(mock)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    const response = await request(app).delete(
      `/bookings/${bookinResponse.body.booking.id}`
    );

    console.log(response.body);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /bookings/:bookingId - Should not be able to delete an inexistent booking", async () => {
    const response = await request(app)
      .delete("/bookings/963")
      .set("Authorization", `Bearer ${genericUser.body.user.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
