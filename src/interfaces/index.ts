interface Sale {
  id: number;
  dateTime: Date;
  items: SaleItem[]
  finished: boolean;
}

interface ItemDetails {
  id: number;
  description: string;
  price: number;

}

interface SaleItem {
  id: number;
  details: ItemDetails;
  quantity: number;
}

export type {Sale, SaleItem, ItemDetails}