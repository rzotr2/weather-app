import { Window } from "./components/Window.tsx";
import PageHeader from "./components/PageHeader.tsx";
import {SearchForm} from "./components/SearchForm.tsx";

function App() {
    return (
      <>
          <PageHeader />
          <div className="bg-gradient-to-b from-[#cfd8df] to-[#b5c6d6] min-h-screen flex flex-col items-center">
              <div className="md:w-1/3 md:py-5 py-2 px-2">
                  <Window />
              </div>
              <div>
                  <SearchForm />
              </div>
          </div>
      </>
    )
}

export default App
