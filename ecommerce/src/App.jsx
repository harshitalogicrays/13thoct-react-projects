import { Outlet} from "react-router-dom"
import Header from "./features/Header"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function App() {
   return (
    <>
   <ToastContainer position="bottom-left" autoClose={2000}
        hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false}
        draggable pauseOnHover={false} theme="colored"
        />
    <Header/>
      <Container className="mt-5">
          <Outlet/>
      </Container>
    </>
  )
}

export default App
