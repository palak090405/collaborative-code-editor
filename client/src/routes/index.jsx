import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CreateRoomPage from '../pages/CreateRoomPage'
import JoinRoomPage from '../pages/JoinRoomPage'
import CollaborativeEditor from '../pages/CollaborativeEditor'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/create-room',
    element: <CreateRoomPage />,
  },
  {
    path: '/join-room',
    element: <JoinRoomPage />,
  },
  {
    path: '/room/:roomId',
    element: <CollaborativeEditor />,
  },
])

export default router