export interface Allergy {
    name: string;
    slug: string;
    external_id: string;
}

export interface ProductCategory {
    name: string;
    slug: string;
    external_id: string;
}

export interface Product {
    name: string;
    subtitle: string;
    description: string;
    external_id: string;
    slug: string;
    images: string[];
    categories: ProductCategory[];
    allergies: Allergy[];
}