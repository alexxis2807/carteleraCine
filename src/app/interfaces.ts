export interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  correo: string;
  contraseña: string;
  fecha_registro: string;
  fecha_modificacion: string;
}

export interface Pelicula {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
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
}
