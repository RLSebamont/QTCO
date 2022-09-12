interface BaseNavigationParams {
  serviceUrl: string;
}

export type RootStackParamList = {
  // add route params per screen
  Login: undefined;
  Home: undefined;
  Benchmark: BaseNavigationParams;
  Cashup: BaseNavigationParams;
  Comply: BaseNavigationParams;
  Finpack: BaseNavigationParams;
  Learning: BaseNavigationParams;
  Salesline: BaseNavigationParams;
};

export interface AppService {
  serviceId: number;
  serviceName: string;
  serviceUrl: string;
  enabled: boolean;
  androidUrl?: string;
  iosUrl?: string;
  notifications?: number;
}
