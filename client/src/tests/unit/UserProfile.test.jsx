import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import UserProfile from "../../components/UserProfile";

jest.mock("axios");

beforeEach(() => {
  axios.get.mockResolvedValue({ data: { name: "Default" } });
});

describe("UserProfile", () => {
  it("renders loading state initially", () => {
    render(<UserProfile userId="123" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders user data when fetch is successful", async () => {
    axios.get.mockResolvedValueOnce({ data: { name: "Alice" } });
    render(<UserProfile userId="123" />);
    await waitFor(() =>
      expect(screen.getByText(/name: alice/i)).toBeInTheDocument()
    );
  });

  it("renders error message on fetch failure", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));
    render(<UserProfile userId="123" />);
    await waitFor(() =>
      expect(screen.getByText(/failed to load user/i)).toBeInTheDocument()
    );
  });

  it("renders no user found if user is null", async () => {
    axios.get.mockResolvedValueOnce({ data: null });
    render(<UserProfile userId="123" />);
    await waitFor(() =>
      expect(screen.getByText(/no user found/i)).toBeInTheDocument()
    );
  });
});
