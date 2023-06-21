import React from 'react'
import logo from "../asset/logo2.png";
const header = () => {
  return (
    <header class="py-3 mb-3 border-bottom">
        <div class="container-fluid d-grid gap-3 align-items-center">
          <div class="dropdown">
            <img
              src={logo}
              alt="logo"
              class="d-flex mb-2 mt-2 mb-lg-0  "
              width="240"
              height="60"
            />
          </div>
        </div>
      </header>
  )
}

export default header