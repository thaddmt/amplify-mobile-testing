import { render, screen } from '@testing-library/react';

import { GetLivenessResultCard } from '../GetLivenessResultCard';

describe('GetLivenessResultCard', () => {
  it('should render the content appropriately', () => {
    const isLive = true;
    const confidenceScore = 0.9;
    const auditImageBytes = 'dummy-auditImageBytes';

    render(
      <GetLivenessResultCard
        getLivenessResponse={{
          isLive,
          confidenceScore,
          auditImageBytes,
        }}
      />
    );

    expect(screen.getByText('Confidence score')).toBeInTheDocument();
    expect(screen.getByText(confidenceScore)).toBeInTheDocument();
    expect(screen.getByAltText('Audit image')).toBeInTheDocument();
    expect(screen.getByAltText('Audit image').getAttribute('src')).toEqual(
      `data:image/jpeg;base64,${auditImageBytes}`
    );
  });
});
