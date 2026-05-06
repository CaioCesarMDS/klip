import { Elysia } from "elysia";
import {
  InternalErrorModel,
  NotFoundErrorModel,
  ValidationErrorModel,
} from "@//shared/errors/model";
import { ClipListQuery, ClipListResponse, ClipModel, CreateClipBody } from "./model";
import { ClipsService } from "./service";

export const clipsRoutes = new Elysia({ prefix: "/api/clips", tags: ["Clips"] })
  .post("/", ({ body }) => ClipsService.create(body), {
    detail: {
      summary: "Create clip",
      description: "Create a new clip with the provided content and type.",
    },
    body: CreateClipBody,
    response: {
      201: ClipModel,
      400: ValidationErrorModel,
      500: InternalErrorModel,
    },
  })
  .get("/", ({ query }) => ClipsService.list(query), {
    detail: {
      summary: "List clips",
      description:
        "Get a paginated list of clips with optional filtering by type and favorite status.",
    },
    query: ClipListQuery,
    response: {
      200: ClipListResponse,
      400: ValidationErrorModel,
      404: NotFoundErrorModel,
      500: InternalErrorModel,
    },
  });
