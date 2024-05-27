export interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  correo: string;
  contraseña: string;
  fecha_registro: string;
  fecha_modificacion: string;
}

export interface DetallePoster {
  id: number;
  titulo: string;
  rutaPoster: string;
}

export interface Pelicula {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  trailer_path: string;
  runtime: number;
}

export interface Genero {
  id: number;
  nombre: string;
}

export interface Peliculas {
  id: number;
  adulto: boolean;
  rutaFondo?: string;
  generos: Genero[];
  idiomaOriginal: string;
  tituloOriginal: string;
  resumen: string;
  estado: string;
  duracion: number;
  popularidad: number;
  rutaPoster: string;
  fechaEstreno: string;
  titulo: string;
  video: boolean;
  promedioVotos: number;
  votosTotales: number;
  rutaTrailer: string;
}

export interface Sala {
  id: number;
  nombre: string;
  capacidad: number;
}

export interface SesionPeliculaRequest {
  pelicula: Peliculas;
  sala: Sala;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  precio: number;
}

export interface SesionPelicula {
  id: number;
  pelicula: Peliculas;
  sala: Sala;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  precio: number;
}
