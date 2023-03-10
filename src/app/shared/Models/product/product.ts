import { Category } from "../category/category";

export class Product {
    idProduct!: number;
    name!: string;
    description!: string;
    prix!: number;
    quantiteStock!: number;
    category?: Category;
    // ligneCommandes!: LigneCommande[];
}
