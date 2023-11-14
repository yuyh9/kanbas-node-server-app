import db from "../Database/index.js";
function AssignmentRoutes(app) {
  app.get("/api/courses/:aid/assignments", (req, res) => {
    const { aid } = req.params;
    const assignments = db.modules
      .filter((m) => m.course === aid);
    res.send(assignments);
  });

  app.post("/api/courses/:aid/assignments", (req, res) => {
    const { aid } = req.params;
    const newAssignment = {
      ...req.body,
      course: aid,
      _id: new Date().getTime().toString(),
    };
    db.modules.push(newAssignment);
    res.send(newAssignment);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.modules = db.modules.filter((m) => m._id !== aid);
    res.sendStatus(200);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.modules.findIndex(
      (m) => m._id === mid);
    db.modules[assignmentIndex] = {
      ...db.modules[assignmentIndex],
      ...req.body
    };
    res.sendStatus(204);
  });
}
export default AssignmentRoutes;