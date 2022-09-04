// const { projects, clients } = require("../sampleData.js");
// model
const Project = require("../models/Project");
const Client = require("../models/Client");
// graphQl
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

// ---------------------------------------------------
// graphql support typescript we need types
// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  // here fields is a function
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  // here fields is a function
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Query ->  Root Type
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",

  // ----------------------------------------------
  // Client
  // here fields is an object
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } }, // giving id
      resolve(parent, args) {
        // return
        return Client.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType), // will be list of queries types
      resolve(parent, args) {
        return Client.find();
      },
    },
    // ----------------------------------------------
    // Project
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } }, // giving id
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType), // will be list of queries types
      resolve(parent, args) {
        return Project.find();
      },
    },
  },
});

// Mutations -> CRUD Operations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // ----------------------------------------------
    // Clients
    // add queries
    addClient: {
      type: ClientType,
      args: {
        // GraphQLNonNull tell that this value can't be null
        // user need to write it
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
    // delete queries
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
    // --------------------------------------------------------
    // Project
    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            // need to mention name and value
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },

    // Delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },

    // Update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            // need to mention name and value
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});