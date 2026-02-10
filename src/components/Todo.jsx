import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { nanoid } from "nanoid";

const TodoDataTable = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("Open");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const openModal = (todo = null) => {
    if (todo) {
      setTask(todo.text);
      setStatus(todo.status);
      setEditId(todo.id);
    } else {
      setTask("");
      setStatus("Open");
      setEditId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTask("");
    setStatus("Open");
    setEditId(null);
  };
  const handleSubmit = () => {
    if (!task.trim()) return;

    if (editId) {
      setTodos(
        todos.map((t) =>
          t.id === editId
            ? {
                ...t,
                text: task,
                status,
                updatedAt: new Date().toLocaleString(),
              }
            : t
        )
      );
    } else {
      setTodos([
        ...todos,
        {
          id: nanoid(),
          text: task,
          status: "Open",
          createdAt: new Date().toLocaleString(),
          updatedAt: null,
        },
      ]);
    }
    closeModal();
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };
  const columns = [
    {
      name: "Task",
      sortable: true,
      cell: (row) => (
        <div
          className="max-w-[260px] truncate cursor-pointer"
          title={row.text}
        >
          {row.text}
        </div>
      ),
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-lg text-xs font-semibold text-white ${
            row.status === "Open" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Type",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-lg text-xs font-semibold text-white ${
            row.updatedAt ? "bg-blue-600" : "bg-gray-600"
          }`}
        >
          {row.updatedAt ? "Updated" : "Created"}
        </span>
      ),
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => row.updatedAt || "—",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openModal(row)}
            className="px-3 py-1 text-xs bg-yellow-500 font-semibold rounded text-white"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTodo(row.id)}
            className="px-3 py-1 text-xs bg-red-500 font-semibold rounded text-white"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-[calc(100vh-62px)] bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Todo Data Table</h1>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-indigo-600 rounded-lg font-semibold cursor-pointer"
          >
            + Add Todo
          </button>
        </div>

        <DataTable
          columns={columns}
          data={todos}
          pagination
          highlightOnHover
          striped
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5,10,20,50]}
          noDataComponent="No todos available"
          // customStyles={{
          //   rows: {
          //     style: {
          //       backgroundColor: "#000",
          //       color: "#fff",
          //     },
          //   },
          //   headCells: {
          //     style: {
          //       backgroundColor: "#111",
          //       color: "#fff",
          //       fontWeight: "bold",
          //     },
          //   },
          // }}
        />
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Todo" : "Add Todo"}
            </h2>

            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Task name"
              className="w-full mb-3 px-4 py-2 rounded bg-black/40 text-white outline-none"
            />

            {editId && (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full mb-4 px-4 py-2 rounded bg-black/40 text-white"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 rounded"
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDataTable;
