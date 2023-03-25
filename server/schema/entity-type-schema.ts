import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from "graphql";

interface EntityTypeMap {
  id: string;
  entityTypeName: any;
  kind: any;
  enableFuzzyExtraction: any;
  autoExpansionMode: any;
  entities: any;
}

const entityData: EntityTypeMap[] = [
  {
    id: "1",
    entityTypeName: "Color",
    kind: "KIND_MAP",
    enableFuzzyExtraction: false,
    autoExpansionMode: true,
    entities: [
      {
        value: "red",
        synonyms: ["rouge"],
      },
      {
        value: "green",
        synonyms: ["vert"],
      },
      {
        value: "blue",
        synonyms: ["bleu"],
      },
    ],
  },
  {
    id: "2",
    entityTypeName: "Number",
    kind: "KIND_LIST",
    enableFuzzyExtraction: true,
    autoExpansionMode: false,
    entities: [
      {
        value: "one",
        synonyms: ["1"],
      },
      {
        value: "two",
        synonyms: ["2"],
      },
      {
        value: "three",
        synonyms: ["3"],
      },
    ],
  },
  {
    id: "3",
    entityTypeName: "Country",
    kind: "KIND_REGEXP",
    enableFuzzyExtraction: true,
    autoExpansionMode: false,
    entities: [
      {
        value: "Ice Land",
        synonyms: ["Ice Land"],
      },
      {
        value: "New York",
        synonyms: ["NY", "NYC"],
      },
      {
        value: "three",
        synonyms: ["3"],
      },
    ],
  },
];

const EntityType = new GraphQLObjectType({
  name: "Entity",
  fields: {
    value: { type: GraphQLNonNull(GraphQLString) },
    synonyms: { type: GraphQLList(GraphQLString) },
  },
});

const EntityInput = new GraphQLInputObjectType({
  name: "EntityInput",
  fields: {
    value: { type: GraphQLNonNull(GraphQLString) },
    synonyms: { type: GraphQLList(GraphQLString) },
  },
});

const EntityTypeType = new GraphQLObjectType({
  name: "EntityType",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    entityTypeName: { type: GraphQLNonNull(GraphQLString) },
    kind: { type: GraphQLNonNull(GraphQLString) },
    enableFuzzyExtraction: { type: GraphQLNonNull(GraphQLBoolean) },
    autoExpansionMode: { type: GraphQLNonNull(GraphQLBoolean) },
    entities: { type: GraphQLList(EntityType) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    getEntity: {
      type: EntityTypeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        const { id } = args;
        return entityData.find((entity) => entity.id === id);
      },
    },
    getAllEntities: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(EntityTypeType))),
      resolve() {
        return entityData;
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addEntityType: {
      type: EntityTypeType,
      args: {
        entityTypeName: { type: GraphQLNonNull(GraphQLString) },
        kind: { type: GraphQLNonNull(GraphQLString) },
        enableFuzzyExtraction: { type: GraphQLNonNull(GraphQLBoolean) },
        autoExpansionMode: { type: GraphQLNonNull(GraphQLBoolean) },
        entities: {
          type: GraphQLList(GraphQLNonNull(EntityInput)),
        },
      },
      resolve(_, args) {
        const {
          entityTypeName,
          kind,
          enableFuzzyExtraction,
          autoExpansionMode,
          entities,
        } = args;
        const newEntity: EntityTypeMap = {
          id: `${entityData.length + 1}`,
          entityTypeName,
          kind,
          enableFuzzyExtraction,
          autoExpansionMode,
          entities: entities,
        };
        entityData.push(newEntity);
        return newEntity;
      },
    },
    updateEntityType: {
      type: EntityTypeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        entityTypeName: { type: GraphQLString },
        kind: { type: GraphQLString },
        enableFuzzyExtraction: { type: GraphQLBoolean },
        autoExpansionMode: { type: GraphQLBoolean },
        entities: {
          type: GraphQLList(GraphQLNonNull(EntityInput)),
        },
      },
      resolve: (_, args) => {
        const index = entityData.findIndex((entity) => entity.id === args.id);
        if (index === -1) {
          throw new Error(`Entity with id ${args.id} not found.`);
        }
        const updatedEntity = {
          ...entityData[index],
          ...args,
          entities: args.entities || entityData[index].entities,
        };
        entityData[index] = updatedEntity;
        return updatedEntity;
      },
    },
    deleteEntityType: {
      type: GraphQLString,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        const index = entityData.findIndex((entity) => entity.id === args.id);
        if (index === -1) {
          throw new Error(`Entity with id ${args.id} not found.`);
        }
        const deletedEntity = entityData.splice(index, 1)[0];
        return `Entity with id ${args.id} and name ${deletedEntity.entityTypeName} deleted.`;
      },
    },
  }),
});

export const entityTypeSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
