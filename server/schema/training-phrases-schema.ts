import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";

const trainingPhrases = [
  {
    id: "1",
    phrase: ["Hello", "Hi"],
    industry: "Technology",
  },
  {
    id: "2",
    phrase: ["Goodbye", "See you later"],
    industry: "Retail",
  },
];

const TrainingPhraseType = new GraphQLObjectType({
  name: "TrainingPhrase",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    phrase: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
    },
    industry: { type: GraphQLString },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    getTrainingPhrase: {
      type: TrainingPhraseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        const { id } = args;
        return trainingPhrases.find((phrase) => phrase.id === id);
      },
    },
    getAllTrainingPhrases: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(TrainingPhraseType))),
      resolve() {
        return trainingPhrases;
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addTrainingPhrase: {
      type: TrainingPhraseType,
      args: {
        phrase: {
          type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
        },
        industry: { type: GraphQLString },
      },
      resolve(_, args) {
        const { phrase, industry } = args;
        const newTrainingPhrase = {
          id: `${trainingPhrases.length + 1}`,
          phrase,
          industry,
        };
        trainingPhrases.push(newTrainingPhrase);
        return newTrainingPhrase;
      },
    },
    updateTrainingPhrase: {
      type: TrainingPhraseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        phrase: { type: GraphQLList(GraphQLNonNull(GraphQLString)) },
        industry: { type: GraphQLString },
      },
      resolve(_, args) {
        const { id, phrase, industry } = args;
        const trainingPhrase = trainingPhrases.find((p) => p.id === id);
        if (!trainingPhrase) {
          throw new Error("Training phrase not found");
        }
        if (phrase) {
          trainingPhrase.phrase = phrase;
        }
        if (industry) {
          trainingPhrase.industry = industry;
        }
        return trainingPhrase;
      },
    },
    deleteTrainingPhrase: {
      type: GraphQLNonNull(GraphQLString),
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        const { id } = args;
        const index = trainingPhrases.findIndex((phrase) => phrase.id === id);
        if (index === -1) {
          throw new Error("Training phrase not found");
        }
        trainingPhrases.splice(index, 1);
        return id;
      },
    },
  }),
});

export const trainingPhraseSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
