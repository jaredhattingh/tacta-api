const graphql = require("graphql");

const User = require("../models/User");
const Contact = require("../models/Contact");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

const ContactType = new GraphQLObjectType({
  name: "Contact",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    },
    contacts: {
      type: new GraphQLList(ContactType),
      resolve(parent, args) {
        return Contact.find({
          userId: parent.id
        });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    contact: {
      type: ContactType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Contact.findById(args.id);
      }
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    contacts: {
      type: new GraphQLList(ContactType),
      resolve(parent, args) {
        return Contact.find({});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    }
  }
});

// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     addDish: {
//       type: DishType,
//       args: {
//         name: {
//           type: new GraphQLNonNull(GraphQLString)
//         },
//         country: {
//           type: new GraphQLNonNull(GraphQLString)
//         },
//         tasty: {
//           type: new GraphQLNonNull(GraphQLBoolean)
//         }
//       },
//       resolve(parent, args) {
//         let dish = new Dish({
//           name: args.name,
//           country: args.country,
//           tasty: args.tasty
//         });
//         return dish.save();
//       }
//     },
//     addChef: {
//       type: ChefType,
//       args: {
//         name: {
//           type: new GraphQLNonNull(GraphQLString)
//         },
//         rating: {
//           type: new GraphQLNonNull(GraphQLString)
//         }
//       },
//       resolve(parent, args) {
//         let chef = new Chef({
//           name: args.name,
//           rating: args.rating
//         });
//         return chef.save();
//       }
//     }
//   }
// });

module.exports = new GraphQLSchema({
  query: RootQuery
});
