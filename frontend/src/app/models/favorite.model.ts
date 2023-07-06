export interface Favorite {
  items: Array<FavoriteItem>;
}

export interface FavoriteItem {
  product: string;
  name: string;
  price: number;
  id: number;
}

