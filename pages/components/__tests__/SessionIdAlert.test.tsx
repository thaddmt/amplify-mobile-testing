import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useClipboard } from '@mantine/hooks';

import { getMockedFunction } from '../../utils/test-utils';
import { SessionIdAlert } from '../SessionIdAlert';

jest.mock('@mantine/hooks');

const mockUseClipboard = getMockedFunction(useClipboard);

describe('SessionIdAlert', () => {
  const mockCopy = jest.fn();

  beforeEach(() => {
    mockUseClipboard.mockReturnValue({
      copy: mockCopy,
      copied: false,
      error: null,
      reset: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the passed sessionId', () => {
    const sessionId = 'dummy-sessionId';
    render(<SessionIdAlert sessionId={sessionId} />);

    expect(screen.getByText(sessionId)).toBeInTheDocument();
  });

  it('should copy the sessionId to clipboard', async () => {
    const sessionId = 'dummy-sessionId';
    render(<SessionIdAlert sessionId={sessionId} />);

    await userEvent.click(screen.getByRole('button'));

    expect(mockCopy).toHaveBeenCalledWith(sessionId);
  });
});
