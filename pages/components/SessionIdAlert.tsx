import * as React from 'react';
import { useClipboard } from '@mantine/hooks';
import { Alert, Button, Flex, Text } from '@aws-amplify/ui-react';
import { MdContentCopy, MdCheck } from 'react-icons/md';

export const SessionIdAlert = ({ sessionId }) => {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <Alert role="none">
      <Flex alignItems="center">
        <Text color="font.primary">
          Session ID: <strong>{sessionId}</strong>
        </Text>
        <Button size="small" onClick={() => clipboard.copy(sessionId)}>
          {clipboard.copied ? <MdCheck /> : <MdContentCopy />}
        </Button>
      </Flex>
    </Alert>
  );
};
