import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import IssueCard from "../components/IssueCard";

function MyIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchMyIssues();
  }, []);

  const fetchMyIssues = async () => {
    try {
      const res = await API.get("/issues/my");
      setIssues(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>My Issues</h1>

        {issues.length === 0 ? (
          <h3>No Assigned Issues</h3>
        ) : (
          issues.map((issue) => (
            <IssueCard
              key={issue._id}
              issue={issue}
              fetchIssues={fetchMyIssues}
            />
          ))
        )}
      </div>
    </>
  );
}

export default MyIssues;