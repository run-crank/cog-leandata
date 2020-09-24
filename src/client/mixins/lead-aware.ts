
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
    console.log(this.client.accessToken);
    return this.client.apex.post('/LeanDataAPI', request, this.options);
  }
}
