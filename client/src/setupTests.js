// Jest setup for React Testing Library
import "@testing-library/jest-dom";
import { server } from "./tests/msw/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
