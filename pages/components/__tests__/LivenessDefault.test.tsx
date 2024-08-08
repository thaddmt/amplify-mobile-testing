import { render, screen } from '@testing-library/react';

import LivenessDefault from '../LivenessDefault';
import { getMockedFunction } from '../../utils/test-utils';
import { useLiveness } from '../../hooks/useLiveness';

jest.mock('../../hooks/useLiveness');
jest.mock('@aws-amplify/ui-react', () => ({
  ...jest.requireActual('@aws-amplify/ui-react'),
  FaceLivenessDetector: () => <div>FaceLivenessDetector</div>,
}));
jest.mock('../SessionIdAlert', () => ({
  SessionIdAlert: () => <div>SessionIdAlert</div>,
}));
jest.mock('../LivenessResultsModal', () => ({
  LivenessResultsModal: () => <div>LivenessResultsModal</div>,
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string = '') => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockedUseLiveness = getMockedFunction(useLiveness);

describe('LivenessDefault', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render error text when createLivenessSessionApiError is not null', () => {
    mockedUseLiveness.mockReturnValue({
      createLivenessSessionApiError: 'Error',
    } as any);

    render(<LivenessDefault />);

    expect(screen.getByText('Some error occured...')).toBeInTheDocument();
  });

  it('should render loading text when createLivenessSessionApiLoading is true', () => {
    mockedUseLiveness.mockReturnValue({
      createLivenessSessionApiError: null,
      createLivenessSessionApiLoading: true,
    } as any);

    render(<LivenessDefault />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the main content when ready', () => {
    mockedUseLiveness.mockReturnValue({
      createLivenessSessionApiError: null,
      createLivenessSessionApiLoading: false,
      createLivenessSessionApiData: {},
    } as any);

    render(<LivenessDefault />);

    expect(screen.getByText('SessionIdAlert')).toBeInTheDocument();
    expect(screen.getByText('Waiting for you to allow camera permission.')).toBeInTheDocument();
  });
});
