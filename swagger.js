import swaggerAutogen from "swagger-autogen";
const doc = {
  info: {
    title: "Cars API",
    version: "1.0.0",
    description: "Cars API",
  },
  host: "localhost:3000",
  basePath: "/api/cars",
};
const routes = ["./routes/cars.js"];
const outputFile = "./swagger-output.json";
swaggerAutogen()(outputFile, routes, doc);
