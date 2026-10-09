import { RecoilRoot, useRecoilValue } from "recoil"
import { jobsAtom, messagingAtom, networkAtom, notificationsAtom, totalCountSelector } from "./atoms"

function App(){
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

function MainApp() {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const notificationCount = useRecoilValue(notificationsAtom);
  const messagingCount = useRecoilValue(messagingAtom);
  const totalNotificationCount = useRecoilValue(totalCountSelector);

  return (
    <>
      <button>Home</button>

      <button>My network ({networkNotificationCount>=100 ? "99+" : networkNotificationCount}) </button>
      <button>Jobs ({jobsCount})</button>
      <button>Messaging ({messagingCount})</button>
      <button>Notifications ({notificationCount})</button>

      <button>Me ({totalNotificationCount})</button>
    </>
  )
}

export default App
