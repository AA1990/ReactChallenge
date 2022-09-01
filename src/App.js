import { AppRoutes } from 'Routes'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import enLocale from 'date-fns/locale/en-US'

function App() {
  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={enLocale}
      >
        <AppRoutes />
      </LocalizationProvider>
    </>
  );
}

export default App;
