import axios from "axios";
import type Note from "../types/note";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_MY_API_KEY
}`;

interface FetchNotes {
  notes: Note[];
  totalPages: number;
  search?: string;
}

export async function fetchNotes(
  page: number,
  query: string
): Promise<FetchNotes> {
  const response = await axios.get<FetchNotes>(
    `https://notehub-public.goit.study/api/notes?page=${page}&perPage=12&search=${query}`
  );
  return response.data;
}

interface CreateNote {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(note: CreateNote): Promise<Note> {
  const response = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    note
  );
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`
  );
  return response.data;
}
