from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

notes = []

@app.get("/notes")
async def get_notes():
    return {"data": notes}

@app.post("/notes")
async def add_note(note: dict):
    new_note = {
        "id": str(len(notes) + 1),
        "item": note["item"]
    }
    notes.append(new_note)
    return {"data": "Note added."}

@app.get("/notes/{note_id}")
async def get_note(note_id: str):
    for note in notes:
        if note["id"] == note_id:
            return {"data": note}
    raise HTTPException(status_code=404, detail="Note not found.")

@app.put("/notes/{note_id}")
async def update_note(note_id: str, body: dict):
    for note in notes:
        if note["id"] == note_id:
            note["item"] = body["item"]
            return {"data": f"Note with id {note_id} updated."}
    raise HTTPException(status_code=404, detail="Note not found.")

@app.delete("/notes/{note_id}")
async def delete_note(note_id: str):
    for note in notes:
        if note["id"] == note_id:
            notes.remove(note)
            return {"data": f"Note with id {note_id} deleted."}
    raise HTTPException(status_code=404, detail="Note not found.")
