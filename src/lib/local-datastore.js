const getType = (arg) => {
  return /^\[object\s(.+)\]$/.exec(Object.prototype.toString.call(arg))[1].toLowerCase();
};

export default class LocaDatastore {
  constructor(tableName){
    this.column = [];
    this.modal = null;
    this.tableName = tableName;
    try{
      if(tableName){
        const temp = JSON.parse(localStorage.getItem(this.tableName));
        if(temp){
          const {_constructor} = temp;
          if(_constructor){
            this.modal = _constructor;
            this.column = Object.keys(this.modal);
          }
        }else{
          localStorage.setItem(this.tableName, JSON.stringify({
            collection : [],
            _constructor : ''
          }));
        }
      }
    }catch(err){
      console.error(err.stack);
    }
  }

  init(initModal){
    const temp = JSON.parse(localStorage.getItem(this.tableName));
    if(!temp || !temp._constructor){
      this.modal = initModal;
      this.column = Object.keys(this.modal);
      localStorage.setItem(this.tableName, JSON.stringify({
        collection : [],
        _constructor : initModal
      }));
    }
    return this;
  }

  insert(data){
    let temp = JSON.parse(localStorage.getItem(this.tableName));
    let {collection} = temp;
    collection.push(
        Object.assign({},{
          index : collection.length
        },this.modal,data)
    );
    localStorage.setItem(this.tableName, JSON.stringify(Object.assign(temp,{collection})));
    return this.findOne(data);
  }

  find(query){
    let {collection} = JSON.parse(localStorage.getItem(this.tableName));
    if(query){
      const filter = collection.filter(c => {
        const match = (query, data) => {
        if(Object.keys(query).map(key => !!data[key]).every(b => b)){
        return Object.keys(query).map(key => {
          if(getType(query[key]) === 'object'){
          return match(query[key], data[key]);
        }else{
          return query[key] === data[key];
        }
      }).every(b => b);
      }else{
        return Object.keys(data).map(key => {
          if(getType(data[key]) === 'object'){
          return match(query, data[key]);
        }else{
          return false;
        }
      }).some(b => b);
      }
    };
      return match(query,c);
    });
      return filter;
    }else{
      return collection;
    }
  }

  findOne(query){
    return this.find(query)[0];
  }



  remove(query, justOne){
    let temp = JSON.parse(localStorage.getItem(this.tableName));
    let {collection} = temp;
    if(query){
      if(justOne){
        collection.splice(collection.indexOf(this.findOne(query)),1);
      }else{
        this.find(query).forEach(item => {
          collection.splice(collection.indexOf(item),1);
      });
      }
    }else{
      collection = [];
    }
    localStorage.setItem(this.tableName, JSON.stringify(Object.assign(temp,{collection})));
    return JSON.parse(localStorage.getItem(this.tableName)).collection;
  }

  update(query, data, multi){
    let temp = JSON.parse(localStorage.getItem(this.tableName));
    let {collection} = temp;
    const filter = this.find(query);
    if(multi){
      filter.forEach(item => {
        collection.splice(collection.findIndex(c => c.id === item.id),1,Object.assign({},data,{
        index : item.index
      }));
    });
    }else{
      collection.splice(collection.findIndex(c => c.id === filter[0].id),1,Object.assign({},data,{
        index : filter[0].index
      }));
    }
    localStorage.setItem(this.tableName, JSON.stringify(Object.assign(temp,{collection})));
    return multi ? this.find(query) : this.findOne(query);
  }

}