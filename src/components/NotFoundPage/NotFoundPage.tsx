import {useNavigate} from "react-router-dom";
import "./notFoundPage.scss"

function NotFoundPage() {
    const navigate = useNavigate();
    const goHomePage = () => navigate("/", {replace: true});
    return (
        <div className="notFoundPage">
            <div className="notFoundPage__main">
                <div className="notFoundPage__main-item notFoundPage__main-title">Oops!</div>
                <div className="notFoundPage__main-item notFoundPage__main-subtitle">404 - PAGE NOT FOUND</div>
                <div className="notFoundPage__main-item notFoundPage__main-desc">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</div>
                <div className="notFoundPage__main-item notFoundPage__main-btn">
                    <button className="btn" onClick={goHomePage}>HOME PAGE</button>
                </div>
            </div>

        </div>

    );
}

export {NotFoundPage};
