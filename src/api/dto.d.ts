export interface Product {
  id: number;
  name: string;
  price: number;
  photoUrl: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  productId: number;
  statusId: number;
  count: number;
}
