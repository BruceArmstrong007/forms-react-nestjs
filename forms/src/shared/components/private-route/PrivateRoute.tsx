import { Navigate, Route } from "react-router"
import { authState } from '../../../app/state/AuthState';

export const PrivateRoute = ({children, ...rest}: any) => {
    const auth = authState((state: any) => state.auth);
    return (
        <Route {...rest}>
                {!auth.accessToken ? <Navigate to='auth/login'/> : children}
        </Route>
    )
}