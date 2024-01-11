import styles from "./sidenav.module.css"
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { navData } from "./navData";
import { useState } from "react";

export default function Sidenav() {

    const [open, setopen] = useState(true)

    const toggleOpen = () => {
        setopen(!open)
    }

    return (
        <div className={open ? styles.sidenav : styles.sidenavClosed}>

            <button className={styles.menuBtn} onClick={toggleOpen}>
                {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
            </button>

            {navData.map(item => {
                return <NavLink key={item.id} className={styles.sideitem} to={item.link}>
                    {item.icon}
                    <span className={styles.linkText}>{item.text}</span>
                </NavLink>
            })}

            <img src={require("../../edpr-logo.png")} style={{ maxWidth: '90%', position: 'relative', top: 880, left: 10 }}></img>
        </div>
    )
}
