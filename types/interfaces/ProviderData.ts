export interface ProviderData {
    providerGender: string;
    providerAge: string;
    providerWeight: string;
    providerHeight: string;
    providerActivityLevel: string;
    weightObjective: string;
    dietFrequency: string;
    mealFrequency: string;
    [key: string]: string; // Index signature for string keys and string values
  }