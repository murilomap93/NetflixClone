import React, { useState } from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
export default props => {
    const url_img = 'https://image.tmdb.org/t/p/w300';
    const [scrollX, setScrollX] = useState(0);
    const passo = Math.round(window.innerWidth / 2);
    const handleLeftArrow = () => {
        let x = scrollX + passo;
        x = x > 0 ? 0 : x;
        setScrollX(x);
    }
    const handleRightArrow = () => {
        let x = scrollX - passo;
        let largura_lista = -150 * props.items.results.length;
        let tamanho_tela_negativo = -window.innerWidth;
        x = tamanho_tela_negativo + x > largura_lista ? x : largura_lista - tamanho_tela_negativo - 60;
        setScrollX(x);
    }
    return (
        <div className='movieRow'>
            <h2>{props.title}</h2>
            <div className='movieRow--left' onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }}></NavigateBeforeIcon>
            </div>
            <div className='movieRow--right' onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }}></NavigateNextIcon>
            </div>
            <div className='movieRow--listarea'>
                <div className='movieRow--list' style={{ marginLeft: scrollX, width: 150 * props.items.results.length }}>
                    {props.items.results.length > 0 && getLists()}
                </div>

            </div>
        </div>
    );
    function getLists(key) {
        return props.items.results.map(
            (film, key) => {
                return <div key={key} className='movieRow--item'>
                    <img src={`${url_img}${film.poster_path}`} alt={film.original_title}></img>
                </div>
            }
        )
    }
}
