
export default function DarkModeToggle() {
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };
  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded border border-gray-500 bg-gray-200 dark:bg-gray-700 dark:text-white text-black transition"
      style={{ position: "absolute", top: "1rem", right: "1rem" }}
    >
      Toggle Dark Mode
    </button>
  );
}
