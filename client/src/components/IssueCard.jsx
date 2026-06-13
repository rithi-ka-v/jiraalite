import API from "../services/api";
import AssignIssue from "./AssignIssue";

function IssueCard({ issue, fetchIssues }) {
  const markDone = async () => {
    await API.put(`/issues/${issue._id}`, {
      status: "Done",
    });

    fetchIssues();
  };

  const deleteIssue = async () => {
    await API.delete(`/issues/${issue._id}`);

    fetchIssues();
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "8px",
      }}
    >
      <h3>{issue.title}</h3>
      <p>{issue.description}</p>

      <p>Status: {issue.status}</p>
      <p>Priority: {issue.priority}</p>

      <p>
        Assigned To:{" "}
        {issue.assignedTo?.name || "Unassigned"}
      </p>

      {/* ASSIGN FEATURE */}
      <AssignIssue
        issueId={issue._id}
        fetchIssues={fetchIssues}
      />

      <button onClick={markDone}>
        Mark Done
      </button>

      <button
        onClick={deleteIssue}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>
  );
}

export default IssueCard;