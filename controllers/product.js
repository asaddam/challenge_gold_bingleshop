const {Product} = require('../models/product'); 

module.exports = {
    getListProduct: async (filters) => {
        let options = {};
        if (typeof filters !== "undefined" || filters === null) {
            options.where = filters;
        }
        let product = [];

        try{
            product = await Product.findAll(options); 
        }catch(e){ console.log(e)}

        return product;
    },

    getProductById: async (id) => {
        let product = null;

        try{
            product = await Product.findOne({
                where: {id: id}
            });
        }catch(e){ console.log(e)}

        return product;
    }

    
}