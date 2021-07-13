/*tslint:disable:no-else-after-return*/
/*tslint:disable:triple-equals*/

import { BaseStep, Field, ExpectedRecord, StepInterface } from '../../core/base-step';
import { FieldDefinition, RunStepResponse, Step, StepDefinition, RecordDefinition } from '../../proto/cog_pb';

import { baseOperators } from './../../client/constants/operators';
import * as util from '@run-crank/utilities';
import { isNullOrUndefined } from 'util';
/**
 * Note: the class name here becomes this step's stepId.
 * @see BaseStep.getId()
 */
export class UserFieldEqualsStep extends BaseStep implements StepInterface {

  protected stepName: string = 'Check a field on a JSON Placeholder user';

  protected stepType: StepDefinition.Type = StepDefinition.Type.VALIDATION;

  protected stepExpression: string = 'the (?<field>.+) field on JSON Placeholder user (?<email>.+) should (?<operator>be set|not be set|be less than|be greater than|be one of|be|contain|not be one of|not be|not contain|match|not match) ?(?<expectation>.+)?';

  protected stepHelp: string = "This step attempts to find a user on JSON Placeholder and check a field's value on that user.";

  protected expectedFields: Field[] = [{
    field: 'email',
    type: FieldDefinition.Type.EMAIL,
    description: "User's email address",
    help: 'This email address is used to uniquely identify and find the JSON Placeholder user.',
  }, {
    field: 'field',
    type: FieldDefinition.Type.STRING,
    description: 'Field name to check',
  }, {
    field: 'operator',
    type: FieldDefinition.Type.STRING,
    description: 'Check Logic (be, not be, contain, not contain, be greater than, be less than, be set, not be set, be one of, or not be one of)',
  }, {
    field: 'expectedValue',
    type: FieldDefinition.Type.ANYSCALAR,
    optionality: FieldDefinition.Optionality.OPTIONAL,
    description: 'Expected field value',
  }];

  /**
   * An array of Record definitions that this step may return as structured data. This metadata
   * is used in auto-generated step documentation, and powers dynamic token value substitution. In
   * the example below, a token like {{cog.user.id}} could be used in a Scenario step following the
   * invocation of this step.
   */
  protected expectedRecords: ExpectedRecord[] = [{
    id: 'user',
    type: RecordDefinition.Type.KEYVALUE,
    dynamicFields: true,
    fields: [{
      field: 'id',
      description: 'User ID',
      type: FieldDefinition.Type.NUMERIC,
    }, {
      field: 'name',
      description: "User's full name",
      type: FieldDefinition.Type.STRING,
    }, {
      field: 'email',
      description: "User's e-mail address",
      type: FieldDefinition.Type.EMAIL,
    }],
  }];

  async executeStep(step: Step): Promise<RunStepResponse> {
    const request = {
      requesterName: 'LeanData',
      apiType: 'roundRobin',
      operation: 'anyObjectRoundRobin',
      version: '2',
      objectType: 'Campaign',
      inputType: 'ids',
      input: '[\"7012E000001VYu9\"]',
      REST: true,
      isUpdate: false,
      performRoundRobin: true,
      updateAssignee: true,
      useSalesforceIds: true,
    };

    try {
      const response = await this.client.anyObjectRoundRobin(request);
      return this.pass('');
    } catch (e) {
      return this.error(e);
    }
  }

}

// Exports a duplicate of this class, aliased as "Step"
// See the constructor in src/core/cog.ts to understand why.
export { UserFieldEqualsStep as Step };
