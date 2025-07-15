import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import RegisterForm from "../../components/RegisterForm";

jest.mock("axios");

describe("RegisterForm", () => {
  beforeEach(() => {
    axios.post.mockReset();
  });

  it("shows validation errors for empty fields", async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByText(/register/i));
    expect(
      await screen.findByText(/username is required/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it("submits valid data and shows success", async () => {
    axios.post.mockResolvedValueOnce({});
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "alice" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "alice@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret" },
    });
    fireEvent.click(screen.getByText(/register/i));
    expect(
      await screen.findByText(/registration successful/i)
    ).toBeInTheDocument();
  });

  it("shows API error on failed registration", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { error: "User already exists" } },
    });
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "bob" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "bob@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret" },
    });
    fireEvent.click(screen.getByText(/register/i));
    expect(await screen.findByText(/user already exists/i)).toBeInTheDocument();
  });
});
