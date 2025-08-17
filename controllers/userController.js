const getUsers = (req, res) => {
  res.json([
    { id: 1, name: "John Doe", role: "student" },
    { id: 2, name: "Jane Smith", role: "instructor" }
  ]);
};

module.exports = { getUsers };
