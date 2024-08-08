import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  LivenessResultsModal,
  LivenessResultsModalProps,
} from '../LivenessResultsModal';

jest.mock('../GetLivenessResultCard', () => ({
  GetLivenessResultCard: () => <div>GetLivenessResultCard</div>,
}));
jest.mock('../FeedbackForm', () => ({
  FeedbackForm: () => <div>FeedbackForm</div>,
}));
jest.mock('../SessionIdAlert', () => ({
  SessionIdAlert: () => <div>SessionIdAlert</div>,
}));

const modalRoot = document.createElement('div');
modalRoot.setAttribute('data-amplify-theme', '');
document.body.appendChild(modalRoot);

describe('LivenessResultsModal', () => {
  const sessionId = 'dummy-sessionId';
  const mockOnClose = jest.fn();
  const mockGetLivenessResponse = {} as any;

  const renderComponent = (props?: Partial<LivenessResultsModalProps>) => {
    return render(
      <LivenessResultsModal
        sessionId={sessionId}
        isOpen
        onClose={mockOnClose}
        getLivenessResponse={mockGetLivenessResponse}
        {...props}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Modal content when open', () => {
    renderComponent();

    expect(screen.getByText('SessionIdAlert')).toBeInTheDocument();
    expect(screen.getByText('Liveness results')).toBeInTheDocument();
    expect(screen.getByText('GetLivenessResultCard')).toBeInTheDocument();
    expect(screen.getByText('FeedbackForm')).toBeInTheDocument();
  });

  it('should not render GetLivenessResultCard if no response', () => {
    renderComponent({ getLivenessResponse: null });
    expect(screen.queryByText('GetLivenessResultCard')).not.toBeInTheDocument();
  });

  it('should not render Modal when closed', () => {
    renderComponent({ isOpen: false });
    expect(screen.queryByText('Liveness results')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    renderComponent();

    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
