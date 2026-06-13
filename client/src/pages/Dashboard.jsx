import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import IssueForm from "../components/IssueForm";
import IssueCard from "../components/IssueCard";

function Dashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await API.get("/issues");
      setIssues(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const total = issues.length;

  const todo = issues.filter(
    (issue) => issue.status === "Todo"
  ).length;

  const progress = issues.filter(
    (issue) => issue.status === "In Progress"
  ).length;

  const done = issues.filter(
    (issue) => issue.status === "Done"
  ).length;

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <IssueForm fetchIssues={fetchIssues} />

        <h1>Dashboard</h1>

        <h3>Total Issues: {total}</h3>
        <h3>Todo: {todo}</h3>
        <h3>In Progress: {progress}</h3>
        <h3>Done: {done}</h3>

        {issues.map((issue) => (
          <IssueCard
            key={issue._id}
            issue={issue}
            fetchIssues={fetchIssues}
          />
        ))}
      </div>
    </>
  );
}

export default Dashboard;