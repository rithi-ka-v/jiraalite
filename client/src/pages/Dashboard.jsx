import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [issues, setIssues] = useState([]);

  useEffect(() => {

    fetchIssues();

  }, []);

  const fetchIssues = async () => {

    const res = await API.get("/issues");

    setIssues(res.data);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {issues.map((issue) => (
        <div key={issue._id}>
          <h3>{issue.title}</h3>
          <p>{issue.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;