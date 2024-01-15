import React, { useState, useEffect } from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from 'react-router-dom';

import "./style.scss";

import CounterWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrolly, setLastScrolly] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const controlNavber = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrolly && !mobileMenu) {
        setShow("hide")
      } else {
        setShow("show")
      }
    } else {
      setShow("top")
    }
    setLastScrolly(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavber)
  }, [lastScrolly])

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`)
      setTimeout(() => {
        setShowSearch(false);
      }, 1000)
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigatorHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie")
    } else {
      navigate("/explore/tv")
    }
    setMobileMenu(false)
  }

  return <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
    <CounterWrapper>
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="" />
      </div>
      <ul className="menuItems">
        <li className="menuItem" onClick={() => navigatorHandler("movie")}>Movies</li>
        <li className="menuItem" onClick={() => navigatorHandler("tv")}>TV Shows</li>
        <li className="menuItem">
          <HiOutlineSearch onClick={openSearch} />
        </li>
      </ul>

      <div className="mobileMenuItems">
        <HiOutlineSearch onClick={openSearch} />
        {mobileMenu ? (<VscChromeClose onClick={() => setMobileMenu(false)} />) : (<SlMenu onClick={openMobileMenu} />)}
      </div>
    </CounterWrapper>

    {showSearch && <div className="searchBar">
      <CounterWrapper>
        <div className="searchInput">
          <input type="text" placeholder='Search for a movie or tv show....' onKeyUp={searchQueryHandler} onChange={(e) => setQuery(e.target.value)} />
          <VscChromeClose onClick={() => setShowSearch(false)} />
        </div>
      </CounterWrapper>
    </div>}
  </header>
}

export default Header