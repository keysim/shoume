var config = {
    secret: 'shoumeuh',
    port : 4243,
    url : "http://10.0.1.7:" + 4243,
    db : {url:'mongodb://127.0.0.1:27017/shoume', port:27017, name:'shoume'}, // launch "mongod" then take port and host printed in the command line.
    model:{
        user:{
            login: {type: String, required: true},
            password: {type: String, required: true},
            mail:String,
            description:String,
            full_name:String,
            role:Number,
            avatar:String,
            sex:String,
            age:Number,
            height:Number,
            weight:Number,
            follows:String,
            favorite_recipe:String,
            ingredients_ids:Array,
            products_ids:Array,
            thumbnail:String,
            recipes_ids:Array,
            date:{type:Date, default:Date.now}
        },
        user_history:{
            owner_id:Number,
            date:Date,
            search_text:String,
            search_type:Number,
            selected_tags:Array
        },
        moment:{
            owner_id:{type:String, required:true},
            image_url:String,
            title: {type:String, required:true},
            content: {type:String, required:true},
            date:{type: Date, default: Date.now}
        },
        
        recipe:{
            name:{type:String, required:true},
            tasks:String,
            description:String,
            processes_ids:Array,
            ingredients_ids:Array,
            owner_id:{type:String, required:true},
            image_url:String,
            thumbnail:String,
            rating:Number,
            tags:Array,
            date:{type: Date, default: Date.now}
        },
        
        comment:{
            recipe_id:String,
            moment_id:String,
            owner_id:{type:String, required:true},
            owner_login:{type:String, required:true},
            thumbnail:String,
            content:{type:String, required:true},
            date:{type:Date, default:Date.now}
        },
        
        process:{
            name:String,
            description:String,
            time:Number
        },
        ingredient:{
            name:{type:String, required:true},
            nutritional_values:Array,
            image_url:String,
            description:String,
            owner_id:{type:String, required:true},
            date:{type: Date, default: Date.now}
        },
        nutritional_values:{
            name:String,
            values:Number
        }
    }
};

module.exports = config;