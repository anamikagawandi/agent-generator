/**
 * Configures the application based on the NODE_ENV eg: "production, qa and develop"
 * return application configurations
 */
export const loadConfig = () => {
  return {
    port: process.env.PORT || 3000,
  };
};
