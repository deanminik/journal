import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';





export const RegisterScreen = () => {

    const dispatch = useDispatch();//disparamos la accion 

    // const state = useSelector(state => state);
    // ocupamos extraerlo entonces 
    const {msgError} = useSelector(state => state.ui);

    // console.log(state);

    //usaremos el useform 
    const [formValues, handleInputChange] = useForm({
        name: 'dean',
        email: 'cuats2@gmail.com',
        password: '123123',
        password2: '123123'
    })

    //del formvalues voy a extraer el name, email, pass etc 
    const { name, email, password, password2 } = formValues;// con nesto ya tengo las variables que maneja mi formulario 

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            // console.log('formulario correcto');
            dispatch(startRegisterWithEmailPasswordName(email, password, name));

        }


    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            // console.log('Name is requerid');
            dispatch(setError('Name is requerid'));
            return false;
        } else if (!validator.isEmail(email)) {
            // si esto no es un email haga lo  siguiente
            // console.log('NO es un correo valido ');
            dispatch(setError('NO es un correo valido '));
            return false;
        } else if (password !== password2 || password.length < 3) {
            // console.log('password should be at least 6 caracters ')
            dispatch(setError('password should be at least 6 caracters'));
            return false;

        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            {/* <h1>Login Screen</h1> */}
            <h3 className="auth_title">Register</h3>

            <form onSubmit={handleRegister}>
                {/* estta es un condicion  */}
                {
                    msgError &&
                    (
                        <div className="auth_alert-error">
                           {msgError}
                        </div>
                    )

                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth_input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

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
                    placeholder="Password"
                    name="password"
                    className="auth_input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth_input"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"

                >
                    Register

            </button>

                {/* este link lo vamos a usar parea poder navegar entre paginas */}
                <Link to="/auth/login" className="link" >
                    Already registered
            </Link>
            </form>
        </>
    )
}

