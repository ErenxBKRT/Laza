import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Reservation from './Views/Reservation.jsx'
import Client from './Views/Client.jsx'
import Voiture from './Views/Voiture.jsx'
import Profit from './Views/Profit.jsx'
import App from'./App.jsx'


const route = createBrowserRouter([
	{
		path:'/',
		element:<App/>,
		children: [
			{
				index: true,
				element:<Reservation/>
			},
			{
				path: '/client',
				element: <Client/>
			},
			{
				path: '/voiture',
				element: <Voiture/>
			},
			{
				path: '/profit',
				element: <Profit/>
			}
		]
	}])

export default function Router(){
	return <RouterProvider router={route}/>
}