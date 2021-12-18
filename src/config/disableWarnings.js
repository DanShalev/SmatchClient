import { LogBox } from 'react-native';

/*
* Disable warning caused by swipeout component.
* */
LogBox.ignoreLogs(['Warning: componentWillMount has been renamed']);
LogBox.ignoreLogs(['Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.']);
