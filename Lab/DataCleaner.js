// // Strategy manager
//
// const DataCleaner = function() {
//     this.strategy = null;
// }
//
// DataCleaner.prototype = {
//     setStrategy: function(strategy) {
//         this.strategy = strategy;
//     },
//
//     query: function(query) {
//         return this.strategy.query();
//         // return "query eseguita";
//     },
//
//     clean: function() {
//         // return this.strategy.clean();
//         return "cleaned data";
//     },
//
//     getData: function() {
//         // return this.strategy.getData();
//         return "getting some data";
//     }
//
// };
//
// // Strategies
// const GraphCleaner = function() {
//     this.query = function() {
//         return "GraphCleaner query eseguita";
//     }
// }
//
// const StackCleaner = function() {
//     this.query = function() {
//         return "StackCleaner query eseguita";
//     }
// }
//
//
// let obj = new DataCleaner();
// let o = new DataCleaner();
//
// obj.setStrategy(new GraphCleaner);
// o.setStrategy(new StackCleaner);
//
// console.log(obj.query());
// console.log(o.query());


// Strategy manager

const DataCleaner = function() {
    this.strategy = null;
}

DataCleaner.prototype = {
    setStrategy: function(strategy) {
        this.strategy = strategy;
    },

    query: function(query) {
        return this.strategy.query();
        // return "query eseguita";
    },

    clean: function() {
        // return this.strategy.clean();
        return "cleaned data";
    },

    getData: function() {
        // return this.strategy.getData();
        return "getting some data";
    }

};

// Strategies
const GraphCleaner = function() {
    this.query = function() {
        return "GraphCleaner query eseguita";
    }
}

const StackCleaner = function() {
    this.query = function() {
        return "StackCleaner query eseguita";
    }
}



module.exports = DataCleaner;
//
//
// let obj = new DataCleaner();
// let o = new DataCleaner();
//
// obj.setStrategy(new GraphCleaner);
// o.setStrategy(new StackCleaner);
//
// console.log(obj.query());
// console.log(o.query());
