export interface Seller {
  name:  string,
  surname: string,
  address: string,
  phoneNumber: number,
  city: string,
  postCode: string,
}

export interface User {
    _id: string;
    email: string;
    avatar: string;
    isAuthenticated: boolean;
    isGoogleUser:boolean;
    expirationDate:Date;
    favourites:string[];
    locals?: { modalLocal: string | null};
    seller?:Seller,
    recentlyWatched:[],
    opinionsFromUsers: {
      positive: number,
      negative: number,
    },
  } 


export interface Offer {
    _id:string;
    mainImage: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    categories: string[];
    location: string;
    expirationDate:Date;
    createdAt: Date | number;
    updatedAt: Date | number;
    user:User;
    [key: string]: any;
}
export interface OffersWithCount {
  offers:Offer[],
  count:number
  user?:User
}

export type RequiredOffer = Required<Offer>;

export interface OffersForSingleOfferPage {
  mainOffer: RequiredOffer;
  offersUser:RequiredOffer[];
  offersCategories: RequiredOffer[];
}

export interface ErrorFields {
  [key: string]: string 
}
export type Error = ErrorFields | string

export interface LoginData {
  user:User,
  token:string
} 
