import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAllgeneros, postGame } from '../../redux/actions/actions';

const Create = () => {
  const dispatch = useDispatch();

  const allgeneros = useSelector(state => state.AllGeneros);
  console.log('log de create', allgeneros);

  useEffect(() => {
    dispatch(getAllgeneros());
  }, [dispatch]);

  const [state, setState] = useState({
    name: "",
    descripcion: "",
    platforms: "",
    background_image: "",
    released: 0,
    rating: 0,
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    descripcion: "",
    platforms: "",
    background_image: "",
    released: "",
    rating: "",
    genres: "",
  });

  const validate = (state, name) => {
    if (name === "name") {
      if (state.name === "") {
        setErrors({ ...errors, name: "El nombre es requerido" });
      } else {
        setErrors({ ...errors, name: "" });
      }
    }

    if (name === "descripcion") {
      if (state.descripcion === "") {
        setErrors({ ...errors, descripcion: "la descripcion es requerida" });
      } else {
        setErrors({ ...errors, descripcion: "" });
      }
    }

    if (name === "platforms") {
      if (state.platforms === "") {
        setErrors({ ...errors, platforms: "plataformas requeridas" });
      } else {
        setErrors({ ...errors, platforms: "" });
      }
    }

    if (name === "background_image") {
      if (state.background_image === "") {
        setErrors({ ...errors, background_image: "URL de la imagen es requerida" });
      } else {
        setErrors({ ...errors, background_image: "" });
      }
    }

    if (name === "released") {
      if (isNaN(parseInt(state.released))) {
        setErrors({ ...errors, released: "el dato debe ser un numero" });
      } else {
        setErrors({ ...errors, released: "" });
      }
    }
    if (name === "rating") {
      if (isNaN(parseInt(state.rating))) {
        setErrors({ ...errors, rating: "el dato debe ser un numero" });
      } else {
        setErrors({ ...errors, rating: "" });
      }
    }

    if (name === "genres") {
      if (state.genres.length === 0) {
        setErrors({ ...errors, genres: "Al menos un genero es requerido" });
      } else {
        setErrors({ ...errors, genres: "" });
      }
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    if (state.genres.includes(event.target.value)) return;

    if (event.target.name === 'genres') {
      setState({
        ...state,
        [event.target.name]: [...state[event.target.name], event.target.value]
      });
      return;
    }

    setState({
      ...state,
      [event.target.name]: event.target.value
    });

    validate({
      ...state,
      [event.target.name]: event.target.value
    }, event.target.name);
  };

  const remove = (event) => {
    setState({
      ...state,
      [event.target.name]: [...state[event.target.name].filter(x => x !== event.target.id)]
    });
  };

  const buttonDisabled = () => {
    let disabled = false;

    for (let error in errors) {
      if (errors[error] !== "") {
        disabled = true;
        break;
      }
    }

    return disabled;
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    const released = parseInt(state.released);
    dispatch(postGame({
      name: state.name,
      descripcion: state.descripcion,
      platforms: state.platforms,
      background_image: state.background_image,
      released: released,
      rating: state.rating,
      genres: state.genres
    }));
  };

  return (
    <div className='create-container'>
      {/* {console.log('log state',state)} */}
      <form onSubmit={handlerSubmit}>
      <Link to="/home">
            <button className="volver-btn">HOME</button>
          </Link>
        <input onBlur={handleChange} type="text" name="name" placeholder='nombre' />
        {errors.name && <span className="error-message">{errors.name}</span>}

        <input onBlur={handleChange} type="text" name="descripcion" placeholder='descripcion' />
        {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}

        <input onBlur={handleChange} type="text" name="platforms" placeholder='plataformas' />
        {errors.platforms && <span className="error-message">{errors.platforms}</span>}

        <input onBlur={handleChange} type="text" name="background_image" placeholder='imagen' />
        {errors.background_image && <span className="error-message">{errors.background_image}</span>}

        <input onBlur={handleChange} type="text" name="released" placeholder='fecha_de_lanzamiento' />
        {errors.released && <span className="error-message">{errors.released}</span>}

        <input onBlur={handleChange} type="text" name="rating" placeholder='rating' />
        {errors.rating && <span className="error-message">{errors.rating}</span>}

        <div>
          <label>generos</label>
          <select onChange={handleChange} name="genres" id="genres">
            {allgeneros.map(genre => (
              <option key={genre.id} value={genre.name}>{genre.name}</option>
            ))}
          </select>
          {
            state.genres.map(g => <div key={g}><span id={g}>{g}</span><button type='button' id={g} name="genres" onClick={remove}>X</button></div>)
          }
        </div>
        <input disabled={buttonDisabled()} type="submit" />
      </form>
    </div>
  );
};

export default Create;
