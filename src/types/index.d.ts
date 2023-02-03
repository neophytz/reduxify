export interface IUser {
    id:       number;
    name:     string;
    username: string;
    email:    string;
    address:  Address;
    phone:    string;
    website:  string;
    company:  Company;
}

export interface Address {
    street:  string;
    suite:   string;
    city:    string;
    zipcode: string;
    geo:     Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}

export interface Company {
    name:        string;
    catchPhrase: string;
    bs:          string;
}

export interface ITodo {
    userId:    number;
    id:        number;
    title:     string;
    completed: boolean;
}

export interface AlbumImage {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
  }
  
export type Status = 'idle' | 'loading' | 'failed';

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: Rating
  }
  
  export interface Rating {
    rate: number
    count: number
  }
  
  export interface CartItem extends Product {
    quantity: number
  }