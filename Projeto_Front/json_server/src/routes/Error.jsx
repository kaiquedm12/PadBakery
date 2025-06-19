import { useRouteError } from "react-router-dom"
import { Link } from "react-router-dom";

export default function Error(){
    const erro = useRouteError();
    return(
        <>
        <div>
            <h3>Erro pagina não encontrada</h3>
            <p>{erro.statusText}</p>
            <p>{erro.error.message}</p>
        </div>
        </>
    )
}