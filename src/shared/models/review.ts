export class Review {
    constructor(
        public title : string,
        public artist : string,
        public year : number,        
        public image : string,
        public rating? : number, // optional parameter
        public listened? : boolean
    ) {

    }
}