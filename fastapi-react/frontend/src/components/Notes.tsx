// import React, { useEffect, useState } from "react";

// interface Note {
//   id: string;
//   item: string;
// }

// export default function Notes() {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [newNote, setNewNote] = useState("");

//   const fetchNotes = async () => {
//     const response = await fetch("http://localhost:8000/notes");
//     const data = await response.json();
//     setNotes(data.data);
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const addNote = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newNote.trim()) return;

//     await fetch("http://localhost:8000/notes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ item: newNote }),
//     });
//     setNewNote("");
//     fetchNotes();
//   };

//   const updateNote = async (id: string, item: string) => {
//     await fetch(`http://localhost:8000/notes/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ item }),
//     });
//     fetchNotes();
//   };

//   const deleteNote = async (id: string) => {
//     await fetch(`http://localhost:8000/notes/${id}`, {
//       method: "DELETE",
//     });
//     fetchNotes();
//   };

//   return (
//     <main style={{ paddingTop: "4rem", maxWidth: "600px", margin: "auto" }}>
//       <form onSubmit={addNote} style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           value={newNote}
//           onChange={(e) => setNewNote(e.target.value)}
//           placeholder="Add a new note"
//           style={{ width: "80%", padding: "0.5rem" }}
//         />
//         <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}>Add</button>
//       </form>

//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {notes.map(({ id, item }) => (
//           <NoteItem key={id} id={id} item={item} onUpdate={updateNote} onDelete={deleteNote} />
//         ))}
//       </ul>
//     </main>
//   );
// }

// interface NoteItemProps {
//   id: string;
//   item: string;
//   onUpdate: (id: string, item: string) => void;
//   onDelete: (id: string) => void;
// }

// function NoteItem({ id, item, onUpdate, onDelete }: NoteItemProps) {
//   const [editMode, setEditMode] = useState(false);
//   const [editValue, setEditValue] = useState(item);

//   const saveUpdate = () => {
//     if (editValue.trim()) {
//       onUpdate(id, editValue);
//       setEditMode(false);
//     }
//   };

//   return (
//     <li style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "0.5rem", borderRadius: "4px" }}>
//       {editMode ? (
//         <>
//           <input
//             type="text"
//             value={editValue}
//             onChange={(e) => setEditValue(e.target.value)}
//             style={{ width: "70%", padding: "0.3rem" }}
//           />
//           <button onClick={saveUpdate} style={{ marginLeft: "0.5rem" }}>Save</button>
//           <button onClick={() => setEditMode(false)} style={{ marginLeft: "0.5rem" }}>Cancel</button>
//         </>
//       ) : (
//         <>
//           <span>{item}</span>
//           <button onClick={() => setEditMode(true)} style={{ marginLeft: "1rem" }}>Edit</button>
//           <button onClick={() => onDelete(id)} style={{ marginLeft: "0.5rem" }}>Delete</button>
//           <input
//             readOnly
//             value={`http://localhost:8000/notes/${id}`}
//             style={{ marginLeft: "1rem", width: "200px" }}
//           />
//         </>
//       )}
//     </li>
//   );
// }

import React, { useEffect, useState } from "react";

interface Note {
  id: string;
  item: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  const fetchNotes = async () => {
    const response = await fetch("http://localhost:8000/notes");
    const data = await response.json();
    setNotes(data.data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    await fetch("http://localhost:8000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: newNote }),
    });
    setNewNote("");
    fetchNotes();
  };

  return (
    <main className="pt-24 max-w-xl mx-auto">
      <form onSubmit={addNote} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note"
          className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 border-gray-400"
        />
        <button type="submit" className="px-3 py-2 rounded bg-blue-500 dark:bg-blue-700 text-white font-semibold">
          Add
        </button>
      </form>

      <ul className="space-y-4">
        {notes.map(({ id, item }) => (
          <NoteItem key={id} id={id} item={item} onUpdate={fetchNotes} onDelete={fetchNotes} />
        ))}
      </ul>
    </main>
  );
}

interface NoteItemProps {
  id: string;
  item: string;
  onUpdate: () => void;
  onDelete: () => void;
}

function NoteItem({ id, item, onUpdate, onDelete }: NoteItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(item);

  const saveUpdate = async () => {
    if (editValue.trim()) {
      await fetch(`http://localhost:8000/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: editValue }),
      });
      setEditMode(false);
      onUpdate();
    }
  };

  const deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, { method: "DELETE" });
    onDelete();
  };

  return (
    <li className="border rounded p-4 flex flex-col bg-white dark:bg-gray-800">
      {editMode ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-2 py-1 rounded border dark:bg-gray-900 dark:border-gray-600 border-gray-300"
          />
          <button onClick={saveUpdate} className="bg-green-500 dark:bg-green-700 text-white px-2 rounded">
            Save
          </button>
          <button onClick={() => setEditMode(false)} className="bg-gray-300 dark:bg-gray-900 text-black dark:text-white px-2 rounded">
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="font-medium">{item}</span>
          <div className="flex gap-2">
            <button onClick={() => setEditMode(true)} className="bg-yellow-500 dark:bg-yellow-700 px-2 text-white rounded">
              Edit
            </button>
            <button onClick={deleteNote} className="bg-red-500 dark:bg-red-700 px-2 text-white rounded">
              Delete
            </button>
            <input
              readOnly
              value={`http://localhost:8000/notes/${id}`}
              className="ml-2 px-2 py-1 rounded border dark:bg-gray-900 dark:border-gray-600 border-gray-300 w-52"
            />
          </div>
        </div>
      )}
    </li>
  );
}
