
import * as jsforce from 'jsforce';

export class LeadAwareMixin {
  client: jsforce.Connection;
  clientReady: Promise<boolean>;
  options: jsforce.RestApiOptions = {
    headers: {
      Authorization: `Bearer ${this.client.accessToken}`,
    },
  };

  public async anyObjectRoundRobin(request: Object): Promise<Record<string, any>> {
    await this.clientReady;
    return this.client.apex.post('/LeanDataAPI', request, this.options);
  }
}
