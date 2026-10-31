const { test, describe } = require("node:test");
const assert = require("node:assert");
const User = require("../models/User");
const Elderly = require("../models/Elderly");

describe("Database Models Smoke Tests", () => {
  test("User model schema defines expected required fields", () => {
    assert.strictEqual(Boolean(User.schema.paths.name.isRequired), true);
    assert.strictEqual(Boolean(User.schema.paths.email.isRequired), true);
    assert.strictEqual(Boolean(User.schema.paths.password.isRequired), true);
    assert.strictEqual(Boolean(User.schema.paths.mobileNumber.isRequired), true);
  });

  test("Elderly model schema defines expected required fields", () => {
    assert.strictEqual(Boolean(Elderly.schema.paths.name.isRequired), true);
    assert.strictEqual(Boolean(Elderly.schema.paths.email.isRequired), true);
    assert.strictEqual(Boolean(Elderly.schema.paths["healthData.age"].isRequired), true);
    assert.strictEqual(Boolean(Elderly.schema.paths["healthData.gender"].isRequired), true);
  });
});

