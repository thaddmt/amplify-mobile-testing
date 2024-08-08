import React from 'react';
import Bowser from 'bowser';
import { z } from 'zod';
import {
  Alert,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  View,
} from '@aws-amplify/ui-react';
import { Checkbox, MultiSelect, Select, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import useMutation from 'use-mutation';

import {
  DEVICE_OPTIONS,
  BRIGHTNESS_OPTIONS,
  PRESENTATION_ARTIFACT_OPTIONS,
  LOCATION_OPTIONS,
  WEATHER_OPTIONS,
  LIGHT_SOURCE_OPTIONS,
  LIGHT_SOURCE_COLOR_OPTIONS,
  LIGHT_SOURCE_DIRECTION_OPTIONS,
  ANCESTRY_OPTIONS,
  ETHNICITY_OPTIONS,
  GENDER_OPTIONS,
  FACIAL_FEATURE_OPTIONS,
  MAKEUP_OPTIONS,
} from '../utils/constants';
import { post } from 'aws-amplify/api';

export interface FeedbackFormProps {
  sessionId: string;
}

const schema = z.object({
  feedback: z
    .string()
    .max(1000, 'Feedback must be 1000 characters or less')
    .regex(/^[a-zA-Z0-9,._\-\s]*$/, 'Feedback must be alphanumeric')
    .optional(),
  brightness: z.string().optional(),
  presentationArtifact: z.string().optional(),
  device: z.string().optional(),
  location: z.string().optional(),
  weather: z.string().optional(),
  lightSources: z.string().array().optional(),
  lightSourceColors: z.string().array().optional(),
  lightSourceDirections: z.string().array().optional(),
  ancestry: z.string().array().optional(),
  ethnicity: z.string().optional(),
  gender: z.string().optional(),
  facialFeatures: z.string().array().optional(),
  makeup: z.string().optional(),
  useData: z.boolean().optional(),
});
type FormValues = z.infer<typeof schema>;

const gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ sessionId }) => {
  const form = useForm<FormValues>({
    validate: zodResolver(schema),
    initialValues: {
      useData: false,
    },
  });

  const [mutate, { status }] = useMutation(
    async ({ sessionId, feedback }) => {
      const response = await post({
        apiName: 'SampleBackend',
        path: '/liveness/feedback',
        options: {
          body: {
            sessionId,
            feedback,
          }
        },
      }).response;
      const { body } = response;
      return body.json();
    },
    {
      onSuccess: () => {
        form.reset();
      },
    }
  );

  const handleSubmit = (values: FormValues) => {
    const browserInfo = Bowser.parse(window.navigator.userAgent);

    const feedbackPayload = {
      ...values,
      browserInfo,
    };

    mutate({
      sessionId,
      feedback: JSON.stringify(feedbackPayload),
    });
  };

  return (
    <Flex direction="column" marginTop="1rem">
      <Heading level={5}>Session feedback</Heading>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column">
          <Textarea
            label="Feedback"
            description="Please do not include personal or sensitive information"
            placeholder="Enter your feedback..."
            {...form.getInputProps('feedback')}
          />

          {/* <Expander type="single" isCollapsible={true}>
            <ExpanderItem title="Metadata" value="metadata">
              <Heading level={6}>Artifact Information</Heading>
              <Grid
                templateColumns={gridTemplateColumns}
                gap="small"
                marginTop="small"
              >
                <View>
                  <Select
                    label="Screen brightness"
                    placeholder="Estimate your screen brightness"
                    data={BRIGHTNESS_OPTIONS}
                    {...form.getInputProps('brightness')}
                  />
                </View>

                <View>
                  <Select
                    label="Presentation artifact"
                    placeholder="Select your presentation artifact"
                    data={PRESENTATION_ARTIFACT_OPTIONS}
                    {...form.getInputProps('presentationArtifact')}
                  />
                </View>
              </Grid>

              <Divider marginBlock="small" />

              <Heading level={6}>Environment Information</Heading>
              <Grid
                templateColumns={gridTemplateColumns}
                gap="small"
                marginTop="small"
              >
                <View>
                  <Select
                    label="Device"
                    placeholder="Select your device"
                    data={DEVICE_OPTIONS}
                    {...form.getInputProps('device')}
                  />
                </View>

                <View>
                  <Select
                    label="Location"
                    placeholder="Select your location"
                    data={LOCATION_OPTIONS}
                    {...form.getInputProps('location')}
                  />
                </View>

                <View>
                  <Select
                    label="Weather"
                    placeholder="Select the weather"
                    data={WEATHER_OPTIONS}
                    {...form.getInputProps('weather')}
                  />
                </View>

                <View>
                  <MultiSelect
                    label="Light sources"
                    placeholder="Select all that apply"
                    data={LIGHT_SOURCE_OPTIONS}
                    {...form.getInputProps('lightSources')}
                  />
                </View>

                <View>
                  <MultiSelect
                    label="Light source colors"
                    placeholder="Select all that apply"
                    data={LIGHT_SOURCE_COLOR_OPTIONS}
                    {...form.getInputProps('lightSourceColors')}
                  />
                </View>

                <View>
                  <MultiSelect
                    label="Light source directions"
                    placeholder="Select all that apply"
                    data={LIGHT_SOURCE_DIRECTION_OPTIONS}
                    {...form.getInputProps('lightSourceDirections')}
                  />
                </View>
              </Grid>

              <Divider marginBlock="small" />

              <Heading level={6}>Other Information</Heading>
              <Grid
                templateColumns={gridTemplateColumns}
                gap="small"
                marginTop="small"
              >
                <View>
                  <MultiSelect
                    label="Ancestry"
                    placeholder="Select your ancestry"
                    data={ANCESTRY_OPTIONS}
                    {...form.getInputProps('ancestry')}
                  />
                </View>

                <View>
                  <Select
                    label="Ethnicity"
                    placeholder="Select your ethnicity"
                    data={ETHNICITY_OPTIONS}
                    {...form.getInputProps('ethnicity')}
                  />
                </View>

                <View>
                  <Select
                    label="Gender"
                    placeholder="Select your gender"
                    data={GENDER_OPTIONS}
                    {...form.getInputProps('gender')}
                  />
                </View>

                <View>
                  <MultiSelect
                    label="Facial features"
                    placeholder="Select all that apply"
                    data={FACIAL_FEATURE_OPTIONS}
                    {...form.getInputProps('facialFeatures')}
                  />
                </View>

                <View>
                  <Select
                    label="Makeup"
                    placeholder="Select your makeup"
                    data={MAKEUP_OPTIONS}
                    {...form.getInputProps('makeup')}
                  />
                </View>
              </Grid>

              <Divider marginBlock="small" />

              <View>
                <Checkbox
                  label="I provide consent to use this data"
                  {...form.getInputProps('useData', { type: 'checkbox' })}
                />
              </View>
            </ExpanderItem>
          </Expander> */}

          <Button
            type="submit"
            alignSelf="flex-end"
            isLoading={status === 'running'}
            loadingText="Saving..."
          >
            Submit
          </Button>

          {status === 'success' && (
            <Alert variation="success">Feedback saved successfully!</Alert>
          )}

          {status === 'failure' && (
            <Alert variation="error">
              Error saving feedback! Please try again.
            </Alert>
          )}
        </Flex>
      </form>
    </Flex>
  );
};
