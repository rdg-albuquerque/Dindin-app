import "./style.css";
import logo from "../../assets/logo.svg";

export default function Header() {
    return (
        <header className="header">
            <div className="header_container flex-row align-center">
                <img className="header_logo mr-10" src={logo} alt="logo" />
                <h1 className="header_logo-text">Dindin</h1>
            </div>
        </header>
    );
}
