import Header from "./components/header";
import Notes from "./components/Notes";
import DarkModeToggle from "./DarkModeToggle";
export default function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <Header />
      <DarkModeToggle />
      <Notes />
    </div>
  );
}
