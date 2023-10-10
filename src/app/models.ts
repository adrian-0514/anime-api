export interface Anime {
    mal_id: number;
    url: string;
    images: Image;
    trailer: string;
    approved: boolean;
    title: string;
    title_english: string;
    title_japaneses: string;
    title_synonyms: Array<string>;
    type: Type;
    source: string;
    airing: boolean;
    episodes: number;
    aired: Aired;
    duration: string;
    rating: string;
    score: number;
    score_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string;
    year: number;
    broadcast: Object;
    producers: Array<Url>;
    licensors: Array<Url>;
    studios: Array<Object>;
    genres: Array<Genre>;
    explicit_genres: Array<Genre>;
    themes: Array<Genre>;
    demographics: Array<Genre>;
}

export interface Aired {
    from: string;
    to: string;
    prop: Object;
}

export interface Image {
    jpg: ImageType;
    webp: ImageType;
}

export interface ImageType {
    image_url: string;
    large_image_url: string;
    smaall_image_url: string;
}

export interface APIResponse<T> {
    pagination: Pagination;
    data: Array<T>
}

export interface Pagination {
    last_visible_page: number;
    has_next_page: true;
    items: Object;
}

export interface Genre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

export interface Url {
    male_id: number;
    name: string;
    type: Type;
    url: string;
}

export enum Type {
    tv,
    movie,
    ova,
    special,
    ona,
    music
}
