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
import { createPhotoService } from "../../../services/photo/createPhoto.service";
import { Photo } from "../../../entities/photo.entity";
import { object } from "yup";
import { listOnePhotoService } from "../../../services/photo/listOnePhoto.service";
import { listAllPhotoAccommodationService } from "../../../services/photo/listAllPhotoAccommodation.service";
import { softDeletePhotoService } from "../../../services/photo/softDeletePhoto.service";

describe("Testing the type routes", () => {
  let connection: DataSource;
  let genericUser: any;
  let genericToken: any;
  let accommodation: any;
  let photo: Photo;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    genericUser = await request(app).post("/users").send(mockedUser);
    genericUser = genericUser.body.user;
    genericToken = await request(app).post("/login").send(mockedUserLogin);
    genericToken = genericToken.body.token;

    accommodation = await request(app)
      .post("/accommodations")
      .send(mockedAccommodation)
      .set("Authorization", `Bearer ${genericToken}`);
  });

  test("softDeletePhotoService - Should not be able to dele an unexistent photo of an acommodation", async () => {
    const deletedPhoto = await softDeletePhotoService(photo.id);
    expect(deletedPhoto).toBe(false);
  });

  test("createPhotoService - Should be able to create a new photo for an acommodation", async () => {
    photo = await createPhotoService(accommodation.body.accommodation.id);
    expect(photo).toHaveProperty("id");
    expect(photo).toHaveProperty("content");
    expect(photo).toHaveProperty("accommodation");
    expect(photo.accommodation).toEqual(accommodation);
  });

  test("listOnePhotoService - Should be able to get a unique photo of an acommodation", async () => {
    const uniquePhoto: Photo = await listOnePhotoService(photo.id);
    expect(uniquePhoto).toHaveProperty("id");
    expect(uniquePhoto).toHaveProperty("content");
    expect(uniquePhoto).toHaveProperty("accommodation");
    expect(uniquePhoto.accommodation).toEqual(accommodation);
  });

  test("listOnePhotoService - Should be able to get a unique photo of an acommodation", async () => {
    const photoArray: Photo[] = await listAllPhotoAccommodationService(
      accommodation.body.accommodation.id
    );
    expect(photoArray[0]).toHaveProperty("id");
    expect(photoArray[0]).toHaveProperty("content");
    expect(photoArray[0]).toHaveProperty("accommodation");
    expect(photoArray[0].accommodation).toEqual(accommodation);
  });

  test("softDeletePhotoService - Should be able to delet an existent photo of an acommodation", async () => {
    const deletedPhoto = await softDeletePhotoService(photo.id);
    expect(deletedPhoto).toBe(true);
  });

  afterAll(async () => {
    await connection.destroy();
  });
});
