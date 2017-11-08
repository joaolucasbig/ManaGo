import * as Request from "request-promise";
import * as Qs from "qs";
import * as DatabaseManager from './database';
import * as Errors from 'common-errors'

class ManaVai {
    
    private url : String = "https://api.scryfall.com";
    private request: Request;
    private qs: Qs;
    private connectObj;

    constructor(){
        this.request = Request;
        this.qs = Qs;
    }

    public getCardByName(name:string, cb: Function){
        let query = {
            fuzzy: name
        };

        this.getAPI('/cards/named', query)
            .then( (data) => {
                cb(null, data);
            })
            .catch((err) => cb(err));
    }

    public query(route:string, query:object): Promise<object>{
        return this.getAPI(route, query)
    }

    private getAPI(uri: string, query: object): Promise<object>{
        
        return this.request.get({
            baseUrl: this.url,
            uri: uri,
            qs: query,
            json: true
        });
    }

}

let manaVai = new ManaVai();

manaVai.getCardByName("Rampaging Ferocidon", (err, card) => {
    if(err) throw err;
    console.log(card);
})
