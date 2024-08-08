import * as React from 'react';
import { Badge, Flex, Text, View } from '@aws-amplify/ui-react';
import { Image } from '@mantine/core';

export interface GetLivenessResponse {
  isLive: boolean;
  confidenceScore: number;
  auditImageBytes: any;
}

export const GetLivenessResultCard = ({
  getLivenessResponse,
}: {
  getLivenessResponse: GetLivenessResponse;
}) => {
  if (!getLivenessResponse) return null;

  const { isLive, confidenceScore, auditImageBytes } = getLivenessResponse;

  const displayScore = confidenceScore.toFixed(1).replace(/[.,]0$/, "") // regex removes the decimal points if they are .0
  return (
    <Flex marginBlock="xxl" alignItems="center" justifyContent="center">
      <View>
        <Image
          width="100%"
          height="auto"
          radius="md"
          src={`data:image/jpeg;base64,${auditImageBytes}`}
          alt="Audit image"
          withPlaceholder
          caption={
            <Text as="span" style={{ whiteSpace: 'nowrap' }}>
              Confidence score
              <Badge variation={isLive ? 'success' : 'error'} margin="0 0.5rem">
                {displayScore}
              </Badge>
            </Text>
          }
        />
      </View>
    </Flex>
  );
};
