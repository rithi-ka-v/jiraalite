import { useState } from "react";
import API from "../services/api";

function IssueForm({ fetchIssues }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/issues", {
        title,
        description,
        priority
      });

      alert("Issue Created!");

      setTitle("");
      setDescription("");
      setPriority("Medium");

      fetchIssues();
    } catch (error) {
      console.log(error);
      alert("Failed to create issue");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Issue</h2>

      <input
        type="text"
        placeholder="Issue Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <br /><br />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <br /><br />

      <button type="submit">
        Create Issue
      </button>
    </form>
  );
}

export default IssueForm;