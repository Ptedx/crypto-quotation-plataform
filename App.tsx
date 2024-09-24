import { NetworkContext } from './src/hooks/useNetwork';
import Routes from './src/pages/routes';


export default function App() {
  return (
    <NetworkContext>
      <Routes />
    </NetworkContext>
  );
}
