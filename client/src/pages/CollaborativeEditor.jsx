import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function CollaborativeEditor() {
  const { roomId } = useParams();

  const [code, setCode] = useState("// Start coding...");
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState("javascript");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const username = "User-" + Math.floor(Math.random() * 1000);

    socket.on("room-joined", (data) => {
      setUsers(data.users || []);
      setCode(data.code || "// Start coding...");
      setLanguage(data.language || "javascript");
    });

   socket.on("user-joined", (data) => {
  console.log("USER JOINED EVENT:", data);

  setUsers(data.users || []);

  toast.success(`${data.username} joined the room`, {
    duration: 3000,
  });
});

    socket.on("user-left", (data) => {
  setUsers(data.users || []);

  toast.error(`${data.username} left the room`, {
    duration: 3000,
  });
});

    socket.on("language-update", (data) => {
      setLanguage(data.language);
    });

    socket.on("code-update", (data) => {
      setCode(data.code);
    });

    socket.emit("join-room", {
      roomId,
      username,
    });

    return () => {
      socket.off("room-joined");
      socket.off("user-joined");
      socket.off("user-left");
      socket.off("language-update");
      socket.off("code-update");
    };
  }, [roomId]);

  const handleEditorChange = (value) => {
    const updatedCode = value || "";

    setCode(updatedCode);

    socket.emit("code-change", {
      roomId,
      code: updatedCode,
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          background: "#111827",
          color: "white",
          padding: "10px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Room: {roomId}

        <button
          style={{
            marginLeft: "20px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigator.clipboard.writeText(roomId);
            alert("Room ID Copied!");
          }}
        >
          Copy Room ID
        </button>

        <button
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle Theme
        </button>
      </div>

      <div
        style={{
          background: "#1f2937",
          color: "white",
          padding: "10px",
        }}
      >
        <h3>Users Online ({users.length})</h3>

        {users.map((user, index) => (
          <p key={index}>{user.username}</p>
        ))}

        <select
          value={language}
          onChange={(e) => {
            const selected = e.target.value;

            setLanguage(selected);

            socket.emit("language-change", {
              roomId,
              language: selected,
            });
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>

      <Editor
        height="75vh"
        language={language}
        theme={darkMode ? "vs-dark" : "light"}
        value={code}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default CollaborativeEditor;