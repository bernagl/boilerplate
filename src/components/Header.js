import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
// import Modal from '../components/Modal'
// const { Header, Content, Footer } = Layout

export default ({ openModal, closeModal }) => {
  //   console.log(toggleModal)
  return (
    <header id="luxbar" className="luxbar-fixed">
      <input type="checkbox" className="luxbar-checkbox" id="luxbar-checkbox" />
      <div className="luxbar-menu luxbar-menu-right luxbar-menu-material-cyan">
        <ul className="luxbar-navigation">
          <li className="luxbar-header">
            <Link to="/" className="luxbar-brand">
              IMPULSEFITNESS
            </Link>
            <label
              className="luxbar-hamburger luxbar-hamburger-doublespin"
              id="luxbar-hamburger"
              htmlFor="luxbar-checkbox"
            >
              <span />
            </label>
          </li>
          <li className="luxbar-item">
            <NavLink to="/perfil" activeClassName="active">
              Mi cuenta
            </NavLink>
          </li>
          {/* <li className="luxbar-item" onClick={() => openModal()}> */}
          <li className="luxbar-item">
            <NavLink to="/clase" activeClassName="active">
              Clases
            </NavLink>
          </li>
          <li className="luxbar-item">
            <NavLink to="/comprar" activeClassName="active" exact>
              Comprar créditos
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

// const childrenComponent = () => {
//   return <p>Hola</p>
// }

// export default Modal(header)(childrenComponent)({ title: 'Testeando' })
