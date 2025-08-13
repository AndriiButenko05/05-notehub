import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList ";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import { fetchNotes } from "../../services/noteService";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, text],
    queryFn: () => fetchNotes(currentPage, text),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages || 0;
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox onChange={setText} value={text} />}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          {
            <button className={css.button} onClick={openModal}>
              Create note +
            </button>
          }
        </header>
        {isError && <p>Something went wrong...</p>}
        {isLoading && <p>Loading...</p>}
        {data && data.notes.length > 1 && <NoteList notes={data.notes} />}
        {isModalOpen && <Modal onClose={closeModal} onSuccess={closeModal} />}
      </div>
    </>
  );
}

export default App;
