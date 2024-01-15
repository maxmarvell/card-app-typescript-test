import fastify from "fastify";
import Prisma from "../src/db";
import { server } from "../src/server";

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

test("loads entries", async () => {
  const data = await server.inject({
    method: "GET",
    url: "/get/",
  });

  expect(data.statusCode).toBe(200);
});

test("Create entry, Retrieve it, Edit it and Delete it", async () => {
  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const data = await server.inject({
    method: "POST",
    url: "/create/",
    payload: {
      title: "test",
      description: "test-description",
      created_at: yesterday.toISOString().split("T")[0],
      scheduled_for: today.toISOString().split("T")[0],
    },
  });

  expect(data.statusCode).toBe(200);

  const payload = JSON.parse(data.payload);
  const note = await server.inject({
    method: "GET",
    url: `/get/${payload.id}`,
  });
  expect(note.statusCode).toBe(200);

  const editNote = await server.inject({
    method: "PUT",
    url: `/update/${payload.id}`,
    payload: {
      title: "update-test",
      description: "update-test-description",
      created_at: today.toISOString().split("T")[0],
      scheduled_for: tomorrow.toISOString().split("T")[0],
    },
  });
  expect(editNote.statusCode).toBe(200);

  const delNote = await server.inject({
    method: "DELETE",
    url: `/delete/${payload.id}`,
  });
  expect(delNote.statusCode).toBe(200);
});

test("Cannot create incomplete note", async () => {
  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const data = await server.inject({
    method: "POST",
    url: "/create/",
    payload: {
      title: "test",
      created_at: today.toISOString().split("T")[0],
      scheduled_for: tomorrow.toISOString().split("T")[0],
    },
  });
  expect(data.statusCode).toBe(500);
});

test("Cannot create note with due date after creation date", async () => {
  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const data = await server.inject({
    method: "POST",
    url: "/create/",
    payload: {
      title: "test",
      description: "test-tomorrow-date",
      created_at: tomorrow.toISOString().split("T")[0],
      scheduled_for: today.toISOString().split("T")[0],
    },
  });
  expect(data.statusCode).toBe(500);
});
