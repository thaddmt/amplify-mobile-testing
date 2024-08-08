import { record } from 'aws-amplify/analytics';

export interface AnalyticsEventOptions {
  /**
   * The event name
   */
  event: string;

  /**
   * The event attributes
   */
  attributes?: Record<string, string>;

  /**
   * The event metrics
   */
  metrics?: Record<string, number>;
}

/**
 * Record an event with Amplify Analytics
 * @param analyticsEventOptions
 */
export function recordAnalyticsEvent({
  event,
  attributes,
  metrics,
}: AnalyticsEventOptions) {
  // record({ name: event, attributes, metrics });
}

export const LIVENESS_COMPONENT = 'LIVENESS_COMPONENT';
