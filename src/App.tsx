import { useTheme } from "./shared/theme/useTheme";
import { Pages } from "./pages";
import "./shared/styles/index.scss";

function App(): JSX.Element {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Pages />
    </div>
  );
}

export default App;
