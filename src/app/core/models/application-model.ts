export interface Application {
  applicationId: number;
  applicationName: string;
}

export interface Domain {
  domainName: string;
  applications: Application[];
}

export interface Config {
    state: boolean;
    configName: string;
    observations: string;
}


//TODO: Eliminar posterior a la conexión a la BD

export interface TempApplication {
  id: number;
  name: string;
  domainId: number;
}

export interface TempDomain {
  id: number;
  name: string;
}
