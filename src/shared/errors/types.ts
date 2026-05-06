import type { Static } from "elysia";
import type { ErrorResponseModel, ValidationDetailsItemModel } from "./model";

export type ErrorResponse = Static<typeof ErrorResponseModel>;
export type ValidationDetailsItem = Static<typeof ValidationDetailsItemModel>;
