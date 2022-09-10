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
import {
  mockedCategory,
  mockedCategory2,
  mockedCategory3,
  mockedCategoryTooLarge,
} from "../../mocks/otherMocks";

describe("Testing the category routes", () => {
  let connection: DataSource;
  let genericUser: any;
  let adminUser: any;
  let genericToken: any;
  let adminToken: any;
  let genericCategory: any;

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

  test("POST /categories - Should be able to create a new category", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCategory.status).toBe(201);
    expect(genericCategory.body).toHaveProperty(
      "message",
      "Category created with success"
    );
    expect(genericCategory.body).toHaveProperty("category");
    expect(genericCategory.body.category).toHaveProperty("id");
    expect(genericCategory.body.category).toHaveProperty(
      "name",
      mockedCategory.name
    );
  });

  test("POST /categories - Should not be able to create a category without a token", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send(mockedCategory2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(genericCategory.status).toBe(401);
    expect(genericCategory.body).toHaveProperty("status", "Error");
    expect(genericCategory.body).toHaveProperty("code", 401);
    expect(genericCategory.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("POST /categories - Should not be able to create a category with invalid token", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send(mockedCategory3)
      .set("Authorization", `Bearer 1d5d4858-c119-4fff-bfb5-9d5d7ea00`);

    expect(genericCategory.status).toBe(401);
    expect(genericCategory.body).toHaveProperty("status", "Error");
    expect(genericCategory.body).toHaveProperty("code", 401);
    expect(genericCategory.body).toHaveProperty("message", "Invalid token");
  });

  test("POST /categories - Should not be able to create a category without being an Admin", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send(mockedCategory2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(genericCategory.status).toBe(401);
    expect(genericCategory.body).toHaveProperty("status", "Error");
    expect(genericCategory.body).toHaveProperty("code", 401);
    expect(genericCategory.body).toHaveProperty("message", "User not admin");
  });

  test("POST /categories - Should not be able to create a category with invalid key values", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send({ name: 1 })
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCategory.status).toBe(400);
    expect(genericCategory.body).toHaveProperty("status", "Error");
    expect(genericCategory.body).toHaveProperty("code", 400);
    expect(genericCategory.body).toHaveProperty(
      "message",
      "name has an invalid data type"
    );
  });

  test("POST /categories - Should not be able to create a category with invalid key length", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send(mockedCategoryTooLarge)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCategory.status).toBe(413);
    expect(genericCategory.body).toHaveProperty("status", "Error");
    expect(genericCategory.body).toHaveProperty("code", 413);
    expect(genericCategory.body).toHaveProperty(
      "message",
      "name length too large"
    );
  });

  //

  test("POST /categories - Should not be able to create a category that already exists (same name)", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCategory.status).toBe(409);
    expect(genericCategory.body).toHaveProperty("status", "Error");
    expect(genericCategory.body).toHaveProperty("code", 409);
    expect(genericCategory.body).toHaveProperty(
      "message",
      "This category already exists"
    );
  });

  test("GET /categories - Should be able to list categories", async () => {
    genericCategory = await request(app).get("/categories");

    expect(genericCategory.status).toBe(200);
    expect(genericCategory.body).toHaveProperty("message", "Sucessful request");
    expect(genericCategory.body).toHaveProperty("categories");
    expect(genericCategory.body.categories.length).toBeGreaterThanOrEqual(1);
    expect(genericCategory.body.categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: genericCategory.body.categories[0].id,
          name: mockedCategory.name,
          isActive: true,
        }),
      ])
    );
  });

  test("GET /categories/:id -  Must be able to list one category", async () => {
    genericCategory = await request(app)
      .post("/categories")
      .send(mockedCategory2);
    const listOne = await request(app).get(
      `/categories/${
        genericCategory.body.categories[
          genericCategory.body.categories.length - 1
        ].id
      }`
    );

    expect(listOne.status).toBe(200);
    expect(listOne.body).toHaveProperty("message", "Sucessful request");
    expect(listOne.body).toHaveProperty("category");
    expect(listOne.body.category).toEqual(
      expect.objectContaining({
        id: genericCategory.body.category.id,
        name: mockedCategory2.name,
        isActive: true,
      })
    );
  });

  test("GET /categories/:id -  Must not be able to list a category that doesn't exist", async () => {
    const listOne = await request(app).get("/categories/this7is7an7invalid7id");

    expect(listOne.status).toBe(404);
    expect(listOne.body).toHaveProperty("status", "Error");
    expect(listOne.body).toHaveProperty("code", 404);
    expect(listOne.body).toHaveProperty("message", "Error");
  });

  test("PATCH /categories/:id - Must be able to update a category", async () => {
    const patchOne = await request(app)
      .post(`/categories/${genericCategory.body.category.id}`)
      .send(mockedCategory3)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(200);
    expect(patchOne.body).toHaveProperty("message", "Sucessful reequest");
    expect(patchOne.body).toHaveProperty("category");
    expect(patchOne.body.category).toEqual(
      expect.objectContaining({
        id: genericCategory.body.category.id,
        name: mockedCategory3.name,
        isActive: true,
      })
    );
  });

  test("PATCH /categories/:id - Must not be able to update a category without a token", async () => {
    const patchOne = await request(app)
      .post(`/categories/${genericCategory.body.category.id}`)
      .send(mockedCategory3);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
    expect(patchOne.body).toHaveProperty("code", 401);
  });

  test("PATCH /categories/:id - Must not be able to update a category with an invalid token", async () => {
    const patchOne = await request(app)
      .post(`/categories/${genericCategory.body.category.id}`)
      .send(mockedCategory3)
      .set("Authorization", `Bearer 1234567890`);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "Invalid token");
    expect(patchOne.body).toHaveProperty("code", 401);
  });

  test("PATCH /categories/:id - Must not be able to update a category without an Admin token", async () => {
    const patchOne = await request(app)
      .post(`/categories/${genericCategory.body.category.id}`)
      .send(mockedCategory3)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "User is not admin");
    expect(patchOne.body).toHaveProperty("code", 401);
  });

  test("PATCH /categories/:id - Must not be able to update a category with a key of invalid value", async () => {
    const patchOne = await request(app)
      .post(`/categories/${genericCategory.body.category.id}`)
      .send({ name: 1 })
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "name has invalid type");
    expect(patchOne.body).toHaveProperty("code", 400);
  });

  test("PATCH /categories/:id - Must not be able to update a category with a key of invalid value length", async () => {
    const patchOne = await request(app)
      .post(`/categories/${genericCategory.body.category.id}`)
      .send(mockedCategoryTooLarge)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(413);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "name length too large");
    expect(patchOne.body).toHaveProperty("code", 413);
  });

  test("PATCH /categories/:id - Must not be able to update a category that doesn't exist", async () => {
    const patchOne = await request(app)
      .post(`/categories/1d5d4858-c119-4fff-bfb5-9d5d7ea002f2`)
      .send(mockedCategory)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(404);
    expect(patchOne.body).toHaveProperty("code", 404);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "Category not found");
  });

  test("PATCH /categories/:id - Must not be able to update a category if not making any changes", async () => {
    const patchOne = await request(app)
      .post(`/categories/${genericCategory.body.category.id}`)
      .send(mockedCategory3)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty(
      "message",
      "Not possible to update a category without having any changes in any field"
    );
    expect(patchOne.body).toHaveProperty("code", 400);
  });

  test("DELETE /categories/:id - Must be able to soft-delete a category", async () => {
    const deleteOne = await request(app)
      .delete(`/categories/${genericCategory.body.category.id}`)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(deleteOne.status).toBe(200);
    expect(deleteOne.body).toHaveProperty(
      "message",
      "Category deleted with success"
    );
  });

  test("DELETE /categories/:id - Must not be able to soft-delete a category without a token", async () => {
    const deleteOne = await request(app).delete(
      `/categories/${genericCategory.body.category.id}`
    );

    expect(deleteOne.status).toBe(401);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("code", 401);
    expect(deleteOne.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("DELETE /categories/:id - Must not be able to soft-delete a category without a valid token", async () => {
    const deleteOne = await request(app)
      .delete(`/categories/${genericCategory.body.category.id}`)
      .set("Authorization", `Bearer 1234567890`);

    expect(deleteOne.status).toBe(401);
    expect(deleteOne.body).toHaveProperty("code", 401);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("message", "Invalid token");
  });

  test("DELETE /categories/:id - Must not be able to soft-delete a category without being an admin", async () => {
    const deleteOne = await request(app)
      .delete(`/categories/${genericCategory.body.category.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(deleteOne.status).toBe(401);
    expect(deleteOne.body).toHaveProperty("code", 401);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("message", "User is not an admin");
  });

  test("DELETE /categories/:id - Must not be able to soft-delete a category without being an admin", async () => {
    const deleteOne = await request(app)
      .delete(`/categories/this7is7invalid7id`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(deleteOne.status).toBe(404);
    expect(deleteOne.body).toHaveProperty("code", 404);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("message", "Category not found");
  });
});
