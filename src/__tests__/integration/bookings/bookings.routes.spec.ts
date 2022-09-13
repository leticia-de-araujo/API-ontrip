import { mockedBookingWithInvalidDataType, mockedBookingWithLongFieldData } from './../../mocks/bookingMocks/index';
import { mockedCategory, mockedType } from "../../mocks/otherMocks/index";
import {
  mockedBooking7,
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
  mockedUser6,
  mockedUser6Login,
} from "../../mocks/userMocks/index";
import {
  mockedAccommodation,
} from "../../mocks/accommodationMocks";
import { mockedCapacity } from "../../mocks/capacityMocks";

describe("Testing the booking routes", () => {
  let connection: DataSource;
  let genericUser: any;
  let genericUser2: any;
  let genericToken: any;
  let genericToken2: any;
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
    genericUser2 = await request(app).post("/users").send(mockedUser6);

    genericToken = await request(app).post("/login").send(mockedUserLogin);
    genericToken2 = await request(app).post("/login").send(mockedUser6Login);

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
      accommodationId: genericAccommodation.body.accommodation.id,
    };

    mockBookingAdm = {
      checkIn: "2023/01/01",
      checkOut: "2023/02/02",
      userId: genericUser.body.user.id,
      accommodationId: genericAccommodation.body.accommodation.id,
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

  test("POST /bookings - Should not be able to create one booking  with an invalid token", async () => {

    const response = await request(app)
      .post(`/bookings`)
      .send(mockBooking)
      .set("Authorization", `Bearer c440b78f-d5b5-4f76-bf33-ea52e4b`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");

  });

  test("POST /bookings - Should not be able to create one booking  with an invalid data type", async () => {
    const response = await request(app)
      .post(`/bookings`)
      .send(mockedBookingWithInvalidDataType)
      .set("Authorization", `Bearer ${genericAdminToken.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");

  });

  test("POST /bookings - Should not be able to create one booking with data too large", async () => {
    const response = await request(app)
      .post(`/bookings`)
      .send(mockedBookingWithLongFieldData)
      .set("Authorization", `Bearer ${genericAdminToken.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");

  });


  test("/GET /bookings - Should be able to list all bookings", async () => {
    await request(app)
      .post("/bookings")
      .send(mockedBooking7)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

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

  test("GET /bookings - Should not be able to list bookings with an invalid token", async () => {
    const response = await request(app)
      .get(`/bookings`)
      .set("Authorization", `Bearer c440b78f-d5b5-4f76-bf33-ea52e4b`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  test("GET /bookings - Should be admin to list all bookings", async () => {
    const response = await request(app)
      .get(`/bookings`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "User is not an admin");
  });

  test("GET /bookings/:bookingId - Should be able to list one booking", async () => {
    const response = await request(app)
      .get(`/bookings/${genericBooking.body.booking.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /bookings/:bookingId - Should not be able to list one booking without token", async () => {
    const response = await request(app)
      .get(`/bookings/${genericBooking.body.booking.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Missing authorization token");
  });

  test("GET /bookings/:bookingId - Should not be able to list one booking  with an invalid token", async () => {
    const response = await request(app)
      .get(`/bookings/${genericBooking.body.booking.id}`)
      .set("Authorization", `Bearer c440b78f-d5b5-4f76-bf33-ea52e4b`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  test("GET /bookings/:bookingId - Should not be able to list one booking if is not owner ot admin", async () => {
    const response = await request(app)
      .get(`/bookings/${genericBooking.body.booking.id}`)
      .set("Authorization", `Bearer ${genericToken2.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "User must be the owner of the accommodation, the guest that booked the booking, or an admin");
  });

  test("GET /bookings/:bookingId- Must not be able to list a non-existent booking", async () => {
    const response = await request(app)
      .get("/bookings/this7is7an7invalid7id")
      .set("Authorization", `Bearer ${genericAdminToken.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /bookings/:bookingId - Should not be able to delete one booking with an invalid token", async () => {
    const response = await request(app)
      .delete(`/bookings/${genericBooking.body.booking.id}`)
      .set("Authorization", `Bearer c440b78f-d5b5-4f76-bf33-ea52e4b`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  test("DELETE /bookings/:bookingId - Should not be able to delete one booking if is not owner ot admin", async () => {
    const response = await request(app)
      .delete(`/bookings/${genericBooking.body.booking.id}`)
      .set("Authorization", `Bearer ${genericToken2.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "User must be the owner of the accommodation, the guest that booked the booking, or an admin");
  });

  test("DELETE /bookings/:bookingId - Should not be able to delete a booking without authentication", async () => {
    const response = await request(app).delete(
      `/bookings/${genericBooking.body.booking.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /bookings/:bookingId - Should be able to soft-delete booking as owner", async () => {
    const response = await request(app)
      .delete(`/bookings/${genericBooking.body.booking.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /bookings/:bookingId - Should not be able to soft-delete a booking that is already deleted", async () => {
    const response = await request(app)
      .delete(`/bookings/${genericBooking.body.booking.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message","Booking already deleted");
  });

  test("DELETE /bookings/:bookingId - Should not be able to delete an inexistent booking", async () => {
    const response = await request(app)
      .delete("/bookings/963")
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
