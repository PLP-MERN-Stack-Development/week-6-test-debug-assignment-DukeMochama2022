import { rest } from "msw";

export const handlers = [
  rest.get("*", (req, res, ctx) => {
    console.log("MSW: GET", req.url.href);
    return res(
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json([
        { _id: "1", title: "First Post" },
        { _id: "2", title: "Second Post" },
      ])
    );
  }),
];
