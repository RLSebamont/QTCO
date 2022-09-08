export type RootStackParamList = {
  // add route params per screen
  Login: undefined;
  Home: undefined;
  Benchmark: undefined;
  Cashup: undefined;
  Comply: undefined;
  Finpack: undefined;
  Learning: undefined;
  Salesline: undefined;
};

export interface AppService {
  serviceId: number;
  serviceName: string;
  serviceUrl: string;
  enabled: boolean;
  androidUrl?: string;
  iosUrl?: string;
}
