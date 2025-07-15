import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "../msw/server";
import { rest } from "msw";
import PostList from "../../components/PostList";

// Start MSW before all tests and reset handlers after each
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PostList (integration)", () => {
  it("renders posts from the API", async () => {
    render(<PostList />);
    expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("First Post")).toBeInTheDocument();
      expect(screen.getByText("Second Post")).toBeInTheDocument();
    });
  });

  it("renders error message on API failure", async () => {
    server.use(
      rest.get("/api/posts", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<PostList />);
    await waitFor(() => {
      expect(screen.getByText(/failed to load posts/i)).toBeInTheDocument();
    });
  });

  it("renders no posts found if API returns empty array", async () => {
    server.use(
      rest.get("/api/posts", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    render(<PostList />);
    await waitFor(() => {
      expect(screen.getByText(/no posts found/i)).toBeInTheDocument();
    });
  });
});
