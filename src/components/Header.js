import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class extends React.Component {
  state = { checked: false }

  handleCheck = () => {
    this.setState(
      ({ checked }) => ({
        checked: !checked
      }),
      () => console.log('status', this.state.checked)
    )
  }

  render() {
    const { checked } = this.state
    return (
      <header id="luxbar" className="luxbar-fixed">
        <input
          type="checkbox"
          className="luxbar-checkbox"
          id="luxbar-checkbox"
          checked={checked}
        />
        <div className="luxbar-menu luxbar-menu-right luxbar-menu-material-cyan">
          <ul className="luxbar-navigation">
            <li className="luxbar-header">
              <Link to="/" className="luxbar-brand">
                <img
                  src="http://impulse-fitnessstudio.com/wp-content/uploads/2016/12/logo-impulsfit.png"
                  alt=""
                />
              </Link>
              <label
                className="luxbar-hamburger luxbar-hamburger-doublespin"
                id="luxbar-hamburger"
                htmlFor="luxbar-checkbox"
                onClick={this.handleCheck}
              >
                <span />
              </label>
            </li>
            <li className="luxbar-item" onClick={this.handleCheck}>
              <NavLink to="/clase" activeClassName="active">
                Clases
              </NavLink>
            </li>
            <li className="luxbar-item" onClick={this.handleCheck}>
              <NavLink to="/comprar" activeClassName="active" exact>
                Comprar créditos
              </NavLink>
            </li>
            <li className="luxbar-item" onClick={this.handleCheck}>
              <NavLink to="/perfil" activeClassName="active">
                Mi cuenta
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}