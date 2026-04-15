/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { FriendProvider } from './context/FriendContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FriendDetails } from './pages/FriendDetails';
import { Timeline } from './pages/Timeline';
import { Stats } from './pages/Stats';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <FriendProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friend/:id" element={<FriendDetails />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </FriendProvider>
  );
}
