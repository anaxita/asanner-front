import './login.css'

// Login component that redirects to Asana's OAuth flow
export const Login = () => {
    return (
                <div className="login vh-100 vw-100 d-flex justify-content-center align-items-center">
                    <a href={import.meta.env.VITE_ASANA_LOGIN_URL} className="btn btn-primary btn-lg">Login with Asana</a>
                </div>
    );
};
