import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const localStorageMock = {
  // loadGoogleClient: jest.fn(),
  // initGoogleClient: jest.fn(),
  // userIsSignIn: jest.fn(),
  // googleSignOut: jest.fn()
};

global.localStorage = localStorageMock;