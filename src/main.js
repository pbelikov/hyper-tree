import { app } from 'hyperapp';
import { container } from './config';
import { state } from './app/state';
import { actions } from './app/actions';
import { view } from './app/app';

// Bring styles
import './main.scss';

// Mount application
app(state, actions, view, container);