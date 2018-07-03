# local-datastore
> A local data store, based on HTML5 localstorage, uses MongoDB-like interface.
> 一个浏览器端数据库，使用HTML5的localstorage持久化数据，使用类似MongoDB风格的接口，适用于本地草稿箱等业务场景。    

## Usage

    const user = new Local('apply');

    user.init({
        index : '',
        name : '',
        age : '',
        gender : '',
        department : ''
    });

### insert

    student.insert({
        name : 'Jasper',
        age : 3,
        gender : 'male',
        department : {
           company : {
            id : 3,
            name : 'meiyou'
           }
        }
    });

return value

    {
        index : 0
        name : 'Jasper',
        age : 3,
        gender : 'male',
        department : {
           company : {
            id : 3,
            name : 'meiyou'
           }
        }
    }


### findOne

    student.findOne({
         company : {
            id : 3
        }
    };

return value
    
    {
        index : 0
        name : 'Jasper',
        age : 3,
        gender : 'male',
        department : {
           company : {
            id : 3,
            name : 'meiyou'
           }
        }
    }
### find

    student.find({
        gender: 'male'
    };
    
return value
    
    [
         {
            index : 0
                name : 'Jasper',
                age : 3,
                gender : 'male',
                department : {
                   company : {
                    id : 3,
                    name : 'meiyou'
                   }
                }
        }
    ]

### updateAll

    student.update({
         company : {
            id : 3
        }
    }, {
            index : 0
                name : 'Jasper',
                age : 99999,
                gender : 'male',
                department : {
                   company : {
                    id : 3,
                    name : 'meiyou'
                   }
                }
        }, true);
        
return value

    [
         {
            index : 0
                name : 'Jasper',
                age : 99999,
                gender : 'male',
                department : {
                   company : {
                    id : 3,
                    name : 'meiyou'
                   }
                }
        }
    ]

### update

      student.update({
         company : {
            id : 3
        }
    }, {
            index : 0
                name : 'Jasper',
                age : 99999,
                gender : 'male',
                department : {
                   company : {
                    id : 3,
                    name : 'meiyou'
                   }
                }
        });
        
return value

     {
        index : 0
            name : 'Jasper',
            age : 99999,
            gender : 'male',
            department : {
               company : {
                id : 3,
                name : 'meiyou'
               }
            }
    }

### removeOne

    student.remove({
        age : 3
    },true);
    
return value
    []

### remove

    student.remove({
        age : 3
    });

return value

    []

### clear

    student.remove();
    
return value

    []



