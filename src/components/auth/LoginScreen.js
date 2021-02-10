import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();// sirve para hacer dispatch de acciones 

    const {loading} = useSelector(state => state.ui)


    //vamos a desestructurar el form 
    const [formValues, handleInputChange] = useForm({
        email: 'nando@gmail.com',
        password: '123'
    });

    //vamos a desestrucurar formvalues
    const { email, password } = formValues;

    // luego a que crear atributo value en cada input y añadir el email y password y agregar el onchange 

    //este va hacer nuestro submit y recibe el evento 
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(email,password)
        //la accion que voy a amandar es el login
        // dispatch(login(987,'Fernando'));
        dispatch(startLoginEmailPassword(email, password));
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
            {/* <h1>Login Screen</h1> */}
            <h3 className="auth_title">Login</h3>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth_input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth_input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={ loading }

                >
                    Login

                </button>

                <hr />
                <div className="auth_social-networks">
                    <p>Login with social networks</p>
                </div>
                <div
                    className="google-btn"
                    onClick={handleGoogleLogin}
                >
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>
                {/* este link lo vamos a usar parea poder navegar entre paginas */}
                <Link to="/auth/register" className="link" >
                    Create new account
                </Link>
            </form>
        </>
    )
}
