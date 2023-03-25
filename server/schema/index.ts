import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "@graphql-tools/schema";
import { trainingPhraseSchema } from "./training-phrases-schema";
import { entityTypeSchema } from "./entity-type-schema";

const schema: GraphQLSchema = mergeSchemas({
  schemas: [trainingPhraseSchema, entityTypeSchema],
});

export { schema };
