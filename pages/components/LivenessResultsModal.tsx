import React from 'react';
import { Divider, Heading } from '@aws-amplify/ui-react';
import { Modal } from '@mantine/core';

import {
  GetLivenessResultCard,
  GetLivenessResponse,
} from './GetLivenessResultCard';
import { FeedbackForm } from './FeedbackForm';
import { SessionIdAlert } from './SessionIdAlert';

export interface LivenessResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  getLivenessResponse: GetLivenessResponse;
  sessionId: string;
}

export const LivenessResultsModal: React.FC<LivenessResultsModalProps> = ({
  isOpen,
  onClose,
  getLivenessResponse,
  sessionId,
}) => {
  return (
    <Modal
      centered
      fullScreen
      target="[data-amplify-theme]"
      opened={isOpen}
      onClose={onClose}
      title={<Heading level={4}>Liveness results</Heading>}
    >
      <SessionIdAlert sessionId={sessionId} />

      {getLivenessResponse && (
        <GetLivenessResultCard getLivenessResponse={getLivenessResponse} />
      )}

      <Divider />

      <FeedbackForm sessionId={sessionId} />
    </Modal>
  );
};
