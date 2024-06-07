import PropTypes from 'prop-types'
import Header from "../components/Header.jsx"
import Menu from "../components/Menu.jsx"


const MainLayout = ({ children }) => {

  return (
    <div id="wrapper">
      <Header />
      <Menu />
      {children}


    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.element
}

export default MainLayout
