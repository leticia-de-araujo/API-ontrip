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
import { AppError } from "../../../errors/AppError";
import { mockedCategory2, mockedType } from "../../mocks/otherMocks";
import { mockedCapacity } from "../../mocks/capacityMocks";

describe("Testing the type routes", () => {
  let connection: DataSource;
  let genericUser: any;
  let genericToken: any;
  let accommodation: any;
  let photo: Photo;
  let genericAccommodation: any;
  let categoryId: string;
  let capacityId: string;
  let typeId: string;
  let genericAdmin: any;
  let adminToken: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    genericAdmin = await request(app).post("/users").send(mockedAdmin);
    genericAdmin = genericAdmin.body.user;
    let login = await request(app).post("/login").send(mockedAdminLogin);
    adminToken = login.body.token;

    const createCategory = await request(app)
      .post("/categories")
      .send(mockedCategory2)
      .set("Authorization", `Bearer ${adminToken}`);

    categoryId = createCategory.body.category.id;

    const createCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity)
      .set("Authorization", `Bearer ${adminToken}`);

    capacityId = createCapacity.body.capacity.id;

    const createType = await request(app)
      .post("/types")
      .send(mockedType)
      .set("Authorization", `Bearer ${adminToken}`);

    typeId = createType.body.type.id;

    genericAccommodation = {
      name: mockedAccommodation.name,
      description: mockedAccommodation.description,
      dailyPrice: mockedAccommodation.dailyPrice,
      userId: genericAdmin.id,
      categoryId,
      capacityId,
      typeId,
    };

    accommodation = await request(app)
      .post("/accommodations")
      .send(genericAccommodation)
      .set("Authorization", `Bearer ${adminToken}`);
  });

  test("softDeletePhotoService - Should not be able to delete an unexistent photo of an acommodation", async () => {
    expect(async () => {
      await softDeletePhotoService("255165156");
    }).rejects.toThrow("Photo not found");
  });

  test("createPhotoService - Should be able to create a new photo for an acommodation", async () => {
    photo = await createPhotoService(accommodation.body.accommodation.id);
    expect(photo).toHaveProperty("id");
    expect(photo).toHaveProperty("content");
    expect(photo).toHaveProperty("accommodation");
    expect(photo.accommodation).toHaveProperty("capacity");
    expect(photo.accommodation).toHaveProperty("owner");
    expect(photo.accommodation).toHaveProperty("category");
    expect(photo.accommodation!.owner).not.toHaveProperty("category");
  });

  test("listOnePhotoService - Should be able to get a unique photo of an acommodation", async () => {
    const uniquePhoto: Photo = await listOnePhotoService(photo.id);
    expect(uniquePhoto).toHaveProperty("id");
    expect(uniquePhoto).toHaveProperty("content");
    expect(uniquePhoto).toHaveProperty("accommodation");
    expect(uniquePhoto.accommodation).toHaveProperty("capacity");
    expect(uniquePhoto.accommodation).toHaveProperty("owner");
    expect(uniquePhoto.accommodation).toHaveProperty("category");
    expect(uniquePhoto.accommodation!.owner).not.toHaveProperty("password");
  });

  test("listOnePhotoService - Should be able to get a unique photo of an acommodation", async () => {
    const photoArray: Photo[] = await listAllPhotoAccommodationService(
      accommodation.body.accommodation.id
    );
    expect(photoArray[0]).toHaveProperty("id");
    expect(photoArray[0]).toHaveProperty("content");
    expect(photoArray[0]).toHaveProperty("accommodation");
    expect(photoArray[0].accommodation).toHaveProperty("capacity");
    expect(photoArray[0].accommodation).toHaveProperty("owner");
    expect(photoArray[0].accommodation).toHaveProperty("category");
    expect(photoArray[0].accommodation).toHaveProperty("id");
    expect(photoArray[0].accommodation!.owner).not.toHaveProperty("password");
  });

  test("softDeletePhotoService - Should be able to delete an existent photo of an acommodation", async () => {
    const deletedPhoto = await softDeletePhotoService(photo.id);
    expect(deletedPhoto).toBe(true);
  });

  afterAll(async () => {
    await connection.destroy();
  });
});
