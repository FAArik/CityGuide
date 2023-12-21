import { Photo } from "./photo.model";

export class City{
    declare id: number;
    declare name: string;
    declare description: string;
    declare photoUrl: string;
    declare photos?:Photo[];
}