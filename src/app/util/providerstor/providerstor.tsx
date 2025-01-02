'use client'
import { Provider } from 'react-redux';
import { store } from '../redux/strore';


interface typeChildren{
    children:React.ReactNode;
   }

function ProvidreStore({children}:typeChildren) {

  return (
    <Provider store={store}>

        <div>
         {children}
        </div>
      
    </Provider>
  )
}

export default ProvidreStore
