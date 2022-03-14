import styled, {css} from 'styled-components'
import { FiCheckCircle } from 'react-icons/fi';
import { BsFillXCircleFill } from "react-icons/bs";
const colores = {
    borde: '#0075FF',
    exito: '#21ac2c',
    error: '#e72c2c',
    fondo: '#2C2C2C'
}

const Formulario = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    
    @media (max-width: 800px){
        grid-template-columns: 1fr;
    }
`;

const InputGroup = styled.div`
    position: relative;
    z-index: 90;
`;

const InputStyled = styled.input`
    width: 100%;
    border-radius: 5px;
    background-color: #3C3C3C;
    color: #fff;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 3px solid transparent;
    outline: none;

    &:focus {
        border: 3px solid ${colores.borde};
        outline: none;
        box-shadow: 3px 0px 10px rgba(163,163,163, 0.4);
    }

    ${props => props.valido === 'true' && css`
        border: 3px solid ${colores.exito} !important;
    `}

    ${props => props.valido === 'false' && css`
        border: 3px solid ${colores.error} !important;
    `}
`;

const AlertError = styled.p`
    font-size: 14px;
    margin-bottom: 0;
    color: #fff;
    margin: 0 5px;
    display: none;

    ${props => props.valido === 'false' && css`
        display: flex !important;
    `}
`;

const IconoValidacion = styled(FiCheckCircle)`
    color: ${colores.exito};
    position: absolute;
    right: 10px;
    top: 14px;
    z-index: 100;
    font-size: 18px;
    opacity: 0;
    transition: .3s ease all;

    ${props => props.valido === 'true' && css`
        opacity: 1 !important;
    `}

`;

const IconoError = styled(BsFillXCircleFill)`
    color: ${colores.error};
    position: absolute;
    right: 10px;
    top: 14px;
    z-index: 100;
    font-size: 18px;
    opacity: 0;
    transition: .3s ease all;

    ${props => props.valido === 'false' && css`
        opacity: 1 !important;
    `}

`;

const SelectStyled = styled.select`
    width: 100%;
    border-radius: 5px;
    background-color: #3C3C3C;
    color: #fff;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 3px solid transparent;
    outline: none;

    &:focus {
        border: 3px solid ${colores.borde};
        outline: none;
        box-shadow: 3px 0px 10px rgba(163,163,163, 0.4);
    }

    ${props => props.valido === 'true' && css`
        border: 3px solid ${colores.exito} !important;
    `}
`;

const Label = styled.label`
    color: #fff;
    margin-left: 5px;
`;

const InputRadio = styled.input`
    margin-left: 5px;
`;

const inputCheck = styled.input`
    width: auto;
	margin-top: 22px;
	margin-left: 3px;
`;

const LabelTerminos = styled.label`
    color: #ffffff;
	margin-left: 8px;
 	button{
		background-color: transparent;
		border: none;
		text-decoration: underline;
		font-style: italic;
		color: #dbdbdb;
		}
`;

const ContenedorBoton = styled.div`
    grid-column: span 2;
    @media (max-width: 800px){
        grid-column: 1;
    }
`;

const BotonSubmit = styled.button`
    font-family: 'Lato', sans-serif;
    background-color: #ffffff;
    border: 2px solid #ffffff;
    color: #000000;
    text-transform: uppercase;
    font-size: 14px;
    border-radius: 45px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-bottom: 10px;
    width: 180px;
    padding-left: 45px;
    height: 50px;
    margin: 0 auto;
    margin-top: 10px;
    svg{
        margin-left: 10px;
    }
	&:hover{
	    svg{
	        margin-left: 20px;
	        transition: 0.5s;
	 	}
    }
`;

export { 
    Formulario,
    InputGroup,
    InputStyled,
    AlertError,
    IconoValidacion,
    IconoError,
    SelectStyled,
    Label,
    InputRadio,
    inputCheck,
    LabelTerminos,
    ContenedorBoton,
    BotonSubmit
}