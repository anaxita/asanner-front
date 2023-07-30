export const Login = () => {
    return (
        <>
            <div className="login">
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <a href={import.meta.env.VITE_ASANA_LOGIN_URL} className="btn btn-primary">Login</a>
                </div>
            </div>
        </>
    );
};
