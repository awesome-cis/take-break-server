const dashboard = require("./src/mockRespones/dashboard");
const faker = require("faker");

const express = require("express");
const app = express();
const port = 5000;

// auth
app.post("/auth/register", (req, res) => res.send({ a: "b" }));
app.post("/auth/login", (req, res) => res.send({ a: "b" }));

// dashboard
app.get("/dashboard", (req, res) =>
  res.send({
    dashboard
  })
);

// users
app.get("/users", (req, res) => res.send({}));
app.get("/users/:id", (req, res) => res.send({}));

// organizations
const createOrganization = id => {
  return {
    id,
    name: faker.name.title(),
    description: faker.lorem.paragraph(20),
    link: faker.internet.url(),
    isSearchable: true,
    isJoinable: true,
    isDeleted: false,
    isPublicHistory: true
  };
};

const organization1 = createOrganization(1);
const organization2 = createOrganization(2);
const organization3 = createOrganization(3);

app.get("/organizations", (req, res) =>
  res.send({ organizations: [organization1, organization2] })
);
app.get("/organizations/:id", (req, res) => {
  switch (Number(req.params.id)) {
    case 1:
      res.send(organization1);
    case 2:
      res.send(organization2);
    case 3:
      res.send(organization3);
    default:
      res.status(404).send({
        error: {
          code: -1,
          message: "Not Found"
        }
      });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
