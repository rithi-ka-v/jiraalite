import { useEffect, useState } from "react";
import API from "../services/api";

function AssignIssue({ issueId, fetchIssues }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const assignUser = async () => {
    if (!selectedUser) return;

    try {
      await API.put(`/issues/assign/${issueId}`, {
        assignedTo: selectedUser,
      });

      fetchIssues();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <select
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select User</option>

        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <button onClick={assignUser}>
        Assign
      </button>
    </div>
  );
}

export default AssignIssue;