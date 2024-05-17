import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { BehaviorSubject } from 'rxjs';
import { CapacitorSQLite, JsonSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  public dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isWeb: boolean = false;
  public dbNames: string = 'Products.db';

  constructor(private http: HttpClient) {
  }
  async init(){
    const info = await Device.getInfo();
    const sqlite = CapacitorSQLite as any;
    if(info.platform === 'web'){
      this.isWeb = true;
      await sqlite.initWebStore();
    }
    this.setupDatabase();
  }

  async setupDatabase(){
    const dbSetup = await Preferences.get({key: 'dbSetup'});
    if(!dbSetup.value){
      this.downloadDatabase();
    }else{
      this.dbNames = await this.getDbName();
      await CapacitorSQLite.createConnection({database:this.dbNames});
      await CapacitorSQLite.open({database:this.dbNames});
      this.dbReady.next(true);

    }
  }

  downloadDatabase(){
    this.http.get('assets/db.json').subscribe(async (jsonExport: JsonSQLite) => {
      const jsonstring = JSON.stringify(jsonExport);
      const isValid = await CapacitorSQLite.isJsonValid({jsonstring});

      if(isValid.result){
          this.dbNames = jsonExport.database;
          await CapacitorSQLite.importFromJson({jsonstring});
          await CapacitorSQLite.createConnection({database:this.dbNames});
          await CapacitorSQLite.open({database:this.dbNames});
          await Preferences.set({key: 'dbSetup', value: '1'});
          await Preferences.set({key: 'dbName', value: this.dbNames});

          this.dbReady.next(true);
      }
    });
  }

  async getDbName(){
    if(!this.dbNames){
      const dbName = await Preferences.get({key: 'dbName'});
      if(dbName.value){
        this.dbNames = dbName.value;
      }
    }
    return this.dbNames;
  }

  async create(snk: Product){
    let sql = 'INSERT INTO products (id, name, description, price, image, favorite) VALUES (?,?,?,?,?,?)';
    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName, 
      set: [
        {
          statement: sql,
          values: [snk.id, snk.name, snk.description, snk.price, snk.image, snk.favorite]
        }
      ]}).then((changes: capSQLiteChanges) => {
        if(this.isWeb){
          CapacitorSQLite.saveToStore({database: dbName});
        }return changes;
      });
  }

  async read(){
    let sql = 'SELECT * FROM products';
    const dbName = await this.getDbName();
    return CapacitorSQLite.query({database: dbName, statement: sql, values: []})
    .then((response: capSQLiteValues) => {
      let snks: Product[] = [];
      for(let i = 0; i < response.values.length; i++){
        let snk: Product = {
          id: response.values[i].values[0],
          name: response.values[i].values[1],
          description: response.values[i].values[2],
          price: response.values[i].values[3],
          image: response.values[i].values[4],
          favorite: response.values[i].values[5]
        };
        snks.push(snk);
      }
    });
  }

  async delete(snk: Product){
    let sql = 'DELETE FROM products WHERE id = ?';
    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName, 
      set: [
        {
          statement: sql,
          values: [snk]
        }
    ]}).then((changes: capSQLiteChanges) => {
        if(this.isWeb){
          CapacitorSQLite.saveToStore({database: dbName});
        }return changes;
    });
  }
}